var CIL;
(function (CIL) {
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
                    } else {
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
                    } else {
                        paddedThis.unshift(extender === undefined ? !bits[0] : extender);
                    }
                }

                return paddedThis;
            };
            return ArrayHelpers;
        })();
        Runtime.ArrayHelpers = ArrayHelpers;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=ArrayHelpers.js.map
