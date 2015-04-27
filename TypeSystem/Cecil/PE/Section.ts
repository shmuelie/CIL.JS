module CIL.Cecil.PE
{
    export interface Section
    {
        name: string;
        /* RVA: UInt32 */
        virtualAddress: number;
        /* uint */
        virtualSize: number;
        /* uint */
        sizeOfRawData: number;
        /* uint */
        pointerToRawData: number;
        data: Runtime.Reader;
    }
} 