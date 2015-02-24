var CIL;
(function (CIL) {
    (function (TypeSystem) {
        "use strict";

        var Type = (function () {
            function Type() {
                this.implements = [];
                this.attributes = [];
                this.fields = [];
                this.methods = [];
                this.properties = [];
            }
            Type.types = {};
            return Type;
        })();
        TypeSystem.Type = Type;
    })(CIL.TypeSystem || (CIL.TypeSystem = {}));
    var TypeSystem = CIL.TypeSystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=Type.js.map
