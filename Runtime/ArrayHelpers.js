var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        "use strict";
        var ArrayHelpers = (function () {
            function ArrayHelpers() {
            }
            ArrayHelpers.padInt = function (bits, length, extender) {
                var paddedThis = [];
                while (paddedThis.length < length) {
                    if (paddedThis.length < bits.length) {
                        paddedThis.unshift(bits[bits.length - paddedThis.length - 1]);
                    }
                    else {
                        paddedThis.unshift(extender === undefined ? bits[0] : extender);
                    }
                }
                return paddedThis;
            };
            ArrayHelpers.padInverseInt = function (bits, length, extender) {
                var paddedThis = [];
                while (paddedThis.length < length) {
                    if (paddedThis.length < bits.length) {
                        paddedThis.unshift(!bits[bits.length - paddedThis.length - 1]);
                    }
                    else {
                        paddedThis.unshift(extender === undefined ? !bits[0] : extender);
                    }
                }
                return paddedThis;
            };
            ArrayHelpers.range = function (arr, start, length) {
                var subArray = [];
                for (var i = start; i < start + length; i++) {
                    subArray.push(arr[i]);
                }
                return subArray;
            };
            ArrayHelpers.arrayGenerator = function (length, value) {
                var a = [];
                for (var i = 0; i < length; i++) {
                    a.push(value);
                }
                return a;
            };
            return ArrayHelpers;
        })();
        Runtime.ArrayHelpers = ArrayHelpers;
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=ArrayHelpers.js.map