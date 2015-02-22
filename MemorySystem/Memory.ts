module CIL.MemorySystem
{
    "use strict";

    export class Memory
    {
        static NULL: number = -1;

        objects: MemoryObject[];
        freeList: number[];

        constructor()
        {
            this.objects = [];
            this.freeList = [];
        }

        addObject(obj: MemoryObject): number
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
            return obj.id;
        }

        assignField(pointer: number, name: string, value: number): void
        {
            var oldPointer: number = this.objects[pointer].fields[name];
            this.objects[pointer].fields[name] = value;
            this.dereferenceObject(oldPointer);
            if (value !== Memory.NULL)
            {
                this.objects[value].references++;
            }
        }

        dereferenceObject(pointer: number): void
        {
            this.objects[pointer].references--;
            if (this.objects[pointer].references <= 0)
            {
                this.objects[pointer] = null;
                this.freeList.push(pointer);
            }
        }
    }
} 