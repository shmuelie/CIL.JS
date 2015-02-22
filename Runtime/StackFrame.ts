module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        argPointers: number[];
        values: number[];
        this: number;

        constructor()
        {
            this.argPointers = [];
            this.values = [];
        }
    }
} 