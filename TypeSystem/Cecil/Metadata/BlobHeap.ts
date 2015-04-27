module CIL.Cecil.Metadata
{
    "use strict";

    export class BlobHeap extends Heap
    {
        constructor(section: PE.Section, start: number, size: number)
        {
            super(section, start, size);
        }

        read(index: number): Runtime.Reader
        {
            if (index === 0 || index > this.size - 1)
            {
                return new Runtime.Reader([]);
            }

            var reader: Runtime.Reader = this.section.data;
            reader.seek(index + this.offset);
            var length = reader.readPackedInt().toNumber();
            return reader.slice(reader.position(), length);
        }
    }
} 