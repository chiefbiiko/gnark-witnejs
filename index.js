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


// all inputs must be bigints and the inputs object must be flat.
// publics is an object containing each public input's key and the respective value set to true.
export function calculate(inputs, publics) {
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
    out.push(pubs.length)


}