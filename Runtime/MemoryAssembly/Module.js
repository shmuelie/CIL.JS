var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (MemoryAssembly) {
            "use strict";

            var Module = (function () {
                function Module() {
                }
                return Module;
            })();
            MemoryAssembly.Module = Module;
        })(Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
        var MemoryAssembly = Runtime.MemoryAssembly;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Module.js.map
