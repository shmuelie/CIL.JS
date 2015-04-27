module CIL.Runtime.MemoryAssembly
{
    export interface HeapHeader
    {
        offset: number;
        size: number;
        name: string;
    }
} 