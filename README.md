# gnark-witnejs

[![ci](https://github.com/chiefbiiko/gnark-witnejs/workflows/ci/badge.svg)](https://github.com/chiefbiiko/gnark-witnejs/actions/workflows/ci.yml)
🚧 FIX IN PROGRESS
[gnark](https://github.com/Consensys/gnark) witness serializer in js.

## Usage

```js
import serialize from "gnark-witnejs"

const inputs = { x: 3n, y: 35n, z: [ [ 0n, 99n ], 77n ] }
const publics = { x: true } // indicates public inputs
const opts = {/* prime: BN254, publicOnly: false */}

const buf = serialize(inputs, publics, opts)
```

Make sure that:

+ the input object does not contain nested objects
  > nested arrays are supported though
+ input fields must appear in the same order as in the golang struct