module CIL.Runtime.OpCodes
{
    "use strict";

    export class AddOvfUn extends AddOvf
    {
        number(): number
        {
            return 215;
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: AddOvfUn;
    }

    OpCode.opCodes[AddOvfUn.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): AddOvfUn =>
    {
        AddOvfUn.Instance = AddOvfUn.Instance || new AddOvfUn(memory, stack);
        return AddOvfUn.Instance;
    };
} 