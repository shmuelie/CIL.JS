module CIL.Cecil
{
    export interface IGenericParameterProvider extends IMetadataTokenProvider
    {
        hasGenericParameters(): boolean;
        isDefinition(): boolean;
        module(): ModuleDefinition;
        genericParameters(): GenericParameter[];
        genericParameterType(): GenericParameterType;
    }

    export const enum GenericParameterType
    {
        Type,
        Method
    }

    export interface IGenericContext
    {
        isDefinition(): boolean;
        type(): IGenericParameterProvider;
        method(): IGenericParameterProvider;
    }

    export function getHasGenericParaMeters(self: IGenericParameterProvider, collection: (value: GenericParameter[]) => GenericParameter[], module: ModuleDefinition): boolean | GenericParameter[];
    export function getHasGenericParameters(self: IGenericParameterProvider, module: ModuleDefinition): boolean | GenericParameter[];
    export function getHasGenericParameters(self: IGenericParameterProvider): boolean | GenericParameter[]
    {
        var module: ModuleDefinition;
        switch (arguments.length)
        {
            case 2:
                module = arguments[1];
                return module.hasImage() && module.read(self, (provider: IGenericParameterProvider, reader: MetadataReader): boolean =>
                {
                    return reader.hasGenericParameters(provider);
                });
            case 3:
                var collection: (value: GenericParameter[]) => GenericParameter[] = arguments[1];
                module = arguments[2];
                return module.hasImage() ? module.read(collection, self, (provider: IGenericParameterProvider, reader: MetadataReader): GenericParameter[] =>
                {
                    return reader.readGenericParameters(provider);
                }) : collection(new GenericParameterCollection(self));
        }
        return false;
    }


}