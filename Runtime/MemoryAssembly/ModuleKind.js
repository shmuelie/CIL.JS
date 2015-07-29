var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var MemoryAssembly;
        (function (MemoryAssembly) {
            "use strict";
            (function (ModuleKind) {
                ModuleKind[ModuleKind["Dll"] = 0] = "Dll";
                ModuleKind[ModuleKind["Windows"] = 1] = "Windows";
                ModuleKind[ModuleKind["Console"] = 2] = "Console";
            })(MemoryAssembly.ModuleKind || (MemoryAssembly.ModuleKind = {}));
            var ModuleKind = MemoryAssembly.ModuleKind;
        })(MemoryAssembly = Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleKind.js.map