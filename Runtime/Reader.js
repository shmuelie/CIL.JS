var CIL;
(function (CIL) {
    (function (Runtime) {
        var Reader = (function () {
            function Reader(bytes) {
                this.stream = bytes;
                this.index = 0;
            }
            Reader.prototype.isEnd = function () {
                return this.index >= this.stream.length;
            };

            Reader.prototype.readNumberByte = function () {
                if (this.isEnd()) {
                    throw RangeError("Past End");
                }
                return this.stream[this.index++];
            };

            Reader.prototype.readNumber = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var num = Runtime.NumberHelper.parse64(this.stream, this.index);
                this.index += 8;
                return num;
            };

            Reader.prototype.readByte = function () {
                if (this.index + 1 < this.stream.length) {
                    throw RangeError("Past End");
                }
                return Runtime.Integer.fromBytes(this.stream.slice(this.index++, this.index), -8 /* ubit8 */);
            };

            Reader.prototype.readInt16 = function () {
                if (this.index + 2 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 2;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), 16 /* bit16 */);
            };

            Reader.prototype.readInt32 = function () {
                if (this.index + 4 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 4;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), 32 /* bit32 */);
            };

            Reader.prototype.readInt64 = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 8;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), 64 /* bit64 */);
            };

            Reader.prototype.readSByte = function () {
                if (this.isEnd()) {
                    throw RangeError("Past End");
                }
                return Runtime.Integer.fromBytes(this.stream.slice(this.index++, this.index), 8 /* bit8 */);
            };

            Reader.prototype.readUInt16 = function () {
                if (this.index + 2 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 2;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), -16 /* ubit16 */);
            };

            Reader.prototype.readUInt32 = function () {
                if (this.index + 4 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 4;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), -32 /* ubit32 */);
            };

            Reader.prototype.readUInt64 = function () {
                if (this.index + 8 < this.stream.length) {
                    throw RangeError("Past End");
                }
                var starting = this.index;
                this.index += 8;
                return Runtime.Integer.fromBytes(this.stream.slice(starting, this.index), -64 /* ubit64 */);
            };

            //https://github.com/sergeyt/io.js/blob/master/src/stream.js
            Reader.prototype.readString = function (count) {
                if (typeof count === "undefined") { count = Number.POSITIVE_INFINITY; }
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
                    } else {
                        var b2 = this.readNumberByte();
                        byteCount++;
                        if (b2 === 0) {
                            s.push(String.fromCharCode((b0 << 8) | b1));
                            break;
                        }

                        var ch32;
                        if ((b0 & 0x10) === 0) {
                            ch32 = ((b0 & 0x0F) << 12) | ((b1 & 0x3F) << 6) | (b2 & 0x3F);
                        } else {
                            var b3 = this.readNumberByte();
                            byteCount++;
                            if (b3 === 0) {
                                s.push(String.fromCharCode((b0 << 8) | b1));
                                s.push(String.fromCharCode(b2));
                            }

                            ch32 = ((b0 & 0x07) << 0x18) | ((b1 & 0x3F) << 12) | ((b2 & 0x3F) << 6) | (b3 & 0x3F);
                        }
                        if ((ch32 & 0xFFFF0000) === 0) {
                            ch = String.fromCharCode(ch32);
                        } else {
                            //break up into UTF16 surrogate pair
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
            return Reader;
        })();
        Runtime.Reader = Reader;
    })(CIL.Runtime || (CIL.Runtime = {}));
    var Runtime = CIL.Runtime;
})(CIL || (CIL = {}));
//# sourceMappingURL=Reader.js.map
