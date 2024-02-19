// Package witness provides serialization helpers to encode a witness into a []byte.
//
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

const BN_254 = 21888242871839275222246405745257275088696311157297823662689037894645226208583n

/** Writes given bigint to $len big-endian bytes. */
function toBytesBE(b, len) {
    if (typeof b !== "bigint") {
        b = BigInt(b)
    }
    const out = Buffer.alloc(len)
    for (let i = len - 1; i >= 0; --i) {
      out[i] = Number(b & 255n);
      b >>= 8n;
    }
    return out
}

// all inputs must be bigints and the inputs object must be flat.
// publics is an object containing each public input's key and the respective value set to true.
// prime indicates the constraint system curve used
export function calculate(inputs, publics, prime = BN_254) {
    const out = []
    const pubs = []
    const secs = []
    for (var [k, v] of Object.entries(inputs)) {
        if (publics[k] === true) {
            pubs.push(v)
        } else {
            secs.push(v)
        }
    }
    Array.prototype.push.apply(out, toBytesBE(pubs.length, 4))
    Array.prototype.push.apply(out, toBytesBE(secs.length, 4))
    Array.prototype.push.apply(out, toBytesBE(pubs.length + secs.length, 4))
    for (const pub of pubs) {
        if (Array.isArray(pub)) { // TODO VERIFY ARRAY PREFIXING MANUALLY
            // TODO prefix arr len
            Array.prototype.push.apply(out, toBytesBE(pub % prime, 32))
        } else {
            Array.prototype.push.apply(out, toBytesBE(pub % prime, 32))
        }
    }
    for (const sec of secs) {
        if (Array.isArray(sec)) { // TODO VERIFY ARRAY PREFIXING MANUALLY
            // TODO prefix arr len
            Array.prototype.push.apply(out, toBytesBE(sec % prime, 32))
        } else {
            Array.prototype.push.apply(out, toBytesBE(sec % prime, 32))
        }
    }
    return Buffer.from(out)
}