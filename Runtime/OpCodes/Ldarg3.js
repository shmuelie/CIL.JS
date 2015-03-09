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

            var Ldarg3 = (function (_super) {
                __extends(Ldarg3, _super);
                function Ldarg3(memory, stack) {
                    _super.call(this, memory, stack);
                    this.setArg(3);
                }
                Ldarg3.prototype.number = function () {
                    return 5;
                };

                Ldarg3.prototype.argumentCount = function () {
                    return [];
                };
                return Ldarg3;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg3 = Ldarg3;

            Runtime.OpCode.opCodes[Ldarg3.prototype.number()] = Ldarg3;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg3.js.map
