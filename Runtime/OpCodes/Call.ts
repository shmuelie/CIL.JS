module CIL.Runtime.OpCodes
{
    "use strict";

    export class Call extends OpCode
    {
        number(): number
        {
            return 40;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        execute(bytes: number[]): void
        {
            throw new Error("System.NotImplented"); // Need to convert bytes to method
            var method: TypeSystem.TypeMethod;
            var nextFrame: StackFrame = new StackFrame();
            while (nextFrame.arguments.length < method.arguments.length)
            {
                nextFrame.arguments.unshift(this.stack[0].evaluationStack.pop());
            }
            if (method.static)
            {
                nextFrame.this = null;
            }
            else
            {
                nextFrame.this = this.stack[0].evaluationStack.pop().pointer;
            }
            nextFrame.method = method;
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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Call;
    }

    OpCode.opCodes[Call.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Call =>
    {
        Call.Instance = Call.Instance || new Call(memory, stack);
        return Call.Instance;
    };
} 