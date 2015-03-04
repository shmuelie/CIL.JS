module CIL.MemorySystem
{
    export interface IMemoryManger
    {
        addObject(obj: MemoryObject, callback: (id: number) => void): void;
        assignField(pointer: number, name: string, value: number, callback: () => void): void;
        dereferenceObject(pointer: number, callback: () => void): void;
    }
} 