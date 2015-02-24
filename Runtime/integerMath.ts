interface Array<T>
{
    intAdd(other: boolean[], overflowThrow?: boolean): boolean[];
    intSubtraction(other: boolean[]): boolean[];
    intMutiplication(other: boolean[]): boolean[];
    intDivition(other: boolean[]): {
        q: boolean[]; r: boolean[];
    };
    padInt(length: number): boolean[];
    padInverseInt(length: number): boolean[];
}
module CIL.Runtime
{
    "use strict";


    Array.prototype.intAdd = function (other: boolean[], overflowThrow: boolean = false): boolean[]
    {
        var persision: number = Math.max(this.length, other.length);
        var paddedThis: boolean[] = this.padInt(persision);

        var paddedOther: boolean[] = other.padInt(persision);
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
    };

    Array.prototype.intSubtraction = function (other: boolean[]): boolean[]
    {
        var persision: number = Math.max(this.length, other.length);
        var paddedThis: boolean[] = this.padInt(persision);

        var paddedOther: boolean[] = other.padInverseInt(persision);

        return paddedThis.intAdd(paddedOther).intAdd([true]);
    };

    Array.prototype.intMutiplication = function (other: boolean[]): boolean[]
    {
        var persision: number = Math.max(this.length, other.length);
        var paddedThis: boolean[] = this.padInt(persision);

        var paddedOther: boolean[] = other.padInt(persision);

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
                value = P.intAdd(A);
            }
            else if (P[P.length - 2] && !P[P.length - 1])
            {
                value = P.intAdd(S);
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
        return result;
    };

    Array.prototype.intDivition = function (other: boolean[]): { q: boolean[]; r: boolean[]; }
    {
        var persision: number = Math.max(this.length, other.length);
        var paddedThis: boolean[] = this.padInt(persision);

        var paddedOther: boolean[] = other.padInt(persision);

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
            var B: boolean[] = R.intSubtraction(paddedOther);
            if (!B[0])
            {
                R = B;
                Q[Q.length - 1] = true;
            }
        }

        return { q: Q, r: R };
    };

    Array.prototype.padInt = function (length: number): boolean[]
    {
        var paddedThis: boolean[] = [];
        while (paddedThis.length < length)
        {
            if (paddedThis.length < this.length)
            {
                paddedThis.unshift(this[this.length - paddedThis.length - 1]);
            }
            else
            {
                paddedThis.unshift(this[0]);
            }
        }

        return paddedThis;
    };

    Array.prototype.padInverseInt = function (length: number): boolean[]
    {
        var paddedThis: boolean[] = [];
        while (paddedThis.length < length)
        {
            if (paddedThis.length < this.length)
            {
                paddedThis.unshift(this[this.length - paddedThis.length - 1]);
            }
            else
            {
                paddedThis.unshift(!this[0]);
            }
        }

        return paddedThis;
    };
}