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

            var Ldarg0 = (function (_super) {
                __extends(Ldarg0, _super);
                function Ldarg0(memory, stack) {
                    _super.call(this, memory, stack, 0);
                }
                Ldarg0.prototype.number = function () {
                    return 2;
                };

                Ldarg0.prototype.argumentCount = function () {
                    return [];
                };
                return Ldarg0;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg0 = Ldarg0;

            Runtime.OpCode.opCodes[Ldarg0.prototype.number()] = Ldarg0;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg0.js.map
