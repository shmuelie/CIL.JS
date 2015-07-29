var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        "use strict";
        (function (ModuleKind) {
            ModuleKind[ModuleKind["Dll"] = 0] = "Dll";
            ModuleKind[ModuleKind["Console"] = 1] = "Console";
            ModuleKind[ModuleKind["Windows"] = 2] = "Windows";
            ModuleKind[ModuleKind["NetModule"] = 3] = "NetModule";
        })(Cecil.ModuleKind || (Cecil.ModuleKind = {}));
        var ModuleKind = Cecil.ModuleKind;
        (function (TargetArchitecture) {
            TargetArchitecture[TargetArchitecture["I386"] = 0] = "I386";
            TargetArchitecture[TargetArchitecture["AMD64"] = 1] = "AMD64";
            TargetArchitecture[TargetArchitecture["IA64"] = 2] = "IA64";
            TargetArchitecture[TargetArchitecture["ARMv7"] = 3] = "ARMv7";
        })(Cecil.TargetArchitecture || (Cecil.TargetArchitecture = {}));
        var TargetArchitecture = Cecil.TargetArchitecture;
        (function (ModuleAttributes) {
            ModuleAttributes[ModuleAttributes["ILOnly"] = 1] = "ILOnly";
            ModuleAttributes[ModuleAttributes["Require32Bit"] = 2] = "Require32Bit";
            ModuleAttributes[ModuleAttributes["StrongNameSigned"] = 8] = "StrongNameSigned";
            ModuleAttributes[ModuleAttributes["Preferred32Bit"] = 131072] = "Preferred32Bit";
        })(Cecil.ModuleAttributes || (Cecil.ModuleAttributes = {}));
        var ModuleAttributes = Cecil.ModuleAttributes;
        (function (ModuleCharacteristics) {
            ModuleCharacteristics[ModuleCharacteristics["HighEntropyVA"] = 32] = "HighEntropyVA";
            ModuleCharacteristics[ModuleCharacteristics["DynamicBase"] = 64] = "DynamicBase";
            ModuleCharacteristics[ModuleCharacteristics["NoSEH"] = 1024] = "NoSEH";
            ModuleCharacteristics[ModuleCharacteristics["NXCompat"] = 256] = "NXCompat";
            ModuleCharacteristics[ModuleCharacteristics["AppContainer"] = 4096] = "AppContainer";
            ModuleCharacteristics[ModuleCharacteristics["TerminalServerAware"] = 32768] = "TerminalServerAware";
        })(Cecil.ModuleCharacteristics || (Cecil.ModuleCharacteristics = {}));
        var ModuleCharacteristics = Cecil.ModuleCharacteristics;
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=moduleEnums.js.map