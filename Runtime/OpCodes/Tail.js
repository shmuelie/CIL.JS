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
            var Tail = (function (_super) {
                __extends(Tail, _super);
                function Tail(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Tail.prototype.number = function () {
                    return 65044;
                };
                return Tail;
            })(Runtime.OpCode);
            OpCodes.Tail = Tail;
            Runtime.OpCode.opCodes[Tail.prototype.number()] = function (memory, stack) {
                Tail.Instance = Tail.Instance || new Tail(memory, stack);
                return Tail.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Tail.js.map