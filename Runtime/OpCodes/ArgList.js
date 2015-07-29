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
            var ArgList = (function (_super) {
                __extends(ArgList, _super);
                function ArgList(memory, stack) {
                    _super.call(this, memory, stack);
                }
                ArgList.prototype.number = function () {
                    return 65024;
                };
                ArgList.prototype.execute = function (bytes) {
                    throw new Error("NotImplemented");
                };
                return ArgList;
            })(Runtime.OpCode);
            OpCodes.ArgList = ArgList;
            Runtime.OpCode.opCodes[ArgList.prototype.number()] = function (memory, stack) {
                ArgList.Instance = ArgList.Instance || new ArgList(memory, stack);
                return ArgList.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=ArgList.js.map