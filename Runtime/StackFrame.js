var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrame = (function () {
            function StackFrame() {
                this.arguments = [];
                this.values = [];
                this.nextOp = 0;
            }
            StackFrame.prototype.free = function (memory) {
                var i;
                for (i = 0; i < this.arguments.length; i++) {
                    if (this.arguments[i].type === 0 /* Pointer */) {
                        memory.dereferenceObject(this.arguments[i].value);
                    }
                }
                for (i = 0; i < this.values.length; i++) {
                    if (this.values[i].type === 0 /* Pointer */) {
                        memory.dereferenceObject(this.values[i].value);
                    }
                }
            };
            return StackFrame;
        })();
        Runtime.StackFrame = StackFrame;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrame.js.map
