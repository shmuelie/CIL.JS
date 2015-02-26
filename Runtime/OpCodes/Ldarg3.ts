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

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack, 3);
        }
    }

    OpCode.opCodes[Ldarg3.prototype.number()] = <any>Ldarg3;
}  