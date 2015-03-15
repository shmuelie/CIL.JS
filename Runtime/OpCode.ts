module CIL.Runtime
{
    "use strict";

    export interface IOpCodeDictionary
    {
        [code: number]: (memory: MemorySystem.IMemoryManger, stack: StackFrame[]) => OpCode;
    }

    export class OpCode
    {
        memory: MemorySystem.IMemoryManger;
        stack: StackFrame[];
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

        execute(bytes: number[]): void
        {
            return;
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            this.memory = memory;
            this.stack = stack;
        }
    }
} 