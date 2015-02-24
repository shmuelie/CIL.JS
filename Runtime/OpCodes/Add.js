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

            var Add = (function (_super) {
                __extends(Add, _super);
                function Add(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Add.prototype.number = function () {
                    return 88;
                };

                Add.prototype.execute = function () {
                    var value2 = this.stack[0].values.pop();
                    var value1 = this.stack[0].values.pop();

                    if ((value1.type === 2 /* SignedInt */ || value1.type === 3 /* UnsignedInt */) && (value2.type === 2 /* SignedInt */ || value2.type === 3 /* UnsignedInt */)) {
                        var int1 = value1.value;
                        var int2 = value2.value;
                        this.stack[0].values.push(new Runtime.StackFrameValue(value1.type, int1.intAdd(int2)));
                    } else if (value1.type === 1 /* Float */ && value2.type === 1 /* Float */) {
                        this.stack[0].values.push(new Runtime.StackFrameValue(1 /* Float */, value1.value + value2.value));
                    } else {
                        throw new TypeError("add (0x58) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                };
                return Add;
            })(Runtime.OpCode);
            OpCodes.Add = Add;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Add.js.map
