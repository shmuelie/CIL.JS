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

            var Call = (function (_super) {
                __extends(Call, _super);
                function Call(memory, stack, method) {
                    _super.call(this, memory, stack);
                    this.method = method;
                }
                Call.prototype.number = function () {
                    return 40;
                };

                Call.prototype.argumentCount = function () {
                    return [4];
                };

                Call.prototype.execute = function () {
                    var nextFrame = new Runtime.StackFrame();
                    while (nextFrame.arguments.length < this.method.arguments.length) {
                        nextFrame.arguments.unshift(this.stack[0].evaluationStack.pop());
                    }
                    if (this.method.static) {
                        nextFrame.this = null;
                    } else {
                        nextFrame.this = this.stack[0].evaluationStack.pop().pointer;
                    }
                    nextFrame.method = this.method;
                    if (this.lastOp instanceof OpCodes.Tail) {
                        this.stack.shift().free(this.memory);
                    }
                    this.stack.unshift(nextFrame);
                };
                return Call;
            })(Runtime.OpCode);
            OpCodes.Call = Call;

            Runtime.OpCode.opCodes[Call.prototype.number()] = Call;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Call.js.map
