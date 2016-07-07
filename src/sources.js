const Node = require("./Node");

class ArraySourceNode extends Node {
  constructor(options, eventemitter) {
    super(options, eventemitter);
    this.source = this.options;
    this.index = 0;
  }

  onRequest(cmd) {
    if (this.source.length === this.index) {
      this.send(Node.END);
      this.index++;
    } else if (this.source.length > this.index) {
      this.send(this.source[this.index]);
      this.index++;
    }
  }
}

exports["asList"] = (array) => {
  return new ArraySourceNode(array);
}
