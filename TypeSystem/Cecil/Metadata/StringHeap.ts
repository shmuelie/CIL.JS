module CIL.Cecil.Metadata
{
    "use strict";

    interface IStringHeapDictionary
    {
        [index: number]: string;
    }

    export class StringHeap extends Heap
    {
        private strings: IStringHeapDictionary;

        constructor(section: PE.Section, start: number, size: number)
        {
            super(section, start, size);
            this.strings = {};
        }

        read(index: number): string
        {
            if (index === 0)
            {
                return "";
            }

            var str: string = this.strings[index];
            if (str !== undefined)
            {
                return str;
            }

            if (index > this.size - 1)
            {
                return "";
            }

            str = this.readStringAt(index);
            if (str.length !== 0)
            {
                this.strings[index] = str;
            }
            return str;
        }

        readStringAt(index: number): string
        {
            var data: Runtime.Reader = this.section.data;
            data.seek(index + this.offset);
            return data.readString();
        }
    }
} 