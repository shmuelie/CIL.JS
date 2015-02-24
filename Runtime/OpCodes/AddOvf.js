﻿var __extends = this.__extends || function (d, b) {
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

            var AddOvf = (function (_super) {
                __extends(AddOvf, _super);
                function AddOvf(memory, stack) {
                    _super.call(this, memory, stack);
                }
                AddOvf.prototype.number = function () {
                    return 214;
                };

                AddOvf.prototype.execute = function () {
                    var value2 = this.stack[0].values.pop();
                    var value1 = this.stack[0].values.pop();

                    if ((value1.type === 2 /* SignedInt */ || value1.type === 3 /* UnsignedInt */) && (value2.type === 2 /* SignedInt */ || value2.type === 3 /* UnsignedInt */)) {
                        var int1 = value1.value;
                        var int2 = value2.value;
                        try  {
                            this.stack[0].values.push(new Runtime.StackFrameValue(value1.type, int1.intAdd(int2, true)));
                        } catch (ex) {
                            if (ex.message === "OVERFLOW") {
                                throw ex;
                            }
                        }
                    } else if (value1.type === 1 /* Float */ && value2.type === 1 /* Float */) {
                        this.stack[0].values.push(new Runtime.StackFrameValue(1 /* Float */, value1.value + value2.value));
                    } else {
                        throw new TypeError("add (0x58) called on operands of type " + Runtime.StackFrameValueType[value1.type] + " and " + Runtime.StackFrameValueType[value2.type] + ".");
                    }
                };
                return AddOvf;
            })(Runtime.OpCode);
            OpCodes.AddOvf = AddOvf;

            Runtime.OpCode.opCodes[AddOvf.prototype.number()] = AddOvf;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=AddOvf.js.map