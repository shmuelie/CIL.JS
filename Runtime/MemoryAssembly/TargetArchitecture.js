var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        (function (TargetArchitecture) {
            TargetArchitecture[TargetArchitecture["I386"] = 0x014c] = "I386";
            TargetArchitecture[TargetArchitecture["AMD64"] = 0x8664] = "AMD64";
            TargetArchitecture[TargetArchitecture["IA64"] = 0x0200] = "IA64";
            TargetArchitecture[TargetArchitecture["ARMv7"] = 0x01c4] = "ARMv7";
        })(Runtime.TargetArchitecture || (Runtime.TargetArchitecture = {}));
        var TargetArchitecture = Runtime.TargetArchitecture;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=TargetArchitecture.js.map
