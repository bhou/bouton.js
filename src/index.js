const Node = require("./Node");
const operators = require("./operators");
const sources = require("./sources");

exports.Node = Node;
exports.Bouton = Node;  // alias of node

exports.END = Node.END;

exports.addOperator = (name, operator) => {
  function fn(...args) {
    let node = operator(...args);
    return this.to(node);
  };

  Node.prototype[name] = fn;
}

for (let name in operators) {
  exports.addOperator(name, operators[name]);
}

for (let name in sources) {
  exports[name] = sources[name];
}
