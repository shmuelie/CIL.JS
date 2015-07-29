var CIL;
(function (CIL) {
    var Cecil;
    (function (Cecil) {
        var Metadata;
        (function (Metadata) {
            "use strict";
            var MetadataToken = (function () {
                function MetadataToken(type) {
                    var rid = 0;
                    if (arguments.length === 2) {
                        rid = arguments[1];
                    }
                    this.token = type | rid;
                }
                MetadataToken.prototype.getRID = function () {
                    return this.token & 0x00ffffff;
                };
                MetadataToken.prototype.getTokenType = function () {
                    return (this.token & 0xff000000);
                };
                MetadataToken.prototype.toNumber = function () {
                    return this.token;
                };
                MetadataToken.prototype.equals = function (obj) {
                    if (obj instanceof MetadataToken) {
                        var other = obj;
                        return other.token === this.token;
                    }
                    return false;
                };
                MetadataToken.zero = new MetadataToken(0);
                return MetadataToken;
            })();
            Metadata.MetadataToken = MetadataToken;
        })(Metadata = Cecil.Metadata || (Cecil.Metadata = {}));
    })(Cecil = CIL.Cecil || (CIL.Cecil = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=MetadataToken.js.map