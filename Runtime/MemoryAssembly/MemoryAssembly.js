var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var MemoryAssembly;
        (function (MemoryAssembly_1) {
            "use strict";
            function readDataDirectory(reader) {
                var section = new MemoryAssembly_1.Section();
                section.rva = reader.readUInt32().toNumber();
                section.size = reader.readUInt32().toNumber();
                return section;
            }
            var MemoryAssembly = (function () {
                function MemoryAssembly(reader) {
                    if (reader.length() < 128) {
                        throw new Error("Bad Image");
                    }
                    // DOSHeader: { PE: 2, Start: 58, Lfanew: 4, End: 64 }
                    if (reader.readUInt16().toNumber() !== 0x5a4d) {
                        throw new Error("Bad Image");
                    }
                    reader.skip(58);
                    reader.seek(reader.readUInt32().toNumber());
                    // PE NT signature
                    if (reader.readUInt32().toNumber() !== 0x00004550) {
                        throw new Error("Bad Image");
                    }
                    this.module = new MemoryAssembly_1.Module();
                    // PEFileHeader
                    this.architecture = reader.readUInt16().toNumber();
                    var numberOfSections = reader.readUInt16().toNumber();
                    this.sections = new Array(numberOfSections);
                    // TimeDateStamp		4
                    // PointerToSymbolTable	4
                    // NumberOfSymbols		4
                    // OptionalHeaderSize	2
                    reader.skip(14);
                    // Characteristics		2
                    if ((reader.readUInt16().toNumber() & 0x2000) !== 0) {
                        this.module.kind = MemoryAssembly_1.ModuleKind.Console;
                    }
                    // Magic
                    this.module.is64Bit = reader.readUInt16().toNumber() === 0x20b;
                    //						pe32 || pe64
                    // LMajor				1
                    // LMinor				1
                    // CodeSize				4
                    // InitializedDataSize	4
                    // UninitializedDataSize4
                    // EntryPointRVA		4
                    // BaseOfCode			4
                    // BaseOfData			4 || 0
                    //   - NTSpecificFieldsHeader
                    // ImageBase			4 || 8
                    // SectionAlignment		4
                    // FileAlignement		4
                    // OSMajor				2
                    // OSMinor				2
                    // UserMajor			2
                    // UserMinor			2
                    // SubSysMajor			2
                    // SubSysMinor			2
                    // Reserved				4
                    // ImageSize			4
                    // HeaderSize			4
                    // FileChecksum			4
                    reader.skip(66);
                    var subsystem = reader.readUInt16().toNumber();
                    if (subsystem === 0x2 || subsystem === 0x9) {
                        this.module.kind = MemoryAssembly_1.ModuleKind.Windows;
                    }
                    else if (this.module.kind === undefined) {
                        this.module.kind = MemoryAssembly_1.ModuleKind.Console;
                    }
                    // DLLFlags				2
                    this.module.characteristics = reader.readUInt16().toNumber();
                    // StackReserveSize		4 || 8
                    // StackCommitSize		4 || 8
                    // HeapReserveSize		4 || 8
                    // HeapCommitSize		4 || 8
                    // LoaderFlags			4
                    // NumberOfDataDir		4
                    //   - DataDirectoriesHeader
                    // ExportTable			8
                    // ImportTable			8
                    // ResourceTable		8
                    // ExceptionTable		8
                    // CertificateTable		8
                    // BaseRelocationTable	8
                    reader.skip(this.module.is64Bit ? 88 : 72);
                    // Debug				8
                    this.module.debug = readDataDirectory(reader);
                    // Copyright				8
                    // GlobalPtr				8
                    // TLSTable					8
                    // LoadConfigTable			8
                    // BoundImport				8
                    // IAT						8
                    // DelayImportDescriptor	8
                    reader.skip(56);
                    // CLIHeader			8
                    var cliHeader = readDataDirectory(reader);
                    if (cliHeader.rva === 0 && cliHeader.size === 0) {
                        throw new Error("Bad Image");
                    }
                    // Reserved				8
                    reader.skip(8);
                    var i;
                    for (i = 0; i < numberOfSections; i++) {
                        var section = new MemoryAssembly_1.Section();
                        section.name = reader.readSimpleString(8);
                        // VirtualSize		4
                        reader.skip(4);
                        section.rva = reader.readUInt32().toNumber();
                        section.size = reader.readUInt32().toNumber();
                        section.offset = reader.readUInt32().toNumber();
                        // PointerToRelocations		4
                        // PointerToLineNumbers		4
                        // NumberOfRelocations		2
                        // NumberOfLineNumbers		2
                        // Characteristics			4
                        reader.skip(16);
                        this.sections[i] = section;
                    }
                    reader.seek(this.resolveRva(cliHeader.rva));
                    // Cb						4
                    // MajorRuntimeVersion		2
                    // MinorRuntimeVersion		2
                    reader.skip(8);
                    var metaData = readDataDirectory(reader);
                    this.module.attributes = reader.readUInt16().toNumber();
                    // EntryPointToken			4
                    this.module.entryPointToken = reader.readUInt32().toNumber();
                    this.module.resources = readDataDirectory(reader);
                    this.module.strongName = readDataDirectory(reader);
                    // CodeManagerTable			8
                    // VTableFixups				8
                    // ExportAddressTableJumps	8
                    // ManagedNativeHeader		8
                    reader.seek(this.resolveRva(metaData.rva));
                    var metaDataBaseOffset = reader.position();
                    // Metadata Header
                    // Signature
                    if (reader.readUInt32().toNumber() !== 0x424A5342) {
                        throw new Error("Invalid Metadata Header");
                    }
                    // MajorVersion			2
                    // MinorVersion			2
                    // Reserved				4
                    reader.skip(8);
                    this.runtimeVersion = reader.readSimpleString(reader.readInt32().toNumber());
                    reader.align4();
                    // Flags		2
                    reader.skip(2);
                    var numberOfHeaps = reader.readUInt16().toNumber();
                    var heapHeaders = [];
                    for (i = 0; i < numberOfHeaps; i++) {
                        heapHeaders.push({
                            offset: metaDataBaseOffset + reader.readUInt32().toNumber(),
                            size: reader.readUInt32().toNumber(),
                            // Name of the stream as null-terminated variable length array
                            // of ASCII characters, padded to the next 4-byte boundary
                            // with \0 characters. The name is limited to 32 characters.
                            name: reader.readSimpleStringAligned(32)
                        });
                    }
                    for (i = 0; i < numberOfHeaps; i++) {
                        var header = heapHeaders[i];
                        switch (header.name) {
                            case "#Strings":
                                this.stringHeap = reader.slice(header.offset, header.size);
                                break;
                            case "#US":
                                this.usHeap = reader.slice(header.offset, header.size);
                                break;
                        }
                    }
                }
                MemoryAssembly.prototype.resolveRva = function (rva) {
                    for (var i = 0; i < this.sections.length; i++) {
                        var section = this.sections[i];
                        if (rva >= section.rva && rva < section.rva + section.size) {
                            return section.offset + rva - section.rva;
                        }
                    }
                    throw new RangeError("bad rva");
                };
                MemoryAssembly.prototype.fetchString = function (offset) {
                    if (offset >= this.stringHeap.length()) {
                        throw new RangeError("Invalid #Strings heap index");
                    }
                    this.stringHeap.seek(offset);
                    return this.stringHeap.readString();
                };
                MemoryAssembly.prototype.fetchUserString = function (offset) {
                    if (offset === 0) {
                        throw new RangeError("Invalid #US heap offset.");
                    }
                    this.usHeap.seek(offset);
                    var length = this.usHeap.readPackedInt().toNumber();
                    return this.usHeap.readString(length);
                };
                return MemoryAssembly;
            })();
            MemoryAssembly_1.MemoryAssembly = MemoryAssembly;
        })(MemoryAssembly = Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=MemoryAssembly.js.map