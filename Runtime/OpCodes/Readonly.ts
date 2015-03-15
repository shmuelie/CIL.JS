module CIL.Runtime.OpCodes
{
    "use strict";

    export class Readonly extends OpCode
    {
        number(): number
        {
            return 65054;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Readonly;
    }

    OpCode.opCodes[Readonly.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Readonly =>
    {
        Readonly.Instance = Readonly.Instance || new Readonly(memory, stack);
        return Readonly.Instance;
    };
} 