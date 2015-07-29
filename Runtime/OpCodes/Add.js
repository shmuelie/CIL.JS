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
            var Add = (function (_super) {
                __extends(Add, _super);
                function Add(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Add.prototype.number = function () {
                    return 88;
                };
                Add.prototype.execute = function (bytes) {
                    var value2 = this.stack[0].evaluationStack.pop();
                    var value1 = this.stack[0].evaluationStack.pop();
                    if (value1.type === Runtime.StackFrameValueType.SignedInt && value2.type === Runtime.StackFrameValueType.SignedInt) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.SignedInt, value1.signedInt.add(value2.signedInt)));
                    }
                    else if (value1.type === Runtime.StackFrameValueType.UnsignedInt && value2.type === Runtime.StackFrameValueType.UnsignedInt) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.UnsignedInt, value1.unsignedInt.add(value2.unsignedInt)));
                    }
                    else if (value1.type === Runtime.StackFrameValueType.Float && value2.type === Runtime.StackFrameValueType.Float) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.Float, value1.float + value2.float));
                    }
                    else {
                        throw new TypeError("add (0x58) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                };
                return Add;
            })(Runtime.OpCode);
            OpCodes.Add = Add;
            Runtime.OpCode.opCodes[Add.prototype.number()] = function (memory, stack) {
                Add.Instance = Add.Instance || new Add(memory, stack);
                return Add.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Add.js.map