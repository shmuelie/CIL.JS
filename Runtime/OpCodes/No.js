var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        var OpCodes;
        (function (OpCodes) {
            "use strict";
            var No = (function (_super) {
                __extends(No, _super);
                function No(memory, stack) {
                    _super.call(this, memory, stack);
                }
                No.prototype.number = function () {
                    return 65049;
                };
                No.prototype.argumentCount = function () {
                    return [1];
                };
                No.prototype.execute = function (bytes) {
                    var code = bytes[0];
                    if (code % 2 !== 0) {
                        code -= 1;
                    }
                    if (code >= 4) {
                        code -= 4;
                    }
                    if (code === 2) {
                    }
                };
                return No;
            })(Runtime.OpCode);
            OpCodes.No = No;
            Runtime.OpCode.opCodes[No.prototype.number()] = function (memory, stack) {
                No.Instance = No.Instance || new No(memory, stack);
                return No.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=No.js.map