var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (Cecil) {
        (function (PE) {
            var ImageReader = (function (_super) {
                __extends(ImageReader, _super);
                function ImageReader(bytes, fileName) {
                    _super.call(this, bytes);

                    this.image = new PE.Image();
                    this.image.fileName = fileName;
                }
                ImageReader.prototype.moveTo = function () {
                    if (typeof arguments[0] === "number") {
                        this.seek(arguments[0]);
                    } else {
                        var directory = arguments[0];
                        this.seek(this.image.resolveVirtualAddress(directory.virtulAddress));
                    }
                };

                ImageReader.prototype.readImage = function () {
                    if (this.length() < 128) {
                        throw new Error("BadImageFormatException");
                    }

                    // - DOSHeader
                    // PE					2
                    // Start				58
                    // Lfanew				4
                    // End					64
                    if (this.readUInt16().toNumber() != 0x5a4d) {
                        throw new Error("BadImageFormatException");
                    }

                    this.skip(58);

                    this.moveTo(this.readUInt32().toNumber());

                    if (this.readUInt32().toNumber() != 0x00004550) {
                        throw new Error("BadImageFormatException");
                    }

                    // - PEFileHeader
                    // Machine				2
                    this.image.architechture = this.readArchitecture();

                    // NumberOfSections		2
                    var sections = this.readUInt16().toNumber();

                    // TimeDateStamp		4
                    // PointerToSymbolTable	4
                    // NumberOfSymbols		4
                    // OptionalHeaderSize	2
                    this.skip(14);

                    // Characteristics		2
                    var characteristics = this.readUInt16().toNumber();

                    var optionalHeaders = this.readOptionalHeaders();
                    this.readSections(sections);
                };

                ImageReader.prototype.readArchitecture = function () {
                    var machine = this.readUInt16().toNumber();
                    switch (machine) {
                        case 0x014c:
                            return 0 /* I386 */;
                        case 0x8664:
                            return 1 /* AMD64 */;
                        case 0x0200:
                            return 2 /* IA64 */;
                        case 0x01c4:
                            return 3 /* ARMv7 */;
                    }

                    throw new Error("NotSupportedException");
                };

                ImageReader.prototype.readOptionalHeaders = function () {
                    var subsystem;
                    var dll_characteristics;

                    // - PEOptionalHeader
                    //   - StandardFieldsHeader
                    // Magic				2
                    var pe64 = this.readUInt16().toNumber() === 0x20b;

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
                    this.skip(66);

                    // SubSystem			2
                    subsystem = this.readUInt16().toNumber();

                    // DLLFlags				2
                    dll_characteristics = this.readUInt16().toNumber();

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
                    this.skip(pe64 ? 88 : 72);

                    // Debug				8
                    this.image.debug = this.readDataDirectory();

                    // Copyright			8
                    // GlobalPtr			8
                    // TLSTable				8
                    // LoadConfigTable		8
                    // BoundImport			8
                    // IAT					8
                    // DelayImportDescriptor8
                    this.skip(56);

                    // CLIHeader			8
                    this.cli = this.readDataDirectory();

                    if (this.cli.isZero()) {
                        throw new Error("BadImageFormatException");
                    }

                    // Reserved				8
                    this.skip(8);

                    return { subsystem: subsystem, dll_characteristics: dll_characteristics };
                };

                ImageReader.prototype.readDataDirectory = function () {
                    return new PE.DataDirectory(this.readUInt32().toNumber(), this.readUInt32().toNumber());
                };

                ImageReader.prototype.readSections = function (count) {
                    var sections = new Array(count);

                    for (var i = 0; i < count; i++) {
                        // Name
                        var name = this.readSimpleString(8);

                        // VirtualSize		4
                        this.skip(4);

                        // VirtualAddress	4
                        var virtualAddress = this.readUInt32().toNumber();

                        // SizeOfRawData	4
                        var sizeOfRawData = this.readUInt32().toNumber();

                        // PointerToRawData	4
                        var pointerToRawData = this.readUInt32().toNumber();

                        // PointerToRelocations		4
                        // PointerToLineNumbers		4
                        // NumberOfRelocations		2
                        // NumberOfLineNumbers		2
                        // Characteristics			4
                        this.skip(16);

                        var section = {
                            name: name,
                            virtualAddress: virtualAddress,
                            sizeOfRawData: sizeOfRawData,
                            pointerToRawData: pointerToRawData,
                            data: this.slice(section.pointerToRawData, section.sizeOfRawData),
                            virtualSize: 0
                        };

                        sections[i] = section;
                    }

                    this.image.sections = sections;
                };

                ImageReader.prototype.readCliHeader = function () {
                };
                return ImageReader;
            })(CIL.Runtime.Reader);
            PE.ImageReader = ImageReader;
        })(Cecil.PE || (Cecil.PE = {}));
        var PE = Cecil.PE;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=ImageReader.js.map
