module CIL.Runtime.OpCodes
{
    "use strict";

    export class Dup extends OpCode
    {
        number(): number
        {
            return 37;
        }

        execute(bytes: number[]): void
        {
            var values: StackFrameValue[] = this.stack[0].evaluationStack;
            values.push(values[values.length - 1]);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Dup;
    }

    OpCode.opCodes[Dup.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Dup =>
    {
        Dup.Instance = Dup.Instance || new Dup(memory, stack);
        return Dup.Instance;
    };
}