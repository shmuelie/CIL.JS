module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg0 extends Ldarg
    {
        number(): number
        {
            return 2;
        }

        argumentCount(): number[]
        {
            return [];
        }

        execute(bytes: number[]): void
        {
            this.do(0);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldarg0;
    }

    OpCode.opCodes[Ldarg0.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldarg0 =>
    {
        Ldarg0.Instance = Ldarg0.Instance || new Ldarg0(memory, stack);
        return Ldarg0.Instance;
    };
} 