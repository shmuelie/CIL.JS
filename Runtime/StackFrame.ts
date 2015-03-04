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
        private waitCount: number;

        wait(): void
        {
            this.waitCount++;
        }

        continue(): void
        {
            this.waitCount--;
        }

        free(memory: MemorySystem.IMemoryManger, callback: () => void): void
        {
            var i: number = -1;
            var firstLoopEnd: () => void = () =>
            {
                i++;
                if (i < this.arguments.length)
                {
                    firstLoop();
                }
                else
                {
                    i = -1;
                    secondLoopEnd();
                }
            };
            var firstLoop: () => void = () =>
            {
                if (this.arguments[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.arguments[i].pointer, firstLoopEnd);
                }
                else
                {
                    firstLoopEnd();
                }
            };
            var secondLoopEnd: () => void = () =>
            {
                i++;
                if (i < this.evaluationStack.length)
                {
                    secondLoop();
                }
                else
                {
                    callback();
                }
            };
            var secondLoop: () => void = () =>
            {
                if (this.evaluationStack[i].type === StackFrameValueType.Pointer)
                {
                    memory.dereferenceObject(this.evaluationStack[i].pointer, secondLoopEnd);
                }
                else
                {
                    secondLoopEnd();
                }
            };
            firstLoopEnd();
        }

        constructor()
        {
            this.arguments = [];
            this.evaluationStack = [];
            this.nextOp = 0;
        }
    }
} 