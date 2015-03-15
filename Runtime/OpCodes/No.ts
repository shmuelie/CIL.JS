module CIL.Runtime.OpCodes
{
    "use strict";

    export class No extends OpCode
    {
        number(): number
        {
            return 65049;
        }

        argumentCount(): number[]
        {
            return [1];
        }

        execute(bytes: number[]): void
        {
            var code: number = bytes[0];
            if (code % 2 !== 0)
            {
                code -= 1;
                // 0x01
                /*
                    The CLI can optionally skip
                    any type checks normally performed as part of the execution of the subsequent instruction.
                    InvalidCastException can optionally still be thrown if the check would fail.
                 */
            }
            if (code >= 4)
            {
                code -= 4;
                // 0x04
                /*
                    The CLI can
                    optionally skip any null-reference checks normally performed as part of the execution of the
                    subsequent instruction. NullReferenceException can optionally still be thrown if the check
                    would fail.
                 */
            }
            if (code === 2)
            {
                // 0x02
                /*
                    The CLI can optionally skip any array range
                    checks normally performed as part of the execution of the subsequent instruction.
                    IndexOutOfRangeException can optionally still be thrown if the check would fail.
                 */
            }
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: No;
    }
    OpCode.opCodes[No.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): No =>
    {
        No.Instance = No.Instance || new No(memory, stack);
        return No.Instance;
    };
} 