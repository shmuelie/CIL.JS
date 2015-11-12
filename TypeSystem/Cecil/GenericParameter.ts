module CIL.Cecil
{
    export class GenericParameter extends TypeReference implements ICustomAttributeProvider
    {
        _position: number;
        _type: GenericParameterType;
        _owner: IGenericParameterProvider;

        private _attributes: number;
        private _constraints: TypeReference[];
        private _customAttributes: CustomAttribute[];

        attributes(value: GenericParameterAttributes): void
        attributes(): GenericParameterAttributes
        attributes(): GenericParameterAttributes
        {
            if (arguments.length === 1)
            {
                this._attributes = arguments[0];
            }
            return this._attributes;
        }

        position(): number
        {
            return this._position;
        }

        type(): GenericParameterType
        {
            return this._type;
        }

        owner(): IGenericParameterProvider
        {
            return this._owner;
        }

        hasConstraints(): boolean
        {
            if (this._constraints !== null && this._constraints !== undefined)
            {
                return this._constraints.length > 0;
            }

            return this.hasImage() && this.module().read(this, (generic_parameter: GenericParameter, reader: MetadataReader): boolean =>
            {
                return reader.hasGenericConstraints(generic_parameter);
            });
        }

        constraints(): TypeReference[]
        {
            if (this._constraints !== null && this._constraints !== undefined)
            {
                return this._constraints;
            }
            if (this.hasImage())
            {
                return this.module().read(this, (generic_parameter: GenericParameter, reader: MetadataReader): TypeReference[] =>
                {
                    return reader.readGenericConstraints(generic_parameter);
                });
            }
            return this._constraints = [];
        }
    }
}