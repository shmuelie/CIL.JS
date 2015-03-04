var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrame = (function () {
            function StackFrame() {
                this.arguments = [];
                this.evaluationStack = [];
                this.nextOp = 0;
            }
            StackFrame.prototype.wait = function () {
                this.waitCount++;
            };

            StackFrame.prototype.continue = function () {
                this.waitCount--;
            };

            StackFrame.prototype.free = function (memory, callback) {
                var _this = this;
                var i = -1;
                var firstLoopEnd = function () {
                    i++;
                    if (i < _this.arguments.length) {
                        firstLoop();
                    } else {
                        i = -1;
                        secondLoopEnd();
                    }
                };
                var firstLoop = function () {
                    if (_this.arguments[i].type === 0 /* Pointer */) {
                        memory.dereferenceObject(_this.arguments[i].pointer, firstLoopEnd);
                    } else {
                        firstLoopEnd();
                    }
                };
                var secondLoopEnd = function () {
                    i++;
                    if (i < _this.evaluationStack.length) {
                        secondLoop();
                    } else {
                        callback();
                    }
                };
                var secondLoop = function () {
                    if (_this.evaluationStack[i].type === 0 /* Pointer */) {
                        memory.dereferenceObject(_this.evaluationStack[i].pointer, secondLoopEnd);
                    } else {
                        secondLoopEnd();
                    }
                };
                firstLoopEnd();
            };
            return StackFrame;
        })();
        Runtime.StackFrame = StackFrame;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrame.js.map
