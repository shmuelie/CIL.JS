module CIL.Cecil.PE
{
	export class ImageReader extends Runtime.Reader
	{
		private image: Image;
		private cli: DataDirectory;
		private metadata: DataDirectory;

		constructor(bytes: number[], fileName: string)
		{
			super(bytes);

			this.image = new Image();
			this.image.fileName = fileName;
		}

		private moveTo(directory: DataDirectory): void
		private moveTo(position: number): void
		private moveTo(): void
		{
			if (typeof arguments[0] === "number")
			{
				this.seek(<number>arguments[0]);
			}
			else
			{
				var directory: DataDirectory = <DataDirectory>arguments[0];
				this.seek(this.image.resolveVirtualAddress(directory.virtulAddress));
			}
		}

		private readImage(): void
		{
			if (this.length() < 128)
			{
				throw new Error("BadImageFormatException");
			}

			// - DOSHeader

			// PE					2
			// Start				58
			// Lfanew				4
			// End					64

			if (this.readUInt16().toNumber() != 0x5a4d)
			{
				throw new Error("BadImageFormatException");
			}

			this.skip(58);

			this.moveTo(this.readUInt32().toNumber());

			if (this.readUInt32().toNumber() != 0x00004550)
			{
				throw new Error("BadImageFormatException");
			}

			// - PEFileHeader

			// Machine				2
			this.image.architechture = this.readArchitecture();

			// NumberOfSections		2
			var sections: number = this.readUInt16().toNumber();

			// TimeDateStamp		4
			// PointerToSymbolTable	4
			// NumberOfSymbols		4
			// OptionalHeaderSize	2
			this.skip(14);

			// Characteristics		2
			var characteristics: number = this.readUInt16().toNumber();

			var optionalHeaders = this.readOptionalHeaders();
			this.readSections(sections);

		}

		private readArchitecture(): TargetArchitecture
		{
			var machine: number = this.readUInt16().toNumber();
			switch (machine)
			{
				case 0x014c:
					return TargetArchitecture.I386;
				case 0x8664:
					return TargetArchitecture.AMD64;
				case 0x0200:
					return TargetArchitecture.IA64;
				case 0x01c4:
					return TargetArchitecture.ARMv7;
			}

			throw new Error("NotSupportedException");
		}

		private readOptionalHeaders(): { subsystem: number; dll_characteristics: number }
		{
			var subsystem: number;
			var dll_characteristics: number;

			// - PEOptionalHeader
			//   - StandardFieldsHeader

			// Magic				2
			var pe64: boolean = this.readUInt16().toNumber() === 0x20b;

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

			if (this.cli.isZero())
			{
				throw new Error("BadImageFormatException");
			}

			// Reserved				8
			this.skip(8);

			return { subsystem: subsystem, dll_characteristics: dll_characteristics };
		}

		private readDataDirectory(): DataDirectory
		{
			return new DataDirectory(this.readUInt32().toNumber(), this.readUInt32().toNumber());
		}

		private readSections(count: number): void
		{
			var sections: Section[] = new Array(count);

			for (var i: number = 0; i < count; i++)
			{
				// Name
				var name: string = this.readSimpleString(8);
				// VirtualSize		4
				this.skip(4);

				// VirtualAddress	4
				var virtualAddress: number = this.readUInt32().toNumber();
				// SizeOfRawData	4
				var sizeOfRawData: number = this.readUInt32().toNumber();
				// PointerToRawData	4
				var pointerToRawData: number = this.readUInt32().toNumber();

				// PointerToRelocations		4
				// PointerToLineNumbers		4
				// NumberOfRelocations		2
				// NumberOfLineNumbers		2
				// Characteristics			4
				this.skip(16);

				var section: Section = {
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
		}

		private readCliHeader(): void
		{

		}
	}
}