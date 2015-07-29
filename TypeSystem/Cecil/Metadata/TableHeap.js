var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        var Metadata;
        (function (Metadata) {
            "use strict";
            var TableHeap = (function (_super) {
                __extends(TableHeap, _super);
                function TableHeap(section, start, size) {
                    _super.call(this, section, start, size);
                    this.tables = new Array(TableHeap.tableCount);
                }
                TableHeap.prototype.hasTable = function (table) {
                    return this.valid.bits[table];
                };
                TableHeap.tableCount = 45;
                return TableHeap;
            })(Metadata.Heap);
            Metadata.TableHeap = TableHeap;
        })(Metadata = Cecil.Metadata || (Cecil.Metadata = {}));
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=TableHeap.js.map