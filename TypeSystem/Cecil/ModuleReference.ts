module CIL.Cecil
{
    export class ModuleReference implements IMetadataScope
    {
        metadataToken: Metadata.MetadataToken;
        name: string;

        GetMetadataScopeType(): MetadataScopeType
        {
            return MetadataScopeType.ModuleReference;
        }

        constructor(name?: string)
        {
            this.name = name || null;
            this.metadataToken = new Metadata.MetadataToken(Metadata.TokenType.ModuleRef);
        }

        toString(): string
        {
            return this.name;
        }
    }
}