module CIL.Runtime.OpCodes
{
    "use strict";

    export class LdcI4 extends OpCode
    {
        private num: Integer;

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

        parseArguments(bytes: number[]): void
        {
            this.num = Integer.fromBytes(bytes);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[LdcI4.prototype.number()] = <any>LdcI4;
} 