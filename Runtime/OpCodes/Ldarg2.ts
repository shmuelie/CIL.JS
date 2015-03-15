module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg2 extends Ldarg
    {
        number(): number
        {
            return 4;
        }

        argumentCount(): number[]
        {
            return [];
        }

        execute(bytes: number[]): void
        {
            this.do(2);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldarg2;
    }

    OpCode.opCodes[Ldarg2.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldarg2 =>
    {
        Ldarg2.Instance = Ldarg2.Instance || new Ldarg2(memory, stack);
        return Ldarg2.Instance;
    };
}  