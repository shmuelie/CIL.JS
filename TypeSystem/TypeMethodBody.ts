module CIL.TypeSystem
{
    "use strict";

    export class TypeMethodBody
    {
        opCodes: Runtime.OpCode[];
        arguments: number[][];

        constructor()
        {
            this.opCodes = [];
            this.arguments = [];
        }
    }
} 