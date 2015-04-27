module CIL.MemorySystem
{
    "use strict";

    import Integer = Runtime.Integer;
    import Bitness = Runtime.Bitness;
    import Type = TypeSystem.Type;
    import TypeField = TypeSystem.TypeField;

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

    var arrayGenerator = Runtime.ArrayHelpers.arrayGenerator;

    var intrinsic: string[] = ["System.Int16", "System.Int32", "System.Int64", "System.UInt16", "System.UInt32", "System.UInt64", "System.Byte", "System.SByte", "System.String", "System.Char"];

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

        private innerAlloc(type: Type): MemoryObject
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

        private setupIntrinsic(type: Type, obj: MemoryObject): void
        {
            switch (intrinsic.indexOf(type.fullName))
            {
                case 0:
                case 9:
                    obj.rawValue = new Integer(arrayGenerator(16, false), Bitness.bit16);
                    break;
                case 1:
                    obj.rawValue = new Integer(arrayGenerator(32, false), Bitness.bit32);
                    break;
                case 2:
                    obj.rawValue = new Integer(arrayGenerator(64, false), Bitness.bit64);
                    break;
                case 3:
                    obj.rawValue = new Integer(arrayGenerator(16, false), Bitness.ubit16);
                    break;
                case 4:
                    obj.rawValue = new Integer(arrayGenerator(32, false), Bitness.ubit32);
                    break;
                case 5:
                    obj.rawValue = new Integer(arrayGenerator(64, false), Bitness.ubit64);
                case 6:
                    obj.rawValue = new Integer(arrayGenerator(8, false), Bitness.ubit8);
                    break;
                case 7:
                    obj.rawValue = new Integer(arrayGenerator(8, false), Bitness.bit8);
                    break;
                default:
                    obj.rawValue = LocalMemoryManager.NULL;
                    break;

            }
        }

        private innerAllocSetup(type: Type, obj: MemoryObject): void
        {
            for (var i: number = 0; i < type.fields.length; i++)
            {
                var field: TypeField = type.fields[i];
                if (intrinsic.indexOf(field.type.fullName) !== -1)
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

        allocObject(type: Type, callback: (selfPointer: number) => void): void
        {
            var obj: MemoryObject = this.innerAlloc(type);
            if (intrinsic.indexOf(type.fullName) === -1)
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