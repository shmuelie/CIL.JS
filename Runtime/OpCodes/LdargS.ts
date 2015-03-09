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
    }

    OpCode.opCodes[LdargS.prototype.number()] = <any>LdargS;
} 