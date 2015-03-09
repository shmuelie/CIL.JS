﻿var __extends = this.__extends || function (d, b) {
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

            var Ldarg2 = (function (_super) {
                __extends(Ldarg2, _super);
                function Ldarg2(memory, stack) {
                    _super.call(this, memory, stack);
                    this.setArg(2);
                }
                Ldarg2.prototype.number = function () {
                    return 4;
                };

                Ldarg2.prototype.argumentCount = function () {
                    return [];
                };
                return Ldarg2;
            })(OpCodes.Ldarg);
            OpCodes.Ldarg2 = Ldarg2;

            Runtime.OpCode.opCodes[Ldarg2.prototype.number()] = Ldarg2;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Ldarg2.js.map
