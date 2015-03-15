module CIL.Runtime.OpCodes
{
    "use strict";

    export class LdcI4 extends OpCode
    {
        number(): number
        {
            return 32;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        execute(bytes: number[]): void
        {
            var num = Integer.fromBytes(bytes);
            this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, num));
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: LdcI4;
    }

    OpCode.opCodes[LdcI4.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): LdcI4 =>
    {
        LdcI4.Instance = LdcI4.Instance || new LdcI4(memory, stack);
        return LdcI4.Instance;
    };
} 