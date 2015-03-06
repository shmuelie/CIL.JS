module CIL.Runtime
{
    "use strict";

    // Based on https://github.com/kazuho/ieee754.js/blob/master/ieee754.js
    function buildFloatDecoder(numBytes: number, exponentBits: number, exponentBias: number): (bytes: number[], offset: number) => number
    {

        var eMax: number = (1 << exponentBits) - 1;
        var significandBias: number = Math.pow(2, -(8 * numBytes - 1 - exponentBits));

        return function (bytes: number[], offset: number): number
        {

            // convert to binary string "00101010111011..."
            var leftBits: string = "";
            for (var i: number = 0; i != numBytes; ++i)
            {
                var t: string = bytes[i + offset].toString(2);
                t = "00000000".substring(t.length) + t;
                leftBits += t;
            }

            // shift sign bit
            var sign: number = leftBits.charAt(0) == "1" ? -1 : 1;
            leftBits = leftBits.substring(1);

            // obtain exponent
            var exponent: number = parseInt(leftBits.substring(0, exponentBits), 2);
            leftBits = leftBits.substring(exponentBits);

            // take action dependent on exponent
            var significand: number;
            if (exponent == eMax)
            {
                return sign * Infinity;
            } else if (exponent == 0)
            {
                exponent += 1;
                significand = parseInt(leftBits, 2);
            } else
            {
                significand = parseInt("1" + leftBits, 2);
            }

            return sign * significand * significandBias * Math.pow(2, exponent - exponentBias);
        };
    }
    var parse32: (bytes: number[], offset: number) => number = buildFloatDecoder(4, 8, 127);
    var parse64: (bytes: number[], offset: number) => number = buildFloatDecoder(8, 11, 1023);

    export class NumberHelper
    {
        static parse64(bytes: number[], offset: number): number
        {
            return parse64(bytes, offset);
        }

        static parse32(bytes: number[], offset: number): number
        {
            return parse32(bytes, offset);
        }
    }
} 