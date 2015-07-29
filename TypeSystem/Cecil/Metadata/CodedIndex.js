var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        var Metadata;
        (function (Metadata) {
            "use strict";
            (function (CodedIndex) {
                CodedIndex[CodedIndex["TypeDefOrRef"] = 0] = "TypeDefOrRef";
                CodedIndex[CodedIndex["HasConstant"] = 1] = "HasConstant";
                CodedIndex[CodedIndex["HasCustomAttribute"] = 2] = "HasCustomAttribute";
                CodedIndex[CodedIndex["HasFieldMarshal"] = 3] = "HasFieldMarshal";
                CodedIndex[CodedIndex["HasDeclSecurity"] = 4] = "HasDeclSecurity";
                CodedIndex[CodedIndex["MemberRefParent"] = 5] = "MemberRefParent";
                CodedIndex[CodedIndex["HasSemantics"] = 6] = "HasSemantics";
                CodedIndex[CodedIndex["MethodDefOrRef"] = 7] = "MethodDefOrRef";
                CodedIndex[CodedIndex["MemberForwarded"] = 8] = "MemberForwarded";
                CodedIndex[CodedIndex["Implementation"] = 9] = "Implementation";
                CodedIndex[CodedIndex["CustomAttributeType"] = 10] = "CustomAttributeType";
                CodedIndex[CodedIndex["ResolutionScope"] = 11] = "ResolutionScope";
                CodedIndex[CodedIndex["TypeOrMethodDef"] = 12] = "TypeOrMethodDef";
            })(Metadata.CodedIndex || (Metadata.CodedIndex = {}));
            var CodedIndex = Metadata.CodedIndex;
            var CodedIndex;
            (function (CodedIndex) {
                function getMetadataToken(self, data) {
                    var rid = null;
                    var token_type = null;
                    switch (self) {
                        case CodedIndex.TypeDefOrRef:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = Metadata.TokenType.TypeDef;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.TypeRef;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.TypeSpec;
                                    break;
                            }
                            break;
                        case CodedIndex.HasConstant:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Param;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.Property;
                                    break;
                            }
                            break;
                        case CodedIndex.HasCustomAttribute:
                            rid = data >> 5;
                            switch (data & 31) {
                                case 0:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.TypeRef;
                                    break;
                                case 3:
                                    token_type = Metadata.TokenType.TypeDef;
                                    break;
                                case 4:
                                    token_type = Metadata.TokenType.Param;
                                    break;
                                case 5:
                                    token_type = Metadata.TokenType.InterfaceImpl;
                                    break;
                                case 6:
                                    token_type = Metadata.TokenType.MemberRef;
                                    break;
                                case 7:
                                    token_type = Metadata.TokenType.Module;
                                    break;
                                case 8:
                                    token_type = Metadata.TokenType.Permission;
                                    break;
                                case 9:
                                    token_type = Metadata.TokenType.Property;
                                    break;
                                case 10:
                                    token_type = Metadata.TokenType.Event;
                                    break;
                                case 11:
                                    token_type = Metadata.TokenType.Signature;
                                    break;
                                case 12:
                                    token_type = Metadata.TokenType.ModuleRef;
                                    break;
                                case 13:
                                    token_type = Metadata.TokenType.TypeSpec;
                                    break;
                                case 14:
                                    token_type = Metadata.TokenType.Assembly;
                                    break;
                                case 15:
                                    token_type = Metadata.TokenType.AssemblyRef;
                                    break;
                                case 16:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 17:
                                    token_type = Metadata.TokenType.ExportedType;
                                    break;
                                case 18:
                                    token_type = Metadata.TokenType.ManifestResource;
                                    break;
                                case 19:
                                    token_type = Metadata.TokenType.GenericParam;
                                    break;
                            }
                            break;
                        case CodedIndex.HasFieldMarshal:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Param;
                                    break;
                            }
                            break;
                        case CodedIndex.HasDeclSecurity:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = Metadata.TokenType.TypeDef;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.Assembly;
                                    break;
                            }
                            break;
                        case CodedIndex.MemberRefParent:
                            rid = data >> 3;
                            switch (data & 7) {
                                case 0:
                                    token_type = Metadata.TokenType.TypeDef;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.TypeRef;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.ModuleRef;
                                    break;
                                case 3:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                                case 4:
                                    token_type = Metadata.TokenType.TypeSpec;
                                    break;
                            }
                            break;
                        case CodedIndex.HasSemantics:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = Metadata.TokenType.Event;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Property;
                                    break;
                            }
                            break;
                        case CodedIndex.MethodDefOrRef:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.MemberRef;
                                    break;
                            }
                            break;
                        case CodedIndex.MemberForwarded:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                            }
                            break;
                        case CodedIndex.Implementation:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = Metadata.TokenType.Field;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.AssemblyRef;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.ExportedType;
                                    break;
                            }
                            break;
                        case CodedIndex.CustomAttributeType:
                            rid = data >> 3;
                            switch (data & 7) {
                                case 2:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                                case 3:
                                    token_type = Metadata.TokenType.MemberRef;
                                    break;
                            }
                            break;
                        case CodedIndex.ResolutionScope:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = Metadata.TokenType.Module;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.ModuleRef;
                                    break;
                                case 2:
                                    token_type = Metadata.TokenType.AssemblyRef;
                                    break;
                                case 3:
                                    token_type = Metadata.TokenType.TypeRef;
                                    break;
                            }
                            break;
                        case CodedIndex.TypeOrMethodDef:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = Metadata.TokenType.TypeDef;
                                    break;
                                case 1:
                                    token_type = Metadata.TokenType.Method;
                                    break;
                            }
                            break;
                    }
                    if (rid !== null && token_type !== null) {
                        return new Metadata.MetadataToken(token_type, rid);
                    }
                    return Metadata.MetadataToken.zero;
                }
                CodedIndex.getMetadataToken = getMetadataToken;
                function getSize(self, counter) {
                    var bits = 0;
                    var tables = null;
                    switch (self) {
                        case CodedIndex.TypeDefOrRef:
                            bits = 2;
                            tables = [Metadata.Table.TypeDef, Metadata.Table.TypeRef, Metadata.Table.TypeSpec];
                            break;
                        case CodedIndex.HasConstant:
                            bits = 2;
                            tables = [Metadata.Table.Field, Metadata.Table.Param, Metadata.Table.Property];
                            break;
                        case CodedIndex.HasCustomAttribute:
                            bits = 5;
                            tables = [Metadata.Table.Method, Metadata.Table.Field, Metadata.Table.TypeRef, Metadata.Table.TypeDef, Metadata.Table.Param, Metadata.Table.InterfaceImpl, Metadata.Table.MemberRef,
                                Metadata.Table.Module, Metadata.Table.DeclSecurity, Metadata.Table.Property, Metadata.Table.Event, Metadata.Table.StandAloneSig, Metadata.Table.ModuleRef,
                                Metadata.Table.TypeSpec, Metadata.Table.Assembly, Metadata.Table.AssemblyRef, Metadata.Table.File, Metadata.Table.ExportedType,
                                Metadata.Table.ManifestResource, Metadata.Table.GenericParam];
                            break;
                        case CodedIndex.HasFieldMarshal:
                            bits = 1;
                            tables = [Metadata.Table.Field, Metadata.Table.Param];
                            break;
                        case CodedIndex.HasDeclSecurity:
                            bits = 2;
                            tables = [Metadata.Table.TypeDef, Metadata.Table.Method, Metadata.Table.Assembly];
                            break;
                        case CodedIndex.MemberRefParent:
                            bits = 3;
                            tables = [Metadata.Table.TypeDef, Metadata.Table.TypeRef, Metadata.Table.ModuleRef, Metadata.Table.Method, Metadata.Table.TypeSpec];
                            break;
                        case CodedIndex.HasSemantics:
                            bits = 1;
                            tables = [Metadata.Table.Event, Metadata.Table.Property];
                            break;
                        case CodedIndex.MethodDefOrRef:
                            bits = 1;
                            tables = [Metadata.Table.Method, Metadata.Table.MemberRef];
                            break;
                        case CodedIndex.MemberForwarded:
                            bits = 1;
                            tables = [Metadata.Table.Field, Metadata.Table.Method];
                            break;
                        case CodedIndex.Implementation:
                            bits = 2;
                            tables = [Metadata.Table.File, Metadata.Table.AssemblyRef, Metadata.Table.ExportedType];
                            break;
                        case CodedIndex.CustomAttributeType:
                            bits = 3;
                            tables = [Metadata.Table.Method, Metadata.Table.MemberRef];
                            break;
                        case CodedIndex.ResolutionScope:
                            bits = 2;
                            tables = [Metadata.Table.Module, Metadata.Table.ModuleRef, Metadata.Table.AssemblyRef, Metadata.Table.TypeRef];
                            break;
                        case CodedIndex.TypeOrMethodDef:
                            bits = 1;
                            tables = [Metadata.Table.TypeDef, Metadata.Table.Method];
                            break;
                    }
                    var max = 0;
                    for (var i = 0; i < tables.length; i++) {
                        max = Math.max(counter(tables[i]), max);
                    }
                    return max < (1 << (16 - bits)) ? 2 : 4;
                }
                CodedIndex.getSize = getSize;
            })(CodedIndex = Metadata.CodedIndex || (Metadata.CodedIndex = {}));
        })(Metadata = Cecil.Metadata || (Cecil.Metadata = {}));
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=CodedIndex.js.map