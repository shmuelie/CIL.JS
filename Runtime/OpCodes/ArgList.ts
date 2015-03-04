module CIL.Runtime.OpCodes
{
    "use strict";

    export class ArgList extends OpCode
    {
        number(): number
        {
            return 65024;
        }

        execute(): void
        {
            throw new Error("NotImplemented");
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[ArgList.prototype.number()] = <any> ArgList;
} 