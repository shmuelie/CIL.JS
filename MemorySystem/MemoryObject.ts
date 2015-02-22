module CIL.MemorySystem
{
    "use strict";

    export interface IFieldData
    {
        [key: string]: number;
    }

    export class MemoryObject
    {
        id: number;
        rawValue: any;
        fields: IFieldData;
        type: TypeSystem.Type;
        references: number;

        constructor()
        {
            this.references = 0;
        }
    }
} 