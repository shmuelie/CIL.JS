module CIL.Cecil.PE
{
    import Table = Metadata.Table;

    export class Image
    {
        kind: ModuleKind;
        runtimeVersion: string;
        architechture: TargetArchitechture;
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
            size = Metadata.CodedIndex.
        }
    }
} 