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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Unaligned;
    }

    OpCode.opCodes[Unaligned.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Unaligned =>
    {
        Unaligned.Instance = Unaligned.Instance || new Unaligned(memory, stack);
        return Unaligned.Instance;
    };
} 