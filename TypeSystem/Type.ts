module CIL.TypeSystem
{
    "use strict";

    export interface ITypesDictionary
    {
        [fullName: string]: Type;
    }

    export class Type
    {
        static types: ITypesDictionary = {};

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