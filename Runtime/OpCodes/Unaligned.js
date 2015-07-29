var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var OpCodes;
        (function (OpCodes) {
            "use strict";
            var Unaligned = (function (_super) {
                __extends(Unaligned, _super);
                function Unaligned(memory, stack) {
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
            OpCodes.Unaligned = Unaligned;
            Runtime.OpCode.opCodes[Unaligned.prototype.number()] = function (memory, stack) {
                Unaligned.Instance = Unaligned.Instance || new Unaligned(memory, stack);
                return Unaligned.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Unaligned.js.map