module CIL.Runtime.OpCodes
{
    "use strict";

    export class ArgList extends OpCode
    {
        number(): number
        {
            return 65024;
        }

        execute(bytes: number[]): void
        {
            throw new Error("NotImplemented");
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: ArgList;
    }

    OpCode.opCodes[ArgList.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): ArgList =>
    {
        ArgList.Instance = ArgList.Instance || new ArgList(memory, stack);
        return ArgList.Instance;
    };
} 