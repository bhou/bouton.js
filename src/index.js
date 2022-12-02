const Node = require("./Node");

function shadowCopy(src, target) {
  for (let k in src) {
    if (src.hasOwnProperty(k)) {
      target[k] = src[k];
    }
  }
}

function newInstance(meta = {}) {
  let m = {};

  m._meta = meta;
  m._indexers = new Map();

  m.Node = Node;  // Node class
  m.Bouton = Node;  // alias of node

  m.END = Node.END; // END signal

  m.reserved = [
    "id", "options", "ee", "observers", "upstreams", "downstreams", "meta",
    "push", "onReceive", "onSignal", "onError", "onEnd", "send",
    "observe", "to", "pull", "onRequest", "request", "from", "isErrorSignal",
    "isEndSignal", "throwError", "invokeObservers"
  ];

  function indexNode(node) {
    for (let indexer of m._indexers.values()) {
      indexer(node);
    }
  }

  /**
   * Add an operator
   * @param  {string} name   - the name of the operator
   * @param  {function} operator - the operator function
   * @return {bouton}          the bouton module
   */
  function addOperator(name, operator) {
    if (m.reserved.indexOf(name) >= 0) {
      console.warn(`can't add operator '${name}', name is reserved. `);
      return m;
    }

    function fn(...args) {
      let node = operator(...args);
      node.meta = {};
      shadowCopy(this.meta, node.meta);
      indexNode(node);
      return this.to(node);
    };

    Node.prototype[name] = fn;
    m[name] = function(...args) {
      let node = operator(...args);
      node.meta = {};
      shadowCopy(m._meta, node.meta);
      indexNode(node);
      return node;
    };

    return m;
  }
  m.addOperator = addOperator;

  /**
   * Add multiple operators
   * @param {object} operators - name:operator pair
   * @return {bouton} the bouton module
   */
  function addOperators (ops) {
    for (let name in ops) {
      m.addOperator(name, ops[name]);
    }
  }
  m.addOperators = addOperators;

  /**
   * add a source
   * @param {string} name   - the source name
   * @param {function} source - the source function
   * @return {bouton}  the bouton module
   */
  function addSource (name, source) {
    if (m.reserved.indexOf(name) >= 0) {
      console.warn(`can't add source '${name}', name is reserved. `);
      return m;
    }
    m[name] = function(...args) {
      let node = source(...args);
      node.meta = {};
      shadowCopy(m._meta, node.meta);
      indexNode(node);
      return node;
    };
    return m;
  }
  m.addSource = addSource;

  /**
   * Add multiple sources
   * @param {object} srcs - name:source pair
   * @return {bouton} the bouton module
   */
  function addSources(srcs) {
    for (let name in srcs) {
      m.addSource(name, srcs[name]);
    }
    return m;
  }
  m.addSources = addSources;

  /**
   * add querier
   * @param {string} name - the querier name
   * @param {object} querier - the querier object with query method
   * @return {bouton} the bouton module
   */
  function addQuerier(name, querier) {
    m[name] = function(...args) {
      return querier.query(m, ...args);
    }
    return m;
  }
  m.addQuerier = addQuerier;

  /**
   * add indexer
   * @param {string} name - the indexer name
   * @param {object} indexer - the indexer object with index method
   * @return {bouton} the bouton module
   */
  function addIndexer(name, indexer) {
    m._indexers.set(name, function(node) {
      indexer.index(m, node);
    })
    return m;
  }
  m.addIndexer = addIndexer;

  /**
   * load default sources and operators
   * @return {[type]} [description]
   */
  function extendDefault () {
    const operators = require("./operators"); // default operators
    const sources = require("./sources"); // default sources

    m.addSources(sources);
    m.addOperators(operators);
    return m;
  }
  m.default = extendDefault;


  m.observers = {};
  m.Node.globalObservers = m.observers

  function extend(extension) {
    if (typeof extension === "string") {
      extension = require(extension);
    }

    if (extension.operators) {
      m.addOperators(extension.operators);
    }

    if (extension.sources) {
      m.addSources(extension.sources);
    }

    if (extension.observers) {
      for (let name in extension.observers) {
        m.observers[name] = extension.observers[name];
      }
    }

    if (extension.indexers) {
      for (let name in extension.indexers) {
        m.addIndexer(name, extension.indexers[name]);
      }
    }

    if (extension.queriers) {
      for (let name in extension.queriers) {
        m.addQuerier(name, extension.queriers[name]);
      }
    }

    if (extension.others) {
      for (let name in extension.others) {
        m[name] = extension.others[name];
      }
    }

    return m;
  }
  m.extend = extend;

  /**
   * set meta for the bouton object
   */
  function setMeta (metadata) {
    m._meta = metadata;
  }
  m.setMeta = setMeta;

  /**
   * set single meta data for the bouton object
   */
  function addMeta (name, meta) {
    m._meta[name] = meta;
  }
  m.addMeta = addMeta;

  /**
   * remove meta data
   */
  function removeMeta (name) {
    if (m._meta.hasOwnProperty(name)) {
      delete m._meta[name];
    }
  }
  m.removeMeta = removeMeta;

  return m;
}

let m = newInstance();
m.new = newInstance;

module.exports = m;
