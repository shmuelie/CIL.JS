module CIL.TypeSystem
{
    "use strict";

    export class TypeProperty extends TypeMember
    {
        get: TypeMethod;
        set: TypeMethod;
        index: Type;
    }
} 