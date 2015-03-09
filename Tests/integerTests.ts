import Integer = CIL.Runtime.Integer;

module CIL.Tests
{
    "use strict";

    QUnit.module("Integer");

    QUnit.test("round trip", function (assert: QUnitAssert)
    {
        var value: number[] = [128, 55, 44, 55];
        var i: Integer = Integer.fromBytes(value);
        var comp: number[] = i.toBytes();
        assert.propEqual(comp, value, "round trip should result in equal arrays");
    });

    QUnit.test("byte array to bit array", function (assert: QUnitAssert)
    {
        var bytes: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var bits: boolean[] = [false, false, false, false, false, true, true, true, false, true, false, true, true, false, true, true, true, true, false, false, true, true, false, true, false, false, false, true, false, true, false, true];
        var i: Integer = Integer.fromBytes(bytes);
        assert.propEqual(i.bits, bits, "conversion to bit array should result in expected bit array");
    });

    QUnit.test("to number", function (assert: QUnitAssert)
    {
        var bytes: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var int: Integer = Integer.fromBytes(bytes);
        var num: number = int.toNumber();
        assert.strictEqual(num, 123456789, "bytes should convert to expected number");
    });

    QUnit.test("from number", function (assert: QUnitAssert)
    {
        var int: Integer = Integer.fromNumber(123456789);
        var bytes: number[] = int.toBytes();
        var expected: number[] = [0x07, 0x5B, 0xCD, 0x15];
        assert.propEqual(bytes, expected, "number should convert to expected integer");
    });

    QUnit.test("addition", function (assert: QUnitAssert)
    {
        var bytes1: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var bytes2: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var int1: Integer = Integer.fromBytes(bytes1);
        var int2: Integer = Integer.fromBytes(bytes2);
        var int3: Integer = int1.add(int2);
        var result: number[] = int3.toBytes();
        var expected: number[] = [0x0E, 0xB7, 0x9A, 0x2A];
        assert.propEqual(result, expected, "adding two integers should result in expected integer");
    });

    QUnit.test("subtraction", function (assert: QUnitAssert)
    {
        var bytes1: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var bytes2: number[] = [0x07, 0x5B, 0xCD, 0x16];
        var int1: Integer = Integer.fromBytes(bytes1);
        var int2: Integer = Integer.fromBytes(bytes2);
        var int3: Integer = int1.subtract(int2);
        var result: number[] = int3.toBytes();
        var expected: number[] = [0xFF, 0xFF, 0xFF, 0xFF];
        assert.propEqual(result, expected, "subtracting two integers should result in the expected integer");
    });

    QUnit.test("multiplication", function (assert: QUnitAssert)
    {
        var bytes1: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var bytes2: number[] = [0x00, 0x00, 0x00, 0x02];
        var int1: Integer = Integer.fromBytes(bytes1);
        var int2: Integer = Integer.fromBytes(bytes2);
        var int3: Integer = int1.mutliply(int2);
        var result: number[] = int3.toBytes();
        var expected: number[] = [0x0E, 0xB7, 0x9A, 0x2A];
        assert.propEqual(result, expected, "multipling two integers should result in the expected integer");
    });

    QUnit.test("division", function (assert: QUnitAssert)
    {
        var bytes1: number[] = [0x0E, 0xB7, 0x9A, 0x2A];
        var bytes2: number[] = [0x00, 0x00, 0x00, 0x02];
        var int1: Integer = Integer.fromBytes(bytes1);
        var int2: Integer = Integer.fromBytes(bytes2);
        var int3: Integer = int1.division(int2).q;
        var result: number[] = int3.toBytes();
        var expected: number[] = [0x07, 0x5B, 0xCD, 0x15];
        assert.propEqual(result, expected, "division of two integers should result in the expected integer");
    });

    QUnit.test("negate", function (assert: QUnitAssert)
    {
        var bytes: number[] = [0x07, 0x5B, 0xCD, 0x15];
        var int1: Integer = Integer.fromBytes(bytes);
        var int2: Integer = int1.negate();
        var result: number[] = int2.toBytes();
        var expected: number[] = [0xF8, 0xA4, 0x32, 0xEB];
        assert.propEqual(result, expected, "negating an integer should result in the expected integer");
    });
}