var Integer = CIL.Runtime.Integer;

var CIL;
(function (CIL) {
    (function (Tests) {
        "use strict";

        QUnit.module("Integer Tests");

        QUnit.test("round trip", function (assert) {
            var value = [128, 55, 44, 55];
            var i = Integer.fromBytes(value);
            var comp = i.toBytes();
            assert.propEqual(comp, value, "round trip should result in equal arrays");
        });

        QUnit.test("byte array to bit array", function (assert) {
            var bytes = [0x07, 0x5B, 0xCD, 0x15];
            var bits = [false, false, false, false, false, true, true, true, false, true, false, true, true, false, true, true, true, true, false, false, true, true, false, true, false, false, false, true, false, true, false, true];
            var i = Integer.fromBytes(bytes);
            assert.propEqual(i.bits, bits, "conversion to bit array should result in expected bit array");
        });

        QUnit.test("addition", function (assert) {
            var bytes1 = [0x07, 0x5B, 0xCD, 0x15];
            var bytes2 = [0x07, 0x5B, 0xCD, 0x15];
            var int1 = Integer.fromBytes(bytes1);
            var int2 = Integer.fromBytes(bytes2);
            var int3 = int1.add(int2);
            var result = int3.toBytes();
            var expected = [0x0E, 0xB7, 0x9A, 0x2A];
            assert.propEqual(result, expected, "adding two integers should result in expected integer");
        });

        QUnit.test("subtraction", function (assert) {
            var bytes1 = [0x07, 0x5B, 0xCD, 0x15];
            var bytes2 = [0x07, 0x5B, 0xCD, 0x16];
            var int1 = Integer.fromBytes(bytes1);
            var int2 = Integer.fromBytes(bytes2);
            var int3 = int1.subtract(int2);
            var result = int3.toBytes();
            var expected = [0xFF, 0xFF, 0xFF, 0xFF];
            assert.propEqual(result, expected, "subtracting two integers should result in the expected integer");
        });

        QUnit.test("multiplication", function (assert) {
            var bytes1 = [0x07, 0x5B, 0xCD, 0x15];
            var bytes2 = [0x00, 0x00, 0x00, 0x02];
            var int1 = Integer.fromBytes(bytes1);
            var int2 = Integer.fromBytes(bytes2);
            var int3 = int1.mutliply(int2);
            var result = int3.toBytes();
            var expected = [0x0E, 0xB7, 0x9A, 0x2A];
            assert.propEqual(result, expected, "multipling two integers should result in the expected integer");
        });

        QUnit.test("division", function (assert) {
            var bytes1 = [0x0E, 0xB7, 0x9A, 0x2A];
            var bytes2 = [0x00, 0x00, 0x00, 0x02];
            var int1 = Integer.fromBytes(bytes1);
            var int2 = Integer.fromBytes(bytes2);
            var int3 = int1.division(int2).q;
            var result = int3.toBytes();
            var expected = [0x07, 0x5B, 0xCD, 0x15];
            assert.propEqual(result, expected, "division of two integers should result in the expected integer");
        });

        QUnit.test("negate", function (assert) {
            var bytes = [0x07, 0x5B, 0xCD, 0x15];
            var int1 = Integer.fromBytes(bytes);
            var int2 = int1.negate();
            var result = int2.toBytes();
            var expected = [0xF8, 0xA4, 0x32, 0xEB];
            assert.propEqual(result, expected, "negating an integer should result in the expected integer");
        });
    })(CIL.Tests || (CIL.Tests = {}));
    var Tests = CIL.Tests;
})(CIL || (CIL = {}));
//# sourceMappingURL=integerTests.js.map
