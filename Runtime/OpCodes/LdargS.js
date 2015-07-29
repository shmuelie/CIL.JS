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
            var LdargS = (function (_super) {
                __extends(LdargS, _super);
                function LdargS(memory, stack) {
                    _super.call(this, memory, stack);
                }
                LdargS.prototype.number = function () {
                    return 14;
                };
                LdargS.prototype.argumentCount = function () {
                    return [1];
                };
                return LdargS;
            })(OpCodes.Ldarg);
            OpCodes.LdargS = LdargS;
            Runtime.OpCode.opCodes[LdargS.prototype.number()] = function (memory, stack) {
                LdargS.Instance = LdargS.Instance || new LdargS(memory, stack);
                return LdargS.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=LdargS.js.map