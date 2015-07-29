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
            var Ldarg0 = (function (_super) {
                __extends(Ldarg0, _super);
                function Ldarg0(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldarg0.prototype.number = function () {
                    return 2;
                };
                Ldarg0.prototype.argumentCount = function () {
                    return [];
                };
                Ldarg0.prototype.execute = function (bytes) {
                    this.do(0);
                };
                return Ldarg0;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg0 = Ldarg0;
            Runtime.OpCode.opCodes[Ldarg0.prototype.number()] = function (memory, stack) {
                Ldarg0.Instance = Ldarg0.Instance || new Ldarg0(memory, stack);
                return Ldarg0.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg0.js.map