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

            var ArgList = (function (_super) {
                __extends(ArgList, _super);
                function ArgList(memory, stack) {
                    _super.call(this, memory, stack);
                }
                ArgList.prototype.number = function () {
                    return 65024;
                };

                ArgList.prototype.execute = function () {
                    throw new Error("NotImplemented");
                };
                return ArgList;
            })(Runtime.OpCode);
            OpCodes.ArgList = ArgList;

            Runtime.OpCode.opCodes[ArgList.prototype.number()] = ArgList;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=ArgList.js.map
