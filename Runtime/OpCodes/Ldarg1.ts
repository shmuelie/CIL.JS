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

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack, 1);
        }
    }

    OpCode.opCodes[Ldarg1.prototype.number()] = <any>Ldarg1;
}  