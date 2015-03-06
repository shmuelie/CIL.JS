module CIL.Runtime.OpCodes
{
    "use strict";

    export class Div extends OpCode
    {
        number(): number
        {
            return 91;
        }

        execute(): void
        {
            var value2: StackFrameValue = this.stack[0].evaluationStack.pop();
            var value1: StackFrameValue = this.stack[0].evaluationStack.pop();

            if (value1.type === StackFrameValueType.SignedInt && value2.type === StackFrameValueType.SignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, value1.signedInt.division(value2.signedInt).q));
            }
            else if (value1.type === StackFrameValueType.UnsignedInt && value2.type === StackFrameValueType.UnsignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.UnsignedInt, value1.unsignedInt.division(value2.unsignedInt).q));
            }
            else if (value1.type === StackFrameValueType.Float && value2.type === StackFrameValueType.Float)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.Float, value1.float / value2.float));
            }
            else
            {
                throw new TypeError("add (0x5B) called on operands of type " + StackFrameValueType[value1.type] + " and " + StackFrameValueType[value2.type] + ".");
            }
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Div.prototype.number()] = <any>Div;
} 