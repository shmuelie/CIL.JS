module CIL.MemorySystem
{
    "use strict";

    interface IFieldData
    {
        [key: string]: number;
    }

    class MemoryObject
    {
        selfPointer: number;
        rawValue: any;
        fields: IFieldData;
        type: TypeSystem.Type;
        references: number;

        constructor()
        {
            this.references = 0;
        }
    }

    export class LocalMemoryManager implements IMemoryManger
    {
        static NULL: number = -1;

        private objects: MemoryObject[];
        private freeList: number[];

        constructor()
        {
            this.objects = [];
            this.freeList = [];
        }

        allocObject(type: TypeSystem.Type, callback: (selfPointer: number) => void): void
        {
            var obj: MemoryObject = new MemoryObject();
            if (this.freeList.length === 0)
            {
                obj.selfPointer = this.objects.push(obj) - 1;
            }
            else
            {
                obj.selfPointer = this.freeList.pop();
                this.objects[obj.selfPointer] = obj;
            }
            callback(obj.selfPointer);
        }

        assignField(pointer: number, name: string, value: number, callback: () => void): void
        {
            var oldPointer: number = this.objects[pointer].fields[name];
            this.objects[pointer].fields[name] = value;
            this.dereferenceObject(oldPointer, () =>
            {
                if (value !== LocalMemoryManager.NULL)
                {
                    this.objects[value].references++;
                }
                callback();
            });
        }

        getField(pointer: number, name: string, callback: (value: number) => void): void
        {
            callback(this.objects[pointer].fields[name]);
        }



        dereferenceObject(pointer: number, callback: () => void): void
        {
            this.objects[pointer].references--;
            if (this.objects[pointer].references <= 0)
            {
                this.objects[pointer] = null;
                this.freeList.push(pointer);
            }
            callback();
        }

        assignIntrinsicValue(pointer: number, value: any, callback: () => void): void
        {
            this.objects[pointer].rawValue = value;
            callback();
        }

        getIntrinsicValue(pointer: number, callback: (value: any) => void): void
        {
            callback(this.objects[pointer].rawValue);
        }
    }
} 