var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        "use strict";
        var StackFrameValue = (function () {
            function StackFrameValue(type, value, pointer) {
                if (pointer === void 0) { pointer = null; }
                this.type = type;
                switch (type) {
                    case Runtime.StackFrameValueType.Float:
                        this.float = value;
                        break;
                    case Runtime.StackFrameValueType.MethodPointer:
                        this.methodPointer = value;
                        this.pointer = pointer;
                        break;
                    case Runtime.StackFrameValueType.Pointer:
                        this.pointer = value;
                        break;
                    case Runtime.StackFrameValueType.SignedInt:
                        this.signedInt = value;
                        break;
                    case Runtime.StackFrameValueType.UnsignedInt:
                        this.unsignedInt = value;
                        break;
                    case Runtime.StackFrameValueType.FieldPointer:
                        this.fieldPointer = value;
                        this.pointer = pointer;
                        break;
                }
            }
            return StackFrameValue;
        })();
        Runtime.StackFrameValue = StackFrameValue;
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrameValue.js.map