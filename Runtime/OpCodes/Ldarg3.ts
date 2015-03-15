module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg3 extends Ldarg
    {
        number(): number
        {
            return 5;
        }

        argumentCount(): number[]
        {
            return [];
        }

        execute(bytes: number[]): void
        {
            this.do(3);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldarg3;
    }

    OpCode.opCodes[Ldarg3.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldarg3 =>
    {
        Ldarg3.Instance = Ldarg3.Instance || new Ldarg3(memory, stack);
        return Ldarg3.Instance;
    };
}  