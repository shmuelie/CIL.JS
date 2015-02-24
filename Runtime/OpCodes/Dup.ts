module CIL.Runtime.OpCodes
{
    "use strict";

    export class Dup extends OpCode
    {
        number(): number
        {
            return 37;
        }

        execute(): void
        {
            var values: StackFrameValue[] = this.stack[0].values;
            values.push(values[values.length - 1]);
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Dup.prototype.number()] = <any>Dup;
}