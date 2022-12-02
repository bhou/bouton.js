test('test push signal', done => {
  const bouton = require("../src").default();

  class TestNode extends bouton.Node {
    onSignal(signal) {
      this.send(signal + 1);
    }
  }

  var node = new TestNode();

  node.observe((_, when, signal) => {
    if (when === "send") {
      expect(signal).toBe(101);
      done();
    }
  });

  node.push(100);
})

test('global observer', done => {
  const bouton = require("../src").default();

  class TestNode extends bouton.Node {
    onSignal(signal) {
      this.send(signal + 1);
    }
  }

  bouton.extend({
    observers: [
      function(_, when, signal) {
        if (when === "send") {
          expect(signal).toBe(101);
          done();
        }
      }
    ]
  })

  const node = new TestNode();
  node.push(100);
})

test('test pipeline', (done) => {
  const bouton = require("../src").default();
  bouton.asList([100])
    .map(v => v + 1)
    .map(v => {
      expect(v).toBe(101);
      done();
      return v;
    })
    .sink();
})

test("test scan operator", (done) => {
  const bouton = require("../src").default();

  let index = 0;
  bouton.asList([1, 2, 3])
    .scan(0, (a, b) => {
      return a + b;
    })
    .act(v => {
      if (index < 2) index++;
      else {
        expect(v).toBe(6);
        done();
      }
    })
    .sink();
})

test("test just source", (done) => {
  const bouton = require("../src").default();

  let count = 0;
  bouton.just(1)
    .act(console.log)
    .act(_ => count++)
    .done(() => {
      expect(count).toBe(1);
      done();
    })
    .sink();
})


test("test reduce operator", (done) => {
  const bouton = require("../src").default();

  bouton.asList([1, 2, 3])
    .reduce(0, (a, b) => {
      return a + b;
    })
    .act(v => {
      expect(v).toBe(6);
      done();
    })
    .sink();
})

test("test new instance", (done) => {
  const bouton = require("../src").new().default();

  bouton.asList([1, 2, 3])
    .reduce(0, (a, b) => {
      return a + b;
    })
    .act(v => {
      expect(v).toBe(6);
      done();
    })
    .sink();
})

test("test new instance with metadata", (done) => {
  const bouton0 = require("../src").default();

  const bouton1 = require("../src").new({
    tag1 : "tag1",
    tag2 : "tag2"
  }).default();

  const bouton2 = require("../src").new({
    tag1 : "tag1.2",
    tag2 : "tag2.2"
  }).default();

  let source = bouton0.asList([1, 2, 3]);
  let act = bouton0.act(_ => {});

  expect(source.meta.tag1).toBeUndefined();
  expect(source.meta.tag2).toBeUndefined();
  expect(act.meta.tag2).toBeUndefined();
  expect(act.meta.tag2).toBeUndefined();

  let source1 = bouton1.asList([1, 2, 3]);
  let source2 = bouton2.asList([1, 2, 3]);
  let act1 = source1.act(v => {});
  let act2 = source2.act(v => {});

  expect(source1.meta.tag1).toBe("tag1");
  expect(source1.meta.tag2).toBe("tag2");
  expect(act1.meta.tag1).toBe("tag1");
  expect(act1.meta.tag2).toBe("tag2");

  expect(source2.meta.tag1).toBe("tag1.2");
  expect(source2.meta.tag2).toBe("tag2.2");
  expect(act2.meta.tag1).toBe("tag1.2");
  expect(act2.meta.tag2).toBe("tag2.2");

  done();
})

test("test find by name", (done) => {
  const bouton = require("../src").new({
    tag1 : "tag1",
    tag2 : "tag2"
  }).default();

  let idIndex = {}
  let accessor = {
    index: (m, node) => {
      idIndex[node.id] = node;
    },
    query: (m, id) => {
      return idIndex[id];
    }
  }

  bouton.addIndexer('id_indexer', accessor);
  bouton.addQuerier('getNodeById', accessor);

  let source = bouton.asList([1, 2, 3]);
  let act = bouton.act(_ => {});

  expect(bouton.getNodeById(source.id).id).toBe(source.id);
  expect(bouton.getNodeById(act.id).id).toBe(act.id);

  done();
})

test("test new instance with copied tag", (done) => {
  const bouton0 = require("../src").default();
  const bouton1 = require("../src").new({
    tag1: 'tag1'
  }).default();
  const bouton2 = require("../src").new().default();

  let source = bouton0.asList([1, 2, 3]);
  let act = bouton0.act(v => {});

  expect(source.meta.tag1).toBeUndefined();
  expect(source.meta.tag2).toBeUndefined();
  expect(act.meta.tag1).toBeUndefined();
  expect(act.meta.tag2).toBeUndefined();

  let source1 = bouton1.asList([1, 2, 3]);
  let source2 = bouton2.asList([1, 2, 3]);

  bouton1.addMeta('tag2', 'tag2');
  let act1 = source1.act(v => {});

  bouton2.addMeta('tag1', 'tag1.2');
  bouton2.addMeta('tag2', 'tag2.2');
  let act2 = source2.act(v => {});

  expect(source1.meta.tag1).toBe("tag1");
  expect(source1.meta.tag2).not.toBe("tag2");
  expect(act1.meta.tag1).toBe("tag1");
  expect(act1.meta.tag2).not.toBe("tag2");

  expect(source2.meta.tag1).not.toBe("tag1.2");
  expect(source2.meta.tag2).not.toBe("tag2.2");
  expect(act2.meta.tag1).not.toBe("tag1.2");
  expect(act2.meta.tag2).not.toBe("tag2.2");

  let newAct1 = bouton1.act(v => {});
  let newAct2 = bouton2.act(v => {});

  expect(newAct1.meta.tag2).toBe('tag2');
  expect(newAct2.meta.tag1).toBe('tag1.2');
  expect(newAct2.meta.tag2).toBe('tag2.2');

  done();
})
