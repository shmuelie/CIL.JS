module CIL.Runtime.OpCodes
{
    "use strict";

    export class LdargS extends Ldarg
    {
        number(): number
        {
            return 14;
        }

        argumentCount(): number[]
        {
            return [1];
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: LdargS;
    }

    OpCode.opCodes[LdargS.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): LdargS =>
    {
        LdargS.Instance = LdargS.Instance || new LdargS(memory, stack);
        return LdargS.Instance;
    };
} 