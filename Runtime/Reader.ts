module CIL.Runtime
{
    "use strict";

    export class Reader
    {
        private stream: number[];
        private index: number;

        constructor(bytes: number[])
        {
            this.stream = bytes;
            this.index = 0;
        }

        isEnd(): boolean
        {
            return this.index >= this.stream.length;
        }

        readNumberByte(): number
        {
            if (this.isEnd())
            {
                throw RangeError("Past End");
            }
            return this.stream[this.index++];
        }

        readNumber(): number
        {
            if (this.index + 8 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var num: number = NumberHelper.parse64(this.stream, this.index);
            this.index += 8;
            return num;
        }

        readByte(): Integer
        {
            if (this.index + 1 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            return Integer.fromBytes(this.stream.slice(this.index++, this.index), Bitness.ubit8);
        }

        readInt16(): Integer
        {
            if (this.index + 2 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 2;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.bit16);
        }

        readInt32(): Integer
        {
            if (this.index + 4 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 4;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.bit32);
        }

        readInt64(): Integer
        {
            if (this.index + 8 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 8;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.bit64);
        }

        readSByte(): Integer
        {
            if (this.isEnd())
            {
                throw RangeError("Past End");
            }
            return Integer.fromBytes(this.stream.slice(this.index++, this.index), Bitness.bit8);
        }

        readUInt16(): Integer
        {
            if (this.index + 2 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 2;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.ubit16);
        }

        readUInt32(): Integer
        {
            if (this.index + 4 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 4;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.ubit32);
        }

        readUInt64(): Integer
        {
            if (this.index + 8 < this.stream.length)
            {
                throw RangeError("Past End");
            }
            var starting: number = this.index;
            this.index += 8;
            return Integer.fromBytes(this.stream.slice(starting, this.index), Bitness.ubit64);
        }

        readSimpleString(count: number): string
        {
            var s: string[] = [];
            for (var i: number = 0; i < count; i++)
            {
                var c: number = this.readNumberByte();
                if (c === 0)
                {
                    this.skip(count - i - 1);
                    break;
                }
                s.push(String.fromCharCode(c));
            }
            return s.join("");
        }

        // https://github.com/sergeyt/io.js/blob/master/src/stream.js
        readString(count: number = Number.POSITIVE_INFINITY): string
        {
            var s: string[] = [];
            var byteCount: number = 0;

            while (byteCount < count)
            {
                var b0: number = this.readNumberByte();
                byteCount++;
                if (b0 === 0)
                {
                    break;
                }

                if ((b0 & 0x80) === 0)
                {
                    s.push(String.fromCharCode(b0));
                    continue;
                }

                var ch: string;
                var b1: number = this.readNumberByte();
                byteCount++;
                if (b1 === 0)
                {
                    s.push(String.fromCharCode(b0));
                    break;
                }
                if ((b0 & 0x20) === 0)
                {
                    ch = String.fromCharCode(((b0 & 0x1F) << 6) | (b1 & 0x3F));
                }
                else
                {
                    var b2: number = this.readNumberByte();
                    byteCount++;
                    if (b2 === 0)
                    {
                        s.push(String.fromCharCode((b0 << 8) | b1));
                        break;
                    }

                    var ch32: number;
                    if ((b0 & 0x10) === 0)
                    {
                        ch32 = ((b0 & 0x0F) << 12) | ((b1 & 0x3F) << 6) | (b2 & 0x3F);
                    }
                    else
                    {
                        var b3: number = this.readNumberByte();
                        byteCount++;
                        if (b3 === 0)
                        {
                            s.push(String.fromCharCode((b0 << 8) | b1));
                            s.push(String.fromCharCode(b2));
                        }

                        ch32 = ((b0 & 0x07) << 0x18) // combine 6 bit parts 
                        | ((b1 & 0x3F) << 12)
                        | ((b2 & 0x3F) << 6)
                        | (b3 & 0x3F);

                    }
                    if ((ch32 & 0xFFFF0000) === 0)
                    {
                        ch = String.fromCharCode(ch32);
                    }
                    else
                    {
                        // break up into UTF16 surrogate pair
                        s.push(String.fromCharCode((ch32 >> 10) | 0xD800));
                        ch = String.fromCharCode((ch32 & 0x3FF) | 0xDC00);
                    }
                }

                s.push(ch);
            }

            return s.join("");
        }

        skip(count: number)
        {
            this.index = Math.min(this.index + count, this.stream.length);
        }

        seek(index: number)
        {
            this.index = Math.max(0, Math.min(this.stream.length, index));
        }
    }
} 