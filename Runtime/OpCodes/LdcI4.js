var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (Runtime) {
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
                    var num = Runtime.Integer.fromBytes(bytes, 32 /* bit32 */);
                    this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(2 /* SignedInt */, num));
                };
                return LdcI4;
            })(Runtime.OpCode);
            OpCodes.LdcI4 = LdcI4;

            Runtime.OpCode.opCodes[LdcI4.prototype.number()] = function (memory, stack) {
                LdcI4.Instance = LdcI4.Instance || new LdcI4(memory, stack);
                return LdcI4.Instance;
            };
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=LdcI4.js.map
