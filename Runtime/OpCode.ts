module CIL.Runtime
{
    "use strict";

    export interface OpCodeDictionary
    {
        [code: number]: OpCode;
    }

    export class OpCode
    {
        private memory: MemorySystem.Memory;
        private stack: Stack;

        static opCodes: OpCodeDictionary = {};

        number(): number
        {
            return 0;
        }

        argumentCount(): number
        {
            return 0;
        }

        execute(...args: number[]): void
        {
            return;
        }

        constructor(memory: MemorySystem.Memory, stack: Stack)
        {
            this.memory = memory;
            this.stack = stack;
        }
    }
} 