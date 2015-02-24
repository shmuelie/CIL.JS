module CIL.Runtime.OpCodes
{
    export class AddOvfUn extends AddOvf
    {
        number(): number
        {
            return 215;
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[AddOvfUn.prototype.number()] = <any>AddOvfUn;
} 