var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        var Metadata;
        (function (Metadata) {
            "use strict";
            var Heap = (function () {
                function Heap(section, offset, size) {
                    this.indexSize = 0;
                    this.section = section;
                    this.offset = offset;
                    this.size = size;
                }
                return Heap;
            })();
            Metadata.Heap = Heap;
        })(Metadata = Cecil.Metadata || (Cecil.Metadata = {}));
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Heap.js.map