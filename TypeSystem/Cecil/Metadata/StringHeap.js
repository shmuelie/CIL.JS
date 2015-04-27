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

            var StringHeap = (function (_super) {
                __extends(StringHeap, _super);
                function StringHeap(section, start, size) {
                    _super.call(this, section, start, size);
                    this.strings = {};
                }
                StringHeap.prototype.read = function (index) {
                    if (index === 0) {
                        return "";
                    }

                    var str = this.strings[index];
                    if (str !== undefined) {
                        return str;
                    }

                    if (index > this.size - 1) {
                        return "";
                    }

                    str = this.readStringAt(index);
                    if (str.length !== 0) {
                        this.strings[index] = str;
                    }
                    return str;
                };

                StringHeap.prototype.readStringAt = function (index) {
                    var data = this.section.data;
                    data.seek(index + this.offset);
                    return data.readString();
                };
                return StringHeap;
            })(Metadata.Heap);
            Metadata.StringHeap = StringHeap;
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=StringHeap.js.map
