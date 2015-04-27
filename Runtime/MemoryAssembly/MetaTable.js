var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (MemoryAssembly) {
            "use strict";

            var MetaTable = (function () {
                function MetaTable() {
                }
                return MetaTable;
            })();
            MemoryAssembly.MetaTable = MetaTable;
        })(Runtime.MemoryAssembly || (Runtime.MemoryAssembly = {}));
        var MemoryAssembly = Runtime.MemoryAssembly;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=MetaTable.js.map
