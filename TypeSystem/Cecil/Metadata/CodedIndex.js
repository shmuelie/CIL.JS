var CIL;
(function (CIL) {
    (function (Cecil) {
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

            (function (CodedIndex) {
                function getMetadataToken(self, data) {
                    var rid = null;
                    var token_type = null;
                    switch (self) {
                        case 0 /* TypeDefOrRef */:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = 33554432 /* TypeDef */;
                                    break;
                                case 1:
                                    token_type = 16777216 /* TypeRef */;
                                    break;
                                case 2:
                                    token_type = 452984832 /* TypeSpec */;
                                    break;
                            }
                            break;
                        case 1 /* HasConstant */:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 1:
                                    token_type = 134217728 /* Param */;
                                    break;
                                case 2:
                                    token_type = 385875968 /* Property */;
                                    break;
                            }
                            break;
                        case 2 /* HasCustomAttribute */:
                            rid = data >> 5;
                            switch (data & 31) {
                                case 0:
                                    token_type = 100663296 /* Method */;
                                    break;
                                case 1:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 2:
                                    token_type = 16777216 /* TypeRef */;
                                    break;
                                case 3:
                                    token_type = 33554432 /* TypeDef */;
                                    break;
                                case 4:
                                    token_type = 134217728 /* Param */;
                                    break;
                                case 5:
                                    token_type = 150994944 /* InterfaceImpl */;
                                    break;
                                case 6:
                                    token_type = 167772160 /* MemberRef */;
                                    break;
                                case 7:
                                    token_type = 0 /* Module */;
                                    break;
                                case 8:
                                    token_type = 234881024 /* Permission */;
                                    break;
                                case 9:
                                    token_type = 385875968 /* Property */;
                                    break;
                                case 10:
                                    token_type = 335544320 /* Event */;
                                    break;
                                case 11:
                                    token_type = 285212672 /* Signature */;
                                    break;
                                case 12:
                                    token_type = 436207616 /* ModuleRef */;
                                    break;
                                case 13:
                                    token_type = 452984832 /* TypeSpec */;
                                    break;
                                case 14:
                                    token_type = 536870912 /* Assembly */;
                                    break;
                                case 15:
                                    token_type = 587202560 /* AssemblyRef */;
                                    break;
                                case 16:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 17:
                                    token_type = 654311424 /* ExportedType */;
                                    break;
                                case 18:
                                    token_type = 671088640 /* ManifestResource */;
                                    break;
                                case 19:
                                    token_type = 704643072 /* GenericParam */;
                                    break;
                            }
                            break;
                        case 3 /* HasFieldMarshal */:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 1:
                                    token_type = 134217728 /* Param */;
                                    break;
                            }
                            break;
                        case 4 /* HasDeclSecurity */:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = 33554432 /* TypeDef */;
                                    break;
                                case 1:
                                    token_type = 100663296 /* Method */;
                                    break;
                                case 2:
                                    token_type = 536870912 /* Assembly */;
                                    break;
                            }
                            break;
                        case 5 /* MemberRefParent */:
                            rid = data >> 3;
                            switch (data & 7) {
                                case 0:
                                    token_type = 33554432 /* TypeDef */;
                                    break;
                                case 1:
                                    token_type = 16777216 /* TypeRef */;
                                    break;
                                case 2:
                                    token_type = 436207616 /* ModuleRef */;
                                    break;
                                case 3:
                                    token_type = 100663296 /* Method */;
                                    break;
                                case 4:
                                    token_type = 452984832 /* TypeSpec */;
                                    break;
                            }
                            break;
                        case 6 /* HasSemantics */:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = 335544320 /* Event */;
                                    break;
                                case 1:
                                    token_type = 385875968 /* Property */;
                                    break;
                            }
                            break;
                        case 7 /* MethodDefOrRef */:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = 100663296 /* Method */;
                                    break;
                                case 1:
                                    token_type = 167772160 /* MemberRef */;
                                    break;
                            }
                            break;
                        case 8 /* MemberForwarded */:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 1:
                                    token_type = 100663296 /* Method */;
                                    break;
                            }
                            break;
                        case 9 /* Implementation */:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = 67108864 /* Field */;
                                    break;
                                case 1:
                                    token_type = 587202560 /* AssemblyRef */;
                                    break;
                                case 2:
                                    token_type = 654311424 /* ExportedType */;
                                    break;
                            }
                            break;
                        case 10 /* CustomAttributeType */:
                            rid = data >> 3;
                            switch (data & 7) {
                                case 2:
                                    token_type = 100663296 /* Method */;
                                    break;
                                case 3:
                                    token_type = 167772160 /* MemberRef */;
                                    break;
                            }
                            break;
                        case 11 /* ResolutionScope */:
                            rid = data >> 2;
                            switch (data & 3) {
                                case 0:
                                    token_type = 0 /* Module */;
                                    break;
                                case 1:
                                    token_type = 436207616 /* ModuleRef */;
                                    break;
                                case 2:
                                    token_type = 587202560 /* AssemblyRef */;
                                    break;
                                case 3:
                                    token_type = 16777216 /* TypeRef */;
                                    break;
                            }
                            break;
                        case 12 /* TypeOrMethodDef */:
                            rid = data >> 1;
                            switch (data & 1) {
                                case 0:
                                    token_type = 33554432 /* TypeDef */;
                                    break;
                                case 1:
                                    token_type = 100663296 /* Method */;
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
                        case 0 /* TypeDefOrRef */:
                            bits = 2;
                            tables = [2 /* TypeDef */, 1 /* TypeRef */, 27 /* TypeSpec */];
                            break;
                        case 1 /* HasConstant */:
                            bits = 2;
                            tables = [4 /* Field */, 8 /* Param */, 23 /* Property */];
                            break;
                        case 2 /* HasCustomAttribute */:
                            bits = 5;
                            tables = [
                                6 /* Method */, 4 /* Field */, 1 /* TypeRef */, 2 /* TypeDef */, 8 /* Param */, 9 /* InterfaceImpl */, 10 /* MemberRef */,
                                0 /* Module */, 14 /* DeclSecurity */, 23 /* Property */, 20 /* Event */, 17 /* StandAloneSig */, 26 /* ModuleRef */,
                                27 /* TypeSpec */, 32 /* Assembly */, 35 /* AssemblyRef */, 38 /* File */, 39 /* ExportedType */,
                                40 /* ManifestResource */, 42 /* GenericParam */];
                            break;
                        case 3 /* HasFieldMarshal */:
                            bits = 1;
                            tables = [4 /* Field */, 8 /* Param */];
                            break;
                        case 4 /* HasDeclSecurity */:
                            bits = 2;
                            tables = [2 /* TypeDef */, 6 /* Method */, 32 /* Assembly */];
                            break;
                        case 5 /* MemberRefParent */:
                            bits = 3;
                            tables = [2 /* TypeDef */, 1 /* TypeRef */, 26 /* ModuleRef */, 6 /* Method */, 27 /* TypeSpec */];
                            break;
                        case 6 /* HasSemantics */:
                            bits = 1;
                            tables = [20 /* Event */, 23 /* Property */];
                            break;
                        case 7 /* MethodDefOrRef */:
                            bits = 1;
                            tables = [6 /* Method */, 10 /* MemberRef */];
                            break;
                        case 8 /* MemberForwarded */:
                            bits = 1;
                            tables = [4 /* Field */, 6 /* Method */];
                            break;
                        case 9 /* Implementation */:
                            bits = 2;
                            tables = [38 /* File */, 35 /* AssemblyRef */, 39 /* ExportedType */];
                            break;
                        case 10 /* CustomAttributeType */:
                            bits = 3;
                            tables = [6 /* Method */, 10 /* MemberRef */];
                            break;
                        case 11 /* ResolutionScope */:
                            bits = 2;
                            tables = [0 /* Module */, 26 /* ModuleRef */, 35 /* AssemblyRef */, 1 /* TypeRef */];
                            break;
                        case 12 /* TypeOrMethodDef */:
                            bits = 1;
                            tables = [2 /* TypeDef */, 6 /* Method */];
                            break;
                    }

                    var max = 0;
                    for (var i = 0; i < tables.length; i++) {
                        max = Math.max(counter(tables[i]), max);
                    }
                    return max < (1 << (16 - bits)) ? 2 : 4;
                }
                CodedIndex.getSize = getSize;
            })(Metadata.CodedIndex || (Metadata.CodedIndex = {}));
            var CodedIndex = Metadata.CodedIndex;
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=CodedIndex.js.map
