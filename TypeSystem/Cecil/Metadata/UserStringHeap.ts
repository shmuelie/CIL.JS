module CIL.Cecil.Metadata
{
    "use strict";

    export class UserStringHeap extends StringHeap
    {
        constructor(section: PE.Section, start: number, size: number)
        {
            super(section, start, size);
        }

        readStringAt(index: number): string
        {
            var data: Runtime.Reader = this.section.data;
            data.seek(index + this.offset);

            var length: number = data.readPackedInt().toNumber() & ~1;
            if (length < 1)
            {
                return "";
            }

            var chars: string[] = [];
            for (var i: number = 0; i < length; i++)
            {
                var b0: number = data.readNumberByte();
                var b1: number = data.readNumberByte();
                chars.push(String.fromCharCode(b0 | b1 << 8));
            }
            chars.join("");
        }
    }
} 