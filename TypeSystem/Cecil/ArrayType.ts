module CIL.Cecil
{
    export class ArrayDimension
    {
        lowerBound: number;
        upperBound: number;

        isSized(): boolean
        {
            return this.lowerBound !== null || this.upperBound !== null;
        }

        constructor(lowerBound: number, upperBound: number)
        {
            this.lowerBound = lowerBound;
            this.upperBound = upperBound;
        }

        toString(): string
        {
            return !this.isSized() ? "" : this.lowerBound + "..." + this.upperBound;
        }
    }
}