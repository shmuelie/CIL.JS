module CIL.Cecil.PE
{
    import Table = Metadata.Table;

    export class Image
    {
        kind: ModuleKind;
        runtimeVersion: string;
        architechture: TargetArchitecture;
        characteristics: ModuleCharacteristics;
        fileName: string;

        sections: Section[];

        metadataSection: Section;

        entryPointToken: number;
        attributes: ModuleAttributes;

        debug: DataDirectory;
        resources: DataDirectory;
        strongName: DataDirectory;

        stringHeap: Metadata.StringHeap;
        blobHeap: Metadata.BlobHeap;
        userStringHeap: Metadata.UserStringHeap;
        guidHeap: Metadata.GuidHeap;
        tableHeap: Metadata.TableHeap;

        private codedIndexSizes: number[] = Runtime.ArrayHelpers.arrayGenerator(13, null);

        private counter: (num: number) => Table;

        constructor()
        {
            this.counter = this.getTableLength;
        }

        hasTable(table: Table): boolean
        {
            return this.getTableLength(table) > 0;
        }

        getTableLength(table: Table): number
        {
            return this.tableHeap.tables[table].length;
        }

        getCodeIndexSize(codedIndex: Metadata.CodedIndex): number
        {
            var size: number = this.codedIndexSizes[codedIndex];
            if (size !== null)
            {
                return size;
            }
            size = Metadata.CodedIndex.getSize(codedIndex, this.counter);
            return size;
        }

        resolveVirtualAddress(rva: number): number
        {
            var section: Section = this.getSectionAtVirtualAddress(rva);
            if (section === null)
            {
                throw new Error("ArgumentOutOfRangeException");
            }
            return this.resolveVirtualAddressInSection(rva, section);
        }

        resolveVirtualAddressInSection(rva: number, section: Section): number
        {
            return rva + section.pointerToRawData - section.virtualAddress;
        }

        getSection(name: string): Section
        {
            var sections: Section[] = this.sections;
            for (var i: number = 0; i < sections.length; i++)
            {
                var section: Section = sections[i];
                if (section.name === name)
                {
                    return section;
                }
            }
            return null;
        }

        getSectionAtVirtualAddress(rva: number): Section
        {
            var sections: Section[] = this.sections;
            for (var i: number = 0; i < sections.length; i++)
            {
                var section: Section = sections[i];
                if (rva >= section.virtualAddress && rva < section.virtualAddress + section.sizeOfRawData)
                {
                    return section;
                }
            }
            return null;
        }
    }
} 