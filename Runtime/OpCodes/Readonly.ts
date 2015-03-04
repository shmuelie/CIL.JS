module CIL.Runtime.OpCodes
{
    "use strict";

    export class Readonly extends OpCode
    {
        number(): number
        {
            return 65054;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[], type: TypeSystem.Type)
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Readonly.prototype.number()] = <any>Readonly;
} 