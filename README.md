# gnark-witnejs
WIP
[gnark](https://github.com/Consensys/gnark) witness calculator in js.

## Usage 

```js
import serialize from "gnark-witnejs"

const inputs = { x: 3n, y: 35n, z: [ [ 0n, 99n ], 77n ] }
const publics = { x: true } // indicates public inputs
    
const buf = serialize(inputs, publics)
```

Serializes the full witness, i.e. incl. public and secret inputs as long as

+ the input object does not contain nested objects
  > nested arrays are supported though
+ input fields must appear in the same order as in the golang struct