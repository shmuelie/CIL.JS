var CIL;
(function (CIL) {
    var TypeSystem;
    (function (TypeSystem) {
        var TextIL;
        (function (TextIL) {
            var ILReader;
            (function (ILReader) {
                "use strict";
                var Metadata = (function () {
                    function Metadata(name) {
                        this.name = name;
                    }
                    return Metadata;
                }());
                var metadatas = [];
                function ReadIL(il) {
                    var parserLocation = 0;
                    while (parserLocation < il.length) {
                    }
                }
                ILReader.ReadIL = ReadIL;
            })(ILReader = TextIL.ILReader || (TextIL.ILReader = {}));
        })(TextIL = TypeSystem.TextIL || (TypeSystem.TextIL = {}));
    })(TypeSystem = CIL.TypeSystem || (CIL.TypeSystem = {}));
})(CIL || (CIL = {}));
