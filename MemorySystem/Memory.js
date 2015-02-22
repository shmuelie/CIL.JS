var CIL;
(function (CIL) {
    (function (MemorySystem) {
        "use strict";

        var Memory = (function () {
            function Memory() {
                this.objects = [];
                this.freeList = [];
            }
            Memory.prototype.addObject = function (obj) {
                if (this.freeList.length === 0) {
                    obj.id = this.objects.push(obj) - 1;
                } else {
                    obj.id = this.freeList.pop();
                    this.objects[obj.id] = obj;
                }
                return obj.id;
            };

            Memory.prototype.assignField = function (pointer, name, value) {
                var oldPointer = this.objects[pointer].fields[name];
                this.objects[pointer].fields[name] = value;
                this.dereferenceObject(oldPointer);
                if (value !== Memory.NULL) {
                    this.objects[value].references++;
                }
            };

            Memory.prototype.dereferenceObject = function (pointer) {
                this.objects[pointer].references--;
                if (this.objects[pointer].references <= 0) {
                    this.objects[pointer] = null;
                    this.freeList.push(pointer);
                }
            };
            Memory.NULL = -1;
            return Memory;
        })();
        MemorySystem.Memory = Memory;
    })(CIL.MemorySystem || (CIL.MemorySystem = {}));
    var MemorySystem = CIL.MemorySystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=Memory.js.map
