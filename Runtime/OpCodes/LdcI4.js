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
            var LdcI4 = (function (_super) {
                __extends(LdcI4, _super);
                function LdcI4(memory, stack) {
                    _super.call(this, memory, stack);
                }
                LdcI4.prototype.number = function () {
                    return 32;
                };
                LdcI4.prototype.argumentCount = function () {
                    return [4];
                };
                LdcI4.prototype.execute = function (bytes) {
                    var num = Runtime.Integer.fromBytes(bytes, Runtime.Bitness.bit32);
                    this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.SignedInt, num));
                };
                return LdcI4;
            })(Runtime.OpCode);
            OpCodes.LdcI4 = LdcI4;
            Runtime.OpCode.opCodes[LdcI4.prototype.number()] = function (memory, stack) {
                LdcI4.Instance = LdcI4.Instance || new LdcI4(memory, stack);
                return LdcI4.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=LdcI4.js.map