module CIL.MemorySystem
{
    "use strict";

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

        addObject(obj: MemoryObject, callback: (id: number) => void): void
        {
            if (this.freeList.length === 0)
            {
                obj.id = this.objects.push(obj) - 1;
            }
            else
            {
                obj.id = this.freeList.pop();
                this.objects[obj.id] = obj;
            }
            callback(obj.id);
        }

        getObject(pointer: number, callback: (obj: MemoryObject) => void): void
        {
            callback(this.objects[pointer]);
        }

        setObject(obj: MemoryObject, callback: () => void): void
        {
            this.objects[obj.id] = obj;
            callback();
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
    }
} 