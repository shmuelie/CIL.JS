module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg1 extends Ldarg
    {
        number(): number
        {
            return 3;
        }

        argumentCount(): number[]
        {
            return [];
        }

        execute(bytes: number[]): void
        {
            this.do(1);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldarg1;
    }

    OpCode.opCodes[Ldarg1.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldarg1 =>
    {
        Ldarg1.Instance = Ldarg1.Instance || new Ldarg1(memory, stack);
        return Ldarg1.Instance;
    };
}  