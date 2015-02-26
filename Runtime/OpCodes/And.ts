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
            var int1: boolean[];
            var int2: boolean[];
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

            var persision: number = Math.max(int1.length, int2.length);
            int1 = int1.padInt(persision);
            int2 = int2.padInt(persision);

            var result: boolean[] = [];
            for (var i = 0; i < persision; i++)
            {
                result.push(int1[i] && int2[i]);
            }
            this.stack[0].evaluationStack.push(new StackFrameValue(value1.type, result));
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[And.prototype.number()] = <any>And;
} 