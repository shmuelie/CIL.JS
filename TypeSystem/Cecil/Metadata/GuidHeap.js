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

            var guid_size = 16;

            var GuidHeap = (function (_super) {
                __extends(GuidHeap, _super);
                function GuidHeap(section, start, size) {
                    _super.call(this, section, start, size);
                }
                GuidHeap.prototype.read = function (index) {
                    if (index === 0) {
                        return [];
                    }

                    index--;

                    var data = this.section.data;
                    data.seek(this.offset + index);
                    return data.readNumberByteRange(guid_size);
                };
                return GuidHeap;
            })(Metadata.Heap);
            Metadata.GuidHeap = GuidHeap;
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=GuidHeap.js.map
