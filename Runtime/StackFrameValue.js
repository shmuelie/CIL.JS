var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var StackFrameValue = (function () {
            function StackFrameValue(type, value) {
                this.type = type;
                switch (type) {
                    case 1 /* Float */:
                        this.float = value;
                        break;
                    case 4 /* MethodPointer */:
                        this.methodPointer = value;
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
                }
            }
            return StackFrameValue;
        })();
        Runtime.StackFrameValue = StackFrameValue;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=StackFrameValue.js.map
