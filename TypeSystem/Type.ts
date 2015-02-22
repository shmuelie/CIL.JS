module CIL.TypeSystem
{
    "use strict";

    export class Type
    {
        className: string;
        fullName: string;
        access: Access;
        inheritsFrom: Type;
        implements: Type[];
        attributes: Type[];
        fields: TypeField[];
        methods: TypeMethod[];
        properties: TypeProperty[];
        valueType: boolean;

        constructor()
        {
            this.implements = [];
            this.attributes = [];
            this.fields = [];
            this.methods = [];
            this.properties = [];
        }
    }
} 