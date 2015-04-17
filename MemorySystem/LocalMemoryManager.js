var CIL;
(function (CIL) {
    (function (MemorySystem) {
        "use strict";

        var Integer = CIL.Runtime.Integer;
        var Bitness = CIL.Runtime.Bitness;

        var MemoryObject = (function () {
            function MemoryObject() {
                this.references = 0;
            }
            return MemoryObject;
        })();

        function arrayGenerator(length, value) {
            var a = [];
            for (var i = 0; i < length; i++) {
                a.push(value);
            }
            return a;
        }

        var intrinsic = ["System.Int16", "System.Int32", "System.Int64", "System.UInt16", "System.UInt32", "System.UInt64", "System.Byte", "System.SByte", "System.String", "System.Char"];

        var LocalMemoryManager = (function () {
            function LocalMemoryManager() {
                this.objects = [];
                this.freeList = [];
            }
            LocalMemoryManager.prototype.innerAlloc = function (type) {
                var obj = new MemoryObject();
                obj.type = type;
                if (this.freeList.length === 0) {
                    obj.selfPointer = this.objects.push(obj) - 1;
                } else {
                    obj.selfPointer = this.freeList.pop();
                    this.objects[obj.selfPointer] = obj;
                }
                return obj;
            };

            LocalMemoryManager.prototype.setupIntrinsic = function (type, obj) {
                switch (intrinsic.indexOf(type.fullName)) {
                    case 0:
                    case 9:
                        obj.rawValue = new Integer(arrayGenerator(16, false), 16 /* bit16 */);
                        break;
                    case 1:
                        obj.rawValue = new Integer(arrayGenerator(32, false), 32 /* bit32 */);
                        break;
                    case 2:
                        obj.rawValue = new Integer(arrayGenerator(64, false), 64 /* bit64 */);
                        break;
                    case 3:
                        obj.rawValue = new Integer(arrayGenerator(16, false), -16 /* ubit16 */);
                        break;
                    case 4:
                        obj.rawValue = new Integer(arrayGenerator(32, false), -32 /* ubit32 */);
                        break;
                    case 5:
                        obj.rawValue = new Integer(arrayGenerator(64, false), -64 /* ubit64 */);
                    case 6:
                        obj.rawValue = new Integer(arrayGenerator(8, false), -8 /* ubit8 */);
                        break;
                    case 7:
                        obj.rawValue = new Integer(arrayGenerator(8, false), 8 /* bit8 */);
                        break;
                    default:
                        obj.rawValue = LocalMemoryManager.NULL;
                        break;
                }
            };

            LocalMemoryManager.prototype.innerAllocSetup = function (type, obj) {
                for (var i = 0; i < type.fields.length; i++) {
                    var field = type.fields[i];
                    if (intrinsic.indexOf(field.type.fullName) !== -1) {
                        if (field.type.fullName === "System.String") {
                            obj.fields[field.name] = LocalMemoryManager.NULL;
                        } else {
                            var fieldObj = this.innerAlloc(field.type);
                            obj.fields[field.name] = fieldObj.selfPointer;
                            this.setupIntrinsic(field.type, fieldObj);
                        }
                    } else {
                        obj.fields[field.name] = LocalMemoryManager.NULL;
                    }
                }
                if (type.inheritsFrom !== null) {
                    this.innerAllocSetup(type.inheritsFrom, obj);
                }
            };

            LocalMemoryManager.prototype.allocObject = function (type, callback) {
                var obj = this.innerAlloc(type);
                if (intrinsic.indexOf(type.fullName) === -1) {
                    this.innerAllocSetup(type, obj);
                } else {
                    this.setupIntrinsic(type, obj);
                    callback(obj.selfPointer);
                }
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
