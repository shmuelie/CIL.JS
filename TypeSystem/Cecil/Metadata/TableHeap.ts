module CIL.Cecil.Metadata
{
    "use strict";

    export class TableHeap extends Heap
    {
        valid: Runtime.Integer;
        sorted: Runtime.Integer;
        static tableCount: number = 45;

        tables: TableInformation[];

        constructor(section: PE.Section, start: number, size: number)
        {
            super(section, start, size);
            this.tables = new Array(TableHeap.tableCount);
        }

        hasTable(table: Table): boolean
        {
            return this.valid.bits[table];
        }
    }
} 