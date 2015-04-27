var CIL;
(function (CIL) {
    (function (Cecil) {
        (function (Metadata) {
            "use strict";

            (function (TokenType) {
                TokenType[TokenType["Module"] = 0x00000000] = "Module";
                TokenType[TokenType["TypeRef"] = 0x01000000] = "TypeRef";
                TokenType[TokenType["TypeDef"] = 0x02000000] = "TypeDef";
                TokenType[TokenType["Field"] = 0x04000000] = "Field";
                TokenType[TokenType["Method"] = 0x06000000] = "Method";
                TokenType[TokenType["Param"] = 0x08000000] = "Param";
                TokenType[TokenType["InterfaceImpl"] = 0x09000000] = "InterfaceImpl";
                TokenType[TokenType["MemberRef"] = 0x0a000000] = "MemberRef";
                TokenType[TokenType["CustomAttribute"] = 0x0c000000] = "CustomAttribute";
                TokenType[TokenType["Permission"] = 0x0e000000] = "Permission";
                TokenType[TokenType["Signature"] = 0x11000000] = "Signature";
                TokenType[TokenType["Event"] = 0x14000000] = "Event";
                TokenType[TokenType["Property"] = 0x17000000] = "Property";
                TokenType[TokenType["ModuleRef"] = 0x1a000000] = "ModuleRef";
                TokenType[TokenType["TypeSpec"] = 0x1b000000] = "TypeSpec";
                TokenType[TokenType["Assembly"] = 0x20000000] = "Assembly";
                TokenType[TokenType["AssemblyRef"] = 0x23000000] = "AssemblyRef";
                TokenType[TokenType["File"] = 0x26000000] = "File";
                TokenType[TokenType["ExportedType"] = 0x27000000] = "ExportedType";
                TokenType[TokenType["ManifestResource"] = 0x28000000] = "ManifestResource";
                TokenType[TokenType["GenericParam"] = 0x2a000000] = "GenericParam";
                TokenType[TokenType["MethodSpec"] = 0x2b000000] = "MethodSpec";
                TokenType[TokenType["String"] = 0x70000000] = "String";
            })(Metadata.TokenType || (Metadata.TokenType = {}));
            var TokenType = Metadata.TokenType;
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=TokenType.js.map
