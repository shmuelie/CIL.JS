module CIL.Cecil
{
    export class ModuleDefinition extends ModuleReference implements ICustomAttributeProvider
    {
        hasImage(): boolean
        {
            //TODO: !
        }

        read<TItem, TRet>(variable: (value?: TRet) => TRet, item: TItem, read: (item: TItem, mr: MetadataReader) => TRet): TRet
        read<TItem, TRet>(item: TItem, read: (item: TItem, mr: MetadataReader) => TRet): TRet
        read<TItem, TRet>(item: TItem, read: (item: TItem, mr: MetadataReader) => TRet): TRet
        {
            //TODO: !
        }
    }
}