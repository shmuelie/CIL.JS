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
            var Ldnull = (function (_super) {
                __extends(Ldnull, _super);
                function Ldnull(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Ldnull.prototype.number = function () {
                    return 20;
                };
                Ldnull.prototype.execute = function (bytes) {
                    this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.Pointer, 0));
                };
                return Ldnull;
            })(Runtime.OpCode);
            OpCodes.Ldnull = Ldnull;
            Runtime.OpCode.opCodes[Ldnull.prototype.number()] = function (memory, stack) {
                Ldnull.Instance = Ldnull.Instance || new Ldnull(memory, stack);
                return Ldnull.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldnull.js.map