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
            var Ldarg = (function (_super) {
                __extends(Ldarg, _super);
                function Ldarg(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldarg.prototype.number = function () {
                    return 65033;
                };
                Ldarg.prototype.argumentCount = function () {
                    return [2];
                };
                Ldarg.prototype.execute = function (bytes) {
                    this.do(Runtime.Integer.fromBytes(bytes, Runtime.Bitness.bit16).toNumber());
                };
                Ldarg.prototype.do = function (argIndex) {
                    this.stack[0].evaluationStack.push(this.stack[0].arguments[argIndex]);
                };
                return Ldarg;
            })(Runtime.OpCode);
            OpCodes.Ldarg = Ldarg;
            Runtime.OpCode.opCodes[Ldarg.prototype.number()] = function (memory, stack) {
                Ldarg.Instance = Ldarg.Instance || new Ldarg(memory, stack);
                return Ldarg.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg.js.map