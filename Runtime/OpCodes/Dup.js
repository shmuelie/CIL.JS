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
            var Dup = (function (_super) {
                __extends(Dup, _super);
                function Dup(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Dup.prototype.number = function () {
                    return 37;
                };
                Dup.prototype.execute = function (bytes) {
                    var values = this.stack[0].evaluationStack;
                    values.push(values[values.length - 1]);
                };
                return Dup;
            })(Runtime.OpCode);
            OpCodes.Dup = Dup;
            Runtime.OpCode.opCodes[Dup.prototype.number()] = function (memory, stack) {
                Dup.Instance = Dup.Instance || new Dup(memory, stack);
                return Dup.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Dup.js.map