module CIL.Cecil
{
    export const enum MetadataScopeType
    {
        AssemblyNameReference,
        ModuleReference,
        ModuleDefinition
    }

    export interface IMetadataScope extends IMetadataTokenProvider
    {
        GetMetadataScopeType(): MetadataScopeType;
        name: string;
    }
}