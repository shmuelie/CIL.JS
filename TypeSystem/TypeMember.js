var CIL;
(function (CIL) {
    (function (TypeSystem) {
        "use strict";

        var TypeMember = (function () {
            function TypeMember() {
                this.attributes = [];
            }
            return TypeMember;
        })();
        TypeSystem.TypeMember = TypeMember;
    })(CIL.TypeSystem || (CIL.TypeSystem = {}));
    var TypeSystem = CIL.TypeSystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=TypeMember.js.map
