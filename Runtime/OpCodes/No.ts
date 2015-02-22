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

        execute(...args: number[])
        {
            if (args[0] % 2 !== 0)
            {
                args[0] -= 1;
                // 0x01
                /*
                    The CLI can optionally skip
                    any type checks normally performed as part of the execution of the subsequent instruction.
                    InvalidCastException can optionally still be thrown if the check would fail.
                 */
            }
            if (args[0] >= 4)
            {
                args[0] -= 4;
                // 0x04
                /*
                    The CLI can
                    optionally skip any null-reference checks normally performed as part of the execution of the
                    subsequent instruction. NullReferenceException can optionally still be thrown if the check
                    would fail.
                 */
            }
            if (args[0] === 2)
            {
                // 0x02
                /*
                    The CLI can optionally skip any array range
                    checks normally performed as part of the execution of the subsequent instruction.
                    IndexOutOfRangeException can optionally still be thrown if the check would fail.
                 */
            }
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }
    OpCode.opCodes[No.prototype.number()] = <any>No;
} 