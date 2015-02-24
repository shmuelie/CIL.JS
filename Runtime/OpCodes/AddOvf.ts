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
            var value2: StackFrameValue = this.stack[0].values.pop();
            var value1: StackFrameValue = this.stack[0].values.pop();

            if ((value1.type === StackFrameValueType.SignedInt || value1.type === StackFrameValueType.UnsignedInt) && (value2.type === StackFrameValueType.SignedInt || value2.type === StackFrameValueType.UnsignedInt))
            {
                var int1: boolean[] = value1.value;
                var int2: boolean[] = value2.value;
                try
                {
                    this.stack[0].values.push(new StackFrameValue(value1.type, int1.intAdd(int2, true)));
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