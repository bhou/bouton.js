const Node = require("./Node");

let m = {};

m.Node = Node;  // Node class
m.Bouton = Node;  // alias of node

m.END = Node.END; // END signal

/**
 * Add an operator
 * @param  {string} name   - the name of the operator
 * @param  {function} operator - the operator function
 * @return {bouton}          the bouton module
 */
m.addOperator = (name, operator) => {
  function fn(...args) {
    let node = operator(...args);
    return this.to(node);
  };

  Node.prototype[name] = fn;

  return m;
}

/**
 * Add multiple operators
 * @param {object} operators - name:operator pair
 * @return {bouton} the bouton module
 */
m.addOperators = (ops) => {
  for (let name in ops) {
    m.addOperator(name, ops[name]);
  }
}

/**
 * add a source
 * @param {string} name   - the source name
 * @param {function} source - the source function
 * @return {bouton}  the bouton module
 */
m.addSource = (name, source) => {
  m[name] = source;
  return m;
}

/**
 * Add multiple sources
 * @param {object} srcs - name:source pair
 * @return {bouton} the bouton module
 */
m.addSources = (srcs) => {
  for (let name in srcs) {
    m[name] = srcs[name];
  }
  return m;
}

/**
 * load default sources and operators
 * @return {[type]} [description]
 */
m.addDefault = () => {
  const operators = require("./operators"); // default operators
  const sources = require("./sources"); // default sources

  m.addSources(sources);
  m.addOperators(operators);
  return m;
}

module.exports = m;
