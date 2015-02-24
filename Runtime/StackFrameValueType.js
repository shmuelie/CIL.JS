var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        (function (StackFrameValueType) {
            StackFrameValueType[StackFrameValueType["Pointer"] = 0] = "Pointer";
            StackFrameValueType[StackFrameValueType["Float"] = 1] = "Float";
            StackFrameValueType[StackFrameValueType["SignedInt"] = 2] = "SignedInt";
            StackFrameValueType[StackFrameValueType["UnsignedInt"] = 3] = "UnsignedInt";
        })(Runtime.StackFrameValueType || (Runtime.StackFrameValueType = {}));
        var StackFrameValueType = Runtime.StackFrameValueType;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrameValueType.js.map
