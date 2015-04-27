module CIL.Cecil.Metadata
{
    "use strict";

    var guid_size: number = 16;

    export class GuidHeap extends Heap
    {
        constructor(section: PE.Section, start: number, size: number)
        {
            super(section, start, size);
        }

        read(index: number): number[]
        {
            if (index === 0)
            {
                return [];
            }

            index--;

            var data = this.section.data;
            data.seek(this.offset + index);
            return data.readNumberByteRange(guid_size);
        }
    }
} 