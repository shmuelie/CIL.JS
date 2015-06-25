module CIL.Cecil.Metadata
{
    "use strict";

    export enum CodedIndex
    {
        TypeDefOrRef,
        HasConstant,
        HasCustomAttribute,
        HasFieldMarshal,
        HasDeclSecurity,
        MemberRefParent,
        HasSemantics,
        MethodDefOrRef,
        MemberForwarded,
        Implementation,
        CustomAttributeType,
        ResolutionScope,
        TypeOrMethodDef
    }

    export module CodedIndex
    {
        export function getMetadataToken(self: CodedIndex, data: number)
        {
            var rid: number = null;
            var token_type: TokenType = null;
            switch (self)
            {
                case CodedIndex.TypeDefOrRef:
                    rid = data >> 2;
                    switch (data & 3)
                    {
                        case 0:
                            token_type = TokenType.TypeDef;
                            break;
                        case 1:
                            token_type = TokenType.TypeRef;
                            break;
                        case 2:
                            token_type = TokenType.TypeSpec;
                            break;
                    }
                    break;
                case CodedIndex.HasConstant:
                    rid = data >> 2;
                    switch (data & 3)
                    {
                        case 0:
                            token_type = TokenType.Field;
                            break;
                        case 1:
                            token_type = TokenType.Param;
                            break;
                        case 2:
                            token_type = TokenType.Property;
                            break;
                    }
                    break;
                case CodedIndex.HasCustomAttribute:
                    rid = data >> 5;
                    switch (data & 31)
                    {
                        case 0:
                            token_type = TokenType.Method;
                            break;
                        case 1:
                            token_type = TokenType.Field;
                            break;
                        case 2:
                            token_type = TokenType.TypeRef;
                            break;
                        case 3:
                            token_type = TokenType.TypeDef;
                            break;
                        case 4:
                            token_type = TokenType.Param;
                            break;
                        case 5:
                            token_type = TokenType.InterfaceImpl;
                            break;
                        case 6:
                            token_type = TokenType.MemberRef;
                            break;
                        case 7:
                            token_type = TokenType.Module;
                            break;
                        case 8:
                            token_type = TokenType.Permission;
                            break;
                        case 9:
                            token_type = TokenType.Property;
                            break;
                        case 10:
                            token_type = TokenType.Event;
                            break;
                        case 11:
                            token_type = TokenType.Signature;
                            break;
                        case 12:
                            token_type = TokenType.ModuleRef;
                            break;
                        case 13:
                            token_type = TokenType.TypeSpec;
                            break;
                        case 14:
                            token_type = TokenType.Assembly;
                            break;
                        case 15:
                            token_type = TokenType.AssemblyRef;
                            break;
                        case 16:
                            token_type = TokenType.Field;
                            break;
                        case 17:
                            token_type = TokenType.ExportedType;
                            break;
                        case 18:
                            token_type = TokenType.ManifestResource;
                            break;
                        case 19:
                            token_type = TokenType.GenericParam;
                            break;
                    }
                    break;
                case CodedIndex.HasFieldMarshal:
                    rid = data >> 1;
                    switch (data & 1)
                    {
                        case 0:
                            token_type = TokenType.Field;
                            break;
                        case 1:
                            token_type = TokenType.Param;
                            break;
                    }
                    break;
                case CodedIndex.HasDeclSecurity:
                    rid = data >> 2;
                    switch (data & 3)
                    {
                        case 0:
                            token_type = TokenType.TypeDef;
                            break;
                        case 1:
                            token_type = TokenType.Method;
                            break;
                        case 2:
                            token_type = TokenType.Assembly;
                            break;
                    }
                    break;
                case CodedIndex.MemberRefParent:
                    rid = data >> 3;
                    switch (data & 7)
                    {
                        case 0:
                            token_type = TokenType.TypeDef;
                            break;
                        case 1:
                            token_type = TokenType.TypeRef;
                            break;
                        case 2:
                            token_type = TokenType.ModuleRef;
                            break;
                        case 3:
                            token_type = TokenType.Method;
                            break;
                        case 4:
                            token_type = TokenType.TypeSpec;
                            break;
                    }
                    break;
                case CodedIndex.HasSemantics:
                    rid = data >> 1;
                    switch (data & 1)
                    {
                        case 0:
                            token_type = TokenType.Event;
                            break;
                        case 1:
                            token_type = TokenType.Property;
                            break;
                    }
                    break;
                case CodedIndex.MethodDefOrRef:
                    rid = data >> 1;
                    switch (data & 1)
                    {
                        case 0:
                            token_type = TokenType.Method;
                            break;
                        case 1:
                            token_type = TokenType.MemberRef;
                            break;
                    }
                    break;
                case CodedIndex.MemberForwarded:
                    rid = data >> 1;
                    switch (data & 1)
                    {
                        case 0:
                            token_type = TokenType.Field;
                            break;
                        case 1:
                            token_type = TokenType.Method;
                            break;
                    }
                    break;
                case CodedIndex.Implementation:
                    rid = data >> 2;
                    switch (data & 3)
                    {
                        case 0:
                            token_type = TokenType.Field;
                            break;
                        case 1:
                            token_type = TokenType.AssemblyRef;
                            break;
                        case 2:
                            token_type = TokenType.ExportedType;
                            break;
                    }
                    break;
                case CodedIndex.CustomAttributeType:
                    rid = data >> 3;
                    switch (data & 7)
                    {
                        case 2:
                            token_type = TokenType.Method;
                            break;
                        case 3:
                            token_type = TokenType.MemberRef;
                            break;
                    }
                    break;
                case CodedIndex.ResolutionScope:
                    rid = data >> 2;
                    switch (data & 3)
                    {
                        case 0:
                            token_type = TokenType.Module;
                            break;
                        case 1:
                            token_type = TokenType.ModuleRef;
                            break;
                        case 2:
                            token_type = TokenType.AssemblyRef;
                            break;
                        case 3:
                            token_type = TokenType.TypeRef;
                            break;
                    }
                    break;
                case CodedIndex.TypeOrMethodDef:
                    rid = data >> 1;
                    switch (data & 1)
                    {
                        case 0:
                            token_type = TokenType.TypeDef;
                            break;
                        case 1:
                            token_type = TokenType.Method;
                            break;
                    }
                    break;
            }
            if (rid !== null && token_type !== null)
            {
                return new MetadataToken(token_type, rid);
            }
            return MetadataToken.zero;
        }

        export function getSize(self: CodedIndex, counter: (num: number) => Table): number
        {
            var bits: number = 0;
            var tables: Table[] = null;
            switch (self)
            {
                case CodedIndex.TypeDefOrRef:
                    bits = 2;
                    tables = [Table.TypeDef, Table.TypeRef, Table.TypeSpec];
                    break;
                case CodedIndex.HasConstant:
                    bits = 2;
                    tables = [Table.Field, Table.Param, Table.Property];
                    break;
                case CodedIndex.HasCustomAttribute:
                    bits = 5;
                    tables = [Table.Method, Table.Field, Table.TypeRef, Table.TypeDef, Table.Param, Table.InterfaceImpl, Table.MemberRef,
                              Table.Module, Table.DeclSecurity, Table.Property, Table.Event, Table.StandAloneSig, Table.ModuleRef,
                              Table.TypeSpec, Table.Assembly, Table.AssemblyRef, Table.File, Table.ExportedType,
                              Table.ManifestResource, Table.GenericParam];
                    break;
                case CodedIndex.HasFieldMarshal:
                    bits = 1;
                    tables = [Table.Field, Table.Param];
                    break;
                case CodedIndex.HasDeclSecurity:
                    bits = 2;
                    tables = [Table.TypeDef, Table.Method, Table.Assembly];
                    break;
                case CodedIndex.MemberRefParent:
                    bits = 3;
                    tables = [Table.TypeDef, Table.TypeRef, Table.ModuleRef, Table.Method, Table.TypeSpec];
                    break;
                case CodedIndex.HasSemantics:
                    bits = 1;
                    tables = [Table.Event, Table.Property];
                    break;
                case CodedIndex.MethodDefOrRef:
                    bits = 1;
                    tables = [Table.Method, Table.MemberRef];
                    break;
                case CodedIndex.MemberForwarded:
                    bits = 1;
                    tables = [Table.Field, Table.Method];
                    break;
                case CodedIndex.Implementation:
                    bits = 2;
                    tables = [Table.File, Table.AssemblyRef, Table.ExportedType];
                    break;
                case CodedIndex.CustomAttributeType:
                    bits = 3;
                    tables = [Table.Method, Table.MemberRef];
                    break;
                case CodedIndex.ResolutionScope:
                    bits = 2;
                    tables = [Table.Module, Table.ModuleRef, Table.AssemblyRef, Table.TypeRef];
                    break;
                case CodedIndex.TypeOrMethodDef:
                    bits = 1;
                    tables = [Table.TypeDef, Table.Method];
                    break;
            }

            var max: number = 0;
            for (var i: number = 0; i < tables.length; i++)
            {
                max = Math.max(counter(tables[i]), max);
            }
            return max < (1 << (16 - bits)) ? 2 : 4;
        }
    }
} 