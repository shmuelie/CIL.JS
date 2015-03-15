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

            var Ldarg1 = (function (_super) {
                __extends(Ldarg1, _super);
                function Ldarg1(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldarg1.prototype.number = function () {
                    return 3;
                };

                Ldarg1.prototype.argumentCount = function () {
                    return [];
                };

                Ldarg1.prototype.execute = function (bytes) {
                    this.do(1);
                };
                return Ldarg1;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg1 = Ldarg1;

            Runtime.OpCode.opCodes[Ldarg1.prototype.number()] = function (memory, stack) {
                Ldarg1.Instance = Ldarg1.Instance || new Ldarg1(memory, stack);
                return Ldarg1.Instance;
            };
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg1.js.map
