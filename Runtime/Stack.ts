module CIL.Runtime
{
    "use strict";

    export class Stack
    {
        argPointers: number[];
        values: number;

        constructor()
        {
            this.argPointers = [];
        }
    }
} 