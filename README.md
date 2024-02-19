# gnark-witnejs

[gnark](https://github.com/Consensys/gnark) witness calculator in js.

Serializes the full witness, i.e. incl. public and secret inputs if ;)

+ the input object is flat and not nested, i.e. no inner structs
+ input fields must appear in the same order as in the golang struct
+ all inputs are `bigint`s

```js
TODO
```