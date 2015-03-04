module CIL.Runtime.OpCodes
{
    "use strict";

    export class No extends OpCode
    {
        private code: number;

        number(): number
        {
            return 65049;
        }

        argumentCount(): number[]
        {
            return [1];
        }

        execute()
        {
            if (this.code % 2 !== 0)
            {
                this.code -= 1;
                // 0x01
                /*
                    The CLI can optionally skip
                    any type checks normally performed as part of the execution of the subsequent instruction.
                    InvalidCastException can optionally still be thrown if the check would fail.
                 */
            }
            if (this.code >= 4)
            {
                this.code -= 4;
                // 0x04
                /*
                    The CLI can
                    optionally skip any null-reference checks normally performed as part of the execution of the
                    subsequent instruction. NullReferenceException can optionally still be thrown if the check
                    would fail.
                 */
            }
            if (this.code === 2)
            {
                // 0x02
                /*
                    The CLI can optionally skip any array range
                    checks normally performed as part of the execution of the subsequent instruction.
                    IndexOutOfRangeException can optionally still be thrown if the check would fail.
                 */
            }
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[], code: number)
        {
            super(memory, stack);
            this.code = code;
        }
    }
    OpCode.opCodes[No.prototype.number()] = <any>No;
} 