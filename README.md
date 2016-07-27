# bouton.js

A framework to build your reactive library. It provides a basic feature set for your reactive library:

- asynchronous
- error handling
- back pressure
- operator extension
- source extension

The kernel of "bouton.js" is a "Node" or we can called it a "Bouton". See the following diagram: (Isn't it looks like a button? in french: "bouton")

![bouton.js](https://raw.githubusercontent.com/bhou/bouton.js/98f940870c249e872118e24b81550faa830cc312/bouton.jpg)

It has a bidirectional data flow:
```
[signal flow]  : push(signal) -> Node -> send(signal) -> push(signal) -> Node
[command flow] : Node <- pull(cmd) <- request(cmd) <- Node <- pull(cmd)
```

The signal/data flow is called "**downstream**", the command flow is called "**upstream**".

By chaining Node together you can build your stream like what RxJS, bacon.js and highland.js do.

**bouton.js** ships with a small set of operators and signal generator, and provides a very simple API for you to extend you own operator and signal source.

To understand how **bouton.js** works, see the tutorial: [Implement a JavaScript reactive programming library](http://blog.bohou.fr/2016/07/03/a-reactive-programming-library-implementation-part-1/)

I haven't provided many operators in this library yet (In progress). The idea of this library is to let you customize the library on your own way. You can build your own reactive programming library with your own set of operators.

## Node / Bouton

Node is the basic and only data structure in bouton.js. Both your data source and operator are inherited from it.

From Node's internal point of view: it handles the received signal with **onReceive()**, and **send()** signal to downstream node. It also handles the request made by downstream with **onRequest()**, and makes a **request()** to upstream.

From external point of view: You can **push()** a signal to a node, and observe the signal emitted by the node with **observe()**. You can make a request with **pull()**. And observe the request made by the node by using **observe()**.

See document : Node


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
const bouton = require("bouton").default();
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

#### - bouton.just(value)

A source with only one signal in it.

#### - bouton.asList(array)

Turn an array to a signal source. It is a **passive** source : you need a **sink** operator to drive the stream

#### - bouton.fromDOMEvent(event, element)

Works in browser. send DOM event to the stream. This is an **active** source, you don't need a **sink** to drive it.

----
### Operators

More operators coming soon

#### - stream.act((signal) => void)
Make side effect with the signal, send the original signal to the stream

#### - stream.done(() => void)

Handle END signal

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

#### - bouton.addOperators(operators)

add multiple operators, accept a map of name:operator pair as argument

#### - bouton.addSource(name, source)

register a source function.

#### - bouton.addSources(sources)

register multiple sources. accept a map of name:source pair as argument

#### - bouton.default()

register the default operators and sources.

```
const bouton = require("bouton").addDefault();
```
