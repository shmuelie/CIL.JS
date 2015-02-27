var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrameValue = (function () {
            function StackFrameValue(type, value, pointer) {
                if (typeof pointer === "undefined") { pointer = null; }
                this.type = type;
                switch (type) {
                    case 1 /* Float */:
                        this.float = value;
                        break;
                    case 4 /* MethodPointer */:
                        this.methodPointer = value;
                        this.pointer = pointer;
                        break;
                    case 0 /* Pointer */:
                        this.pointer = value;
                        break;
                    case 2 /* SignedInt */:
                        this.signedInt = value;
                        break;
                    case 3 /* UnsignedInt */:
                        this.unsignedInt = value;
                        break;
                    case 5 /* FieldPointer */:
                        this.fieldPointer = value;
                        this.pointer = pointer;
                        break;
                }
            }
            return StackFrameValue;
        })();
        Runtime.StackFrameValue = StackFrameValue;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrameValue.js.map
