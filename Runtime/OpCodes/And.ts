module CIL.Runtime.OpCodes
{
    "use strict";

    export class And extends OpCode
    {
        number(): number
        {
            return 95;
        }

        execute(): void
        {
            var value2: StackFrameValue = this.stack[0].evaluationStack.pop();
            var value1: StackFrameValue = this.stack[0].evaluationStack.pop();
            var int1: Integer;
            var int2: Integer;
            var type: StackFrameValueType;

            if (value1.type === StackFrameValueType.SignedInt && value2.type === StackFrameValueType.SignedInt)
            {
                int1 = value1.signedInt;
                int2 = value2.signedInt;
                type = StackFrameValueType.SignedInt;
            }
            else if (value1.type === StackFrameValueType.UnsignedInt && value2.type === StackFrameValueType.UnsignedInt)
            {
                int1 = value1.unsignedInt;
                int2 = value2.unsignedInt;
                type = StackFrameValueType.UnsignedInt;
            }
            else
            {
                throw new TypeError("add (0x58) called on operands of type " + StackFrameValueType[value1.type] + " and " + StackFrameValueType[value2.type] + ".");
            }

            var persision: number = Math.max(int1.bits.length, int2.bits.length);
            var intBits1: boolean[] = ArrayHelpers.padInt(int1.bits, persision);
            var intBits2: boolean[] = ArrayHelpers.padInt(int2.bits, persision);

            var result: boolean[] = [];
            for (var i = 0; i < persision; i++)
            {
                result.push(intBits1[i] && intBits2[i]);
            }
            this.stack[0].evaluationStack.push(new StackFrameValue(type, result));
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[And.prototype.number()] = <any>And;
} 