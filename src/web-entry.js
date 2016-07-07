window.bouton = require("./index.js");

window.bouton.fromDOMEvent = (element, event) => {
  class DOMEventNode extends bouton.Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);

      this.event = this.options.event;
      this.element = this.options.element;
    }

    to(downstream) {
      super.to(downstream);

      this.element.addEventListener(this.event, () => {
        this.send({
          event: this.event,
          sourceId: this.element.getAttribute("id")
        });
      });
    }
  }

  return new DOMEventSensor({
    event : event,
    element : element
  });
}
