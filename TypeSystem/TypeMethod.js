var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (TypeSystem) {
        "use strict";

        var TypeMethod = (function (_super) {
            __extends(TypeMethod, _super);
            function TypeMethod() {
                _super.call(this);
                this.arguments = [];
            }
            return TypeMethod;
        })(TypeSystem.TypeMember);
        TypeSystem.TypeMethod = TypeMethod;
    })(CIL.TypeSystem || (CIL.TypeSystem = {}));
    var TypeSystem = CIL.TypeSystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=TypeMethod.js.map
