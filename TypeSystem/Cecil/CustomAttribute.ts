module CIL.Cecil
{
    export class CustomAttributeArgument
    {
        private _type: TypeReference;
        private _value: Object;

        type(): TypeReference
        {
            return this._type;
        }

        value(): Object
        {
            return this._value;
        }

        constructor(type: TypeReference, value: Object)
        {
            if (type === null)
            {
                throw new Error("Type cannot be null");
            }
            this._type = type;
            this._value = value;
        }
    }

    export class CustomAttributeNamedArgument
    {
        private _name: string;
        private _argument: CustomAttributeArgument;

        name(): string
        {
            return this._name;
        }

        argument(): CustomAttributeArgument
        {
            return this._argument;
        }

        constructor(name: string, argument: CustomAttributeArgument)
        {
            if (name === null)
            {
                throw new Error("Name cannot be null");
            }
            if (name.length === 0)
            {
                throw new Error("Name cannot be empty");
            }
            this._name = name;
            this._argument = argument;
        }
    }

    export interface ICustomAttribute
    {
        attributeType(): TypeReference;
        hasFields(): boolean;
        hasProperties(): boolean;
        fields(): CustomAttributeNamedArgument[];
        properties(): CustomAttributeNamedArgument[];
    }

    export class CustomAttribute implements ICustomAttribute
    {
        private _signature: number = 0;
        private _resolved: boolean;
        private _blob: number[] = null;
        private _arguments: CustomAttributeArgument[] = null;
        private _fields: CustomAttributeNamedArgument[] = null;
        private _properties: CustomAttributeNamedArgument[] = null;
        constructorMethod: MethodReference;

        attributeType(): TypeReference
        {
            return this.constructorMethod.declaringType;
        }

        isResolved(): boolean
        {
            return this._resolved;
        }

        hasConstructorArguments(): boolean
        {
            this.resolve();
            return this._arguments !== null && this._arguments.length !== 0;
        }

        constructorArguments(): CustomAttributeArgument[]
        {
            this.resolve();
            return this._arguments || (this._arguments = []);
        }

        hasFields(): boolean
        {
            this.resolve();
            return this._fields !== null && this._fields.length !== 0;
        }

        fields(): CustomAttributeNamedArgument[]
        {
            this.resolve();
            return this._fields || (this._fields = []);
        }

        hasProperties(): boolean
        {
            this.resolve();
            return this._properties !== null && this._properties.length !== 0;
        }

        properties(): CustomAttributeNamedArgument[]
        {
            this.resolve();
            return this._properties || (this._properties = []);
        }

        hasImage(): boolean
        {
            return this.constructorMethod !== null && this.constructorMethod.hasImage();
        }

        module(): ModuleDefinition
        {
            return this.constructorMethod.module();
        }

        constructor(signature: number, constructor: MethodReference)
        constructor(constructor: MethodReference)
        constructor(constructor: MethodReference, blob: number[])
        constructor()
        {
            switch (arguments.length)
            {
                case 1:
                    this.constructorMethod = arguments[0];
                    this._resolved = true;
                    break;
                case 2:
                    if (typeof arguments[0] === "number")
                    {
                        this._signature = arguments[0];
                        this.constructorMethod = arguments[1];
                    }
                    else
                    {
                        this.constructorMethod = arguments[0];
                        this._blob = arguments[1];
                    }
                    this._resolved = false;
                    break;
                default:
                    throw new Error("Invalid");
            }
        }

        getBlob(): number[]
        {
            if (this._blob !== null)
            {
                return this._blob;
            }

            if (!this.hasImage())
            {
                throw new Error("Not Supported");
            }

            return this.module().read((value?: number[]): number[]=>
            {
                if (value !== undefined)
                {
                    this._blob = value;
                }
                return this._blob;
            }, this, (attribute: CustomAttribute, mr: MetadataReader): number[]=>
                {
                    return mr.readCustomAttributeBlob(attribute._signature);
                });
        }

        private resolve(): void
        {
            if (this._resolved || !this.hasImage())
            {
                return;
            }

            this.module().read(this, (attribute: CustomAttribute, mr: MetadataReader): CustomAttribute =>
            {
                try
                {
                    mr.readCustomAttributeSignature(attribute);
                    this._resolved = true;
                }
                catch (ex)
                {
                    if (this._arguments !== null)
                    {
                        this._arguments.splice(0, this._arguments.length);
                    }
                    if (this._fields !== null)
                    {
                        this._fields.splice(0, this._fields.length);
                    }
                    if (this._properties !== null)
                    {
                        this._properties.splice(0, this._properties.length);
                    }
                    this._resolved = false;
                }
                return this;
            });
        }
    }
}