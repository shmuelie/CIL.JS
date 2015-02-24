var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrameValue = (function () {
            function StackFrameValue(type, value) {
                this.type = type;
                this.value = value;
            }
            return StackFrameValue;
        })();
        Runtime.StackFrameValue = StackFrameValue;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrameValue.js.map
