module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldnull extends OpCode
    {
        number(): number
        {
            return 20;
        }

        execute(): void
        {
            this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.Pointer, 0));
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Ldnull.prototype.number()] = <any>Ldnull;
} 