var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var MemoryAssembly;
        (function (MemoryAssembly) {
            "use strict";
            (function (ModuleCharacteristics) {
                ModuleCharacteristics[ModuleCharacteristics["HighEntropyVA"] = 32] = "HighEntropyVA";
                ModuleCharacteristics[ModuleCharacteristics["DynamicBase"] = 64] = "DynamicBase";
                ModuleCharacteristics[ModuleCharacteristics["NoSEH"] = 1024] = "NoSEH";
                ModuleCharacteristics[ModuleCharacteristics["NXCompat"] = 256] = "NXCompat";
                ModuleCharacteristics[ModuleCharacteristics["AppContainer"] = 4096] = "AppContainer";
                ModuleCharacteristics[ModuleCharacteristics["TerminalServerAware"] = 32768] = "TerminalServerAware";
            })(MemoryAssembly.ModuleCharacteristics || (MemoryAssembly.ModuleCharacteristics = {}));
            var ModuleCharacteristics = MemoryAssembly.ModuleCharacteristics;
        })(MemoryAssembly = Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleCharacteristics.js.map