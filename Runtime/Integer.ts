module CIL.Runtime
{
    "use strict";

    function addBits(bits1: boolean[], bits2: boolean[], overflowThrow: boolean): boolean[]
    {
        var persision: number = Math.max(bits1.length, bits2.length);
        var paddedThis: boolean[] = ArrayHelpers.padInt(bits1, persision);

        var paddedOther: boolean[] = ArrayHelpers.padInt(bits2, persision);
        var lastOverflow: boolean = false;
        var overflow: boolean = false;
        var result: boolean[] = [];

        for (var i: number = persision - 1; i >= 0; i--)
        {
            if (paddedThis[i] && paddedOther[i] && overflow)
            {
                result.unshift(true);
            }
            else if (paddedThis[i] && paddedOther[i] && !overflow)
            {
                result.unshift(false);
                overflow = true;
            }
            else if (!paddedThis[i] && paddedOther[i] && overflow)
            {
                result.unshift(false);
            }
            else if (!paddedThis[i] && paddedOther[i] && !overflow)
            {
                result.unshift(true);
            }
            else if (paddedThis[i] && !paddedOther[i] && overflow)
            {
                result.unshift(false);
            }
            else if (paddedThis[i] && !paddedOther[i] && !overflow)
            {
                result.unshift(true);
            }
            else if (!paddedThis[i] && !paddedOther[i] && overflow)
            {
                result.unshift(true);
                overflow = false;
            }
            else if (!paddedThis[i] && !paddedOther[i] && !overflow)
            {
                result.unshift(false);
            }
            lastOverflow = overflow;
        }

        if (overflow !== lastOverflow && overflowThrow)
        {
            throw new Error("OVERFLOW");
        }

        return result;
    }

    function subtractBits(bits1: boolean[], bits2: boolean[]): boolean[]
    {
        var persision: number = Math.max(bits1.length, bits2.length);
        var paddedThis: boolean[] = ArrayHelpers.padInt(bits1, persision);
        var paddedOther: boolean[] = negate(bits2, persision);

        return addBits(paddedThis, paddedOther, false);
    }

    function negate(bits: boolean[], length: number): boolean[]
    {
        return ArrayHelpers.padInverseInt(addBits(bits, [true], false), length);
    }

    export enum Bitness
    {
        bit8 = 8,
        ubit8 = -8,
        bit16 = 16,
        ubit16 = -16,
        bit32 = 32,
        ubit32 = -32,
        bit64 = 64,
        ubit64 = -64
    }

    export class Integer
    {
        bits: boolean[];
        signed: boolean;

        constructor(bits: boolean[], bitness: Bitness)
        {
            this.signed = bitness > 0;
            bitness = Math.abs(bitness);
            if (bits.length === bitness)
            {
                this.bits = bits;
            }
            else
            {
                this.bits = ArrayHelpers.padInt(bits, bitness);
            }
        }

        negate(): Integer
        {
            if (!this.signed)
            {
                return new Integer(ArrayHelpers.padInverseInt(this.bits, this.bits.length), -this.bits.length);
            }
            return new Integer(negate(this.bits, this.bits.length), this.bits.length);
        }

        add(other: Integer, overflowThrow: boolean = false): Integer
        {
            return new Integer(addBits(this.bits, other.bits, overflowThrow), this.bits.length);
        }

        subtract(other: Integer): Integer
        {
            return new Integer(subtractBits(this.bits, other.bits), this.bits.length);
        }

        mutliply(other: Integer): Integer
        {
            var persision: number = Math.max(this.bits.length, other.bits.length);
            var paddedThis: boolean[] = ArrayHelpers.padInt(this.bits, persision);

            var paddedOther: boolean[] = ArrayHelpers.padInt(other.bits, persision);

            var A: boolean[] = [];
            var i: number;
            for (i = 0; i < paddedThis.length; i++)
            {
                A.push(paddedThis[i]);
            }
            while (A.length < persision * 2 + 1)
            {
                A.push(false);
            }

            var S: boolean[] = negate(paddedThis, persision);
            while (S.length < persision * 2 + 1)
            {
                S.push(false);
            }

            var P: boolean[] = [];
            for (i = 0; i < paddedOther.length; i++)
            {
                P.push(paddedOther[i]);
            }
            P.push(false);
            while (P.length < persision * 2 + 1)
            {
                P.unshift(false);
            }

            for (i = 0; i < persision; i++)
            {
                var value: boolean[];
                if (!P[P.length - 2] && P[P.length - 1])
                {
                    value = addBits(P, A, false);
                }
                else if (P[P.length - 2] && !P[P.length - 1])
                {
                    value = addBits(P, S, false);
                }
                else
                {
                    value = P;
                }

                value.pop();
                value.unshift(value[0]);

                P = value;
            }

            P.pop();

            var result: boolean[] = [];
            for (i = 0; i < persision; i++)
            {
                result.unshift(P.pop());
            }
            return new Integer(result, this.bits.length);
        }

        division(other: Integer): { q: Integer; r: Integer }
        {
            var persision: number = Math.max(this.bits.length, other.bits.length);
            var paddedThis: boolean[] = ArrayHelpers.padInt(this.bits, persision);

            var paddedOther: boolean[] = ArrayHelpers.padInt(other.bits, persision);

            var R: boolean[] = [];
            var Q: boolean[] = [];

            var i: number;
            for (i = 0; i < persision; i++)
            {
                Q.push(paddedThis[i]);
            }
            for (i = 0; i < persision; i++)
            {
                R.push(false);
            }

            for (i = 0; i < persision; i++)
            {
                if (Q[0])
                {
                    R.shift();
                    R.push(true);
                }
                else
                {
                    R.shift();
                    R.push(false);
                }
                Q.shift();
                Q.push(false);
                var B: boolean[] = subtractBits(R, paddedOther);
                if (!B[0])
                {
                    R = B;
                    Q[Q.length - 1] = true;
                }
            }

            return { q: new Integer(Q, this.bits.length), r: new Integer(R, this.bits.length) };
        }

        toBytes(): number[]
        {
            var conv: boolean[];
            if (this.bits.length <= 32)
            {
                conv = ArrayHelpers.padInt(this.bits, 32);
            }
            else
            {
                conv = ArrayHelpers.padInt(this.bits, 64);
            }

            var result: number[] = [];

            var bytes: number = conv.length / 8;
            for (var i: number = 0; i < bytes; i++)
            {
                var byte: number = 0;
                for (var j: number = 0; j < 8; j++)
                {
                    if (conv[i * 8 + j])
                    {
                        byte += Math.pow(2, 7 - j);
                    }
                }
                result.push(byte);
            }

            return result;
        }

        toNumber(): number
        {
            var num: number = 0;
            for (var i: number = 0; i < this.bits.length; i++)
            {
                if (this.bits[i])
                {
                    num += Math.pow(2, this.bits.length - 1 - i);
                }
            }
            if (this.signed && this.bits[0])
            {
                return num - Math.pow(2, this.bits.length);
            }
            return num;
        }

        static fromNumber(num: number, bitness: Bitness): Integer
        {
            if (num === 0)
            {
                return new Integer([false], bitness);
            }
            var negative: boolean = num < 0;
            num = Math.abs(num);
            var bits: boolean[] = [];
            var maxPower: number = 0;
            for (var i: number = 0; i < 64; i++)
            {
                if (num - Math.pow(2, i) >= 0)
                {
                    maxPower = i;
                }
                else
                {
                    break;
                }
            }
            for (var j: number = maxPower; j >= 0; j--)
            {
                var v: number = num - Math.pow(2, j);
                if (v >= 0)
                {
                    bits.push(true);
                    num = v;
                }
                else
                {
                    bits.push(false);
                }
            }
            if (num > 0)
            {
                throw new RangeError("Overflow");
            }
            if (maxPower > 32)
            {
                bitness = Bitness.bit64;
            }
            var int: Integer = new Integer(ArrayHelpers.padInt(bits, bitness, false), bitness);
            if (negative && bitness > 0)
            {
                return int.negate();
            }
            return int;
        }

        static fromBytes(bytes: number[]): Integer
        {
            var bits: boolean[] = [];
            for (var i: number = 0; i < bytes.length && i < 8; i++)
            {
                var byte: number = bytes[i];
                for (var j: number = 7; j >= 0; j--)
                {
                    var temp: number = byte - Math.pow(2, j);
                    if (temp >= 0)
                    {
                        byte = temp;
                        bits.push(true);
                    }
                    else
                    {
                        bits.push(false);
                    }
                }
            }

            return new Integer(bits, bytes.length > 4 ? Bitness.bit64 : Bitness.bit32);
        }
    }
} 