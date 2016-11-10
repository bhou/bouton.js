const Node = require("./Node");

function newInstance(tags = {}) {
  let m = {};

  m._tags = tags;

  m.Node = Node;  // Node class
  m.Bouton = Node;  // alias of node

  m.END = Node.END; // END signal

  m.reserved = [
    "id", "options", "ee", "observers", "upstreams", "downstreams", "tags",
    "push", "onReceive", "onSignal", "onError", "onEnd", "send",
    "observe", "to", "pull", "onRequest", "request", "from", "isErrorSignal",
    "isEndSignal", "throwError", "invokeObservers"
  ];
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
      node.tags = this.tags;
      return this.to(node);
    };

    Node.prototype[name] = fn;
    m[name] = function(...args) {
      let node = operator(...args);
      node.tags = m._tags;
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
      node.tags = m._tags;
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

    if (extension.others) {
      for (let name in extension.others) {
        m[name] = extension.others[name];
      }
    }

    return m;
  }
  m.extend = extend;

  /**
   * set tags for the bouton object
   */
  function setTags (tags) {
    m._tags = tags;
  }
  m.setTags = setTags;

  /**
   * set single tag for the bouton object
   */
  function setTag (name, tag) {
    m._tags[name] = tag;
  }
  m.setTag = setTag;

  /**
   * remove tag
   */
  function removeTag (name) {
    if (m._tags.hasOwnProperty(name)) {
      delete m._tags[name];
    }
  }
  m.removeTag = removeTag;

  return m;
}

let m = newInstance();
m.new = newInstance;

module.exports = m;
