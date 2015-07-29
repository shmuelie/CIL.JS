var CIL;
(function (CIL) {
    var Tests;
    (function (Tests) {
        "use strict";
        QUnit.module("Floating Point");
        QUnit.test("from bytes 64", function (assert) {
            var bytes = [0x40, 0x0C, 0, 0, 0, 0, 0, 0];
            var num = CIL.Runtime.NumberHelper.parse64(bytes, 0);
            assert.strictEqual(num, 3.5, "conversion from bytes should result in expected floating point number");
        });
        QUnit.test("from bytes 32", function (assert) {
            var bytes = [0x40, 0x60, 0, 0];
            var num = CIL.Runtime.NumberHelper.parse32(bytes, 0);
            assert.strictEqual(num, 3.5, "conversion from bytes should result in expected floating point number");
        });
    })(Tests = CIL.Tests || (CIL.Tests = {}));
})(CIL || (CIL = {}));
//# sourceMappingURL=floatingTest.js.map