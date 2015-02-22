var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrame = (function () {
            function StackFrame() {
                this.argPointers = [];
                this.values = [];
            }
            return StackFrame;
        })();
        Runtime.StackFrame = StackFrame;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrame.js.map
