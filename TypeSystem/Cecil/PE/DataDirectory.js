var CIL;
(function (CIL) {
    (function (Cecil) {
        (function (PE) {
            "use strict";

            var DataDirectory = (function () {
                function DataDirectory(rva, size) {
                    this.virtulAddress = rva;
                    this.size = size;
                }
                DataDirectory.prototype.isZero = function () {
                    return this.virtulAddress === 0 && this.size === 0;
                };
                return DataDirectory;
            })();
            PE.DataDirectory = DataDirectory;
        })(Cecil.PE || (Cecil.PE = {}));
        var PE = Cecil.PE;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=DataDirectory.js.map
