module CIL.Runtime.OpCodes
{
    "use strict";

    export class AddOvf extends OpCode
    {
        number(): number
        {
            return 214;
        }

        execute(): void
        {
            var value2: StackFrameValue = this.stack[0].evaluationStack.pop();
            var value1: StackFrameValue = this.stack[0].evaluationStack.pop();

            if (value1.type === StackFrameValueType.SignedInt && value2.type === StackFrameValueType.SignedInt)
            {
                try
                {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, value1.signedInt.intAdd(value2.signedInt, true)));
                }
                catch (ex)
                {
                    if (ex.message === "OVERFLOW")
                    {
                        // TODO: Throw System.OverflowException
                        throw ex;
                    }
                }
            }
            else if (value1.type === StackFrameValueType.UnsignedInt && value2.type === StackFrameValueType.UnsignedInt)
            {
                try
                {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.UnsignedInt, value1.unsignedInt.intAdd(value2.unsignedInt, true)));
                }
                catch (ex)
                {
                    if (ex.message === "OVERFLOW")
                    {
                        // TODO: Throw System.OverflowException
                        throw ex;
                    }
                }
            }
            else if (value1.type === StackFrameValueType.Float && value2.type === StackFrameValueType.Float)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.Float, value1.float + value2.float));
            }
            else
            {
                throw new TypeError("add (0x58) called on operands of type " + StackFrameValueType[value1.type] + " and " + StackFrameValueType[value2.type] + ".");
            }
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[AddOvf.prototype.number()] = <any> AddOvf;
} 