module CIL.Runtime.OpCodes
{
    "use strict";

    export class Call extends OpCode
    {
        private method: TypeSystem.TypeMethod;

        number(): number
        {
            return 40;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        execute(): void
        {
            var nextFrame: StackFrame = new StackFrame();
            while (nextFrame.arguments.length < this.method.arguments.length)
            {
                nextFrame.arguments.unshift(this.stack[0].evaluationStack.pop());
            }
            if (this.method.static)
            {
                nextFrame.this = null;
            }
            else
            {
                nextFrame.this = this.stack[0].evaluationStack.pop().pointer;
            }
            nextFrame.method = this.method;
            if (this.lastOp instanceof Tail)
            {
                var lastFrame: StackFrame = this.stack.shift();
                this.stack.unshift(nextFrame);
                lastFrame.free(this.memory, () =>
                {
                    this.stack[0].continue();
                });
                this.stack[0].wait();
            }
            this.stack.unshift(nextFrame);
        }

        parseArguments(bytes: number[]): void
        {
            throw new Error("System.NotImplented");
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Call.prototype.number()] = <any> Call;
} 