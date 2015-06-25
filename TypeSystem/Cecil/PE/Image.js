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
                    if (size !== null) {
                        return size;
                    }
                    size = Cecil.Metadata.CodedIndex.getSize(codedIndex, this.counter);
                    return size;
                };

                Image.prototype.resolveVirtualAddress = function (rva) {
                    var section = this.getSectionAtVirtualAddress(rva);
                    if (section === null) {
                        throw new Error("ArgumentOutOfRangeException");
                    }
                    return this.resolveVirtualAddressInSection(rva, section);
                };

                Image.prototype.resolveVirtualAddressInSection = function (rva, section) {
                    return rva + section.pointerToRawData - section.virtualAddress;
                };

                Image.prototype.getSection = function (name) {
                    var sections = this.sections;
                    for (var i = 0; i < sections.length; i++) {
                        var section = sections[i];
                        if (section.name === name) {
                            return section;
                        }
                    }
                    return null;
                };

                Image.prototype.getSectionAtVirtualAddress = function (rva) {
                    var sections = this.sections;
                    for (var i = 0; i < sections.length; i++) {
                        var section = sections[i];
                        if (rva >= section.virtualAddress && rva < section.virtualAddress + section.sizeOfRawData) {
                            return section;
                        }
                    }
                    return null;
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
