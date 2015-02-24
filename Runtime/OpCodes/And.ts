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
            var value2: StackFrameValue = this.stack[0].values.pop();
            var value1: StackFrameValue = this.stack[0].values.pop();

            if ((value1.type === StackFrameValueType.SignedInt || value1.type === StackFrameValueType.UnsignedInt) && (value2.type === StackFrameValueType.SignedInt || value2.type === StackFrameValueType.UnsignedInt))
            {
                var int1: boolean[] = value1.value;
                var int2: boolean[] = value2.value;
                var persision: number = Math.max(int1.length, int2.length);
                int1 = int1.padInt(persision);
                int2 = int2.padInt(persision);

                var result: boolean[] = [];
                for (var i = 0; i < persision; i++)
                {
                    result.push(int1[i] && int2[i]);
                }
                this.stack[0].values.push(new StackFrameValue(value1.type, result));
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

    OpCode.opCodes[And.prototype.number()] = <any>And;
} 