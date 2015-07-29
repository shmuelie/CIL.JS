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
            var Div = (function (_super) {
                __extends(Div, _super);
                function Div(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Div.prototype.number = function () {
                    return 91;
                };
                Div.prototype.execute = function (bytes) {
                    var value2 = this.stack[0].evaluationStack.pop();
                    var value1 = this.stack[0].evaluationStack.pop();
                    if (value1.type === Runtime.StackFrameValueType.SignedInt && value2.type === Runtime.StackFrameValueType.SignedInt) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.SignedInt, value1.signedInt.division(value2.signedInt).q));
                    }
                    else if (value1.type === Runtime.StackFrameValueType.UnsignedInt && value2.type === Runtime.StackFrameValueType.UnsignedInt) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.UnsignedInt, value1.unsignedInt.division(value2.unsignedInt).q));
                    }
                    else if (value1.type === Runtime.StackFrameValueType.Float && value2.type === Runtime.StackFrameValueType.Float) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.Float, value1.float / value2.float));
                    }
                    else {
                        throw new TypeError("add (0x5B) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                };
                return Div;
            })(Runtime.OpCode);
            OpCodes.Div = Div;
            Runtime.OpCode.opCodes[Div.prototype.number()] = function (memory, stack) {
                Div.Instance = Div.Instance || new Div(memory, stack);
                return Div.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Div.js.map