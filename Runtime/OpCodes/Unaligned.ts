module CIL.Runtime.OpCodes
{
    "use strict";

    export class Unaligned extends OpCode
    {
        number(): number
        {
            return 65042;
        }

        argumentCount(): number[]
        {
            return [1];
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[], alignment: number)
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Unaligned.prototype.number()] = <any>Unaligned;
} 