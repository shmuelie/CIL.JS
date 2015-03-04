var CIL;
(function (CIL) {
    (function (MemorySystem) {
        "use strict";

        var LocalMemoryManager = (function () {
            function LocalMemoryManager() {
                this.objects = [];
                this.freeList = [];
            }
            LocalMemoryManager.prototype.addObject = function (obj, callback) {
                if (this.freeList.length === 0) {
                    obj.id = this.objects.push(obj) - 1;
                } else {
                    obj.id = this.freeList.pop();
                    this.objects[obj.id] = obj;
                }
                callback(obj.id);
            };

            LocalMemoryManager.prototype.assignField = function (pointer, name, value, callback) {
                var _this = this;
                var oldPointer = this.objects[pointer].fields[name];
                this.objects[pointer].fields[name] = value;
                this.dereferenceObject(oldPointer, function () {
                    if (value !== LocalMemoryManager.NULL) {
                        _this.objects[value].references++;
                    }
                    callback();
                });
            };

            LocalMemoryManager.prototype.dereferenceObject = function (pointer, callback) {
                this.objects[pointer].references--;
                if (this.objects[pointer].references <= 0) {
                    this.objects[pointer] = null;
                    this.freeList.push(pointer);
                }
                callback();
            };
            LocalMemoryManager.NULL = -1;
            return LocalMemoryManager;
        })();
        MemorySystem.LocalMemoryManager = LocalMemoryManager;
    })(CIL.MemorySystem || (CIL.MemorySystem = {}));
    var MemorySystem = CIL.MemorySystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=LocalMemoryManager.js.map
