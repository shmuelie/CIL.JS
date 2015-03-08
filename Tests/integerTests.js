var Integer = CIL.Runtime.Integer;

var CIL;
(function (CIL) {
    (function (Tests) {
        "use strict";

        function compare(first, second) {
            if (first.length !== second.length) {
                return false;
            }

            var length = first.length;
            for (var i = 0; i < length; i++) {
                if (first[i] !== second[i]) {
                    return false;
                }
            }

            return true;
        }

        QUnit.module("Integer Tests");

        QUnit.test("round trip", function (assert) {
            var value = [128, 55, 44, 55];
            var i = Integer.fromBytes(value);
            var comp = i.toBytes();
            assert.strictEqual(comp.length, value.length, "Should have the same number of bytes");
            assert.ok(compare(value, comp), "Byte arrays should be equal");
        });
    })(CIL.Tests || (CIL.Tests = {}));
    var Tests = CIL.Tests;
})(CIL || (CIL = {}));
//# sourceMappingURL=integerTests.js.map
