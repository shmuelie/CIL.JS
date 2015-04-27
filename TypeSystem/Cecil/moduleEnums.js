var CIL;
(function (CIL) {
    (function (Cecil) {
        "use strict";

        (function (ModuleKind) {
            ModuleKind[ModuleKind["Dll"] = 0] = "Dll";
            ModuleKind[ModuleKind["Console"] = 1] = "Console";
            ModuleKind[ModuleKind["Windows"] = 2] = "Windows";
            ModuleKind[ModuleKind["NetModule"] = 3] = "NetModule";
        })(Cecil.ModuleKind || (Cecil.ModuleKind = {}));
        var ModuleKind = Cecil.ModuleKind;

        (function (TargetArchitechture) {
            TargetArchitechture[TargetArchitechture["I386"] = 0] = "I386";
            TargetArchitechture[TargetArchitechture["AMD64"] = 1] = "AMD64";
            TargetArchitechture[TargetArchitechture["IA64"] = 2] = "IA64";
            TargetArchitechture[TargetArchitechture["ARMv7"] = 3] = "ARMv7";
        })(Cecil.TargetArchitechture || (Cecil.TargetArchitechture = {}));
        var TargetArchitechture = Cecil.TargetArchitechture;

        (function (ModuleAttributes) {
            ModuleAttributes[ModuleAttributes["ILOnly"] = 1] = "ILOnly";
            ModuleAttributes[ModuleAttributes["Require32Bit"] = 2] = "Require32Bit";
            ModuleAttributes[ModuleAttributes["StrongNameSigned"] = 8] = "StrongNameSigned";
            ModuleAttributes[ModuleAttributes["Preferred32Bit"] = 0x00020000] = "Preferred32Bit";
        })(Cecil.ModuleAttributes || (Cecil.ModuleAttributes = {}));
        var ModuleAttributes = Cecil.ModuleAttributes;

        (function (ModuleCharacteristics) {
            ModuleCharacteristics[ModuleCharacteristics["HighEntropyVA"] = 0x0020] = "HighEntropyVA";
            ModuleCharacteristics[ModuleCharacteristics["DynamicBase"] = 0x0040] = "DynamicBase";
            ModuleCharacteristics[ModuleCharacteristics["NoSEH"] = 0x0400] = "NoSEH";
            ModuleCharacteristics[ModuleCharacteristics["NXCompat"] = 0x0100] = "NXCompat";
            ModuleCharacteristics[ModuleCharacteristics["AppContainer"] = 0x1000] = "AppContainer";
            ModuleCharacteristics[ModuleCharacteristics["TerminalServerAware"] = 0x8000] = "TerminalServerAware";
        })(Cecil.ModuleCharacteristics || (Cecil.ModuleCharacteristics = {}));
        var ModuleCharacteristics = Cecil.ModuleCharacteristics;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=moduleEnums.js.map
