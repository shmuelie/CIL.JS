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
            var AddOvf = (function (_super) {
                __extends(AddOvf, _super);
                function AddOvf(memory, stack) {
                    _super.call(this, memory, stack);
                }
                AddOvf.prototype.number = function () {
                    return 214;
                };
                AddOvf.prototype.execute = function (bytes) {
                    var value2 = this.stack[0].evaluationStack.pop();
                    var value1 = this.stack[0].evaluationStack.pop();
                    if (value1.type === Runtime.StackFrameValueType.SignedInt && value2.type === Runtime.StackFrameValueType.SignedInt) {
                        try {
                            this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.SignedInt, value1.signedInt.add(value2.signedInt, true)));
                        }
                        catch (ex) {
                            if (ex.message === "OVERFLOW") {
                                // TODO: Throw System.OverflowException
                                throw ex;
                            }
                        }
                    }
                    else if (value1.type === Runtime.StackFrameValueType.UnsignedInt && value2.type === Runtime.StackFrameValueType.UnsignedInt) {
                        try {
                            this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.UnsignedInt, value1.unsignedInt.add(value2.unsignedInt, true)));
                        }
                        catch (ex) {
                            if (ex.message === "OVERFLOW") {
                                // TODO: Throw System.OverflowException
                                throw ex;
                            }
                        }
                    }
                    else if (value1.type === Runtime.StackFrameValueType.Float && value2.type === Runtime.StackFrameValueType.Float) {
                        this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(Runtime.StackFrameValueType.Float, value1.float + value2.float));
                    }
                    else {
                        throw new TypeError("add.ovf (0xD6) or add.ovf.un (0xD7) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                };
                return AddOvf;
            })(Runtime.OpCode);
            OpCodes.AddOvf = AddOvf;
            Runtime.OpCode.opCodes[AddOvf.prototype.number()] = function (memory, stack) {
                AddOvf.Instance = AddOvf.Instance || new AddOvf(memory, stack);
                return AddOvf.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=AddOvf.js.map