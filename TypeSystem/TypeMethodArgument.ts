module CIL.TypeSystem
{
    "use strict";

    export class TypeMethodArgument
    {
        type: Type;
        attributes: Type[];
        ref: boolean;
        out: boolean;

        constructor()
        {
            this.attributes = [];
        }
    }
} 