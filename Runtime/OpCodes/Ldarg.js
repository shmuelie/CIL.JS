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

                Ldarg.prototype.execute = function () {
                    this.stack[0].evaluationStack.push(this.stack[0].arguments[this.argIndex]);
                };

                Ldarg.prototype.parseArguments = function (bytes) {
                    var int = Runtime.Integer.fromBytes(bytes);
                    var value = 0;
                    for (var i = 0; i < int.bits.length; i++) {
                        if (int.bits[i]) {
                            value += Math.pow(2, int.bits.length - 1 - i);
                        }
                    }
                    this.argIndex = value;
                };

                Ldarg.prototype.setArg = function (argIndex) {
                    this.argIndex = argIndex;
                };
                return Ldarg;
            })(Runtime.OpCode);
            OpCodes.Ldarg = Ldarg;

            Runtime.OpCode.opCodes[Ldarg.prototype.number()] = Ldarg;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg.js.map
