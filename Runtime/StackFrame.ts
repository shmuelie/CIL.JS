module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        argPointers: number[];
        values: number[];
        this: number;
        method: TypeSystem.TypeMethod;

        constructor()
        {
            this.argPointers = [];
            this.values = [];
        }
    }
} 