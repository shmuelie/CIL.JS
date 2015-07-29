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
            var And = (function (_super) {
                __extends(And, _super);
                function And(memory, stack) {
                    _super.call(this, memory, stack);
                }
                And.prototype.number = function () {
                    return 95;
                };
                And.prototype.execute = function (bytes) {
                    var value2 = this.stack[0].evaluationStack.pop();
                    var value1 = this.stack[0].evaluationStack.pop();
                    var int1;
                    var int2;
                    var type;
                    if (value1.type === Runtime.StackFrameValueType.SignedInt && value2.type === Runtime.StackFrameValueType.SignedInt) {
                        int1 = value1.signedInt;
                        int2 = value2.signedInt;
                        type = Runtime.StackFrameValueType.SignedInt;
                    }
                    else if (value1.type === Runtime.StackFrameValueType.UnsignedInt && value2.type === Runtime.StackFrameValueType.UnsignedInt) {
                        int1 = value1.unsignedInt;
                        int2 = value2.unsignedInt;
                        type = Runtime.StackFrameValueType.UnsignedInt;
                    }
                    else {
                        throw new TypeError("add (0x58) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                    var persision = Math.max(int1.bits.length, int2.bits.length);
                    var intBits1 = Runtime.ArrayHelpers.padInt(int1.bits, persision);
                    var intBits2 = Runtime.ArrayHelpers.padInt(int2.bits, persision);
                    var result = [];
                    for (var i = 0; i < persision; i++) {
                        result.push(intBits1[i] && intBits2[i]);
                    }
                    this.stack[0].evaluationStack.push(new Runtime.StackFrameValue(type, result));
                };
                return And;
            })(Runtime.OpCode);
            OpCodes.And = And;
            Runtime.OpCode.opCodes[And.prototype.number()] = function (memory, stack) {
                And.Instance = And.Instance || new And(memory, stack);
                return And.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=And.js.map