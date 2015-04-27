module CIL.Cecil.PE
{
    "use strict";

    export class DataDirectory
    {
        virtulAddress: number;
        size: number;

        isZero(): boolean
        {
            return this.virtulAddress === 0 && this.size === 0;
        }

        constructor(rva: number, size: number)
        {
            this.virtulAddress = rva;
            this.size = size;
        }
    }
} 