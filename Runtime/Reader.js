var CIL;
(function (CIL) {
    var Runtime;
    (function (Runtime) {
        "use strict";
        var Reader = (function () {
            function Reader(bytes) {
                this.stream = bytes;
                this.index = 0;
            }
            Reader.prototype.length = function () {
                return this.stream.length;
            };
            Reader.prototype.position = function () {
                return this.index;
            };
            Reader.prototype.isEnd = function () {
                return this.index >= this.stream.length;
            };
            Reader.prototype.align4 = function () {
                var d = this.index % 4;
                if (d === 0) {
                    return;
                }
                this.skip(4 - d);
            };
            Reader.prototype.readNumberByte = function () {
                if (this.isEnd()) {
                    throw RangeError("Past End");
                }
                return this.stream[this.index++];
            };
            Reader.prototype.readNumberByteRange = function (length) {
                if (this.isEnd() || this.index + length >= this.stream.length) {
                    throw RangeError("Past End");
                }
                var start = this.index;
                this.index += length;
                return this.stream.slice(start, this.index);
            };
            Reader.prototype.readNumber = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var num = Runtime.NumberHelper.parse64(this.stream, this.index);
                this.index += 8;
                return num;
            };
            Reader.prototype.readPackedInt = function () {
                var b0 = this.readNumberByte();
                // 1 byte
                if ((b0 & 0x80) === 0) {
                    return Runtime.Integer.fromBytes([b0], Runtime.Bitness.ubit8);
                }
                var b1 = this.readNumberByte();
                // 2 bytes
                if ((b0 & 0xC0) === 0x80) {
                    return Runtime.Integer.fromBytes([b0 & 0x3F, b1], Runtime.Bitness.ubit16);
                }
                // 4 bytes
                var b2 = this.readNumberByte();
                var b3 = this.readNumberByte();
                return Runtime.Integer.fromBytes([b0 & 0x3F, b1, b2, b3], Runtime.Bitness.ubit32);
            };
            Reader.prototype.readByte = function () {
                if (this.index + 1 < this.stream.length) {
                    throw RangeError("Past End");
                }
                return Runtime.Integer.fromBytes(this.stream.slice(this.index++, this.index), Runtime.Bitness.ubit8);
            };
            Reader.prototype.readInt16 = function () {
                if (this.index + 2 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 2;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.bit16);
            };
            Reader.prototype.readInt32 = function () {
                if (this.index + 4 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 4;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.bit32);
            };
            Reader.prototype.readInt64 = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 8;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.bit64);
            };
            Reader.prototype.readSByte = function () {
                if (this.isEnd()) {
                    throw RangeError("Past End");
                }
                return Runtime.Integer.fromBytes(this.stream.slice(this.index++, this.index), Runtime.Bitness.bit8);
            };
            Reader.prototype.readUInt16 = function () {
                if (this.index + 2 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 2;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.ubit16);
            };
            Reader.prototype.readUInt32 = function () {
                if (this.index + 4 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 4;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.ubit32);
            };
            Reader.prototype.readUInt64 = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 8;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), Runtime.Bitness.ubit64);
            };
            Reader.prototype.readSimpleString = function (count) {
                var s = [];
                for (var i = 0; i < count; i++) {
                    var c = this.readNumberByte();
                    if (c === 0) {
                        this.skip(count - i - 1);
                        break;
                    }
                    s.push(String.fromCharCode(c));
                }
                return s.join("");
            };
            Reader.prototype.readSimpleStringAligned = function (maxLength) {
                var s = [];
                while (maxLength-- > 0) {
                    var c = this.readNumberByte();
                    if (c === 0) {
                        this.align4();
                        break;
                    }
                    s.push(String.fromCharCode(c));
                }
                return s.join("");
            };
            // https://github.com/sergeyt/io.js/blob/master/src/stream.js
            Reader.prototype.readString = function (count) {
                if (count === void 0) { count = Number.POSITIVE_INFINITY; }
                var s = [];
                var byteCount = 0;
                while (byteCount < count) {
                    var b0 = this.readNumberByte();
                    byteCount++;
                    if (b0 === 0) {
                        break;
                    }
                    if ((b0 & 0x80) === 0) {
                        s.push(String.fromCharCode(b0));
                        continue;
                    }
                    var ch;
                    var b1 = this.readNumberByte();
                    byteCount++;
                    if (b1 === 0) {
                        s.push(String.fromCharCode(b0));
                        break;
                    }
                    if ((b0 & 0x20) === 0) {
                        ch = String.fromCharCode(((b0 & 0x1F) << 6) | (b1 & 0x3F));
                    }
                    else {
                        var b2 = this.readNumberByte();
                        byteCount++;
                        if (b2 === 0) {
                            s.push(String.fromCharCode((b0 << 8) | b1));
                            break;
                        }
                        var ch32;
                        if ((b0 & 0x10) === 0) {
                            ch32 = ((b0 & 0x0F) << 12) | ((b1 & 0x3F) << 6) | (b2 & 0x3F);
                        }
                        else {
                            var b3 = this.readNumberByte();
                            byteCount++;
                            if (b3 === 0) {
                                s.push(String.fromCharCode((b0 << 8) | b1));
                                s.push(String.fromCharCode(b2));
                            }
                            ch32 = ((b0 & 0x07) << 0x18) // combine 6 bit parts 
                                | ((b1 & 0x3F) << 12)
                                | ((b2 & 0x3F) << 6)
                                | (b3 & 0x3F);
                        }
                        if ((ch32 & 0xFFFF0000) === 0) {
                            ch = String.fromCharCode(ch32);
                        }
                        else {
                            // break up into UTF16 surrogate pair
                            s.push(String.fromCharCode((ch32 >> 10) | 0xD800));
                            ch = String.fromCharCode((ch32 & 0x3FF) | 0xDC00);
                        }
                    }
                    s.push(ch);
                }
                return s.join("");
            };
            Reader.prototype.skip = function (count) {
                this.index = Math.min(this.index + count, this.stream.length);
            };
            Reader.prototype.seek = function (index) {
                this.index = Math.max(0, Math.min(this.stream.length, index));
            };
            Reader.prototype.slice = function (start, length) {
                return new Reader(this.stream.slice(start, start + length));
            };
            return Reader;
        })();
        Runtime.Reader = Reader;
    })(Runtime = CIL.Runtime || (CIL.Runtime = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=Reader.js.map