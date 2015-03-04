module CIL.Runtime.OpCodes
{
    "use strict";

    export class Add extends OpCode
    {
        number(): number
        {
            return 88;
        }

        execute(): void
        {
            var value2: StackFrameValue = this.stack[0].evaluationStack.pop();
            var value1: StackFrameValue = this.stack[0].evaluationStack.pop();

            if (value1.type === StackFrameValueType.SignedInt && value2.type === StackFrameValueType.SignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, value1.signedInt.intAdd(value2.signedInt)));
            }
            else if (value1.type === StackFrameValueType.UnsignedInt && value2.type === StackFrameValueType.UnsignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.UnsignedInt, value1.unsignedInt.intAdd(value2.unsignedInt)));
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

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Add.prototype.number()] = <any>Add;
} 