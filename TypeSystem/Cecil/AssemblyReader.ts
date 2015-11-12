module CIL.Cecil
{
    export class MetadataReader extends Runtime.Reader
    {
        hasGenericParameters(provider: IGenericParameterProvider): boolean
        {
            //TODO: !
        }

        readGenericParameters(provider: IGenericParameterProvider): GenericParameter[]
        {
            //TODO: !
        }

        readCustomAttributeBlob(signature: number): number[]
        {
            //TODO: !
        }

        readCustomAttributeSignature(attribute: CustomAttribute): void
        {
            //TODO: !
        }

        hasGenericConstraints(genericParameter: GenericParameter): boolean
        {
            //TODO: !
        }

        readGenericConstraints(genericParameter: GenericParameter): TypeReference[]
        {
            //TODO: !
        }
    }
}