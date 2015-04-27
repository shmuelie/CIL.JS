var CIL;
(function (CIL) {
    (function (Cecil) {
        (function (PE) {
            var Image = (function () {
                function Image() {
                    this.codedIndexSizes = CIL.Runtime.ArrayHelpers.arrayGenerator(13, null);
                    this.counter = this.getTableLength;
                }
                Image.prototype.hasTable = function (table) {
                    return this.getTableLength(table) > 0;
                };

                Image.prototype.getTableLength = function (table) {
                    return this.tableHeap.tables[table].length;
                };

                Image.prototype.getCodeIndexSize = function (codedIndex) {
                    var size = this.codedIndexSizes[codedIndex];
                    if (size) {
                    }
                };
                return Image;
            })();
            PE.Image = Image;
        })(Cecil.PE || (Cecil.PE = {}));
        var PE = Cecil.PE;
    })(CIL.Cecil || (CIL.Cecil = {}));
    var Cecil = CIL.Cecil;
})(CIL || (CIL = {}));
//# sourceMappingURL=Image.js.map
