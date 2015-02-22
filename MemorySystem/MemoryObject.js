var CIL;
(function (CIL) {
    (function (MemorySystem) {
        "use strict";

        var MemoryObject = (function () {
            function MemoryObject() {
                this.references = 0;
            }
            return MemoryObject;
        })();
        MemorySystem.MemoryObject = MemoryObject;
    })(CIL.MemorySystem || (CIL.MemorySystem = {}));
    var MemorySystem = CIL.MemorySystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=MemoryObject.js.map
