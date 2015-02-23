module CIL.Runtime
{
    "use strict";

    export interface IOpCodeDictionary
    {
        [code: number]: OpCode;
    }

    export class OpCode
    {
        private memory: MemorySystem.Memory;
        private stack: StackFrame[];
        lastOp: OpCode;

        static opCodes: IOpCodeDictionary = {};

        number(): number
        {
            return 0;
        }

        argumentCount(): number[]
        {
            return [];
        }

        execute(): void
        {
            return;
        }

        constructor(memory: MemorySystem.Memory, stack: StackFrame[])
        {
            this.memory = memory;
            this.stack = stack;
        }
    }
} 