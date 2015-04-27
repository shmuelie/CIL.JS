var CIL;
(function (CIL) {
    (function (Cecil) {
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
        })(Cecil.Metadata || (Cecil.Metadata = {}));
        var Metadata = Cecil.Metadata;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=Heap.js.map
