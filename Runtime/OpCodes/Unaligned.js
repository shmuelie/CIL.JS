var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var Unaligned = (function (_super) {
            __extends(Unaligned, _super);
            function Unaligned(memory, stack, alignment) {
                _super.call(this, memory, stack);
            }
            Unaligned.prototype.number = function () {
                return 65042;
            };

            Unaligned.prototype.argumentCount = function () {
                return [1];
            };
            return Unaligned;
        })(Runtime.OpCode);
        Runtime.Unaligned = Unaligned;

        Runtime.OpCode.opCodes[Unaligned.prototype.number()] = Unaligned;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Unaligned.js.map
