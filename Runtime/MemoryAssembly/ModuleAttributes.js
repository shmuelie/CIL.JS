var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var MemoryAssembly;
        (function (MemoryAssembly) {
            "use strict";
            (function (ModuleAttributes) {
                ModuleAttributes[ModuleAttributes["ILOnly"] = 1] = "ILOnly";
                ModuleAttributes[ModuleAttributes["Required32Bit"] = 2] = "Required32Bit";
                ModuleAttributes[ModuleAttributes["StrongNameSigned"] = 8] = "StrongNameSigned";
                ModuleAttributes[ModuleAttributes["Preferred32Bit"] = 131072] = "Preferred32Bit";
            })(MemoryAssembly.ModuleAttributes || (MemoryAssembly.ModuleAttributes = {}));
            var ModuleAttributes = MemoryAssembly.ModuleAttributes;
        })(MemoryAssembly = Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleAttributes.js.map