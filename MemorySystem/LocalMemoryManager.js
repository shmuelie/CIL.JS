var CIL;
(function (CIL) {
    (function (MemorySystem) {
        "use strict";

        var MemoryObject = (function () {
            function MemoryObject() {
                this.references = 0;
            }
            return MemoryObject;
        })();

        var LocalMemoryManager = (function () {
            function LocalMemoryManager() {
                this.objects = [];
                this.freeList = [];
            }
            LocalMemoryManager.prototype.allocObject = function (type, callback) {
                var obj = new MemoryObject();
                if (this.freeList.length === 0) {
                    obj.selfPointer = this.objects.push(obj) - 1;
                } else {
                    obj.selfPointer = this.freeList.pop();
                    this.objects[obj.selfPointer] = obj;
                }
                callback(obj.selfPointer);
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

            LocalMemoryManager.prototype.getField = function (pointer, name, callback) {
                callback(this.objects[pointer].fields[name]);
            };

            LocalMemoryManager.prototype.dereferenceObject = function (pointer, callback) {
                this.objects[pointer].references--;
                if (this.objects[pointer].references <= 0) {
                    this.objects[pointer] = null;
                    this.freeList.push(pointer);
                }
                callback();
            };

            LocalMemoryManager.prototype.assignIntrinsicValue = function (pointer, value, callback) {
                this.objects[pointer].rawValue = value;
                callback();
            };

            LocalMemoryManager.prototype.getIntrinsicValue = function (pointer, callback) {
                callback(this.objects[pointer].rawValue);
            };
            LocalMemoryManager.NULL = -1;
            return LocalMemoryManager;
        })();
        MemorySystem.LocalMemoryManager = LocalMemoryManager;
    })(CIL.MemorySystem || (CIL.MemorySystem = {}));
    var MemorySystem = CIL.MemorySystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=LocalMemoryManager.js.map
