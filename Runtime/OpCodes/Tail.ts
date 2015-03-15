module CIL.Runtime.OpCodes
{
    "use strict";

    export class Tail extends OpCode
    {
        number(): number
        {
            return 65044;
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Tail;
    }

    OpCode.opCodes[Tail.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Tail =>
    {
        Tail.Instance = Tail.Instance || new Tail(memory, stack);
        return Tail.Instance;
    };
} 