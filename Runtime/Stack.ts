module CIL.Runtime
{
    "use strict";

    export class Stack
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