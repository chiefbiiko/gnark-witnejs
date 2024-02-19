import test from "brittle"
import serialize from "./index.js"

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
      340282366920938463463374607431768211455n,
      204169420152563078078024764459060926873n,
    ],
  }
  const publics = { a: true }
  const expected =
    "000000010000000200000003000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000ffffffffffffffffffffffffffffffff0000000000000000000000000000000099999999999999999999999999999999"

  const buf = serialize(inputs, publics)

  t.is(buf.toString("hex"), expected)
})
