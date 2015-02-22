module CIL.TypeSystem
{
    "use strict";

    export class TypeMember
    {
        name: string;
        access: Access;
        attributes: Type[];
        static: boolean;

        constructor()
        {
            this.attributes = [];
        }
    }
} 