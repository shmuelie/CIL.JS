var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        function addBits(bits1, bits2, overflowThrow) {
            var persision = Math.max(bits1.length, bits2.length);
            var paddedThis = Runtime.ArrayHelpers.padInt(bits1, persision);

            var paddedOther = Runtime.ArrayHelpers.padInt(bits2, persision);
            var lastOverflow = false;
            var overflow = false;
            var result = [];

            for (var i = persision; i >= 0; i--) {
                if (paddedThis[i] && paddedOther[i] && overflow) {
                    result.unshift(true);
                } else if (paddedThis[i] && paddedOther[i] && !overflow) {
                    result.unshift(false);
                    overflow = true;
                } else if (!paddedThis[i] && paddedOther[i] && overflow) {
                    result.unshift(false);
                } else if (!paddedThis[i] && paddedOther[i] && !overflow) {
                    result.unshift(true);
                } else if (paddedThis[i] && !paddedOther[i] && overflow) {
                    result.unshift(false);
                } else if (paddedThis[i] && !paddedOther[i] && !overflow) {
                    result.unshift(true);
                } else if (!paddedThis[i] && !paddedOther[i] && overflow) {
                    result.unshift(true);
                    overflow = false;
                } else if (!paddedThis[i] && !paddedOther[i] && !overflow) {
                    result.unshift(false);
                }
                lastOverflow = overflow;
            }

            if (overflow !== lastOverflow && overflowThrow) {
                throw new Error("OVERFLOW");
            }

            return result;
        }

        function subtractBits(bits1, bits2) {
            var persision = Math.max(bits1.length, bits2.length);
            var paddedThis = Runtime.ArrayHelpers.padInt(bits1, persision);
            var paddedOther = Runtime.ArrayHelpers.padInverseInt(bits2, persision);

            return addBits(addBits(paddedThis, paddedOther, false), [true], false);
        }

        var Integer = (function () {
            function Integer(bits) {
                this.bits = bits;
            }
            Integer.prototype.add = function (other, overflowThrow) {
                if (typeof overflowThrow === "undefined") { overflowThrow = false; }
                return new Integer(addBits(this.bits, other.bits, overflowThrow));
            };

            Integer.prototype.subtract = function (other) {
                return new Integer(subtractBits(this.bits, other.bits));
            };

            Integer.prototype.mutliply = function (other) {
                var persision = Math.max(this.bits.length, other.bits.length);
                var paddedThis = Runtime.ArrayHelpers.padInt(this.bits, persision);

                var paddedOther = Runtime.ArrayHelpers.padInt(other.bits, persision);

                var A = [];
                var i;
                for (i = 0; i < paddedThis.length; i++) {
                    A.push(paddedThis[i]);
                }
                while (A.length <= persision * 2 + 1) {
                    A.push(false);
                }

                var S = [];
                for (i = 0; i < paddedThis.length; i++) {
                    S.push(!paddedThis[i]);
                }
                while (A.length <= persision * 2 + 1) {
                    S.push(false);
                }

                var P = [];
                for (i = 0; i < paddedOther.length; i++) {
                    P.push(paddedOther[i]);
                }
                while (P.length < persision * 2 + 1) {
                    P.unshift(false);
                }

                for (i = 0; i < persision; i++) {
                    var value;
                    if (!P[P.length - 2] && P[P.length - 1]) {
                        value = addBits(P, A, false);
                    } else if (P[P.length - 2] && !P[P.length - 1]) {
                        value = addBits(P, S, false);
                    } else {
                        value = P;
                    }

                    value.pop();
                    value.unshift(false);

                    P = value;
                }

                P.pop();

                var result = [];
                for (i = 0; i < persision; i++) {
                    result.unshift(P.pop());
                }
                return new Integer(result);
            };

            Integer.prototype.division = function (other) {
                var persision = Math.max(this.bits.length, other.bits.length);
                var paddedThis = Runtime.ArrayHelpers.padInt(this.bits, persision);

                var paddedOther = Runtime.ArrayHelpers.padInt(other.bits, persision);

                var R = [];
                var Q = [];

                var i;
                for (i = 0; i < persision; i++) {
                    Q.push(paddedThis[i]);
                }
                for (i = 0; i < persision; i++) {
                    R.push(false);
                }

                for (i = 0; i < persision; i++) {
                    if (Q[0]) {
                        R.shift();
                        R.push(true);
                    }
                    Q.shift();
                    Q.push(false);
                    var B = subtractBits(R, paddedOther);
                    if (!B[0]) {
                        R = B;
                        Q[Q.length - 1] = true;
                    }
                }

                return { q: new Integer(Q), r: new Integer(R) };
            };

            Integer.prototype.toBytes = function () {
                var conv;
                if (this.bits.length <= 32) {
                    conv = Runtime.ArrayHelpers.padInt(this.bits, 32);
                } else {
                    conv = Runtime.ArrayHelpers.padInt(this.bits, 64);
                }

                var result = [];

                var bytes = conv.length / 8;
                for (var i = 0; i < bytes; i++) {
                    var byte = 0;
                    for (var j = 0; j < 8; i++) {
                        if (conv[i * 8 + j]) {
                            byte += Math.pow(2, 7 - j);
                        }
                    }
                    result.push(byte);
                }

                return result;
            };

            Integer.fromBytes = function (bytes) {
                var bits = [];
                for (var i = 0; i < bytes.length; i++) {
                    var byte = bytes[i];
                    for (var j = 7; j >= 0; j--) {
                        var temp = byte - Math.pow(2, j);
                        if (temp >= 0) {
                            byte = temp;
                            bits.push(true);
                        } else {
                            bits.push(false);
                        }
                    }
                }

                return new Integer(bits);
            };
            return Integer;
        })();
        Runtime.Integer = Integer;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Integer.js.map
