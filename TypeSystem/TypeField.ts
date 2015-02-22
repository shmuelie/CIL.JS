module CIL.TypeSystem
{
    "use strict";

    export class TypeField extends TypeMember
    {
        type: Type;
        initonly: boolean;
    }
} 