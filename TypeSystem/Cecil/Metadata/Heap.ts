module CIL.Cecil.Metadata
{
    "use strict";

    export class Heap
    {
        /* int */
        indexSize: number;
        section: PE.Section;
        /* uin */
        offset: number;
        /* uint */
        size: number;

        constructor(section: PE.Section, offset: number, size: number)
        {
            this.indexSize = 0;
            this.section = section;
            this.offset = offset;
            this.size = size;
        }
    }
} 