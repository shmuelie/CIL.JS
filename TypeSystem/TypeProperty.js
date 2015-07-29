var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    var TypeSystem;
    (function (TypeSystem) {
        "use strict";
        var TypeProperty = (function (_super) {
            __extends(TypeProperty, _super);
            function TypeProperty() {
                _super.apply(this, arguments);
            }
            return TypeProperty;
        })(TypeSystem.TypeMember);
        TypeSystem.TypeProperty = TypeProperty;
    })(TypeSystem = CIL.TypeSystem || (CIL.TypeSystem = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=TypeProperty.js.map