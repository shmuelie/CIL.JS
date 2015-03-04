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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack, 2);
        }
    }

    OpCode.opCodes[Ldarg2.prototype.number()] = <any>Ldarg2;
}  