var CIL;
(function (CIL) {
    (function (Runtime) {
        "use strict";

        Array.prototype.intAdd = function (other, overflowThrow) {
            if (typeof overflowThrow === "undefined") { overflowThrow = false; }
            var persision = Math.max(this.length, other.length);
            var paddedThis = this.padInt(persision);

            var paddedOther = other.padInt(persision);
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
        };

        Array.prototype.intSubtraction = function (other) {
            var persision = Math.max(this.length, other.length);
            var paddedThis = this.padInt(persision);

            var paddedOther = other.padInverseInt(persision);

            return paddedThis.intAdd(paddedOther).intAdd([true]);
        };

        Array.prototype.intMutiplication = function (other) {
            var persision = Math.max(this.length, other.length);
            var paddedThis = this.padInt(persision);

            var paddedOther = other.padInt(persision);

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
                    value = P.intAdd(A);
                } else if (P[P.length - 2] && !P[P.length - 1]) {
                    value = P.intAdd(S);
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
            return result;
        };

        Array.prototype.intDivition = function (other) {
            var persision = Math.max(this.length, other.length);
            var paddedThis = this.padInt(persision);

            var paddedOther = other.padInt(persision);

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
                var B = R.intSubtraction(paddedOther);
                if (!B[0]) {
                    R = B;
                    Q[Q.length - 1] = true;
                }
            }

            return { q: Q, r: R };
        };

        Array.prototype.padInt = function (length) {
            var paddedThis = [];
            while (paddedThis.length < length) {
                if (paddedThis.length < this.length) {
                    paddedThis.unshift(this[this.length - paddedThis.length - 1]);
                } else {
                    paddedThis.unshift(this[0]);
                }
            }

            return paddedThis;
        };

        Array.prototype.padInverseInt = function (length) {
            var paddedThis = [];
            while (paddedThis.length < length) {
                if (paddedThis.length < this.length) {
                    paddedThis.unshift(this[this.length - paddedThis.length - 1]);
                } else {
                    paddedThis.unshift(!this[0]);
                }
            }

            return paddedThis;
        };
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=integerMath.js.map
