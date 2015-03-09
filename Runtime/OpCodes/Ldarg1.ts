﻿module CIL.Runtime.OpCodes
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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
            this.setArg(1);
        }
    }

    OpCode.opCodes[Ldarg1.prototype.number()] = <any>Ldarg1;
}  