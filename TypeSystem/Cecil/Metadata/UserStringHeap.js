var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    (function (Cecil) {
        (function (Metadata) {
            "use strict";

            var UserStringHeap = (function (_super) {
                __extends(UserStringHeap, _super);
                function UserStringHeap(section, start, size) {
                    _super.call(this, section, start, size);
                }
                UserStringHeap.prototype.readStringAt = function (index) {
                    var data = this.section.data;
                    data.seek(index + this.offset);

                    var length = data.readPackedInt().toNumber() & ~1;
                    if (length < 1) {
                        return "";
                    }

                    var chars = [];
                    for (var i = 0; i < length; i++) {
                        var b0 = data.readNumberByte();
                        var b1 = data.readNumberByte();
                        chars.push(String.fromCharCode(b0 | b1 << 8));
                    }
                    chars.join("");
                };
                return UserStringHeap;
            })(Metadata.StringHeap);
            Metadata.UserStringHeap = UserStringHeap;
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=UserStringHeap.js.map
