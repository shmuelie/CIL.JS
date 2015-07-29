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
            Runtime.OpCode.opCodes[AddOvfUn.prototype.number()] = function (memory, stack) {
                AddOvfUn.Instance = AddOvfUn.Instance || new AddOvfUn(memory, stack);
                return AddOvfUn.Instance;
            };
        })(OpCodes = Runtime.OpCodes || (Runtime.OpCodes = {}));
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=AddOvfUn.js.map