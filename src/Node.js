//@flow
const EventEmitter = require("eventemitter3");
const uuid = require("node-uuid");

class Node {
  id : string;
  options: any;
  ee: EventEmitter;
  signalObservers : [(signal : any) => void];
  commandObservers : [(signal : any) => void];
  constructor(options : any, eventemitter : ?EventEmitter) {
    this.id = uuid.v1();
    this.options = options;
    this.ee = eventemitter ? eventemitter : new EventEmitter();
    this.signalObservers = [];
    this.commandObservers = [];
  }

  push(signal : any) : Node {
    setImmediate(()=>{
      this.onReceive(signal);
    });
    return this;
  }

  onReceive(signal : any) : Node {
    if (signal instanceof Error) {
      this.onError(signal);
      this.request();
      //$FlowIgnore
    } else if (signal === Node.END) {
      try {
        this.onEnd(signal);
      } catch (error) {
        this.send(error);
      }
    }else {
      try {
        this.onSignal(signal);
      } catch (error) {
        this.send(error);
      }
    }
    return this;
  }

  onSignal(signal : any) : Node {
    this.send(signal);
    return this;
  }

  onError(error : Error) : Node {
    this.send(error);
    return this;
  }

  onEnd(signal : any) : Node {
    this.send(signal);
    return this;
  }

  send(signal : any) : Node {
    this.signalObservers.forEach(fn => {
      fn(signal);
    });
    setImmediate(()=> {
      this.ee.emit("outgoing-" + this.id, signal);
    });
    return this;
  }

  observeSignal(observer : (signal : any) => void) : Node {
    this.signalObservers.push(observer);
    return this;
  }

  to(downstream : Node) : Node {
    this.ee.on("outgoing-" + this.id, (signal) => {
      downstream.push(signal);
    });
    // for pull model
    downstream.ee.on("request-" + downstream.id, (cmd) => {
      this.pull(cmd);
    });
    downstream.from(this);
    return downstream;
  }

  pull(cmd : any) : Node {
    setImmediate(() => {
      this.onRequest(cmd);
    });
    return this;
  }

  onRequest(cmd : any) : Node {
    this.request(cmd);
    return this;
  }

  request(cmd : any) : Node {
    this.commandObservers.forEach(fn => {
      fn(cmd);
    });
    setImmediate(() => {
      this.ee.emit("request-" + this.id, cmd);
    });
    return this;
  }

  observeCommand(observer : (cmd : any) => void) : Node {
    this.commandObservers.push(observer);
    return this;
  }

  from(upstream : any) : Node {
    return this;
  }
}

//$FlowIgnore
Node.END = "__SIGNAL_END__";

module.exports = Node;
