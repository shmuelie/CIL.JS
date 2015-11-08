module CIL.Cecil
{
    export class MemberReference implements IMetadataTokenProvider
    {
        private _name: string;
        private _declaringType: TypeReference;
        metadataToken: Metadata.MetadataToken;

        name(value?: string): string
        {
            if (value === undefined)
            {
                return this._name;
            }
            this._name = value;
        }

        fullName(): string
        {
            throw new Error("Abstract");
        }

        hasImage(): boolean
        {
            var module: ModuleDefinition = this.module();
            if (module == null)
            {
                return false;
            }
            return module.hasImage();
        }

        module(): ModuleDefinition
        {
            return this._declaringType === null ? this._declaringType.module() : null;
        }

        isDefinition(): boolean
        {
            return false;
        }

        containsGenericParameter(): boolean
        {
            return this._declaringType === null && this._declaringType.containsGenericParameter();
        }

        constructor(name: string)
        constructor()
        constructor()
        {
            this._declaringType = null;
            this._name = arguments.length === 1 ? arguments[0] : "";
        }

        memberFullName(): string
        {
            if (this._declaringType === null)
            {
                return this._name;
            }
            return this._declaringType.fullName() + "::" + this._name;
        }

        toString(): string
        {
            return this.fullName();
        }

        declaringType(tr: TypeReference): void
        declaringType(): TypeReference
        declaringType(): TypeReference
        {
            if (arguments.length == 1)
            {
                this._declaringType = arguments[0];
            }
            return this._declaringType;
        }
    }
}