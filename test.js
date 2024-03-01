import test from "brittle"
import serialize from "./index.js"
import { BigNumber } from "@ethersproject/bignumber"

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

test("serializing public inputs only", function (t) {
  const inputs = {
    a: 55n,
    b: [
      340282366920938463463374607431768211455n,
      204169420152563078078024764459060926873n,
    ],
  }
  const publics = { a: true }
  const expected =
    "0000000100000000000000010000000000000000000000000000000000000000000000000000000000000037"

  const buf = serialize(inputs, publics, { publicOnly: true })

  t.is(buf.toString("hex"), expected)
})

test("2d nested arrays", function (t) {
  const inputs = {
    a: 55n,
    b: [
      [
        340282366920938463463374607431768211455n,
        204169420152563078078024764459060926873n,
      ],
      [4n, 5n],
    ],
  }
  const publics = { a: true }
  const expected =
    "000000010000000400000005000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000ffffffffffffffffffffffffffffffff000000000000000000000000000000009999999999999999999999999999999900000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000005"

  const buf = serialize(inputs, publics)

  t.is(buf.toString("hex"), expected)
})

test("handles bignums", function (t) {
  const inputs = { x: BigNumber.from(3) }
  const publics = { x: true }
  const expected =
    "0000000100000000000000010000000000000000000000000000000000000000000000000000000000000003"

  const buf = serialize(inputs, publics)

  t.is(buf.toString("hex"), expected)
})
