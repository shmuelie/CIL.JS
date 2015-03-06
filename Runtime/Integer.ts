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

        for (var i: number = persision; i >= 0; i--)
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
        var paddedOther: boolean[] = ArrayHelpers.padInverseInt(bits2, persision);

        return addBits(addBits(paddedThis, paddedOther, false), [true], false);
    }

    export class Integer
    {
        bits: boolean[];

        constructor(bits: boolean[])
        {
            this.bits = bits;
        }

        add(other: Integer, overflowThrow: boolean = false): Integer
        {
            return new Integer(addBits(this.bits, other.bits, overflowThrow));
        }

        subtract(other: Integer): Integer
        {
            return new Integer(subtractBits(this.bits, other.bits));
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
            while (A.length <= persision * 2 + 1)
            {
                A.push(false);
            }

            var S: boolean[] = [];
            for (i = 0; i < paddedThis.length; i++)
            {
                S.push(!paddedThis[i]);
            }
            while (A.length <= persision * 2 + 1)
            {
                S.push(false);
            }

            var P: boolean[] = [];
            for (i = 0; i < paddedOther.length; i++)
            {
                P.push(paddedOther[i]);
            }
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
                value.unshift(false);

                P = value;
            }

            P.pop();

            var result: boolean[] = [];
            for (i = 0; i < persision; i++)
            {
                result.unshift(P.pop());
            }
            return new Integer(result);
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
                Q.shift();
                Q.push(false);
                var B: boolean[] = subtractBits(R, paddedOther);
                if (!B[0])
                {
                    R = B;
                    Q[Q.length - 1] = true;
                }
            }

            return { q: new Integer(Q), r: new Integer(R) };
        }
    }
} 