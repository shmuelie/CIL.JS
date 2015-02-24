module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        argPointers: StackFrameValue[];
        values: StackFrameValue[];
        this: number;
        method: TypeSystem.TypeMethod;
        nextOp: number;

        free(memory: MemorySystem.Memory): void
        {
            var i: number;
            for (i = 0; i < this.argPointers.length; i++)
            {
                if (this.argPointers[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.argPointers[i].value);
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
            this.argPointers = [];
            this.values = [];
            this.nextOp = 0;
        }
    }
} 