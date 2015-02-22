module CIL.Runtime
{
    "use strict";

    export class OpCode
    {
        private memory: MemorySystem.Memory;
        private stack: Stack;

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