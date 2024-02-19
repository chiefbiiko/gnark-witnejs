import test from "brittle"
import serialize from "."

test("serializing a trivial input", function (t) {
  const inputs = { x: 3n, y: 35n, z: 2n }
  const publics = { y: true }
  const expected =
    "000000010000000200000003000000000000000000000000000000000000000000000000000000000000002300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002"

  const buf = serialize(inputs, publics)

  t.is(buf.toString("hex"), expected)
})

test("serializing an input containing arrays", function (t) {
  const inputs = {
    a: 55n,
    b: [
      115792089237316195423570985008687907853269984665640564039457584007913129639935n,
      69475253542389717254142591005212744711961990799384338423674550404747877783961n,
    ],
  }
  const publics = { a: true }
  const expected = "TODO"

  const buf = serialize(inputs, publics)

  t.is(buf.toString("hex"), expected)
})
