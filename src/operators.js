
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
