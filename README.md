# bouton.js

A reactive programming library based on a simple data  structure: similar to a Doubly Linked List：

![bouton.js](https://raw.githubusercontent.com/bhou/bouton.js/master/bouton.jpg)

with bidirectional data flow:
```
[signal flow]  : push(signal) -> Node -> send(signal) -> push(signal) -> Node
[command flow] : Node <- pull(cmd) <- request(cmd) <- Node <- pull(cmd)
```

The signal/data flow is called "**downstream**", the command flow is called "**upstream**".

See the tutorial: [Implement a JavaScript reactive programming library](http://blog.bohou.fr/2016/07/03/a-reactive-programming-library-implementation-part-1/)

I haven't provided many operators in this library yet (In progress). The idea of this library is to let you customize the library on your own way. You can build your own reactive programming library with your own set of operators.

## Example

In browser
```JavaScript
// fromDOMEvent is an active source
bouton.fromDOMEvent("click", document.getElementById("btn"))
  .throttle(500)
  .map(v => 1)
  .scan(0, (a, b) => a + b) // count the clicks
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

## API

### Sources
More sources coming soon

#### - bouton.asList(array)

Turn an array to a signal source. It is a **passive** source : you need a **sink** operator to drive the stream

#### - bouton.fromDOMEvent(event, element)

Works in browser. send DOM event to the stream. This is an **active** source, you don't need a **sink** to drive it.

----
### Operators

More operators coming soon

#### - stream.act((signal) => void)
Make side effect with the signal, send the original signal to the stream

#### - stream.errors(error, rethrow)
Handle errors occurred on upstream. use *rethrow* to resend signal/error to stream.

#### - stream.map((signal) => signal)
transform signal to another form

#### - stream.scan((state, add) => sum)
handle signal with a state

#### - stream.sink()
drive stream with a passive source

#### - stream.throttle(ms)
Only allow one signal pass in *ms* millisecond.

### Utils

#### - bouton.addOperator(name, operator)

add a new operator. An operator is a function which returns a Node instance.

For example:

```JavaScript
bouton.addOperator("count", (initCount) => {
  class CountNode extends bouton.Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.initCount = this.options;
    }

    onSignal(signal) {
      this.initCount++;
      this.send(this.initCount);
    }
  }

  return new CountNode(initCount);
});

bouton.asList(["a", "b", "c"])
  .count(10)
  .act(console.log)
  .sink();

// output
// 11
// 12
// 13
```
