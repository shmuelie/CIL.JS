var CIL;
(function (CIL) {
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

            OpCode.prototype.execute = function () {
                return;
            };

            OpCode.prototype.parseArguments = function (bytes) {
                return;
            };
            OpCode.opCodes = {};
            return OpCode;
        })();
        Runtime.OpCode = OpCode;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=OpCode.js.map
