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
            var Volitile = (function (_super) {
                __extends(Volitile, _super);
                function Volitile(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Volitile.prototype.number = function () {
                    return 65043;
                };
                return Volitile;
            })(Runtime.OpCode);
            OpCodes.Volitile = Volitile;
            Runtime.OpCode.opCodes[Volitile.prototype.number()] = function (memory, stack) {
                Volitile.Instance = Volitile.Instance || new Volitile(memory, stack);
                return Volitile.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Volitile.js.map