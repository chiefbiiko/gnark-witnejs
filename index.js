// Binary protocol
//
//	Witness     ->  [uint32(nbPublic) | uint32(nbSecret) | fr.Vector(variables)]
//	fr.Vector is a *field element* vector encoded a big-endian byte array like so: [uint32(len(vector)) | elements]
//
// # Ordering
//
// First, `publicVariables`, then `secretVariables`. Each subset is ordered from the order of definition in the circuit structure.
// For example, with this circuit on `ecc.BN254`
//
//	type Circuit struct {
//	    X frontend.Variable
//	    Y frontend.Variable `gnark:",public"`
//	    Z frontend.Variable
//	}
//
// A valid witness would be:
//   - `[uint32(1)|uint32(2)|uint32(3)|bytes(Y)|bytes(X)|bytes(Z)]`
//   - Hex representation with values `Y = 35`, `X = 3`, `Z = 2`
//     `000000010000000200000003000000000000000000000000000000000000000000000000000000000000002300000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002`

const BN254_PRIME =
  21888242871839275222246405745257275088696311157297823662689037894645226208583n

/**
 * Writes given bigint to big-endian bytes with given length.
 * @param {bigint|number|string} b Scalar
 * @param {number} len Number of output bytes
 * @returns {Buffer} Big-endian bytes
 */
function toBuffer(b, len) {
  if (typeof b !== "bigint") {
    b = BigInt(b)
  }
  const out = Buffer.alloc(len)
  for (let i = len - 1; i >= 0; --i) {
    out[i] = Number(b & 255n)
    b >>= 8n
  }
  return out
}

/**
 * Counts all items at any nesting level in all passed arrays.
 * @param  {...any} x Arbitrarily nested bigint array(s)
 * @returns {number} Total item count
 */
function total(...x) {
  return x
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur) => {
      if (Array.isArray(cur)) {
        return total(cur) + acc
      } else {
        return acc + 1
      }
    }, 0)
}

/**
 * Coerces given (string) scalar(s) to bigint.
 * @param {any} x Scalar
 * @return {any} Bigint scalar or vector
 */
function toBigInt(x) {
  if (Array.isArray(x)) {
    return x.map(v =>
      Array.isArray(v)
        ? toBigInt(v)
        : typeof v !== "bigint"
          ? BigInt(v.toString())
          : v,
    )
  } else {
    return typeof x !== "bigint" ? BigInt(x.toString()) : x
  }
}

/**
 * Recursicely pushes given inputs as field elements onto the out array.
 * @param {any} inputs
 * @param {[]number} out
 * @returns {[number]} out array populated with all field elements of inputs
 */
function pushFieldElements(prime, inputs, out) {
  return inputs.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return pushFieldElements(prime, cur, acc)
    } else {
      Array.prototype.push.apply(acc, toBuffer(cur % prime, 32))
      return acc
    }
  }, out)
}

/**
 * Serializes given gnark inputs to a binary full witness.
 * @param {Object} inputs Must only contain bigint (arrays), no nested objects.
 * @param {Object} publics Must set each *public* input's key to true.
 * @param {bigint} prime Prime of the constraint system's elliptic curve
 * @param {boolean} publicOnly Only serializes the public witness
 * @returns {Buffer} Serialized witness
 */
export default function serialize(
  inputs,
  publics,
  opts = { prime: BN254_PRIME, publicOnly: false },
) {
  const prime = opts.prime || BN254_PRIME
  const publicOnly =
    opts.publicOnly === true || opts.publicOnly === false
      ? opts.publicOnly
      : false
  let out = []

  // sort public/secret inputs
  const pubs = []
  const secs = []
  for (var [k, v] of Object.entries(inputs)) {
    if (!Array.isArray(v) && Object.getPrototypeOf(v).constructor === Object) {
      throw Error("nested objects not supported ." + k)
    }
    if (publics[k] === true) {
      pubs.push(toBigInt(v))
    } else if (!publicOnly) {
      secs.push(toBigInt(v))
    }
  }

  // write npub nsec nall
  Array.prototype.push.apply(out, toBuffer(total(pubs), 4))
  if (publicOnly) {
    Array.prototype.push.apply(out, [0, 0, 0, 0])
  } else {
    Array.prototype.push.apply(out, toBuffer(total(secs), 4))
  }
  Array.prototype.push.apply(
    out,
    toBuffer(total(pubs, publicOnly ? [] : secs), 4),
  )

  // push actual field elements for public and secret inputs
  out = pushFieldElements(prime, pubs, out)
  out = pushFieldElements(prime, secs, out)

  return Buffer.from(out)
}
