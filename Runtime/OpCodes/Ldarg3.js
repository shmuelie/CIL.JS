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
            var Ldarg3 = (function (_super) {
                __extends(Ldarg3, _super);
                function Ldarg3(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldarg3.prototype.number = function () {
                    return 5;
                };
                Ldarg3.prototype.argumentCount = function () {
                    return [];
                };
                Ldarg3.prototype.execute = function (bytes) {
                    this.do(3);
                };
                return Ldarg3;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg3 = Ldarg3;
            Runtime.OpCode.opCodes[Ldarg3.prototype.number()] = function (memory, stack) {
                Ldarg3.Instance = Ldarg3.Instance || new Ldarg3(memory, stack);
                return Ldarg3.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg3.js.map