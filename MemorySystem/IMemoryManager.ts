module CIL.MemorySystem
{
    export interface IMemoryManger
    {
        allocObject(type: TypeSystem.Type, callback: (selfPointer: number) => void): void;
        assignField(pointer: number, name: string, value: number, callback: () => void): void;
        getField(pointer: number, name: string, callback: (value: number) => void): void;
        dereferenceObject(pointer: number, callback: () => void): void;
        assignIntrinsicValue(pointer: number, value: any, callback: () => void): void;
        getIntrinsicValue(pointer: number, callback: (value: any) => void): void;
    }
} 