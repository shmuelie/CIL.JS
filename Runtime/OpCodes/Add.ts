module CIL.Runtime.OpCodes
{
    "use strict";

    export class Add extends OpCode
    {
        number(): number
        {
            return 88;
        }

        execute(bytes: number[]): void
        {
            var value2: StackFrameValue = this.stack[0].evaluationStack.pop();
            var value1: StackFrameValue = this.stack[0].evaluationStack.pop();

            if (value1.type === StackFrameValueType.SignedInt && value2.type === StackFrameValueType.SignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, value1.signedInt.add(value2.signedInt)));
            }
            else if (value1.type === StackFrameValueType.UnsignedInt && value2.type === StackFrameValueType.UnsignedInt)
            {
                this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.UnsignedInt, value1.unsignedInt.add(value2.unsignedInt)));
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

        static Instance: Add;
    }

    OpCode.opCodes[Add.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Add =>
    {
        Add.Instance = Add.Instance || new Add(memory, stack);
        return Add.Instance;
    };
} 