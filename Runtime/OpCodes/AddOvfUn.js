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

            var AddOvfUn = (function (_super) {
                __extends(AddOvfUn, _super);
                function AddOvfUn(memory, stack) {
                    _super.call(this, memory, stack);
                }
                AddOvfUn.prototype.number = function () {
                    return 215;
                };
                return AddOvfUn;
            })(OpCodes.AddOvf);
            OpCodes.AddOvfUn = AddOvfUn;

            Runtime.OpCode.opCodes[AddOvfUn.prototype.number()] = AddOvfUn;
        })(Runtime.OpCodes || (Runtime.OpCodes = {}));
        var OpCodes = Runtime.OpCodes;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=AddOvfUn.js.map
