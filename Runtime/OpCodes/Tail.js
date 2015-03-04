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

            Runtime.OpCode.opCodes[Tail.prototype.number()] = Tail;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Tail.js.map
