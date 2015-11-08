module CIL.Cecil
{
    export interface ICustomAttributeProvider extends IMetadataTokenProvider
    {
        customAttributes(): CustomAttribute[];
        hasCustomAttributes(): boolean;
    }
}