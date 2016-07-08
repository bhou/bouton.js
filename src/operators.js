
const Node = require("./Node");

exports["map"] = (fn) => {
  class MapNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onSignal(signal) {
      let out = this.fn(signal);
      this.send(out);
    }
  }
  return new MapNode(fn);
};

exports["errors"] = (fn) => {
  class ErrorsNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onError(error) {
      this.fn(error, (signal) => {
        this.send(signal);
      });
    }
  }
  return new ErrorsNode(fn);
};

exports["sink"] = () => {
  class SinkNode extends Node {
    onSignal(signal) {
      this.request();
    }

    from(node) {
      this.request();
    }
  }

  return new SinkNode();
};

exports["throttle"] = (ms) => {
  var last = new Date().getTime();
  class ThrottleNode extends Node {
    onSignal(signal) {
      var now = new Date().getTime();
      if (now - ms >= last) {
        last = now;
        this.send(signal);
      }
    }
  }
  return new ThrottleNode(ms);
};

exports["scan"] = (n, add) => {
  class ScanNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.n = options.n;
      this.add = options.add;
    }
    onSignal(signal) {
      this.n = this.add.call(this, this.n, signal);
      this.send(this.n);
    }
  }

  return new ScanNode({
    n : n,
    add : add
  });
};

exports["act"] = (fn) => {
  class ActNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onSignal(signal) {
      this.fn(signal);
      this.send(signal);
    }
  }
  return new ActNode(fn);
}

exports["done"] = (fn) => {
  class DoneNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onEnd(signal) {
      this.fn(signal);
    }
  }
  return new DoneNode(fn);
}
