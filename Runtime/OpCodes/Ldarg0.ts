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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack, 0);
        }
    }

    OpCode.opCodes[Ldarg0.prototype.number()] = <any>Ldarg0;
} 