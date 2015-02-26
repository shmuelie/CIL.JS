module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        arguments: StackFrameValue[];
        values: StackFrameValue[];
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
            for (i = 0; i < this.values.length; i++)
            {
                if (this.values[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.values[i].value);
                }
            }
        }

        constructor()
        {
            this.arguments = [];
            this.values = [];
            this.nextOp = 0;
        }
    }
} 