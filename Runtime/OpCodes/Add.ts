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
            var value2: StackFrameValue = this.stack[0].values.pop();
            var value1: StackFrameValue = this.stack[0].values.pop();

            if ((value1.type === StackFrameValueType.SignedInt || value1.type === StackFrameValueType.UnsignedInt) && (value2.type === StackFrameValueType.SignedInt || value2.type === StackFrameValueType.UnsignedInt))
            {
                var int1: boolean[] = value1.value;
                var int2: boolean[] = value2.value;
                this.stack[0].values.push(new StackFrameValue(value1.type, int1.intAdd(int2)));
            }
            else if (value1.type === StackFrameValueType.Float && value2.type === StackFrameValueType.Float)
            {
                this.stack[0].values.push(new StackFrameValue(StackFrameValueType.Float, value1.value + value2.value));
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

    OpCode.opCodes[Add.prototype.number()] = <any>Add;
} 