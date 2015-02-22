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

            var Constrained = (function (_super) {
                __extends(Constrained, _super);
                function Constrained(memory, stack) {
                    _super.call(this, memory, stack);
                }
                Constrained.prototype.number = function () {
                    return 65046;
                };

                Constrained.prototype.argumentCount = function () {
                    return [4];
                };

                Constrained.prototype.execute = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    /*
                    If thisType is a reference type (as opposed to a value type) then
                    ptr is dereferenced and passed as the ‘this’ pointer to the callvirt of method
                    If thisType is a value type and thisType implements method then
                    ptr is passed unmodified as the ‘this’ pointer to a call of method implemented by thisType
                    If thisType is a value type and thisType does not implement method then
                    ptr is dereferenced, boxed, and passed as the ‘this’ pointer to the callvirt of method
                    */
                    return;
                };
                return Constrained;
            })(Runtime.OpCode);
            OpCodes.Constrained = Constrained;

            Runtime.OpCode.opCodes[Constrained.prototype.number()] = Constrained;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Constrained.js.map
