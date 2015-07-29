var CIL;
(function (CIL) {
    var TypeSystem;
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
    })(TypeSystem = CIL.TypeSystem || (CIL.TypeSystem = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Type.js.map