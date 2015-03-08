import Integer = CIL.Runtime.Integer;

module CIL.Tests
{
    "use strict";

    function compare<T>(first: T[], second: T[]): boolean
    {
        if (first.length !== second.length)
        {
            return false;
        }

        var length: number = first.length;
        for (var i: number = 0; i < length; i++)
        {
            if (first[i] !== second[i])
            {
                return false;
            }
        }

        return true;
    }

    QUnit.module("Integer Tests");

    QUnit.test("round trip", function (assert: QUnitAssert)
    {
        var value: number[] = [128, 55, 44, 55];
        var i: Integer = Integer.fromBytes(value);
        var comp: number[] = i.toBytes();
        assert.strictEqual(comp.length, value.length, "Should have the same number of bytes");
        assert.ok(compare<number>(value, comp), "Byte arrays should be equal");
    });
}