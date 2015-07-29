module CIL.Cecil.PE
{
	"use strict";

	function setIndexSize(heap: Metadata.Heap, sizes: number, flag: number): void
	{
		if (heap === null)
		{
			return;
		}
		heap.indexSize = (sizes & flag) > 0 ? 4 : 2;
	}

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

			if (this.readUInt16().toNumber() !== 0x5a4d)
			{
				throw new Error("BadImageFormatException");
			}

			this.skip(58);

			this.moveTo(this.readUInt32().toNumber());

			if (this.readUInt32().toNumber() !== 0x00004550)
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
			this.readCliHeader();
			this.readMetadata();

			this.image.kind = this.getModuleKind(characteristics, optionalHeaders.subsystem);
			this.image.characteristics = <ModuleCharacteristics>optionalHeaders.dll_characteristics;
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
			this.moveTo(this.cli);

			// - CLIHeader

			// Cb						4
			// MajorRuntimeVersion		2
			// MinorRuntimeVersion		2
			this.skip(8);

			// Metadata					8
			this.metadata = this.readDataDirectory();
			// Flags					4
			this.image.attributes = <ModuleAttributes>this.readUInt16().toNumber();
			// EntryPointToken			4
			this.image.entryPointToken = this.readUInt32().toNumber();
			// Resources				8
			this.image.resources = this.readDataDirectory();
			// StrongNameSignature		8
			this.image.strongName = this.readDataDirectory();
			// CodeManagerTable			8
			// VTableFixups				8
			// ExportAddressTableJumps	8
			// ManagedNativeHeader		8
		}

		private readMetadata(): void
		{
			this.moveTo(this.metadata);

			if (this.readUInt32().toNumber() !== 0x424a5342)
			{
				throw new Error("BadImageFormatException");
			}

			// MajorVersion			2
			// MinorVersion			2
			// Reserved				4
			this.skip(8);

			this.image.runtimeVersion = this.readSimpleString(this.readInt32().toNumber());

			// Flags		2
			this.skip(2);

			var streams: number = this.readUInt16().toNumber();

			var section: Section = this.image.getSectionAtVirtualAddress(this.metadata.virtulAddress);
			if (section === null)
			{
				throw new Error("BadImageFormatException");
			}

			this.image.metadataSection = section;

			for (var i: number = 0; i < streams; i++)
			{
				this.readMetadataStream(section);
			}

			if (this.image.tableHeap !== null)
			{
				this.readTableHeap();
			}
		}

		private readMetadataStream(section: Section): void
		{
			// Offset		4
			var start: number = this.metadata.virtulAddress - section.virtualAddress + this.readUInt32().toNumber();  // relative to the section start

			// Size			4
			var size: number = this.readUInt32().toNumber();

			var name: string = this.readSimpleStringAligned(16);
			switch (name)
			{
				case "~":
				case "-":
					this.image.tableHeap = new Metadata.TableHeap(section, start, size);
					break;
				case "#Strings":
					this.image.stringHeap = new Metadata.StringHeap(section, start, size);
					break;
				case "#Blob":
					this.image.blobHeap = new Metadata.BlobHeap(section, start, size);
					break;
				case "#GUID":
					this.image.guidHeap = new Metadata.GuidHeap(section, start, size);
					break;
				case "#US":
					this.image.userStringHeap = new Metadata.UserStringHeap(section, start, size);
					break;
			}
		}

		private readTableHeap(): void
		{
			var heap: Metadata.TableHeap = this.image.tableHeap;

			var start: number = heap.section.pointerToRawData;

			this.moveTo(heap.offset + start);

			// Reserved			4
			// MajorVersion		1
			// MinorVersion		1
			this.skip(6);

			// HeapSizes		1
			var sizes = this.readNumberByte();

			// Reserved2		1
			this.skip(1);

			// Valid			8
			heap.valid = this.readInt64();

			// Sorted			8
			heap.sorted = this.readInt64();

			for (var i: number = 0; i < Metadata.TableHeap.tableCount; i++)
			{
				if (!heap.hasTable(<Metadata.Table>i))
				{
					continue;
				}
				heap.tables[i].length = this.readUInt32().toNumber();
			}

			setIndexSize(this.image.stringHeap, sizes, 0x1);
			setIndexSize(this.image.guidHeap, sizes, 0x2);
			setIndexSize(this.image.blobHeap, sizes, 0x4);

			this.computeTableInformations();
		}

		private getTableIndexSize(table: Metadata.Table): number
		{
			return this.image.getTableIndexSize(table);
		}

		private getCodedIndexSize(index: Metadata.CodedIndex): number
		{
			return this.image.getCodeIndexSize(index);
		}

		private computeTableInformations(): void
		{
			var offset: number = this.position() - this.image.metadataSection.pointerToRawData; // header;

			var stridx_size: number = this.image.stringHeap.indexSize;
			var blobidx_size: number = this.image.blobHeap !== undefined ? this.image.blobHeap.indexSize : 2;

			var heap = this.image.tableHeap;
			var tables = heap.tables;

			for (var i: number = 0; i < Metadata.TableHeap.tableCount; i++)
			{
				var table: Metadata.Table = <Metadata.Table>i;
				if (!heap.hasTable(table))
				{
					continue;
				}

				var size: number;
				switch (table)
				{
					case Metadata.Table.Module:
						size = 2 + stridx_size + (this.image.guidHeap.indexSize * 3);
						break;
					case Metadata.Table.TypeRef:
						size = this.getCodedIndexSize(Metadata.CodedIndex.ResolutionScope) + (stridx_size * 2);
						break;
					case Metadata.Table.TypeDef:
						size = 4 + (stridx_size * 2) + this.getCodedIndexSize(Metadata.CodedIndex.TypeDefOrRef) + this.getTableIndexSize(Metadata.Table.Field) + this.getTableIndexSize(Metadata.Table.Method);
						break;
					case Metadata.Table.FieldPtr:
						size = this.getTableIndexSize(Metadata.Table.Field);
						break;
					case Metadata.Table.Field:
						size = 2 + stridx_size + blobidx_size;
						break;
					case Metadata.Table.MethodPtr:
						size = this.getTableIndexSize(Metadata.Table.Method);
						break;
					case Metadata.Table.Method:
						size = 8 + stridx_size + blobidx_size + this.getTableIndexSize(Metadata.Table.Param);
						break;
					case Metadata.Table.ParamPtr:
						size = this.getTableIndexSize(Metadata.Table.Param);
						break;
					case Metadata.Table.Param:
						size = 4 + stridx_size;
						break;
					case Metadata.Table.InterfaceImpl:
						size = this.getTableIndexSize(Metadata.Table.TypeDef) + this.getCodedIndexSize(Metadata.CodedIndex.TypeDefOrRef);
						break;
					case Metadata.Table.MemberRef:
						size = this.getCodedIndexSize(Metadata.CodedIndex.MemberRefParent) + stridx_size + blobidx_size;
						break;
					case Metadata.Table.Constant:
						size = 2 + this.getCodedIndexSize(Metadata.CodedIndex.HasConstant) + blobidx_size;
						break;
					case Metadata.Table.CustomAttribute:
						size = this.getCodedIndexSize(Metadata.CodedIndex.HasCustomAttribute) + this.getCodedIndexSize(Metadata.CodedIndex.HasCustomAttribute) + blobidx_size;
						break;
					case Metadata.Table.FieldMarshal:
						size = this.getCodedIndexSize(Metadata.CodedIndex.HasFieldMarshal) + blobidx_size;
						break;
					case Metadata.Table.DeclSecurity:
						size = 2 + this.getCodedIndexSize(Metadata.CodedIndex.HasDeclSecurity) + blobidx_size;
						break;
					case Metadata.Table.ClassLayout:
						size = 6 + this.getTableIndexSize(Metadata.Table.TypeDef);
						break;
					case Metadata.Table.FieldLayout:
						size = 4 + this.getTableIndexSize(Metadata.Table.Field);
						break;
					case Metadata.Table.StandAloneSig:
						size = blobidx_size;
						break;
					case Metadata.Table.EventMap:
						size = this.getTableIndexSize(Metadata.Table.TypeDef) + this.getTableIndexSize(Metadata.Table.Event);
						break;
					case Metadata.Table.EventPtr:
						size = this.getTableIndexSize(Metadata.Table.Event);
						break;
					case Metadata.Table.Event:
						size = 2 + stridx_size + this.getCodedIndexSize(Metadata.CodedIndex.TypeDefOrRef);
						break;
					case Metadata.Table.PropertyMap:
						size = this.getTableIndexSize(Metadata.Table.TypeDef) + this.getTableIndexSize(Metadata.Table.Property);
						break;
					case Metadata.Table.PropertyPtr:
						size = this.getTableIndexSize(Metadata.Table.Property);
						break;
					case Metadata.Table.Property:
						size = 2 + stridx_size + blobidx_size;
						break;
					case Metadata.Table.MethodSemantics:
						size = 2 + this.getTableIndexSize(Metadata.Table.Method) + this.getCodedIndexSize(Metadata.CodedIndex.HasSemantics);
						break;
					case Metadata.Table.MethodImpl:
						size = this.getTableIndexSize(Metadata.Table.TypeDef) + this.getCodedIndexSize(Metadata.CodedIndex.MethodDefOrRef) + this.getCodedIndexSize(Metadata.CodedIndex.MethodDefOrRef);
						break;
					case Metadata.Table.ModuleRef:
						size = stridx_size;
						break;
					case Metadata.Table.TypeSpec:
						size = blobidx_size;
						break;
					case Metadata.Table.ImplMap:
						size = 2 + this.getCodedIndexSize(Metadata.CodedIndex.MemberForwarded) + stridx_size + this.getTableIndexSize(Metadata.Table.ModuleRef);
						break;
					case Metadata.Table.FieldRVA:
						size = 4 + this.getTableIndexSize(Metadata.Table.Field);
						break;
					case Metadata.Table.EncLog:
						size = 8;
						break;
					case Metadata.Table.EncMap:
						size = 4;
						break;
					case Metadata.Table.Assembly:
						size = 16 + blobidx_size + (stridx_size * 2);
						break;
					case Metadata.Table.AssemblyProcessor:
						size = 4;
						break;
					case Metadata.Table.AssemblyOS:
						size = 12;
						break;
					case Metadata.Table.AssemblyRef:
						size = 12 + (blobidx_size * 2) + (stridx_size * 2);
						break;
					case Metadata.Table.AssemblyRefProcessor:
						size = 4 + this.getTableIndexSize(Metadata.Table.AssemblyRef);
						break;
					case Metadata.Table.AssemblyRefOS:
						size = 12 + this.getTableIndexSize(Metadata.Table.AssemblyRef);
						break;
					case Metadata.Table.File:
						size = 4 + stridx_size + blobidx_size;
						break;
					case Metadata.Table.ExportedType:
						size = 8 + (stridx_size * 2) + this.getCodedIndexSize(Metadata.CodedIndex.Implementation);
						break;
					case Metadata.Table.ManifestResource:
						size = 8 + stridx_size + this.getCodedIndexSize(Metadata.CodedIndex.Implementation);
						break;
					case Metadata.Table.NestedClass:
						size = this.getTableIndexSize(Metadata.Table.TypeDef) + this.getTableIndexSize(Metadata.Table.TypeDef);
						break;
					case Metadata.Table.GenericParam:
						size = 4 + this.getCodedIndexSize(Metadata.CodedIndex.TypeOrMethodDef) + blobidx_size;
						break;
					case Metadata.Table.MethodSpec:
						size = this.getCodedIndexSize(Metadata.CodedIndex.MethodDefOrRef) + blobidx_size;
						break;
					case Metadata.Table.GenericParamConstraint:
						size = this.getTableIndexSize(Metadata.Table.GenericParam) + this.getCodedIndexSize(Metadata.CodedIndex.TypeDefOrRef);
						break;
					default:
						throw new Error("NotSupportException");
				}

				tables[i].rowSize = size;
				tables[i].offset = offset;

				offset += size * tables[i].length;
			}
		}

		private getModuleKind(characteristics: number, subsystem: number): ModuleKind
		{
			if ((characteristics & 0x2000) !== 0)
			{
				return ModuleKind.Dll;
			}
			if (subsystem === 0x2 || subsystem === 0x9)
			{
				return ModuleKind.Windows;
			}
			return ModuleKind.Console;
		}

		static readImageFrom(bytes: number[], fileName: string): Image
		{
			var reader: ImageReader = new ImageReader(bytes, fileName);
			reader.readImage();
			return reader.image;
		}
	}
}