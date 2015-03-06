var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        // Based on https://github.com/kazuho/ieee754.js/blob/master/ieee754.js
        function buildFloatDecoder(numBytes, exponentBits, exponentBias) {
            var eMax = (1 << exponentBits) - 1;
            var significandBias = Math.pow(2, -(8 * numBytes - 1 - exponentBits));

            return function (bytes, offset) {
                // convert to binary string "00101010111011..."
                var leftBits = "";
                for (var i = 0; i != numBytes; ++i) {
                    var t = bytes[i + offset].toString(2);
                    t = "00000000".substring(t.length) + t;
                    leftBits += t;
                }

                // shift sign bit
                var sign = leftBits.charAt(0) == "1" ? -1 : 1;
                leftBits = leftBits.substring(1);

                // obtain exponent
                var exponent = parseInt(leftBits.substring(0, exponentBits), 2);
                leftBits = leftBits.substring(exponentBits);

                // take action dependent on exponent
                var significand;
                if (exponent == eMax) {
                    return sign * Infinity;
                } else if (exponent == 0) {
                    exponent += 1;
                    significand = parseInt(leftBits, 2);
                } else {
                    significand = parseInt("1" + leftBits, 2);
                }

                return sign * significand * significandBias * Math.pow(2, exponent - exponentBias);
            };
        }
        var parse32 = buildFloatDecoder(4, 8, 127);
        var parse64 = buildFloatDecoder(8, 11, 1023);

        var NumberHelper = (function () {
            function NumberHelper() {
            }
            NumberHelper.parse64 = function (bytes, offset) {
                return parse64(bytes, offset);
            };

            NumberHelper.parse32 = function (bytes, offset) {
                return parse32(bytes, offset);
            };
            return NumberHelper;
        })();
        Runtime.NumberHelper = NumberHelper;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=NumberHelpers.js.map
