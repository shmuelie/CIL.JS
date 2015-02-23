module CIL.Runtime
{
    export class Tail extends OpCode
    {
        number(): number
        {
            return 65044;
        }

        argumentCount(): number[]
        {
            return [];
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Tail.prototype.number()] = <any>Tail;
} 