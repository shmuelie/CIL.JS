module CIL.Runtime.OpCodes
{
    "use strict";

    export class Volitile extends OpCode
    {
        number(): number
        {
            return 65043;
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Volitile.prototype.number()] = <any>Volitile;
} 