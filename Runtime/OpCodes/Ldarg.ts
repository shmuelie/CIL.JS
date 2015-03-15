module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg extends OpCode
    {
        number(): number
        {
            return 65033;
        }

        argumentCount(): number[]
        {
            return [2];
        }

        execute(bytes: number[]): void
        {
            this.do(Integer.fromBytes(bytes).toNumber());
        }

        do(argIndex: number): void
        {
            this.stack[0].evaluationStack.push(this.stack[0].arguments[argIndex]);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }

        static Instance: Ldarg;
    }

    OpCode.opCodes[Ldarg.prototype.number()] = (memory: MemorySystem.IMemoryManger, stack: StackFrame[]): Ldarg =>
    {
        Ldarg.Instance = Ldarg.Instance || new Ldarg(memory, stack);
        return Ldarg.Instance;
    };
} 