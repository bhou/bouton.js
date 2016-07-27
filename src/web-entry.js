window.bouton = require("./index.js").default();

window.bouton.fromDOMEvent = (element, event) => {
  class DOMEventNode extends bouton.Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);

      this.event = this.options.event;
      this.element = this.options.element;
    }

    to(downstream) {
      this.element.addEventListener(this.event, () => {
        this.send({
          event: this.event,
          sourceId: this.element.getAttribute("id")
        });
      });

      return super.to(downstream);
    }
  }

  return new DOMEventNode({
    event : event,
    element : element
  });
}
