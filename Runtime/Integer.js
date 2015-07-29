var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        "use strict";
        function addBits(bits1, bits2, overflowThrow) {
            var persision = Math.max(bits1.length, bits2.length);
            var paddedThis = Runtime.ArrayHelpers.padInt(bits1, persision);
            var paddedOther = Runtime.ArrayHelpers.padInt(bits2, persision);
            var lastOverflow = false;
            var overflow = false;
            var result = [];
            for (var i = persision - 1; i >= 0; i--) {
                if (paddedThis[i] && paddedOther[i] && overflow) {
                    result.unshift(true);
                }
                else if (paddedThis[i] && paddedOther[i] && !overflow) {
                    result.unshift(false);
                    overflow = true;
                }
                else if (!paddedThis[i] && paddedOther[i] && overflow) {
                    result.unshift(false);
                }
                else if (!paddedThis[i] && paddedOther[i] && !overflow) {
                    result.unshift(true);
                }
                else if (paddedThis[i] && !paddedOther[i] && overflow) {
                    result.unshift(false);
                }
                else if (paddedThis[i] && !paddedOther[i] && !overflow) {
                    result.unshift(true);
                }
                else if (!paddedThis[i] && !paddedOther[i] && overflow) {
                    result.unshift(true);
                    overflow = false;
                }
                else if (!paddedThis[i] && !paddedOther[i] && !overflow) {
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
            var paddedOther = negate(bits2, persision);
            return addBits(paddedThis, paddedOther, false);
        }
        function negate(bits, length) {
            return Runtime.ArrayHelpers.padInverseInt(addBits(bits, [true], false), length);
        }
        (function (Bitness) {
            Bitness[Bitness["bit8"] = 8] = "bit8";
            Bitness[Bitness["ubit8"] = -8] = "ubit8";
            Bitness[Bitness["bit16"] = 16] = "bit16";
            Bitness[Bitness["ubit16"] = -16] = "ubit16";
            Bitness[Bitness["bit32"] = 32] = "bit32";
            Bitness[Bitness["ubit32"] = -32] = "ubit32";
            Bitness[Bitness["bit64"] = 64] = "bit64";
            Bitness[Bitness["ubit64"] = -64] = "ubit64";
        })(Runtime.Bitness || (Runtime.Bitness = {}));
        var Bitness = Runtime.Bitness;
        var Integer = (function () {
            function Integer(bits, bitness) {
                this.signed = bitness > 0;
                bitness = Math.abs(bitness);
                if (bits.length === bitness) {
                    this.bits = bits;
                }
                else {
                    this.bits = Runtime.ArrayHelpers.padInt(bits, bitness);
                }
            }
            Integer.prototype.negate = function () {
                if (!this.signed) {
                    return new Integer(Runtime.ArrayHelpers.padInverseInt(this.bits, this.bits.length), -this.bits.length);
                }
                return new Integer(negate(this.bits, this.bits.length), this.bits.length);
            };
            Integer.prototype.add = function (other, overflowThrow) {
                if (overflowThrow === void 0) { overflowThrow = false; }
                return new Integer(addBits(this.bits, other.bits, overflowThrow), this.bits.length);
            };
            Integer.prototype.subtract = function (other) {
                return new Integer(subtractBits(this.bits, other.bits), this.bits.length);
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
                while (A.length < persision * 2 + 1) {
                    A.push(false);
                }
                var S = negate(paddedThis, persision);
                while (S.length < persision * 2 + 1) {
                    S.push(false);
                }
                var P = [];
                for (i = 0; i < paddedOther.length; i++) {
                    P.push(paddedOther[i]);
                }
                P.push(false);
                while (P.length < persision * 2 + 1) {
                    P.unshift(false);
                }
                for (i = 0; i < persision; i++) {
                    var value;
                    if (!P[P.length - 2] && P[P.length - 1]) {
                        value = addBits(P, A, false);
                    }
                    else if (P[P.length - 2] && !P[P.length - 1]) {
                        value = addBits(P, S, false);
                    }
                    else {
                        value = P;
                    }
                    value.pop();
                    value.unshift(value[0]);
                    P = value;
                }
                P.pop();
                var result = [];
                for (i = 0; i < persision; i++) {
                    result.unshift(P.pop());
                }
                return new Integer(result, this.bits.length);
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
                    else {
                        R.shift();
                        R.push(false);
                    }
                    Q.shift();
                    Q.push(false);
                    var B = subtractBits(R, paddedOther);
                    if (!B[0]) {
                        R = B;
                        Q[Q.length - 1] = true;
                    }
                }
                return { q: new Integer(Q, this.bits.length), r: new Integer(R, this.bits.length) };
            };
            Integer.prototype.toBytes = function () {
                var conv;
                if (this.bits.length <= 32) {
                    conv = Runtime.ArrayHelpers.padInt(this.bits, 32);
                }
                else {
                    conv = Runtime.ArrayHelpers.padInt(this.bits, 64);
                }
                var result = [];
                var bytes = conv.length / 8;
                for (var i = 0; i < bytes; i++) {
                    var byte = 0;
                    for (var j = 0; j < 8; j++) {
                        if (conv[i * 8 + j]) {
                            byte += Math.pow(2, 7 - j);
                        }
                    }
                    result.push(byte);
                }
                return result;
            };
            Integer.prototype.toNumber = function () {
                var num = 0;
                for (var i = 0; i < this.bits.length; i++) {
                    if (this.bits[i]) {
                        num += Math.pow(2, this.bits.length - 1 - i);
                    }
                }
                if (this.signed && this.bits[0]) {
                    return num - Math.pow(2, this.bits.length);
                }
                return num;
            };
            Integer.fromNumber = function (num, bitness) {
                if (num === 0) {
                    return new Integer([false], bitness);
                }
                var negative = num < 0;
                num = Math.abs(num);
                var bits = [];
                var maxPower = 0;
                for (var i = 0; i < 64; i++) {
                    if (num - Math.pow(2, i) >= 0) {
                        maxPower = i;
                    }
                    else {
                        break;
                    }
                }
                for (var j = maxPower; j >= 0; j--) {
                    var v = num - Math.pow(2, j);
                    if (v >= 0) {
                        bits.push(true);
                        num = v;
                    }
                    else {
                        bits.push(false);
                    }
                }
                if (num > 0) {
                    throw new RangeError("Overflow");
                }
                if (maxPower > 32) {
                    bitness = Bitness.bit64;
                }
                var int = new Integer(Runtime.ArrayHelpers.padInt(bits, bitness, false), bitness);
                if (negative && bitness > 0) {
                    return int.negate();
                }
                return int;
            };
            Integer.fromBytes = function (bytes, bitness) {
                var bits = [];
                for (var i = 0; i < bytes.length && i < 8; i++) {
                    var byte = bytes[i];
                    for (var j = 7; j >= 0; j--) {
                        var temp = byte - Math.pow(2, j);
                        if (temp >= 0) {
                            byte = temp;
                            bits.push(true);
                        }
                        else {
                            bits.push(false);
                        }
                    }
                }
                return new Integer(bits, bitness);
            };
            return Integer;
        })();
        Runtime.Integer = Integer;
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Integer.js.map