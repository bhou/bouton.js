# bouton.js

A reactive programming library which based on a basic element called "Node":

![bouton.js](https://raw.githubusercontent.com/bhou/bouton.js/master/bouton.jpg)

See the tutorial: [Implement a JavaScript reactive programming library](http://blog.bohou.fr/2016/07/03/a-reactive-programming-library-implementation-part-1/)


## Example

In browser
```JavaScript
// fromDOMEvent is an active source
bouton.fromDOMEvent("click", document.getElementById("btn"))
  .throttle(500)
  .map(v => 1)
  .scan(0, (a, b) => a + b)
  .act(console.log);
```

In node.js
```JavaScript
const bouton = require("bouton");
bouton.asList([1, 2, 3]) // asList is a passive source
  .map(v => {
    console.log(v);
    return v;
  })
  .sink(); // back pressure, drive the stream
```

## build

1. build nodejs library
```
npm run build
```
2. pack web modules

developer version version, will generate `build/bouton.js`
```
npm run webpack
```

production version, will generate `build/bouton.min.js`
```
npm run webpack-prod
```
