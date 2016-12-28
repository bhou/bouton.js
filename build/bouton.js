/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	var _get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;if (getter === undefined) {
	      return undefined;
	    }return getter.call(receiver);
	  }
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	window.bouton = __webpack_require__(1).default();

	window.bouton.fromDOMEvent = function (element, event) {
	  var DOMEventNode = function (_bouton$Node) {
	    _inherits(DOMEventNode, _bouton$Node);

	    function DOMEventNode(options, eventemitter) {
	      _classCallCheck(this, DOMEventNode);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DOMEventNode).call(this, options, eventemitter));

	      _this.event = _this.options.event;
	      _this.element = _this.options.element;
	      return _this;
	    }

	    _createClass(DOMEventNode, [{
	      key: "to",
	      value: function to(downstream) {
	        var _this2 = this;

	        this.element.addEventListener(this.event, function () {
	          _this2.send({
	            event: _this2.event,
	            sourceId: _this2.element.getAttribute("id")
	          });
	        });

	        return _get(Object.getPrototypeOf(DOMEventNode.prototype), "to", this).call(this, downstream);
	      }
	    }]);

	    return DOMEventNode;
	  }(bouton.Node);

	  return new DOMEventNode({
	    event: event,
	    element: element
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Node = __webpack_require__(2);

	function shadowCopy(src, target) {
	  for (var k in src) {
	    if (src.hasOwnProperty(k)) {
	      target[k] = src[k];
	    }
	  }
	}

	function newInstance() {
	  var meta = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var m = {};

	  m._meta = meta;
	  m._indexers = new Map();

	  m.Node = Node; // Node class
	  m.Bouton = Node; // alias of node

	  m.END = Node.END; // END signal

	  m.reserved = ["id", "options", "ee", "observers", "upstreams", "downstreams", "meta", "push", "onReceive", "onSignal", "onError", "onEnd", "send", "observe", "to", "pull", "onRequest", "request", "from", "isErrorSignal", "isEndSignal", "throwError", "invokeObservers"];

	  function indexNode(node) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = m._indexers.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var indexer = _step.value;

	        indexer(node);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
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
	      console.warn("can't add operator '" + name + "', name is reserved. ");
	      return m;
	    }

	    function fn() {
	      var node = operator.apply(undefined, arguments);
	      node.meta = {};
	      shadowCopy(this.meta, node.meta);
	      indexNode(node);
	      return this.to(node);
	    };

	    Node.prototype[name] = fn;
	    m[name] = function () {
	      var node = operator.apply(undefined, arguments);
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
	  function addOperators(ops) {
	    for (var name in ops) {
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
	  function addSource(name, source) {
	    if (m.reserved.indexOf(name) >= 0) {
	      console.warn("can't add source '" + name + "', name is reserved. ");
	      return m;
	    }
	    m[name] = function () {
	      var node = source.apply(undefined, arguments);
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
	    for (var name in srcs) {
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
	    m[name] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return querier.query.apply(querier, [m].concat(args));
	    };
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
	    m._indexers.set(name, function (node) {
	      indexer.index(m, node);
	    });
	    return m;
	  }
	  m.addIndexer = addIndexer;

	  /**
	   * load default sources and operators
	   * @return {[type]} [description]
	   */
	  function extendDefault() {
	    var operators = __webpack_require__(11); // default operators
	    var sources = __webpack_require__(12); // default sources

	    m.addSources(sources);
	    m.addOperators(operators);
	    return m;
	  }
	  m.default = extendDefault;

	  m.observers = {};

	  function extend(extension) {
	    if (typeof extension === "string") {
	      extension = __webpack_require__(13)(extension);
	    }

	    if (extension.operators) {
	      m.addOperators(extension.operators);
	    }

	    if (extension.sources) {
	      m.addSources(extension.sources);
	    }

	    if (extension.observers) {
	      for (var name in extension.observers) {
	        m.observers[name] = extension.observers[name];
	      }
	    }

	    if (extension.indexers) {
	      for (var _name in extension.indexers) {
	        m.addIndexer(_name, extension.indexers[_name]);
	      }
	    }

	    if (extension.queriers) {
	      for (var _name2 in extension.queriers) {
	        m.addQuerier(_name2, extension.queriers[_name2]);
	      }
	    }

	    if (extension.others) {
	      for (var _name3 in extension.others) {
	        m[_name3] = extension.others[_name3];
	      }
	    }

	    return m;
	  }
	  m.extend = extend;

	  /**
	   * set meta for the bouton object
	   */
	  function setMeta(metadata) {
	    m._meta = metadata;
	  }
	  m.setMeta = setMeta;

	  /**
	   * set single meta data for the bouton object
	   */
	  function addMeta(name, meta) {
	    m._meta[name] = meta;
	  }
	  m.addMeta = addMeta;

	  /**
	   * remove meta data
	   */
	  function removeMeta(name) {
	    if (m._meta.hasOwnProperty(name)) {
	      delete m._meta[name];
	    }
	  }
	  m.removeMeta = removeMeta;

	  return m;
	}

	var m = newInstance();
	m.new = newInstance;

	module.exports = m;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var EventEmitter = __webpack_require__(5);
	var uuid = __webpack_require__(6);

	var Node = function () {
	  function Node(options, eventemitter) {
	    _classCallCheck(this, Node);

	    this.id = uuid.v1();
	    this.options = options;
	    this.ee = eventemitter ? eventemitter : new EventEmitter();
	    this.observers = [];
	    this.upstreams = {};
	    this.downstreams = {};
	    this.meta = {};
	  }

	  _createClass(Node, [{
	    key: "push",
	    value: function push(signal) {
	      var _this = this;

	      var interruptible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      if (interruptible === false || !this.isInterruptibleSignal(signal)) {
	        this.onReceive(signal);
	        return this;
	      }

	      setImmediate(function () {
	        _this.onReceive(signal);
	      });
	      return this;
	    }
	  }, {
	    key: "onReceive",
	    value: function onReceive(signal) {
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
	      } else {
	        try {
	          this.onSignal(signal);
	        } catch (error) {
	          this.throwError(error, signal);
	        }
	      }
	      return this;
	    }
	  }, {
	    key: "onSignal",
	    value: function onSignal(signal) {
	      this.send(signal);
	      return this;
	    }
	  }, {
	    key: "onError",
	    value: function onError(error) {
	      this.send(error);
	      return this;
	    }
	  }, {
	    key: "onEnd",
	    value: function onEnd(signal) {
	      this.send(signal);
	      return this;
	    }
	  }, {
	    key: "send",
	    value: function send(signal) {
	      var _this2 = this;

	      var interruptible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      this.invokeObservers("send", signal);
	      if (interruptible === false || !this.isInterruptibleSignal(signal)) {
	        for (var id in this.downstreams) {
	          this.downstreams[id].onReceive(signal);
	        }
	        return this;
	      }
	      setImmediate(function () {
	        _this2.ee.emit("outgoing-" + _this2.id, signal);
	      });
	      return this;
	    }
	  }, {
	    key: "observe",
	    value: function observe(observer) {
	      this.observers.push(observer);
	      return this;
	    }
	  }, {
	    key: "to",
	    value: function to(downstream) {
	      var _this3 = this;

	      this.invokeObservers("to", downstream);

	      this.downstreams[downstream.id] = downstream;
	      this.ee.on("outgoing-" + this.id, function (signal) {
	        downstream.push(signal);
	      });
	      // for pull model
	      downstream.ee.on("request-" + downstream.id, function (cmd) {
	        _this3.pull(cmd);
	      });
	      downstream.from(this);
	      return downstream;
	    }
	  }, {
	    key: "pull",
	    value: function pull(cmd) {
	      var _this4 = this;

	      setImmediate(function () {
	        _this4.onRequest(cmd);
	      });
	      return this;
	    }
	  }, {
	    key: "onRequest",
	    value: function onRequest(cmd) {
	      this.invokeObservers("onRequest", cmd);
	      this.request(cmd);
	      return this;
	    }
	  }, {
	    key: "request",
	    value: function request(cmd) {
	      var _this5 = this;

	      this.invokeObservers("request", cmd);
	      setImmediate(function () {
	        _this5.ee.emit("request-" + _this5.id, cmd);
	      });
	      return this;
	    }
	  }, {
	    key: "from",
	    value: function from(upstream) {
	      this.upstreams[upstream.id] = upstream;
	      this.invokeObservers("from", upstream);
	      return this;
	    }
	  }, {
	    key: "isInterruptibleSignal",
	    value: function isInterruptibleSignal(signal) {
	      return true;
	    }
	  }, {
	    key: "isErrorSignal",
	    value: function isErrorSignal(signal) {
	      return signal instanceof Error;
	    }
	  }, {
	    key: "isEndSignal",
	    value: function isEndSignal(signal) {
	      //$FlowIgnore
	      return signal === Node.END;
	    }
	  }, {
	    key: "throwError",
	    value: function throwError(error, signal) {
	      //$FlowIgnore
	      error.signal = signal;
	      return this.send(error);
	    }
	  }, {
	    key: "invokeObservers",
	    value: function invokeObservers(when) {
	      var _this6 = this;

	      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }

	      data.unshift(when);
	      data.unshift(this);
	      try {
	        // run globally registered observers, first
	        var globalObservers = __webpack_require__(1).observers;
	        for (var name in globalObservers) {
	          globalObservers[name].apply(this, data);
	        };

	        this.observers.forEach(function (fn) {
	          fn.apply(_this6, data);
	        });
	      } catch (err) {
	        console.error(err.message);
	      }
	    }
	  }]);

	  return Node;
	}();

	//$FlowIgnore


	Node.END = "__SIGNAL_END__";

	module.exports = Node;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(4).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).setImmediate, __webpack_require__(3).clearImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var v1 = __webpack_require__(7);
	var v4 = __webpack_require__(10);

	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;

	module.exports = uuid;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var rng = __webpack_require__(8);
	var bytesToUuid = __webpack_require__(9);

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; ++n) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : bytesToUuid(b);
	}

	module.exports = v1;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
	// browser this is a little complicated due to unknown quality of Math.random()
	// and inconsistent support for the `crypto` API.  We do the best we can via
	// feature-detection
	var rng;

	var crypto = global.crypto || global.msCrypto; // for IE 11
	if (crypto && crypto.getRandomValues) {
	  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	  var rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(rnds8);
	    return rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return rnds;
	  };
	}

	module.exports = rng;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */
	var byteToHex = [];
	for (var i = 0; i < 256; ++i) {
	  byteToHex[i] = (i + 0x100).toString(16).substr(1);
	}

	function bytesToUuid(buf, offset) {
	  var i = offset || 0;
	  var bth = byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	module.exports = bytesToUuid;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var rng = __webpack_require__(8);
	var bytesToUuid = __webpack_require__(9);

	function v4(options, buf, offset) {
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ++ii) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || bytesToUuid(rnds);
	}

	module.exports = v4;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Node = __webpack_require__(2);

	function map(fn) {
	  var MapNode = function (_Node) {
	    _inherits(MapNode, _Node);

	    function MapNode(options, eventemitter) {
	      _classCallCheck(this, MapNode);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapNode).call(this, options, eventemitter));

	      _this.fn = options;
	      return _this;
	    }

	    _createClass(MapNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        var out = this.fn(signal);
	        this.send(out);
	      }
	    }]);

	    return MapNode;
	  }(Node);

	  return new MapNode(fn);
	}

	exports["map"] = map;

	function filter(fn) {
	  var FilterNode = function (_Node2) {
	    _inherits(FilterNode, _Node2);

	    function FilterNode(options, eventemitter) {
	      _classCallCheck(this, FilterNode);

	      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FilterNode).call(this, options, eventemitter));

	      _this2.fn = options;
	      return _this2;
	    }

	    _createClass(FilterNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        if (fn(signal)) {
	          this.send(signal);
	        } else {
	          // request next signal
	          this.request();
	        }
	      }
	    }]);

	    return FilterNode;
	  }(Node);

	  return new FilterNode(fn);
	}

	exports["filter"] = filter;

	function reduce(memo, iterator) {
	  var ReduceNode = function (_Node3) {
	    _inherits(ReduceNode, _Node3);

	    function ReduceNode(options, eventemitter) {
	      _classCallCheck(this, ReduceNode);

	      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduceNode).call(this, options, eventemitter));

	      _this3.memo = _this3.options.memo;
	      _this3.iterator = _this3.options.iterator;
	      _this3.END = false;
	      return _this3;
	    }

	    _createClass(ReduceNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        this.memo = this.iterator.call(this, this.memo, signal);
	        this.request(); // back pressure call for next
	      }
	    }, {
	      key: "onEnd",
	      value: function onEnd() {
	        this.send(this.memo);
	        this.END = true;
	      }
	    }, {
	      key: "onRequest",
	      value: function onRequest(cmd) {
	        if (!this.END) {
	          this.request();
	        } else {
	          this.send(Node.END);
	        }
	      }
	    }]);

	    return ReduceNode;
	  }(Node);

	  return new ReduceNode({ memo: memo, iterator: iterator });
	}

	exports["reduce"] = reduce;

	function errors(fn) {
	  var ErrorsNode = function (_Node4) {
	    _inherits(ErrorsNode, _Node4);

	    function ErrorsNode(options, eventemitter) {
	      _classCallCheck(this, ErrorsNode);

	      var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorsNode).call(this, options, eventemitter));

	      _this4.fn = options;
	      return _this4;
	    }

	    _createClass(ErrorsNode, [{
	      key: "onError",
	      value: function onError(error) {
	        var _this5 = this;

	        this.fn(error, function (signal) {
	          _this5.send(signal);
	        });
	      }
	    }]);

	    return ErrorsNode;
	  }(Node);

	  return new ErrorsNode(fn);
	};

	exports["errors"] = errors;

	function sink() {
	  var SinkNode = function (_Node5) {
	    _inherits(SinkNode, _Node5);

	    function SinkNode() {
	      _classCallCheck(this, SinkNode);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(SinkNode).apply(this, arguments));
	    }

	    _createClass(SinkNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        this.request();
	      }
	    }, {
	      key: "from",
	      value: function from(node) {
	        this.request();
	      }
	    }]);

	    return SinkNode;
	  }(Node);

	  return new SinkNode();
	};

	exports["sink"] = sink;

	function throttle(ms) {
	  var last = new Date().getTime();

	  var ThrottleNode = function (_Node6) {
	    _inherits(ThrottleNode, _Node6);

	    function ThrottleNode() {
	      _classCallCheck(this, ThrottleNode);

	      return _possibleConstructorReturn(this, Object.getPrototypeOf(ThrottleNode).apply(this, arguments));
	    }

	    _createClass(ThrottleNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        var now = new Date().getTime();
	        if (now - ms >= last) {
	          last = now;
	          this.send(signal);
	        }
	      }
	    }]);

	    return ThrottleNode;
	  }(Node);

	  return new ThrottleNode(ms);
	};

	exports["throttle"] = throttle;

	function scan(n, add) {
	  var ScanNode = function (_Node7) {
	    _inherits(ScanNode, _Node7);

	    function ScanNode(options, eventemitter) {
	      _classCallCheck(this, ScanNode);

	      var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(ScanNode).call(this, options, eventemitter));

	      _this8.n = options.n;
	      _this8.add = options.add;
	      return _this8;
	    }

	    _createClass(ScanNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        this.n = this.add.call(this, this.n, signal);
	        this.send(this.n);
	      }
	    }]);

	    return ScanNode;
	  }(Node);

	  return new ScanNode({
	    n: n,
	    add: add
	  });
	};

	exports["scan"] = scan;

	function act(fn) {
	  var ActNode = function (_Node8) {
	    _inherits(ActNode, _Node8);

	    function ActNode(options, eventemitter) {
	      _classCallCheck(this, ActNode);

	      var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(ActNode).call(this, options, eventemitter));

	      _this9.fn = options;
	      return _this9;
	    }

	    _createClass(ActNode, [{
	      key: "onSignal",
	      value: function onSignal(signal) {
	        this.fn(signal);
	        this.send(signal);
	      }
	    }]);

	    return ActNode;
	  }(Node);

	  return new ActNode(fn);
	}

	exports["act"] = act;

	function done(fn) {
	  var DoneNode = function (_Node9) {
	    _inherits(DoneNode, _Node9);

	    function DoneNode(options, eventemitter) {
	      _classCallCheck(this, DoneNode);

	      var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(DoneNode).call(this, options, eventemitter));

	      _this10.fn = options;
	      return _this10;
	    }

	    _createClass(DoneNode, [{
	      key: "onEnd",
	      value: function onEnd(signal) {
	        this.fn(signal);
	      }
	    }]);

	    return DoneNode;
	  }(Node);

	  return new DoneNode(fn);
	}

	exports["done"] = done;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Node = __webpack_require__(2);

	var ArraySourceNode = function (_Node) {
	  _inherits(ArraySourceNode, _Node);

	  function ArraySourceNode(options, eventemitter) {
	    _classCallCheck(this, ArraySourceNode);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArraySourceNode).call(this, options, eventemitter));

	    _this.source = _this.options;
	    _this.index = 0;
	    return _this;
	  }

	  _createClass(ArraySourceNode, [{
	    key: "onRequest",
	    value: function onRequest(cmd) {
	      if (this.source.length === this.index) {
	        this.send(Node.END);
	        this.index++;
	      } else if (this.source.length > this.index) {
	        this.send(this.source[this.index]);
	        this.index++;
	      }
	    }
	  }]);

	  return ArraySourceNode;
	}(Node);

	function asList(array) {
	  return new ArraySourceNode(array);
	}

	exports["asList"] = asList;

	var JustOneNode = function (_Node2) {
	  _inherits(JustOneNode, _Node2);

	  function JustOneNode(options, eventemitter) {
	    _classCallCheck(this, JustOneNode);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(JustOneNode).call(this, options, eventemitter));

	    _this2.value = _this2.options;
	    _this2.visited = 0;
	    return _this2;
	  }

	  _createClass(JustOneNode, [{
	    key: "onRequest",
	    value: function onRequest(cmd) {
	      if (this.visited == 0) {
	        this.send(this.value);
	        this.visited++;
	      } else if (this.visited == 1) {
	        this.send(Node.END);
	        this.visited++;
	      }
	    }
	  }]);

	  return JustOneNode;
	}(Node);

	function just(value) {
	  return new JustOneNode(value);
	}
	exports["just"] = just;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Node": 2,
		"./Node.js": 2,
		"./index": 1,
		"./index.js": 1,
		"./operators": 11,
		"./operators.js": 11,
		"./sources": 12,
		"./sources.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ }
/******/ ]);