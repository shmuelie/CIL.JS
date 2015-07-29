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
            var Call = (function (_super) {
                __extends(Call, _super);
                function Call(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Call.prototype.number = function () {
                    return 40;
                };
                Call.prototype.argumentCount = function () {
                    return [4];
                };
                Call.prototype.execute = function (bytes) {
                    var _this = this;
                    throw new Error("System.NotImplented"); // Need to convert bytes to method
                    var method;
                    var nextFrame = new Runtime.StackFrame();
                    while (nextFrame.arguments.length < method.arguments.length) {
                        nextFrame.arguments.unshift(this.stack[0].evaluationStack.pop());
                    }
                    if (method.static) {
                        nextFrame.this = null;
                    }
                    else {
                        nextFrame.this = this.stack[0].evaluationStack.pop().pointer;
                    }
                    nextFrame.method = method;
                    if (this.lastOp instanceof OpCodes.Tail) {
                        var lastFrame = this.stack.shift();
                        this.stack.unshift(nextFrame);
                        lastFrame.free(this.memory, function () {
                            _this.stack[0].continue();
                        });
                        this.stack[0].wait();
                    }
                    this.stack.unshift(nextFrame);
                };
                return Call;
            })(Runtime.OpCode);
            OpCodes.Call = Call;
            Runtime.OpCode.opCodes[Call.prototype.number()] = function (memory, stack) {
                Call.Instance = Call.Instance || new Call(memory, stack);
                return Call.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Call.js.map