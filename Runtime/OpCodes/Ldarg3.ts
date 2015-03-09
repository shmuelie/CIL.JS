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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
            this.setArg(3);
        }
    }

    OpCode.opCodes[Ldarg3.prototype.number()] = <any>Ldarg3;
}  