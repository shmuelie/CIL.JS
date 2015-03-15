module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldnull extends OpCode
    {
        number(): number
        {
            return 20;
        }

        execute(bytes: number[]): void
        {
            this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.Pointer, 0));
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldnull;
    }

    OpCode.opCodes[Ldnull.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldnull =>
    {
        Ldnull.Instance = Ldnull.Instance || new Ldnull(memory, stack);
        return Ldnull.Instance;
    };
} 