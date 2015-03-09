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

        parseArguments(bytes: number[]): void
        {
            var int: Integer = Integer.fromBytes(bytes);
            var value: number = 0;
            for (var i: number = 0; i < int.bits.length; i++)
            {
                if (int.bits[i])
                {
                    value += Math.pow(2, int.bits.length - 1 - i);
                }
            }
            this.argIndex = value;
        }

        setArg(argIndex: number): void
        {
            this.argIndex = argIndex;
        }

        constructor(memory: MemorySystem.IMemoryManger, stack: StackFrame[])
        {
            super(memory, stack);
        }
    }

    OpCode.opCodes[Ldarg.prototype.number()] = <any>Ldarg;
} 