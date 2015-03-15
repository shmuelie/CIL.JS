module CIL.Runtime.OpCodes
{
    "use strict";

    export class Volitile extends OpCode
    {
        number(): number
        {
            return 65043;
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Volitile;
    }

    OpCode.opCodes[Volitile.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Volitile =>
    {
        Volitile.Instance = Volitile.Instance || new Volitile(memory, stack);
        return Volitile.Instance;
    };
} 