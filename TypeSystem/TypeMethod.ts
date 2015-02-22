module CIL.TypeSystem
{
    "use strict";

    export class TypeMethod extends TypeMember
    {
        returnType: Type;
        arguments: TypeMethodArgument[];
        body: TypeMethodBody;

        constructor()
        {
            super();
            this.arguments = [];
        }
    }
} 