
const Node = require("./Node");

function map(fn) {
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
}

exports["map"] = map;

function filter(fn) {
  class FilterNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onSignal(signal) {
      if (fn(signal)) {
        this.send(signal);
      } else {
        // request next signal
        this.request();
      }
    }
  }
  return new FilterNode(fn);
}

exports["filter"] = filter;

function reduce(memo, iterator) {
  class ReduceNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.memo = this.options.memo;
      this.iterator = this.options.iterator;
      this.END = false;
    }

    onSignal(signal) {
      this.memo = this.iterator.call(this, this.memo, signal);
      this.request(); // back pressure call for next
    }

    onEnd() {
      this.send(this.memo);
      this.END = true;
    }

    onRequest(cmd) {
      if (!this.END) {
        this.request();
      } else {
        this.send(Node.END);
      }
    }
  }
  return new ReduceNode({memo, iterator});
}

exports["reduce"] = reduce;


function errors(fn) {
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

exports["errors"] = errors;

function sink() {
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

exports["sink"] = sink;

function throttle(ms) {
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

exports["throttle"] = throttle;

function scan(n, add) {
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

exports["scan"] = scan;

function act (fn) {
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

exports["act"] = act;

function done(fn) {
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

exports["done"] = done;
