var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        var Stack = (function () {
            function Stack() {
                this.argPointers = [];
            }
            return Stack;
        })();
        Runtime.Stack = Stack;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Stack.js.map
