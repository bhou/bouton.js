exports["test Node"] = {
  "test push signal" : (test) => {
    const bouton = require("../lib");

    class TestNode extends bouton.Node {
      onSignal(signal) {
        this.send(signal + 1);
      }
    }

    var node = new TestNode();

    node.observeSignal((signal) => {
      test.equal(signal, 101);
      test.done();
    });

    node.push(100);
  },

  "test pipeline" : (test) => {
    const bouton = require("../lib");
    bouton.asList([100])
      .map(v => v + 1)
      .map(v => {
        test.equal(v, 101);
        test.done();
        return v;
      })
      .sink();
  },

  "test scan" : (test) => {
    const bouton = require("../lib");

    let index = 0;
    bouton.asList([1, 2, 3])
      .scan(0, (a, b) => {
        return a + b;
      })
      .act(v => {
        console.log(v);
        if (index < 2) index++;
        else {
          test.equal(v, 6);
          test.done();
        }
      })
      .sink();
  }
}
