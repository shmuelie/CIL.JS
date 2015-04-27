var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (MemoryAssembly) {
            "use strict";

            (function (ModuleAttributes) {
                ModuleAttributes[ModuleAttributes["ILOnly"] = 1] = "ILOnly";
                ModuleAttributes[ModuleAttributes["Required32Bit"] = 2] = "Required32Bit";
                ModuleAttributes[ModuleAttributes["StrongNameSigned"] = 8] = "StrongNameSigned";
                ModuleAttributes[ModuleAttributes["Preferred32Bit"] = 0x00020000] = "Preferred32Bit";
            })(MemoryAssembly.ModuleAttributes || (MemoryAssembly.ModuleAttributes = {}));
            var ModuleAttributes = MemoryAssembly.ModuleAttributes;
        })(Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
        var MemoryAssembly = Runtime.MemoryAssembly;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleAttributes.js.map
