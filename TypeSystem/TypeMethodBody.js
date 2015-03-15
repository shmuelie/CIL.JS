var CIL;
(function (CIL) {
    (function (TypeSystem) {
        "use strict";

        var TypeMethodBody = (function () {
            function TypeMethodBody() {
                this.opCodes = [];
                this.arguments = [];
            }
            return TypeMethodBody;
        })();
        TypeSystem.TypeMethodBody = TypeMethodBody;
    })(CIL.TypeSystem || (CIL.TypeSystem = {}));
    var TypeSystem = CIL.TypeSystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=TypeMethodBody.js.map
