//@flow
const EventEmitter = require("eventemitter3");
const uuid = require("node-uuid");

type NodeRef = { [key: string]: Node };

class Node {
  id : string;
  options: any;
  ee: EventEmitter;
  observers : [(node : Node, when : string, ... data : any) => void];
  upstreams : NodeRef;
  downstreams : NodeRef;
  tags : any;
  constructor(options : any, eventemitter : ?EventEmitter) {
    this.id = uuid.v1();
    this.options = options;
    this.ee = eventemitter ? eventemitter : new EventEmitter();
    this.observers = [];
    this.upstreams = {};
    this.downstreams = {};
    this.tags = {};
  }

  push(signal : any, interruptible : ?boolean = true) : Node {
		if (interruptible === false || !this.isInterruptibleSignal(signal)) {
      for (let id in this.downstreams) {
        this.onReceive(signal);
      }
      return this;
    }

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

  send(signal : any, interruptible : ?boolean = true) : Node {
    this.invokeObservers("send", signal);
    if (interruptible === false || !this.isInterruptibleSignal(signal)) {
      for (let id in this.downstreams) {
        this.downstreams[id].onReceive(signal);
      }
      return this;
    }
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

    this.downstreams[downstream.id] = downstream;
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

  from(upstream : any) : Node {
    this.upstreams[upstream.id] = upstream;
    this.invokeObservers("from", upstream);
    return this;
  }

  isInterruptibleSignal(signal : any) : boolean {
    return true;
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
    data.unshift(when)
    data.unshift(this);
    try {
      this.observers.forEach(fn => {
        fn.apply(this, data);
      });

      // run globally registered observers
      let globalObservers = require("./index").observers;
      for (let name in globalObservers) {
        globalObservers[name].apply(this, data);
      };
    } catch (err) {
      console.error(err.message);
    }
  }
}

//$FlowIgnore
Node.END = "__SIGNAL_END__";

module.exports = Node;
