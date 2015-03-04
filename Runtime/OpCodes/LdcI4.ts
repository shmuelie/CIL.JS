module CIL.Runtime.OpCodes
{
    "use strict";

    export class LdcI4 extends OpCode
    {
        private num: boolean[];

        number(): number
        {
            return 32;
        }

        argumentCount(): number[]
        {
            return [4];
        }

        execute(): void
        {
            this.stack[0].evaluationStack.push(new StackFrameValue(StackFrameValueType.SignedInt, this.num));
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[], num: boolean[])
        {
            super(memory, stack);
            this.num = num;
        }
    }

    OpCode.opCodes[LdcI4.prototype.number()] = <any>LdcI4;
} 