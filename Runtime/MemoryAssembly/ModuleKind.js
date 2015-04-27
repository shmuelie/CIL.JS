var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (MemoryAssembly) {
            "use strict";

            (function (ModuleKind) {
                ModuleKind[ModuleKind["Dll"] = 0] = "Dll";
                ModuleKind[ModuleKind["Windows"] = 1] = "Windows";
                ModuleKind[ModuleKind["Console"] = 2] = "Console";
            })(MemoryAssembly.ModuleKind || (MemoryAssembly.ModuleKind = {}));
            var ModuleKind = MemoryAssembly.ModuleKind;
        })(Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
        var MemoryAssembly = Runtime.MemoryAssembly;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleKind.js.map
