var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (Runtime) {
        (function (OpCodes) {
            "use strict";

            var No = (function (_super) {
                __extends(No, _super);
                function No(memory, stack, code) {
                    _super.call(this, memory, stack);
                    this.code = code;
                }
                No.prototype.number = function () {
                    return 65049;
                };

                No.prototype.argumentCount = function () {
                    return [1];
                };

                No.prototype.execute = function () {
                    if (this.code % 2 !== 0) {
                        this.code -= 1;
                        // 0x01
                        /*
                        The CLI can optionally skip
                        any type checks normally performed as part of the execution of the subsequent instruction.
                        InvalidCastException can optionally still be thrown if the check would fail.
                        */
                    }
                    if (this.code >= 4) {
                        this.code -= 4;
                        // 0x04
                        /*
                        The CLI can
                        optionally skip any null-reference checks normally performed as part of the execution of the
                        subsequent instruction. NullReferenceException can optionally still be thrown if the check
                        would fail.
                        */
                    }
                    if (this.code === 2) {
                        // 0x02
                        /*
                        The CLI can optionally skip any array range
                        checks normally performed as part of the execution of the subsequent instruction.
                        IndexOutOfRangeException can optionally still be thrown if the check would fail.
                        */
                    }
                };
                return No;
            })(Runtime.OpCode);
            OpCodes.No = No;
            Runtime.OpCode.opCodes[No.prototype.number()] = No;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=No.js.map
