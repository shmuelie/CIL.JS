module CIL.Runtime.OpCodes
{
    "use strict";

    export class Ldarg extends OpCode
    {
        private argIndex: number;

        number(): number
        {
            return 65033;
        }

        argumentCount(): number[]
        {
            return [2];
        }

        execute(): void
        {
            this.stack[0].evaluationStack.push(this.stack[0].arguments[this.argIndex]);
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[], argIndex: number)
        {
            super(memory, stack);
            this.argIndex = argIndex;
        }
    }

    OpCode.opCodes[Ldarg.prototype.number()] = <any>Ldarg;
} 