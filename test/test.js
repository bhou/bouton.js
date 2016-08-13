exports["test Node"] = {
  "test push signal" : (test) => {
    const bouton = require("../lib").default();

    class TestNode extends bouton.Node {
      onSignal(signal) {
        this.send(signal + 1);
      }
    }

    var node = new TestNode();

    node.observe((node, when, signal) => {
      if (when === "send") {
        test.equal(signal, 101);
        test.done();
      }
    });

    node.push(100);
  },

  "test pipeline" : (test) => {
    const bouton = require("../lib").default();
    bouton.asList([100])
      .map(v => v + 1)
      .map(v => {
        test.equal(v, 101);
        test.done();
        return v;
      })
      .sink();
  },

  "test scan operator" : (test) => {
    const bouton = require("../lib").default();

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
  },

  "test just source" : (test) => {
    const bouton = require("../lib").default();

    let count = 0;
    bouton.just(1)
      .act(console.log)
      .act(v => count++)
      .done(() => {
        test.equal(count, 1);
        test.done();
      })
      .sink();
  },

  "test reduce operator" : (test) => {
    const bouton = require("../lib").default();

    let index = 0;
    bouton.asList([1, 2, 3])
      .reduce(0, (a, b) => {
        return a + b;
      })
      .act(v => {
        test.equal(v, 6);
        test.done();
      })
      .sink();
  },

  "test new instance" : (test) => {
    const bouton = require("../lib").new().default();

    let index = 0;
    bouton.asList([1, 2, 3])
      .reduce(0, (a, b) => {
        return a + b;
      })
      .act(v => {
        test.equal(v, 6);
        test.done();
      })
      .sink();
  },

  "test new instance with tags" : (test) => {
    const bouton0 = require("../lib").default();

    const bouton1 = require("../lib").new({
      tag1 : "tag1",
      tag2 : "tag2"
    }).default();

    const bouton2 = require("../lib").new({
      tag1 : "tag1.2",
      tag2 : "tag2.2"
    }).default();

    let source = bouton0.asList([1, 2, 3]);
    let act = bouton0.act(v => {});

    test.equal(source.tags.tag1, undefined);
    test.equal(source.tags.tag2, undefined);
    test.equal(act.tags.tag1, undefined);
    test.equal(act.tags.tag2, undefined);

    let source1 = bouton1.asList([1, 2, 3]);
    let source2 = bouton2.asList([1, 2, 3]);
    let act1 = source1.act(v => {});
    let act2 = source2.act(v => {});

    test.equal(source1.tags.tag1, "tag1");
    test.equal(source1.tags.tag2, "tag2");
    test.equal(act1.tags.tag1, "tag1");
    test.equal(act1.tags.tag2, "tag2");

    test.equal(source2.tags.tag1, "tag1.2");
    test.equal(source2.tags.tag2, "tag2.2");
    test.equal(act2.tags.tag1, "tag1.2");
    test.equal(act2.tags.tag2, "tag2.2");

    test.done();
  }

}
