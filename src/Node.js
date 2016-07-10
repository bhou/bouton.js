//@flow
const EventEmitter = require("eventemitter3");
const uuid = require("node-uuid");

class Node {
  id : string;
  options: any;
  ee: EventEmitter;
  observers : [(node : Node, when : string, ... data : any) => void];
  constructor(options : any, eventemitter : ?EventEmitter) {
    this.id = uuid.v1();
    this.options = options;
    this.ee = eventemitter ? eventemitter : new EventEmitter();
    this.observers = [];
  }

  push(signal : any) : Node {
    setImmediate(()=>{
      this.onReceive(signal);
    });
    return this;
  }

  onReceive(signal : any) : Node {
    this.invokeObservers("onReceive", signal);

    if (this.isErrorSignal(signal)) {
      this.onError(signal);
      this.request();
    } else if (this.isEndSignal(signal)) {
      try {
        this.onEnd(signal);
      } catch (error) {
        this.throwError(error, signal);
      }
    }else {
      try {
        this.onSignal(signal);
      } catch (error) {
        this.throwError(error, signal);
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
    this.invokeObservers("send", signal);
    setImmediate(()=> {
      this.ee.emit("outgoing-" + this.id, signal);
    });
    return this;
  }

  observe(observer : (node : Node, when : string, ... data : any) => void) : Node {
    this.observers.push(observer);
    return this;
  }

  to(downstream : Node) : Node {
    this.invokeObservers("to", downstream);
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
    this.invokeObservers("onRequest", cmd);
    this.request(cmd);
    return this;
  }

  request(cmd : any) : Node {
    this.invokeObservers("request", cmd);
    setImmediate(() => {
      this.ee.emit("request-" + this.id, cmd);
    });
    return this;
  }

  observeCommand(observer : (cmd : any) => void) : Node {
    this.observers.push(observer);
    return this;
  }

  from(upstream : any) : Node {
    this.invokeObservers("from", upstream);
    return this;
  }

  isErrorSignal(signal : any) : boolean {
    return signal instanceof Error;
  }

  isEndSignal(signal : any) : boolean {
    //$FlowIgnore
    return signal === Node.END;
  }

  throwError(error : Error, signal : ?any) : Node {
    //$FlowIgnore
    error.signal = signal;
    return this.send(error);
  }

  invokeObservers(when : string, ... data : any) {
    this.observers.forEach(fn => {
      fn(this, when, data);
    });
  }
}

//$FlowIgnore
Node.END = "__SIGNAL_END__";

module.exports = Node;
