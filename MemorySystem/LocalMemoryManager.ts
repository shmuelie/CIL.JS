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

    function arrayGenerator<T>(length: number, value: T): T[]
    {
        var a: T[] = [];
        for (var i: number = 0; i < length; i++)
        {
            a.push(value);
        }
        return a;
    }

    var instrinsic: string[] = ["System.Int16", "System.Int32", "System.Int64", "System.UInt16", "System.UInt32", "System.UInt64", "System.Byte", "System.SByte", "System.String", "System.Char"];

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

        private innerAlloc(type: TypeSystem.Type): MemoryObject
        {
            var obj: MemoryObject = new MemoryObject();
            obj.type = type;
            if (this.freeList.length === 0)
            {
                obj.selfPointer = this.objects.push(obj) - 1;
            }
            else
            {
                obj.selfPointer = this.freeList.pop();
                this.objects[obj.selfPointer] = obj;
            }
            return obj;
        }

        private setupIntrinsic(type: TypeSystem.Type, obj: MemoryObject): void
        {
            switch (instrinsic.indexOf(type.fullName))
            {
                case 0:
                case 9:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(16, false), Runtime.Bitness.bit16);
                    break;
                case 1:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(32, false), Runtime.Bitness.bit32);
                    break;
                case 2:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(64, false), Runtime.Bitness.bit64);
                    break;
                case 3:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(16, false), Runtime.Bitness.ubit16);
                    break;
                case 4:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(32, false), Runtime.Bitness.ubit32);
                    break;
                case 5:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(64, false), Runtime.Bitness.ubit64);
                case 6:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(8, false), Runtime.Bitness.ubit8);
                    break;
                case 7:
                    obj.rawValue = new Runtime.Integer(arrayGenerator(8, false), Runtime.Bitness.bit8);
                    break;
                default:
                    obj.rawValue = LocalMemoryManager.NULL;
                    break;

            }
        }

        private innerAllocSetup(type: TypeSystem.Type, obj: MemoryObject): void
        {
            for (var i: number = 0; i < type.fields.length; i++)
            {
                var field: TypeSystem.TypeField = type.fields[i];
                if (instrinsic.indexOf(field.type.fullName) !== -1)
                {
                    if (field.type.fullName === "System.String")
                    {
                        obj.fields[field.name] = LocalMemoryManager.NULL;
                    }
                    else
                    {
                        var fieldObj = this.innerAlloc(field.type);
                        obj.fields[field.name] = fieldObj.selfPointer;
                        this.setupIntrinsic(field.type, fieldObj);
                    }
                }
                else
                {
                    obj.fields[field.name] = LocalMemoryManager.NULL;
                }
            }
            if (type.inheritsFrom !== null)
            {
                this.innerAllocSetup(type.inheritsFrom, obj);
            }
        }

        allocObject(type: TypeSystem.Type, callback: (selfPointer: number) => void): void
        {
            var obj: MemoryObject = this.innerAlloc(type);
            if (instrinsic.indexOf(type.fullName) === -1)
            {
                this.innerAllocSetup(type, obj);
            }
            else
            {
                this.setupIntrinsic(type, obj);
                callback(obj.selfPointer);
            }
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