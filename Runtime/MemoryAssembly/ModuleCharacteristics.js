var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (MemoryAssembly) {
            "use strict";

            (function (ModuleCharacteristics) {
                ModuleCharacteristics[ModuleCharacteristics["HighEntropyVA"] = 0x0020] = "HighEntropyVA";
                ModuleCharacteristics[ModuleCharacteristics["DynamicBase"] = 0x0040] = "DynamicBase";
                ModuleCharacteristics[ModuleCharacteristics["NoSEH"] = 0x0400] = "NoSEH";
                ModuleCharacteristics[ModuleCharacteristics["NXCompat"] = 0x0100] = "NXCompat";
                ModuleCharacteristics[ModuleCharacteristics["AppContainer"] = 0x1000] = "AppContainer";
                ModuleCharacteristics[ModuleCharacteristics["TerminalServerAware"] = 0x8000] = "TerminalServerAware";
            })(MemoryAssembly.ModuleCharacteristics || (MemoryAssembly.ModuleCharacteristics = {}));
            var ModuleCharacteristics = MemoryAssembly.ModuleCharacteristics;
        })(Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
        var MemoryAssembly = Runtime.MemoryAssembly;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=ModuleCharacteristics.js.map
