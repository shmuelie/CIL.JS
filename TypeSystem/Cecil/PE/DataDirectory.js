var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        var PE;
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
        })(PE = Cecil.PE || (Cecil.PE = {}));
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=DataDirectory.js.map