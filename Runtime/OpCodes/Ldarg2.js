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
            var Ldarg2 = (function (_super) {
                __extends(Ldarg2, _super);
                function Ldarg2(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldarg2.prototype.number = function () {
                    return 4;
                };
                Ldarg2.prototype.argumentCount = function () {
                    return [];
                };
                Ldarg2.prototype.execute = function (bytes) {
                    this.do(2);
                };
                return Ldarg2;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg2 = Ldarg2;
            Runtime.OpCode.opCodes[Ldarg2.prototype.number()] = function (memory, stack) {
                Ldarg2.Instance = Ldarg2.Instance || new Ldarg2(memory, stack);
                return Ldarg2.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg2.js.map