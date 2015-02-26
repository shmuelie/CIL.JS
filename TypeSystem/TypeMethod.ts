module CIL.TypeSystem
{
    "use strict";

    export class TypeMethod extends TypeMember
    {
        returnType: Type;
        arguments: TypeMethodArgument[];
        body: TypeMethodBody;
        virtual: boolean;
        overrides: boolean;
        static: boolean;

        constructor()
        {
            super();
            this.arguments = [];
        }
    }
} 