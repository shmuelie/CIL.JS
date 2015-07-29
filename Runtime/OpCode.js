var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        "use strict";
        var OpCode = (function () {
            function OpCode(memory, stack) {
                this.memory = memory;
                this.stack = stack;
            }
            OpCode.prototype.number = function () {
                return 0;
            };
            OpCode.prototype.argumentCount = function () {
                return [];
            };
            OpCode.prototype.execute = function (bytes) {
                return;
            };
            OpCode.opCodes = {};
            return OpCode;
        })();
        Runtime.OpCode = OpCode;
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=OpCode.js.map