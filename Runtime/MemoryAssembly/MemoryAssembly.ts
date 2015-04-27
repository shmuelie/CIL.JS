module CIL.Runtime.MemoryAssembly
{
	"use strict";

	function BadImage()
	{
		Error.call(this, "Bad Image");
	}
	BadImage.prototype = Error.prototype;

	function readDataDirectory(reader: Reader): Section
	{
		var section = new Section();
		section.rva = reader.readUInt32().toNumber();
		section.size = reader.readUInt32().toNumber();
		return section;
	}

	export class MemoryAssembly
	{
		private sections: Section[];
		private stringHeap: Reader;
		private usHeap: Reader;
		module: Module;
		architecture: TargetArchitecture;
		runtimeVersion: string;
		tables: MetaTable[];

		constructor(reader: Reader)
		{
			if (reader.length() < 128)
			{
				throw new BadImage();
			}

			// DOSHeader: { PE: 2, Start: 58, Lfanew: 4, End: 64 }
			if (reader.readUInt16().toNumber() !== 0x5a4d)
			{
				throw new BadImage();
			}

			reader.skip(58);
			reader.seek(reader.readUInt32().toNumber());

			// PE NT signature
			if (reader.readUInt32().toNumber() !== 0x00004550)
			{
				throw new BadImage();
			}

			this.module = new Module();

			// PEFileHeader

			this.architecture = <TargetArchitecture>reader.readUInt16().toNumber();

			var numberOfSections: number = reader.readUInt16().toNumber();
			this.sections = new Array(numberOfSections);

			// TimeDateStamp		4
			// PointerToSymbolTable	4
			// NumberOfSymbols		4
			// OptionalHeaderSize	2
			reader.skip(14);

			// Characteristics		2
			if ((reader.readUInt16().toNumber() & 0x2000) !== 0) // ImageCharacteristics.Dll
			{
				this.module.kind = ModuleKind.Console;
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

			var subsystem: number = reader.readUInt16().toNumber();
			if (subsystem === 0x2 || subsystem === 0x9) // SubSystem.WindowsGui || SubSystem.WindowsCeGui
			{
				this.module.kind = ModuleKind.Windows;
			}
			else if (this.module.kind === undefined)
			{
				this.module.kind = ModuleKind.Console;
			}

			// DLLFlags				2
			this.module.characteristics = <ModuleCharacteristics>reader.readUInt16().toNumber();

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
			var cliHeader: Section = readDataDirectory(reader);

			if (cliHeader.rva === 0 && cliHeader.size === 0)
			{
				throw new BadImage();
			}

			// Reserved				8
			reader.skip(8);

			var i: number;
			for (i = 0; i < numberOfSections; i++)
			{
				var section: Section = new Section();
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

			var metaData: Section = readDataDirectory(reader);
			this.module.attributes = <ModuleAttributes>reader.readUInt16().toNumber();
			// EntryPointToken			4
			this.module.entryPointToken = reader.readUInt32().toNumber();
			this.module.resources = readDataDirectory(reader);
			this.module.strongName = readDataDirectory(reader);

			// CodeManagerTable			8
			// VTableFixups				8
			// ExportAddressTableJumps	8
			// ManagedNativeHeader		8

			reader.seek(this.resolveRva(metaData.rva));

			var metaDataBaseOffset: number = reader.position();

			// Metadata Header
			// Signature
			if (reader.readUInt32().toNumber() !== 0x424A5342)
			{
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

			var numberOfHeaps: number = reader.readUInt16().toNumber();
			var heapHeaders: HeapHeader[] = [];

			for (i = 0; i < numberOfHeaps; i++)
			{
				heapHeaders.push({
					offset: metaDataBaseOffset + reader.readUInt32().toNumber(),
					size: reader.readUInt32().toNumber(),
					// Name of the stream as null-terminated variable length array
					// of ASCII characters, padded to the next 4-byte boundary
					// with \0 characters. The name is limited to 32 characters.
					name: reader.readSimpleStringAligned(32)
				});
			}
			for (i = 0; i < numberOfHeaps; i++)
			{
				var header: HeapHeader = heapHeaders[i];
				switch (header.name)
				{
					case "#Strings":
						this.stringHeap = reader.slice(header.offset, header.size);
						break;
					case "#US":
						this.usHeap = reader.slice(header.offset, header.size);
						break;
				}
			}
		}

		private resolveRva(rva: number): number
		{
			for (var i: number = 0; i < this.sections.length; i++)
			{
				var section: Section = this.sections[i];
				if (rva >= section.rva && rva < section.rva + section.size)
				{
					return section.offset + rva - section.rva;
				}
			}

			throw new RangeError("bad rva");
		}

		fetchString(offset: number): string
		{
			if (offset >= this.stringHeap.length())
			{
				throw new RangeError("Invalid #Strings heap index");
			}
			this.stringHeap.seek(offset);
			return this.stringHeap.readString();
		}

		fetchUserString(offset: number): string
		{
			if (offset === 0)
			{
				throw new RangeError("Invalid #US heap offset.");
			}

			this.usHeap.seek(offset);

			var length = this.usHeap.readPackedInt().toNumber();
			return this.usHeap.readString(length);
		}
	}
} 