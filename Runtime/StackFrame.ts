module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        arguments: StackFrameValue[];
        evaluationStack: StackFrameValue[];
        this: number;
        method: TypeSystem.TypeMethod;
        nextOp: number;

        free(memory: MemorySystem.Memory): void
        {
            var i: number;
            for (i = 0; i < this.arguments.length; i++)
            {
                if (this.arguments[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.arguments[i].value);
                }
            }
            for (i = 0; i < this.evaluationStack.length; i++)
            {
                if (this.evaluationStack[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.evaluationStack[i].value);
                }
            }
        }

        constructor()
        {
            this.arguments = [];
            this.evaluationStack = [];
            this.nextOp = 0;
        }
    }
} 