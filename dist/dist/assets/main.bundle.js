'use strict';

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _isExtensible = require('babel-runtime/core-js/object/is-extensible');

var _isExtensible2 = _interopRequireDefault(_isExtensible);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ownKeys = require('babel-runtime/core-js/reflect/own-keys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

webpackJsonp([0], [function (module, exports) {

  var Vue;
  var version;
  var map = window.__VUE_HOT_MAP__ = (0, _create2.default)(null);
  var installed = false;
  var isBrowserify = false;
  var initHookName = 'beforeCreate';

  exports.install = function (vue, browserify) {
    if (installed) return;
    installed = true;

    Vue = vue.__esModule ? vue.default : vue;
    version = Vue.version.split('.').map(Number);
    isBrowserify = browserify;

    if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
      initHookName = 'init';
    }

    exports.compatible = version[0] >= 2;
    if (!exports.compatible) {
      console.warn('[HMR] You are using a version of vue-hot-reload-api that is ' + 'only compatible with Vue.js core ^2.0.0.');
      return;
    }
  };

  exports.createRecord = function (id, options) {
    var Ctor = null;
    if (typeof options === 'function') {
      Ctor = options;
      options = Ctor.options;
    }
    makeOptionsHot(id, options);
    map[id] = {
      Ctor: Vue.extend(options),
      instances: []
    };
  };

  function makeOptionsHot(id, options) {
    injectHook(options, initHookName, function () {
      map[id].instances.push(this);
    });
    injectHook(options, 'beforeDestroy', function () {
      var instances = map[id].instances;
      instances.splice(instances.indexOf(this), 1);
    });
  }

  function injectHook(options, name, hook) {
    var existing = options[name];
    options[name] = existing ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook] : [hook];
  }

  function tryWrap(fn) {
    return function (id, arg) {
      try {
        fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn('Something went wrong during Vue component hot-reload. Full reload required.');
      }
    };
  }

  exports.rerender = tryWrap(function (id, options) {
    var record = map[id];
    if (!options) {
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate();
      });
      return;
    }
    if (typeof options === 'function') {
      options = options.options;
    }
    record.Ctor.options.render = options.render;
    record.Ctor.options.staticRenderFns = options.staticRenderFns;
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render;
      instance.$options.staticRenderFns = options.staticRenderFns;
      instance._staticTrees = [];
      instance.$forceUpdate();
    });
  });

  exports.reload = tryWrap(function (id, options) {
    var record = map[id];
    if (options) {
      if (typeof options === 'function') {
        options = options.options;
      }
      makeOptionsHot(id, options);
      if (version[1] < 2) {
        record.Ctor.extendOptions = options;
      }
      var newCtor = record.Ctor.super.extend(options);
      record.Ctor.options = newCtor.options;
      record.Ctor.cid = newCtor.cid;
      record.Ctor.prototype = newCtor.prototype;
      if (newCtor.release) {
        newCtor.release();
      }
    }
    record.instances.slice().forEach(function (instance) {
      if (instance.$vnode && instance.$vnode.context) {
        instance.$vnode.context.$forceUpdate();
      } else {
        console.warn('Root or manually mounted instance modified. Full reload required.');
      }
    });
  });
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  (function (global) {
    function isUndef(v) {
      return v === undefined || v === null;
    }

    function isDef(v) {
      return v !== undefined && v !== null;
    }

    function isTrue(v) {
      return v === true;
    }

    function isFalse(v) {
      return v === false;
    }

    function isPrimitive(value) {
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
    }

    function isObject(obj) {
      return obj !== null && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object';
    }

    var _toString = Object.prototype.toString;

    function isPlainObject(obj) {
      return _toString.call(obj) === '[object Object]';
    }

    function isRegExp(v) {
      return _toString.call(v) === '[object RegExp]';
    }

    function isValidArrayIndex(val) {
      var n = parseFloat(val);
      return n >= 0 && Math.floor(n) === n && isFinite(val);
    }

    function toString(val) {
      return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' ? (0, _stringify2.default)(val, null, 2) : String(val);
    }

    function toNumber(val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n;
    }

    function makeMap(str, expectsLowerCase) {
      var map = (0, _create2.default)(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? function (val) {
        return map[val.toLowerCase()];
      } : function (val) {
        return map[val];
      };
    }

    var isBuiltInTag = makeMap('slot,component', true);

    var isReservedAttribute = makeMap('key,ref,slot,is');

    function remove(arr, item) {
      if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
          return arr.splice(index, 1);
        }
      }
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }

    function cached(fn) {
      var cache = (0, _create2.default)(null);
      return function cachedFn(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    }

    var camelizeRE = /-(\w)/g;
    var camelize = cached(function (str) {
      return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
    });

    var capitalize = cached(function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    var hyphenateRE = /([^-])([A-Z])/g;
    var hyphenate = cached(function (str) {
      return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
    });

    function bind(fn, ctx) {
      function boundFn(a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
      }

      boundFn._length = fn.length;
      return boundFn;
    }

    function toArray(list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
        ret[i] = list[i + start];
      }
      return ret;
    }

    function extend(to, _from) {
      for (var key in _from) {
        to[key] = _from[key];
      }
      return to;
    }

    function toObject(arr) {
      var res = {};
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          extend(res, arr[i]);
        }
      }
      return res;
    }

    function noop(a, b, c) {}

    var no = function no(a, b, c) {
      return false;
    };

    var identity = function identity(_) {
      return _;
    };

    function genStaticKeys(modules) {
      return modules.reduce(function (keys, m) {
        return keys.concat(m.staticKeys || []);
      }, []).join(',');
    }

    function looseEqual(a, b) {
      if (a === b) {
        return true;
      }
      var isObjectA = isObject(a);
      var isObjectB = isObject(b);
      if (isObjectA && isObjectB) {
        try {
          var isArrayA = Array.isArray(a);
          var isArrayB = Array.isArray(b);
          if (isArrayA && isArrayB) {
            return a.length === b.length && a.every(function (e, i) {
              return looseEqual(e, b[i]);
            });
          } else if (!isArrayA && !isArrayB) {
            var keysA = (0, _keys2.default)(a);
            var keysB = (0, _keys2.default)(b);
            return keysA.length === keysB.length && keysA.every(function (key) {
              return looseEqual(a[key], b[key]);
            });
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
      } else {
        return false;
      }
    }

    function looseIndexOf(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val)) {
          return i;
        }
      }
      return -1;
    }

    function once(fn) {
      var called = false;
      return function () {
        if (!called) {
          called = true;
          fn.apply(this, arguments);
        }
      };
    }

    var SSR_ATTR = 'data-server-rendered';

    var ASSET_TYPES = ['component', 'directive', 'filter'];

    var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

    var config = {
      optionMergeStrategies: (0, _create2.default)(null),

      silent: false,

      productionTip: "dev" !== 'production',

      devtools: "dev" !== 'production',

      performance: false,

      errorHandler: null,

      warnHandler: null,

      ignoredElements: [],

      keyCodes: (0, _create2.default)(null),

      isReservedTag: no,

      isReservedAttr: no,

      isUnknownElement: no,

      getTagNamespace: noop,

      parsePlatformTagName: identity,

      mustUseProp: no,

      _lifecycleHooks: LIFECYCLE_HOOKS
    };

    var emptyObject = (0, _freeze2.default)({});

    function isReserved(str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5F;
    }

    function def(obj, key, val, enumerable) {
      (0, _defineProperty2.default)(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
      });
    }

    var bailRE = /[^\w.$]/;
    function parsePath(path) {
      if (bailRE.test(path)) {
        return;
      }
      var segments = path.split('.');
      return function (obj) {
        for (var i = 0; i < segments.length; i++) {
          if (!obj) {
            return;
          }
          obj = obj[segments[i]];
        }
        return obj;
      };
    }

    var warn = noop;
    var tip = noop;
    var formatComponentName = null;

    if (true) {
      var hasConsole = typeof console !== 'undefined';
      var classifyRE = /(?:^|[-_])(\w)/g;
      var classify = function classify(str) {
        return str.replace(classifyRE, function (c) {
          return c.toUpperCase();
        }).replace(/[-_]/g, '');
      };

      warn = function warn(msg, vm) {
        var trace = vm ? generateComponentTrace(vm) : '';

        if (config.warnHandler) {
          config.warnHandler.call(null, msg, vm, trace);
        } else if (hasConsole && !config.silent) {
          console.error("[Vue warn]: " + msg + trace);
        }
      };

      tip = function tip(msg, vm) {
        if (hasConsole && !config.silent) {
          console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
        }
      };

      formatComponentName = function formatComponentName(vm, includeFile) {
        if (vm.$root === vm) {
          return '<Root>';
        }
        var name = typeof vm === 'string' ? vm : typeof vm === 'function' && vm.options ? vm.options.name : vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;

        var file = vm._isVue && vm.$options.__file;
        if (!name && file) {
          var match = file.match(/([^/\\]+)\.vue$/);
          name = match && match[1];
        }

        return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
      };

      var repeat = function repeat(str, n) {
        var res = '';
        while (n) {
          if (n % 2 === 1) {
            res += str;
          }
          if (n > 1) {
            str += str;
          }
          n >>= 1;
        }
        return res;
      };

      var generateComponentTrace = function generateComponentTrace(vm) {
        if (vm._isVue && vm.$parent) {
          var tree = [];
          var currentRecursiveSequence = 0;
          while (vm) {
            if (tree.length > 0) {
              var last = tree[tree.length - 1];
              if (last.constructor === vm.constructor) {
                currentRecursiveSequence++;
                vm = vm.$parent;
                continue;
              } else if (currentRecursiveSequence > 0) {
                tree[tree.length - 1] = [last, currentRecursiveSequence];
                currentRecursiveSequence = 0;
              }
            }
            tree.push(vm);
            vm = vm.$parent;
          }
          return '\n\nfound in\n\n' + tree.map(function (vm, i) {
            return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
          }).join('\n');
        } else {
          return "\n\n(found in " + formatComponentName(vm) + ")";
        }
      };
    }

    function handleError(err, vm, info) {
      if (config.errorHandler) {
        config.errorHandler.call(null, err, vm, info);
      } else {
        if (true) {
          warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
        }

        if (inBrowser && typeof console !== 'undefined') {
          console.error(err);
        } else {
          throw err;
        }
      }
    }

    var hasProto = '__proto__' in {};

    var inBrowser = typeof window !== 'undefined';
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && /msie|trident/.test(UA);
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    var isEdge = UA && UA.indexOf('edge/') > 0;
    var isAndroid = UA && UA.indexOf('android') > 0;
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

    var nativeWatch = {}.watch;

    var supportsPassive = false;
    if (inBrowser) {
      try {
        var opts = {};
        Object.defineProperty(opts, 'passive', {
          get: function get() {
            supportsPassive = true;
          }
        });
        window.addEventListener('test-passive', null, opts);
      } catch (e) {}
    }

    var _isServer;
    var isServerRendering = function isServerRendering() {
      if (_isServer === undefined) {
        if (!inBrowser && typeof global !== 'undefined') {
          _isServer = global['process'].env.VUE_ENV === 'server';
        } else {
          _isServer = false;
        }
      }
      return _isServer;
    };

    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
    }

    var hasSymbol = typeof _symbol2.default !== 'undefined' && isNative(_symbol2.default) && typeof Reflect !== 'undefined' && isNative(_ownKeys2.default);

    var nextTick = function () {
      var callbacks = [];
      var pending = false;
      var timerFunc;

      function nextTickHandler() {
        pending = false;
        var copies = callbacks.slice(0);
        callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
          copies[i]();
        }
      }

      if (typeof _promise2.default !== 'undefined' && isNative(_promise2.default)) {
        var p = _promise2.default.resolve();
        var logError = function logError(err) {
          console.error(err);
        };
        timerFunc = function timerFunc() {
          p.then(nextTickHandler).catch(logError);

          if (isIOS) {
            setTimeout(noop);
          }
        };
      } else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
        var counter = 1;
        var observer = new MutationObserver(nextTickHandler);
        var textNode = document.createTextNode(String(counter));
        observer.observe(textNode, {
          characterData: true
        });
        timerFunc = function timerFunc() {
          counter = (counter + 1) % 2;
          textNode.data = String(counter);
        };
      } else {
        timerFunc = function timerFunc() {
          setTimeout(nextTickHandler, 0);
        };
      }

      return function queueNextTick(cb, ctx) {
        var _resolve;
        callbacks.push(function () {
          if (cb) {
            try {
              cb.call(ctx);
            } catch (e) {
              handleError(e, ctx, 'nextTick');
            }
          } else if (_resolve) {
            _resolve(ctx);
          }
        });
        if (!pending) {
          pending = true;
          timerFunc();
        }
        if (!cb && typeof _promise2.default !== 'undefined') {
          return new _promise2.default(function (resolve, reject) {
            _resolve = resolve;
          });
        }
      };
    }();

    var _Set;

    if (typeof _set2.default !== 'undefined' && isNative(_set2.default)) {
      _Set = _set2.default;
    } else {
      _Set = function () {
        function Set() {
          this.set = (0, _create2.default)(null);
        }
        Set.prototype.has = function has(key) {
          return this.set[key] === true;
        };
        Set.prototype.add = function add(key) {
          this.set[key] = true;
        };
        Set.prototype.clear = function clear() {
          this.set = (0, _create2.default)(null);
        };

        return Set;
      }();
    }

    var uid = 0;

    var Dep = function Dep() {
      this.id = uid++;
      this.subs = [];
    };

    Dep.prototype.addSub = function addSub(sub) {
      this.subs.push(sub);
    };

    Dep.prototype.removeSub = function removeSub(sub) {
      remove(this.subs, sub);
    };

    Dep.prototype.depend = function depend() {
      if (Dep.target) {
        Dep.target.addDep(this);
      }
    };

    Dep.prototype.notify = function notify() {
      var subs = this.subs.slice();
      for (var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
      }
    };

    Dep.target = null;
    var targetStack = [];

    function pushTarget(_target) {
      if (Dep.target) {
        targetStack.push(Dep.target);
      }
      Dep.target = _target;
    }

    function popTarget() {
      Dep.target = targetStack.pop();
    }

    var arrayProto = Array.prototype;
    var arrayMethods = (0, _create2.default)(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator() {
        var args = [],
            len = arguments.length;
        while (len--) {
          args[len] = arguments[len];
        }var result = original.apply(this, args);
        var ob = this.__ob__;
        var inserted;
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
            break;
        }
        if (inserted) {
          ob.observeArray(inserted);
        }

        ob.dep.notify();
        return result;
      });
    });

    var arrayKeys = (0, _getOwnPropertyNames2.default)(arrayMethods);

    var observerState = {
      shouldConvert: true
    };

    var Observer = function Observer(value) {
      this.value = value;
      this.dep = new Dep();
      this.vmCount = 0;
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
        var augment = hasProto ? protoAugment : copyAugment;
        augment(value, arrayMethods, arrayKeys);
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    };

    Observer.prototype.walk = function walk(obj) {
      var keys = (0, _keys2.default)(obj);
      for (var i = 0; i < keys.length; i++) {
        defineReactive$$1(obj, keys[i], obj[keys[i]]);
      }
    };

    Observer.prototype.observeArray = function observeArray(items) {
      for (var i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
      }
    };

    function protoAugment(target, src, keys) {
      target.__proto__ = src;
    }

    function copyAugment(target, src, keys) {
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        def(target, key, src[key]);
      }
    }

    function observe(value, asRootData) {
      if (!isObject(value)) {
        return;
      }
      var ob;
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
      } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && (0, _isExtensible2.default)(value) && !value._isVue) {
        ob = new Observer(value);
      }
      if (asRootData && ob) {
        ob.vmCount++;
      }
      return ob;
    }

    function defineReactive$$1(obj, key, val, customSetter, shallow) {
      var dep = new Dep();

      var property = (0, _getOwnPropertyDescriptor2.default)(obj, key);
      if (property && property.configurable === false) {
        return;
      }

      var getter = property && property.get;
      var setter = property && property.set;

      var childOb = !shallow && observe(val);
      (0, _defineProperty2.default)(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
          var value = getter ? getter.call(obj) : val;
          if (Dep.target) {
            dep.depend();
            if (childOb) {
              childOb.dep.depend();
            }
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
          return value;
        },
        set: function reactiveSetter(newVal) {
          var value = getter ? getter.call(obj) : val;

          if (newVal === value || newVal !== newVal && value !== value) {
            return;
          }

          if ("dev" !== 'production' && customSetter) {
            customSetter();
          }
          if (setter) {
            setter.call(obj, newVal);
          } else {
            val = newVal;
          }
          childOb = !shallow && observe(newVal);
          dep.notify();
        }
      });
    }

    function set(target, key, val) {
      if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
      }
      if (hasOwn(target, key)) {
        target[key] = val;
        return val;
      }
      var ob = target.__ob__;
      if (target._isVue || ob && ob.vmCount) {
        "dev" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
        return val;
      }
      if (!ob) {
        target[key] = val;
        return val;
      }
      defineReactive$$1(ob.value, key, val);
      ob.dep.notify();
      return val;
    }

    function del(target, key) {
      if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return;
      }
      var ob = target.__ob__;
      if (target._isVue || ob && ob.vmCount) {
        "dev" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
        return;
      }
      if (!hasOwn(target, key)) {
        return;
      }
      delete target[key];
      if (!ob) {
        return;
      }
      ob.dep.notify();
    }

    function dependArray(value) {
      for (var e = void 0, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
          dependArray(e);
        }
      }
    }

    var strats = config.optionMergeStrategies;

    if (true) {
      strats.el = strats.propsData = function (parent, child, vm, key) {
        if (!vm) {
          warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
        }
        return defaultStrat(parent, child);
      };
    }

    function mergeData(to, from) {
      if (!from) {
        return to;
      }
      var key, toVal, fromVal;
      var keys = (0, _keys2.default)(from);
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
          set(to, key, fromVal);
        } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
          mergeData(toVal, fromVal);
        }
      }
      return to;
    }

    function mergeDataOrFn(parentVal, childVal, vm) {
      if (!vm) {
        if (!childVal) {
          return parentVal;
        }
        if (!parentVal) {
          return childVal;
        }

        return function mergedDataFn() {
          return mergeData(typeof childVal === 'function' ? childVal.call(this) : childVal, typeof parentVal === 'function' ? parentVal.call(this) : parentVal);
        };
      } else if (parentVal || childVal) {
        return function mergedInstanceDataFn() {
          var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
          var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
          if (instanceData) {
            return mergeData(instanceData, defaultData);
          } else {
            return defaultData;
          }
        };
      }
    }

    strats.data = function (parentVal, childVal, vm) {
      if (!vm) {
        if (childVal && typeof childVal !== 'function') {
          "dev" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

          return parentVal;
        }
        return mergeDataOrFn.call(this, parentVal, childVal);
      }

      return mergeDataOrFn(parentVal, childVal, vm);
    };

    function mergeHook(parentVal, childVal) {
      return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
    }

    LIFECYCLE_HOOKS.forEach(function (hook) {
      strats[hook] = mergeHook;
    });

    function mergeAssets(parentVal, childVal) {
      var res = (0, _create2.default)(parentVal || null);
      return childVal ? extend(res, childVal) : res;
    }

    ASSET_TYPES.forEach(function (type) {
      strats[type + 's'] = mergeAssets;
    });

    strats.watch = function (parentVal, childVal) {
      if (parentVal === nativeWatch) {
        parentVal = undefined;
      }
      if (childVal === nativeWatch) {
        childVal = undefined;
      }

      if (!childVal) {
        return (0, _create2.default)(parentVal || null);
      }
      if (!parentVal) {
        return childVal;
      }
      var ret = {};
      extend(ret, parentVal);
      for (var key in childVal) {
        var parent = ret[key];
        var child = childVal[key];
        if (parent && !Array.isArray(parent)) {
          parent = [parent];
        }
        ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
      }
      return ret;
    };

    strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal) {
      if (!parentVal) {
        return childVal;
      }
      var ret = (0, _create2.default)(null);
      extend(ret, parentVal);
      if (childVal) {
        extend(ret, childVal);
      }
      return ret;
    };
    strats.provide = mergeDataOrFn;

    var defaultStrat = function defaultStrat(parentVal, childVal) {
      return childVal === undefined ? parentVal : childVal;
    };

    function checkComponents(options) {
      for (var key in options.components) {
        var lower = key.toLowerCase();
        if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
          warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
        }
      }
    }

    function normalizeProps(options) {
      var props = options.props;
      if (!props) {
        return;
      }
      var res = {};
      var i, val, name;
      if (Array.isArray(props)) {
        i = props.length;
        while (i--) {
          val = props[i];
          if (typeof val === 'string') {
            name = camelize(val);
            res[name] = { type: null };
          } else if (true) {
            warn('props must be strings when using array syntax.');
          }
        }
      } else if (isPlainObject(props)) {
        for (var key in props) {
          val = props[key];
          name = camelize(key);
          res[name] = isPlainObject(val) ? val : { type: val };
        }
      }
      options.props = res;
    }

    function normalizeInject(options) {
      var inject = options.inject;
      if (Array.isArray(inject)) {
        var normalized = options.inject = {};
        for (var i = 0; i < inject.length; i++) {
          normalized[inject[i]] = inject[i];
        }
      }
    }

    function normalizeDirectives(options) {
      var dirs = options.directives;
      if (dirs) {
        for (var key in dirs) {
          var def = dirs[key];
          if (typeof def === 'function') {
            dirs[key] = { bind: def, update: def };
          }
        }
      }
    }

    function mergeOptions(parent, child, vm) {
      if (true) {
        checkComponents(child);
      }

      if (typeof child === 'function') {
        child = child.options;
      }

      normalizeProps(child);
      normalizeInject(child);
      normalizeDirectives(child);
      var extendsFrom = child.extends;
      if (extendsFrom) {
        parent = mergeOptions(parent, extendsFrom, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
      var options = {};
      var key;
      for (key in parent) {
        mergeField(key);
      }
      for (key in child) {
        if (!hasOwn(parent, key)) {
          mergeField(key);
        }
      }
      function mergeField(key) {
        var strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
      }
      return options;
    }

    function resolveAsset(options, type, id, warnMissing) {
      if (typeof id !== 'string') {
        return;
      }
      var assets = options[type];

      if (hasOwn(assets, id)) {
        return assets[id];
      }
      var camelizedId = camelize(id);
      if (hasOwn(assets, camelizedId)) {
        return assets[camelizedId];
      }
      var PascalCaseId = capitalize(camelizedId);
      if (hasOwn(assets, PascalCaseId)) {
        return assets[PascalCaseId];
      }

      var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
      if ("dev" !== 'production' && warnMissing && !res) {
        warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
      }
      return res;
    }

    function validateProp(key, propOptions, propsData, vm) {
      var prop = propOptions[key];
      var absent = !hasOwn(propsData, key);
      var value = propsData[key];

      if (isType(Boolean, prop.type)) {
        if (absent && !hasOwn(prop, 'default')) {
          value = false;
        } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
          value = true;
        }
      }

      if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);

        var prevShouldConvert = observerState.shouldConvert;
        observerState.shouldConvert = true;
        observe(value);
        observerState.shouldConvert = prevShouldConvert;
      }
      if (true) {
        assertProp(prop, key, value, vm, absent);
      }
      return value;
    }

    function getPropDefaultValue(vm, prop, key) {
      if (!hasOwn(prop, 'default')) {
        return undefined;
      }
      var def = prop.default;

      if ("dev" !== 'production' && isObject(def)) {
        warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
      }

      if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
        return vm._props[key];
      }

      return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
    }

    function assertProp(prop, name, value, vm, absent) {
      if (prop.required && absent) {
        warn('Missing required prop: "' + name + '"', vm);
        return;
      }
      if (value == null && !prop.required) {
        return;
      }
      var type = prop.type;
      var valid = !type || type === true;
      var expectedTypes = [];
      if (type) {
        if (!Array.isArray(type)) {
          type = [type];
        }
        for (var i = 0; i < type.length && !valid; i++) {
          var assertedType = assertType(value, type[i]);
          expectedTypes.push(assertedType.expectedType || '');
          valid = assertedType.valid;
        }
      }
      if (!valid) {
        warn('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(capitalize).join(', ') + ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.', vm);
        return;
      }
      var validator = prop.validator;
      if (validator) {
        if (!validator(value)) {
          warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
        }
      }
    }

    var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

    function assertType(value, type) {
      var valid;
      var expectedType = getType(type);
      if (simpleCheckRE.test(expectedType)) {
        valid = (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === expectedType.toLowerCase();
      } else if (expectedType === 'Object') {
        valid = isPlainObject(value);
      } else if (expectedType === 'Array') {
        valid = Array.isArray(value);
      } else {
        valid = value instanceof type;
      }
      return {
        valid: valid,
        expectedType: expectedType
      };
    }

    function getType(fn) {
      var match = fn && fn.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : '';
    }

    function isType(type, fn) {
      if (!Array.isArray(fn)) {
        return getType(fn) === getType(type);
      }
      for (var i = 0, len = fn.length; i < len; i++) {
        if (getType(fn[i]) === getType(type)) {
          return true;
        }
      }

      return false;
    }

    var mark;
    var measure;

    if (true) {
      var perf = inBrowser && window.performance;

      if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
        mark = function mark(tag) {
          return perf.mark(tag);
        };
        measure = function measure(name, startTag, endTag) {
          perf.measure(name, startTag, endTag);
          perf.clearMarks(startTag);
          perf.clearMarks(endTag);
          perf.clearMeasures(name);
        };
      }
    }

    var initProxy;

    if (true) {
      var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require');

      var warnNonPresent = function warnNonPresent(target, key) {
        warn("Property or method \"" + key + "\" is not defined on the instance but " + "referenced during render. Make sure to declare reactive data " + "properties in the data option.", target);
      };

      var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

      if (hasProxy) {
        var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
        config.keyCodes = new Proxy(config.keyCodes, {
          set: function set(target, key, value) {
            if (isBuiltInModifier(key)) {
              warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
              return false;
            } else {
              target[key] = value;
              return true;
            }
          }
        });
      }

      var hasHandler = {
        has: function has(target, key) {
          var has = key in target;
          var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
          if (!has && !isAllowed) {
            warnNonPresent(target, key);
          }
          return has || !isAllowed;
        }
      };

      var getHandler = {
        get: function get(target, key) {
          if (typeof key === 'string' && !(key in target)) {
            warnNonPresent(target, key);
          }
          return target[key];
        }
      };

      initProxy = function initProxy(vm) {
        if (hasProxy) {
          var options = vm.$options;
          var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
          vm._renderProxy = new Proxy(vm, handlers);
        } else {
          vm._renderProxy = vm;
        }
      };
    }

    var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = undefined;
      this.context = context;
      this.functionalContext = undefined;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = undefined;
      this.parent = undefined;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = undefined;
      this.isAsyncPlaceholder = false;
    };

    var prototypeAccessors = { child: {} };

    prototypeAccessors.child.get = function () {
      return this.componentInstance;
    };

    (0, _defineProperties2.default)(VNode.prototype, prototypeAccessors);

    var createEmptyVNode = function createEmptyVNode(text) {
      if (text === void 0) text = '';

      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node;
    };

    function createTextVNode(val) {
      return new VNode(undefined, undefined, undefined, String(val));
    }

    function cloneVNode(vnode) {
      var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.isCloned = true;
      return cloned;
    }

    function cloneVNodes(vnodes) {
      var len = vnodes.length;
      var res = new Array(len);
      for (var i = 0; i < len; i++) {
        res[i] = cloneVNode(vnodes[i]);
      }
      return res;
    }

    var normalizeEvent = cached(function (name) {
      var passive = name.charAt(0) === '&';
      name = passive ? name.slice(1) : name;
      var once$$1 = name.charAt(0) === '~';
      name = once$$1 ? name.slice(1) : name;
      var capture = name.charAt(0) === '!';
      name = capture ? name.slice(1) : name;
      return {
        name: name,
        once: once$$1,
        capture: capture,
        passive: passive
      };
    });

    function createFnInvoker(fns) {
      function invoker() {
        var arguments$1 = arguments;

        var fns = invoker.fns;
        if (Array.isArray(fns)) {
          var cloned = fns.slice();
          for (var i = 0; i < cloned.length; i++) {
            cloned[i].apply(null, arguments$1);
          }
        } else {
          return fns.apply(null, arguments);
        }
      }
      invoker.fns = fns;
      return invoker;
    }

    function updateListeners(on, oldOn, add, remove$$1, vm) {
      var name, cur, old, event;
      for (name in on) {
        cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isUndef(cur)) {
          "dev" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
        } else if (isUndef(old)) {
          if (isUndef(cur.fns)) {
            cur = on[name] = createFnInvoker(cur);
          }
          add(event.name, cur, event.once, event.capture, event.passive);
        } else if (cur !== old) {
          old.fns = cur;
          on[name] = old;
        }
      }
      for (name in oldOn) {
        if (isUndef(on[name])) {
          event = normalizeEvent(name);
          remove$$1(event.name, oldOn[name], event.capture);
        }
      }
    }

    function mergeVNodeHook(def, hookKey, hook) {
      var invoker;
      var oldHook = def[hookKey];

      function wrappedHook() {
        hook.apply(this, arguments);

        remove(invoker.fns, wrappedHook);
      }

      if (isUndef(oldHook)) {
        invoker = createFnInvoker([wrappedHook]);
      } else {
        if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
          invoker = oldHook;
          invoker.fns.push(wrappedHook);
        } else {
          invoker = createFnInvoker([oldHook, wrappedHook]);
        }
      }

      invoker.merged = true;
      def[hookKey] = invoker;
    }

    function extractPropsFromVNodeData(data, Ctor, tag) {
      var propOptions = Ctor.options.props;
      if (isUndef(propOptions)) {
        return;
      }
      var res = {};
      var attrs = data.attrs;
      var props = data.props;
      if (isDef(attrs) || isDef(props)) {
        for (var key in propOptions) {
          var altKey = hyphenate(key);
          if (true) {
            var keyInLowerCase = key.toLowerCase();
            if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
              tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
            }
          }
          checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
        }
      }
      return res;
    }

    function checkProp(res, hash, key, altKey, preserve) {
      if (isDef(hash)) {
        if (hasOwn(hash, key)) {
          res[key] = hash[key];
          if (!preserve) {
            delete hash[key];
          }
          return true;
        } else if (hasOwn(hash, altKey)) {
          res[key] = hash[altKey];
          if (!preserve) {
            delete hash[altKey];
          }
          return true;
        }
      }
      return false;
    }

    function simpleNormalizeChildren(children) {
      for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
          return Array.prototype.concat.apply([], children);
        }
      }
      return children;
    }

    function normalizeChildren(children) {
      return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
    }

    function isTextNode(node) {
      return isDef(node) && isDef(node.text) && isFalse(node.isComment);
    }

    function normalizeArrayChildren(children, nestedIndex) {
      var res = [];
      var i, c, last;
      for (i = 0; i < children.length; i++) {
        c = children[i];
        if (isUndef(c) || typeof c === 'boolean') {
          continue;
        }
        last = res[res.length - 1];

        if (Array.isArray(c)) {
          res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || '') + "_" + i));
        } else if (isPrimitive(c)) {
          if (isTextNode(last)) {
            last.text += String(c);
          } else if (c !== '') {
            res.push(createTextVNode(c));
          }
        } else {
          if (isTextNode(c) && isTextNode(last)) {
            res[res.length - 1] = createTextVNode(last.text + c.text);
          } else {
            if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
              c.key = "__vlist" + nestedIndex + "_" + i + "__";
            }
            res.push(c);
          }
        }
      }
      return res;
    }

    function ensureCtor(comp, base) {
      if (comp.__esModule && comp.default) {
        comp = comp.default;
      }
      return isObject(comp) ? base.extend(comp) : comp;
    }

    function createAsyncPlaceholder(factory, data, context, children, tag) {
      var node = createEmptyVNode();
      node.asyncFactory = factory;
      node.asyncMeta = { data: data, context: context, children: children, tag: tag };
      return node;
    }

    function resolveAsyncComponent(factory, baseCtor, context) {
      if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp;
      }

      if (isDef(factory.resolved)) {
        return factory.resolved;
      }

      if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp;
      }

      if (isDef(factory.contexts)) {
        factory.contexts.push(context);
      } else {
        var contexts = factory.contexts = [context];
        var sync = true;

        var forceRender = function forceRender() {
          for (var i = 0, l = contexts.length; i < l; i++) {
            contexts[i].$forceUpdate();
          }
        };

        var resolve = once(function (res) {
          factory.resolved = ensureCtor(res, baseCtor);

          if (!sync) {
            forceRender();
          }
        });

        var reject = once(function (reason) {
          "dev" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
          if (isDef(factory.errorComp)) {
            factory.error = true;
            forceRender();
          }
        });

        var res = factory(resolve, reject);

        if (isObject(res)) {
          if (typeof res.then === 'function') {
            if (isUndef(factory.resolved)) {
              res.then(resolve, reject);
            }
          } else if (isDef(res.component) && typeof res.component.then === 'function') {
            res.component.then(resolve, reject);

            if (isDef(res.error)) {
              factory.errorComp = ensureCtor(res.error, baseCtor);
            }

            if (isDef(res.loading)) {
              factory.loadingComp = ensureCtor(res.loading, baseCtor);
              if (res.delay === 0) {
                factory.loading = true;
              } else {
                setTimeout(function () {
                  if (isUndef(factory.resolved) && isUndef(factory.error)) {
                    factory.loading = true;
                    forceRender();
                  }
                }, res.delay || 200);
              }
            }

            if (isDef(res.timeout)) {
              setTimeout(function () {
                if (isUndef(factory.resolved)) {
                  reject(true ? "timeout (" + res.timeout + "ms)" : null);
                }
              }, res.timeout);
            }
          }
        }

        sync = false;

        return factory.loading ? factory.loadingComp : factory.resolved;
      }
    }

    function getFirstComponentChild(children) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          var c = children[i];
          if (isDef(c) && isDef(c.componentOptions)) {
            return c;
          }
        }
      }
    }

    function initEvents(vm) {
      vm._events = (0, _create2.default)(null);
      vm._hasHookEvent = false;

      var listeners = vm.$options._parentListeners;
      if (listeners) {
        updateComponentListeners(vm, listeners);
      }
    }

    var target;

    function add(event, fn, once$$1) {
      if (once$$1) {
        target.$once(event, fn);
      } else {
        target.$on(event, fn);
      }
    }

    function remove$1(event, fn) {
      target.$off(event, fn);
    }

    function updateComponentListeners(vm, listeners, oldListeners) {
      target = vm;
      updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
    }

    function eventsMixin(Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function (event, fn) {
        var this$1 = this;

        var vm = this;
        if (Array.isArray(event)) {
          for (var i = 0, l = event.length; i < l; i++) {
            this$1.$on(event[i], fn);
          }
        } else {
          (vm._events[event] || (vm._events[event] = [])).push(fn);

          if (hookRE.test(event)) {
            vm._hasHookEvent = true;
          }
        }
        return vm;
      };

      Vue.prototype.$once = function (event, fn) {
        var vm = this;
        function on() {
          vm.$off(event, on);
          fn.apply(vm, arguments);
        }
        on.fn = fn;
        vm.$on(event, on);
        return vm;
      };

      Vue.prototype.$off = function (event, fn) {
        var this$1 = this;

        var vm = this;

        if (!arguments.length) {
          vm._events = (0, _create2.default)(null);
          return vm;
        }

        if (Array.isArray(event)) {
          for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
            this$1.$off(event[i$1], fn);
          }
          return vm;
        }

        var cbs = vm._events[event];
        if (!cbs) {
          return vm;
        }
        if (arguments.length === 1) {
          vm._events[event] = null;
          return vm;
        }

        var cb;
        var i = cbs.length;
        while (i--) {
          cb = cbs[i];
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break;
          }
        }
        return vm;
      };

      Vue.prototype.$emit = function (event) {
        var vm = this;
        if (true) {
          var lowerCaseEvent = event.toLowerCase();
          if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
            tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
          }
        }
        var cbs = vm._events[event];
        if (cbs) {
          cbs = cbs.length > 1 ? toArray(cbs) : cbs;
          var args = toArray(arguments, 1);
          for (var i = 0, l = cbs.length; i < l; i++) {
            try {
              cbs[i].apply(vm, args);
            } catch (e) {
              handleError(e, vm, "event handler for \"" + event + "\"");
            }
          }
        }
        return vm;
      };
    }

    function resolveSlots(children, context) {
      var slots = {};
      if (!children) {
        return slots;
      }
      var defaultSlot = [];
      for (var i = 0, l = children.length; i < l; i++) {
        var child = children[i];

        if ((child.context === context || child.functionalContext === context) && child.data && child.data.slot != null) {
          var name = child.data.slot;
          var slot = slots[name] || (slots[name] = []);
          if (child.tag === 'template') {
            slot.push.apply(slot, child.children);
          } else {
            slot.push(child);
          }
        } else {
          defaultSlot.push(child);
        }
      }

      if (!defaultSlot.every(isWhitespace)) {
        slots.default = defaultSlot;
      }
      return slots;
    }

    function isWhitespace(node) {
      return node.isComment || node.text === ' ';
    }

    function resolveScopedSlots(fns, res) {
      res = res || {};
      for (var i = 0; i < fns.length; i++) {
        if (Array.isArray(fns[i])) {
          resolveScopedSlots(fns[i], res);
        } else {
          res[fns[i].key] = fns[i].fn;
        }
      }
      return res;
    }

    var activeInstance = null;
    var isUpdatingChildComponent = false;

    function initLifecycle(vm) {
      var options = vm.$options;

      var parent = options.parent;
      if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
          parent = parent.$parent;
        }
        parent.$children.push(vm);
      }

      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;

      vm.$children = [];
      vm.$refs = {};

      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
    }

    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode, hydrating) {
        var vm = this;
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate');
        }
        var prevEl = vm.$el;
        var prevVnode = vm._vnode;
        var prevActiveInstance = activeInstance;
        activeInstance = vm;
        vm._vnode = vnode;

        if (!prevVnode) {
          vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false, vm.$options._parentElm, vm.$options._refElm);

          vm.$options._parentElm = vm.$options._refElm = null;
        } else {
          vm.$el = vm.__patch__(prevVnode, vnode);
        }
        activeInstance = prevActiveInstance;

        if (prevEl) {
          prevEl.__vue__ = null;
        }
        if (vm.$el) {
          vm.$el.__vue__ = vm;
        }

        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
          vm.$parent.$el = vm.$el;
        }
      };

      Vue.prototype.$forceUpdate = function () {
        var vm = this;
        if (vm._watcher) {
          vm._watcher.update();
        }
      };

      Vue.prototype.$destroy = function () {
        var vm = this;
        if (vm._isBeingDestroyed) {
          return;
        }
        callHook(vm, 'beforeDestroy');
        vm._isBeingDestroyed = true;

        var parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
          remove(parent.$children, vm);
        }

        if (vm._watcher) {
          vm._watcher.teardown();
        }
        var i = vm._watchers.length;
        while (i--) {
          vm._watchers[i].teardown();
        }

        if (vm._data.__ob__) {
          vm._data.__ob__.vmCount--;
        }

        vm._isDestroyed = true;

        vm.__patch__(vm._vnode, null);

        callHook(vm, 'destroyed');

        vm.$off();

        if (vm.$el) {
          vm.$el.__vue__ = null;
        }
      };
    }

    function mountComponent(vm, el, hydrating) {
      vm.$el = el;
      if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode;
        if (true) {
          if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
            warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
          } else {
            warn('Failed to mount component: template or render function not defined.', vm);
          }
        }
      }
      callHook(vm, 'beforeMount');

      var updateComponent;

      if ("dev" !== 'production' && config.performance && mark) {
        updateComponent = function updateComponent() {
          var name = vm._name;
          var id = vm._uid;
          var startTag = "vue-perf-start:" + id;
          var endTag = "vue-perf-end:" + id;

          mark(startTag);
          var vnode = vm._render();
          mark(endTag);
          measure(name + " render", startTag, endTag);

          mark(startTag);
          vm._update(vnode, hydrating);
          mark(endTag);
          measure(name + " patch", startTag, endTag);
        };
      } else {
        updateComponent = function updateComponent() {
          vm._update(vm._render(), hydrating);
        };
      }

      vm._watcher = new Watcher(vm, updateComponent, noop);
      hydrating = false;

      if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook(vm, 'mounted');
      }
      return vm;
    }

    function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
      if (true) {
        isUpdatingChildComponent = true;
      }

      var hasChildren = !!(renderChildren || vm.$options._renderChildren || parentVnode.data.scopedSlots || vm.$scopedSlots !== emptyObject);

      vm.$options._parentVnode = parentVnode;
      vm.$vnode = parentVnode;

      if (vm._vnode) {
        vm._vnode.parent = parentVnode;
      }
      vm.$options._renderChildren = renderChildren;

      vm.$attrs = parentVnode.data && parentVnode.data.attrs;
      vm.$listeners = listeners;

      if (propsData && vm.$options.props) {
        observerState.shouldConvert = false;
        var props = vm._props;
        var propKeys = vm.$options._propKeys || [];
        for (var i = 0; i < propKeys.length; i++) {
          var key = propKeys[i];
          props[key] = validateProp(key, vm.$options.props, propsData, vm);
        }
        observerState.shouldConvert = true;

        vm.$options.propsData = propsData;
      }

      if (listeners) {
        var oldListeners = vm.$options._parentListeners;
        vm.$options._parentListeners = listeners;
        updateComponentListeners(vm, listeners, oldListeners);
      }

      if (hasChildren) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
      }

      if (true) {
        isUpdatingChildComponent = false;
      }
    }

    function isInInactiveTree(vm) {
      while (vm && (vm = vm.$parent)) {
        if (vm._inactive) {
          return true;
        }
      }
      return false;
    }

    function activateChildComponent(vm, direct) {
      if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
          return;
        }
      } else if (vm._directInactive) {
        return;
      }
      if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (var i = 0; i < vm.$children.length; i++) {
          activateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'activated');
      }
    }

    function deactivateChildComponent(vm, direct) {
      if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
          return;
        }
      }
      if (!vm._inactive) {
        vm._inactive = true;
        for (var i = 0; i < vm.$children.length; i++) {
          deactivateChildComponent(vm.$children[i]);
        }
        callHook(vm, 'deactivated');
      }
    }

    function callHook(vm, hook) {
      var handlers = vm.$options[hook];
      if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
          try {
            handlers[i].call(vm);
          } catch (e) {
            handleError(e, vm, hook + " hook");
          }
        }
      }
      if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
      }
    }

    var MAX_UPDATE_COUNT = 100;

    var queue = [];
    var activatedChildren = [];
    var has = {};
    var circular = {};
    var waiting = false;
    var flushing = false;
    var index = 0;

    function resetSchedulerState() {
      index = queue.length = activatedChildren.length = 0;
      has = {};
      if (true) {
        circular = {};
      }
      waiting = flushing = false;
    }

    function flushSchedulerQueue() {
      flushing = true;
      var watcher, id;

      queue.sort(function (a, b) {
        return a.id - b.id;
      });

      for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        id = watcher.id;
        has[id] = null;
        watcher.run();

        if ("dev" !== 'production' && has[id] != null) {
          circular[id] = (circular[id] || 0) + 1;
          if (circular[id] > MAX_UPDATE_COUNT) {
            warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
            break;
          }
        }
      }

      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();

      resetSchedulerState();

      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);

      if (devtools && config.devtools) {
        devtools.emit('flush');
      }
    }

    function callUpdatedHooks(queue) {
      var i = queue.length;
      while (i--) {
        var watcher = queue[i];
        var vm = watcher.vm;
        if (vm._watcher === watcher && vm._isMounted) {
          callHook(vm, 'updated');
        }
      }
    }

    function queueActivatedComponent(vm) {
      vm._inactive = false;
      activatedChildren.push(vm);
    }

    function callActivatedHooks(queue) {
      for (var i = 0; i < queue.length; i++) {
        queue[i]._inactive = true;
        activateChildComponent(queue[i], true);
      }
    }

    function queueWatcher(watcher) {
      var id = watcher.id;
      if (has[id] == null) {
        has[id] = true;
        if (!flushing) {
          queue.push(watcher);
        } else {
          var i = queue.length - 1;
          while (i > index && queue[i].id > watcher.id) {
            i--;
          }
          queue.splice(i + 1, 0, watcher);
        }

        if (!waiting) {
          waiting = true;
          nextTick(flushSchedulerQueue);
        }
      }
    }

    var uid$2 = 0;

    var Watcher = function Watcher(vm, expOrFn, cb, options) {
      this.vm = vm;
      vm._watchers.push(this);

      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$2;
      this.active = true;
      this.dirty = this.lazy;
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = true ? expOrFn.toString() : '';

      if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath(expOrFn);
        if (!this.getter) {
          this.getter = function () {};
          "dev" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
        }
      }
      this.value = this.lazy ? undefined : this.get();
    };

    Watcher.prototype.get = function get() {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        if (this.user) {
          handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
        } else {
          throw e;
        }
      } finally {
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value;
    };

    Watcher.prototype.addDep = function addDep(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    };

    Watcher.prototype.cleanupDeps = function cleanupDeps() {
      var this$1 = this;

      var i = this.deps.length;
      while (i--) {
        var dep = this$1.deps[i];
        if (!this$1.newDepIds.has(dep.id)) {
          dep.removeSub(this$1);
        }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    };

    Watcher.prototype.update = function update() {
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    };

    Watcher.prototype.run = function run() {
      if (this.active) {
        var value = this.get();
        if (value !== this.value || isObject(value) || this.deep) {
          var oldValue = this.value;
          this.value = value;
          if (this.user) {
            try {
              this.cb.call(this.vm, value, oldValue);
            } catch (e) {
              handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
            }
          } else {
            this.cb.call(this.vm, value, oldValue);
          }
        }
      }
    };

    Watcher.prototype.evaluate = function evaluate() {
      this.value = this.get();
      this.dirty = false;
    };

    Watcher.prototype.depend = function depend() {
      var this$1 = this;

      var i = this.deps.length;
      while (i--) {
        this$1.deps[i].depend();
      }
    };

    Watcher.prototype.teardown = function teardown() {
      var this$1 = this;

      if (this.active) {
        if (!this.vm._isBeingDestroyed) {
          remove(this.vm._watchers, this);
        }
        var i = this.deps.length;
        while (i--) {
          this$1.deps[i].removeSub(this$1);
        }
        this.active = false;
      }
    };

    var seenObjects = new _Set();
    function traverse(val) {
      seenObjects.clear();
      _traverse(val, seenObjects);
    }

    function _traverse(val, seen) {
      var i, keys;
      var isA = Array.isArray(val);
      if (!isA && !isObject(val) || !(0, _isExtensible2.default)(val)) {
        return;
      }
      if (val.__ob__) {
        var depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
          return;
        }
        seen.add(depId);
      }
      if (isA) {
        i = val.length;
        while (i--) {
          _traverse(val[i], seen);
        }
      } else {
        keys = (0, _keys2.default)(val);
        i = keys.length;
        while (i--) {
          _traverse(val[keys[i]], seen);
        }
      }
    }

    var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop,
      set: noop
    };

    function proxy(target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
      };
      sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
      };
      (0, _defineProperty2.default)(target, key, sharedPropertyDefinition);
    }

    function initState(vm) {
      vm._watchers = [];
      var opts = vm.$options;
      if (opts.props) {
        initProps(vm, opts.props);
      }
      if (opts.methods) {
        initMethods(vm, opts.methods);
      }
      if (opts.data) {
        initData(vm);
      } else {
        observe(vm._data = {}, true);
      }
      if (opts.computed) {
        initComputed(vm, opts.computed);
      }
      if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
      }
    }

    function checkOptionType(vm, name) {
      var option = vm.$options[name];
      if (!isPlainObject(option)) {
        warn("component option \"" + name + "\" should be an object.", vm);
      }
    }

    function initProps(vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = vm._props = {};

      var keys = vm.$options._propKeys = [];
      var isRoot = !vm.$parent;

      observerState.shouldConvert = isRoot;
      var loop = function loop(key) {
        keys.push(key);
        var value = validateProp(key, propsOptions, propsData, vm);

        if (true) {
          if (isReservedAttribute(key) || config.isReservedAttr(key)) {
            warn("\"" + key + "\" is a reserved attribute and cannot be used as component prop.", vm);
          }
          defineReactive$$1(props, key, value, function () {
            if (vm.$parent && !isUpdatingChildComponent) {
              warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
            }
          });
        } else {
          defineReactive$$1(props, key, value);
        }

        if (!(key in vm)) {
          proxy(vm, "_props", key);
        }
      };

      for (var key in propsOptions) {
        loop(key);
      }observerState.shouldConvert = true;
    }

    function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
      if (!isPlainObject(data)) {
        data = {};
        "dev" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
      }

      var keys = (0, _keys2.default)(data);
      var props = vm.$options.props;
      var methods = vm.$options.methods;
      var i = keys.length;
      while (i--) {
        var key = keys[i];
        if (true) {
          if (methods && hasOwn(methods, key)) {
            warn("method \"" + key + "\" has already been defined as a data property.", vm);
          }
        }
        if (props && hasOwn(props, key)) {
          "dev" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
        } else if (!isReserved(key)) {
          proxy(vm, "_data", key);
        }
      }

      observe(data, true);
    }

    function getData(data, vm) {
      try {
        return data.call(vm);
      } catch (e) {
        handleError(e, vm, "data()");
        return {};
      }
    }

    var computedWatcherOptions = { lazy: true };

    function initComputed(vm, computed) {
      "dev" !== 'production' && checkOptionType(vm, 'computed');
      var watchers = vm._computedWatchers = (0, _create2.default)(null);

      for (var key in computed) {
        var userDef = computed[key];
        var getter = typeof userDef === 'function' ? userDef : userDef.get;
        if ("dev" !== 'production' && getter == null) {
          warn("Getter is missing for computed property \"" + key + "\".", vm);
        }

        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);

        if (!(key in vm)) {
          defineComputed(vm, key, userDef);
        } else if (true) {
          if (key in vm.$data) {
            warn("The computed property \"" + key + "\" is already defined in data.", vm);
          } else if (vm.$options.props && key in vm.$options.props) {
            warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
          }
        }
      }
    }

    function defineComputed(target, key, userDef) {
      if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key);
        sharedPropertyDefinition.set = noop;
      } else {
        sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
        sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
      }
      if ("dev" !== 'production' && sharedPropertyDefinition.set === noop) {
        sharedPropertyDefinition.set = function () {
          warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
        };
      }
      (0, _defineProperty2.default)(target, key, sharedPropertyDefinition);
    }

    function createComputedGetter(key) {
      return function computedGetter() {
        var watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
          if (watcher.dirty) {
            watcher.evaluate();
          }
          if (Dep.target) {
            watcher.depend();
          }
          return watcher.value;
        }
      };
    }

    function initMethods(vm, methods) {
      "dev" !== 'production' && checkOptionType(vm, 'methods');
      var props = vm.$options.props;
      for (var key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
        if (true) {
          if (methods[key] == null) {
            warn("method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
          }
          if (props && hasOwn(props, key)) {
            warn("method \"" + key + "\" has already been defined as a prop.", vm);
          }
        }
      }
    }

    function initWatch(vm, watch) {
      "dev" !== 'production' && checkOptionType(vm, 'watch');
      for (var key in watch) {
        var handler = watch[key];
        if (Array.isArray(handler)) {
          for (var i = 0; i < handler.length; i++) {
            createWatcher(vm, key, handler[i]);
          }
        } else {
          createWatcher(vm, key, handler);
        }
      }
    }

    function createWatcher(vm, keyOrFn, handler, options) {
      if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
      }
      if (typeof handler === 'string') {
        handler = vm[handler];
      }
      return vm.$watch(keyOrFn, handler, options);
    }

    function stateMixin(Vue) {
      var dataDef = {};
      dataDef.get = function () {
        return this._data;
      };
      var propsDef = {};
      propsDef.get = function () {
        return this._props;
      };
      if (true) {
        dataDef.set = function (newData) {
          warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
        };
        propsDef.set = function () {
          warn("$props is readonly.", this);
        };
      }
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);

      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;

      Vue.prototype.$watch = function (expOrFn, cb, options) {
        var vm = this;
        if (isPlainObject(cb)) {
          return createWatcher(vm, expOrFn, cb, options);
        }
        options = options || {};
        options.user = true;
        var watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
          cb.call(vm, watcher.value);
        }
        return function unwatchFn() {
          watcher.teardown();
        };
      };
    }

    function initProvide(vm) {
      var provide = vm.$options.provide;
      if (provide) {
        vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
      }
    }

    function initInjections(vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
        observerState.shouldConvert = false;
        (0, _keys2.default)(result).forEach(function (key) {
          if (true) {
            defineReactive$$1(vm, key, result[key], function () {
              warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
            });
          } else {
            defineReactive$$1(vm, key, result[key]);
          }
        });
        observerState.shouldConvert = true;
      }
    }

    function resolveInject(inject, vm) {
      if (inject) {
        var result = (0, _create2.default)(null);
        var keys = hasSymbol ? (0, _ownKeys2.default)(inject) : (0, _keys2.default)(inject);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var provideKey = inject[key];
          var source = vm;
          while (source) {
            if (source._provided && provideKey in source._provided) {
              result[key] = source._provided[provideKey];
              break;
            }
            source = source.$parent;
          }
          if ("dev" !== 'production' && !source) {
            warn("Injection \"" + key + "\" not found", vm);
          }
        }
        return result;
      }
    }

    function createFunctionalComponent(Ctor, propsData, data, context, children) {
      var props = {};
      var propOptions = Ctor.options.props;
      if (isDef(propOptions)) {
        for (var key in propOptions) {
          props[key] = validateProp(key, propOptions, propsData || {});
        }
      } else {
        if (isDef(data.attrs)) {
          mergeProps(props, data.attrs);
        }
        if (isDef(data.props)) {
          mergeProps(props, data.props);
        }
      }

      var _context = (0, _create2.default)(context);
      var h = function h(a, b, c, d) {
        return createElement(_context, a, b, c, d, true);
      };
      var vnode = Ctor.options.render.call(null, h, {
        data: data,
        props: props,
        children: children,
        parent: context,
        listeners: data.on || {},
        injections: resolveInject(Ctor.options.inject, context),
        slots: function slots() {
          return resolveSlots(children, context);
        }
      });
      if (vnode instanceof VNode) {
        vnode.functionalContext = context;
        vnode.functionalOptions = Ctor.options;
        if (data.slot) {
          (vnode.data || (vnode.data = {})).slot = data.slot;
        }
      }
      return vnode;
    }

    function mergeProps(to, from) {
      for (var key in from) {
        to[camelize(key)] = from[key];
      }
    }

    var componentVNodeHooks = {
      init: function init(vnode, hydrating, parentElm, refElm) {
        if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
          var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
          child.$mount(hydrating ? vnode.elm : undefined, hydrating);
        } else if (vnode.data.keepAlive) {
          var mountedNode = vnode;
          componentVNodeHooks.prepatch(mountedNode, mountedNode);
        }
      },

      prepatch: function prepatch(oldVnode, vnode) {
        var options = vnode.componentOptions;
        var child = vnode.componentInstance = oldVnode.componentInstance;
        updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
      },

      insert: function insert(vnode) {
        var context = vnode.context;
        var componentInstance = vnode.componentInstance;
        if (!componentInstance._isMounted) {
          componentInstance._isMounted = true;
          callHook(componentInstance, 'mounted');
        }
        if (vnode.data.keepAlive) {
          if (context._isMounted) {
            queueActivatedComponent(componentInstance);
          } else {
            activateChildComponent(componentInstance, true);
          }
        }
      },

      destroy: function destroy(vnode) {
        var componentInstance = vnode.componentInstance;
        if (!componentInstance._isDestroyed) {
          if (!vnode.data.keepAlive) {
            componentInstance.$destroy();
          } else {
            deactivateChildComponent(componentInstance, true);
          }
        }
      }
    };

    var hooksToMerge = (0, _keys2.default)(componentVNodeHooks);

    function createComponent(Ctor, data, context, children, tag) {
      if (isUndef(Ctor)) {
        return;
      }

      var baseCtor = context.$options._base;

      if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
      }

      if (typeof Ctor !== 'function') {
        if (true) {
          warn("Invalid Component definition: " + String(Ctor), context);
        }
        return;
      }

      var asyncFactory;
      if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
        if (Ctor === undefined) {
          return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
        }
      }

      data = data || {};

      resolveConstructorOptions(Ctor);

      if (isDef(data.model)) {
        transformModel(Ctor.options, data);
      }

      var propsData = extractPropsFromVNodeData(data, Ctor, tag);

      if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children);
      }

      var listeners = data.on;

      data.on = data.nativeOn;

      if (isTrue(Ctor.options.abstract)) {
        var slot = data.slot;
        data = {};
        if (slot) {
          data.slot = slot;
        }
      }

      mergeHooks(data);

      var name = Ctor.options.name || tag;
      var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);
      return vnode;
    }

    function createComponentInstanceForVnode(vnode, parent, parentElm, refElm) {
      var vnodeComponentOptions = vnode.componentOptions;
      var options = {
        _isComponent: true,
        parent: parent,
        propsData: vnodeComponentOptions.propsData,
        _componentTag: vnodeComponentOptions.tag,
        _parentVnode: vnode,
        _parentListeners: vnodeComponentOptions.listeners,
        _renderChildren: vnodeComponentOptions.children,
        _parentElm: parentElm || null,
        _refElm: refElm || null
      };

      var inlineTemplate = vnode.data.inlineTemplate;
      if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
      }
      return new vnodeComponentOptions.Ctor(options);
    }

    function mergeHooks(data) {
      if (!data.hook) {
        data.hook = {};
      }
      for (var i = 0; i < hooksToMerge.length; i++) {
        var key = hooksToMerge[i];
        var fromParent = data.hook[key];
        var ours = componentVNodeHooks[key];
        data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
      }
    }

    function mergeHook$1(one, two) {
      return function (a, b, c, d) {
        one(a, b, c, d);
        two(a, b, c, d);
      };
    }

    function transformModel(options, data) {
      var prop = options.model && options.model.prop || 'value';
      var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
      var on = data.on || (data.on = {});
      if (isDef(on[event])) {
        on[event] = [data.model.callback].concat(on[event]);
      } else {
        on[event] = data.model.callback;
      }
    }

    var SIMPLE_NORMALIZE = 1;
    var ALWAYS_NORMALIZE = 2;

    function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
      if (Array.isArray(data) || isPrimitive(data)) {
        normalizationType = children;
        children = data;
        data = undefined;
      }
      if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE;
      }
      return _createElement(context, tag, data, children, normalizationType);
    }

    function _createElement(context, tag, data, children, normalizationType) {
      if (isDef(data) && isDef(data.__ob__)) {
        "dev" !== 'production' && warn("Avoid using observed data object as vnode data: " + (0, _stringify2.default)(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
        return createEmptyVNode();
      }

      if (isDef(data) && isDef(data.is)) {
        tag = data.is;
      }
      if (!tag) {
        return createEmptyVNode();
      }

      if ("dev" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
        warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
      }

      if (Array.isArray(children) && typeof children[0] === 'function') {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
      }
      if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
      } else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
      }
      var vnode, ns;
      if (typeof tag === 'string') {
        var Ctor;
        ns = config.getTagNamespace(tag);
        if (config.isReservedTag(tag)) {
          vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
        } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
          vnode = createComponent(Ctor, data, context, children, tag);
        } else {
          vnode = new VNode(tag, data, children, undefined, undefined, context);
        }
      } else {
        vnode = createComponent(tag, data, context, children);
      }
      if (isDef(vnode)) {
        if (ns) {
          applyNS(vnode, ns);
        }
        return vnode;
      } else {
        return createEmptyVNode();
      }
    }

    function applyNS(vnode, ns) {
      vnode.ns = ns;
      if (vnode.tag === 'foreignObject') {
        return;
      }
      if (isDef(vnode.children)) {
        for (var i = 0, l = vnode.children.length; i < l; i++) {
          var child = vnode.children[i];
          if (isDef(child.tag) && isUndef(child.ns)) {
            applyNS(child, ns);
          }
        }
      }
    }

    function renderList(val, render) {
      var ret, i, l, keys, key;
      if (Array.isArray(val) || typeof val === 'string') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
          ret[i] = render(val[i], i);
        }
      } else if (typeof val === 'number') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
          ret[i] = render(i + 1, i);
        }
      } else if (isObject(val)) {
        keys = (0, _keys2.default)(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
      if (isDef(ret)) {
        ret._isVList = true;
      }
      return ret;
    }

    function renderSlot(name, fallback, props, bindObject) {
      var scopedSlotFn = this.$scopedSlots[name];
      if (scopedSlotFn) {
        props = props || {};
        if (bindObject) {
          props = extend(extend({}, bindObject), props);
        }
        return scopedSlotFn(props) || fallback;
      } else {
        var slotNodes = this.$slots[name];

        if (slotNodes && "dev" !== 'production') {
          slotNodes._rendered && warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
          slotNodes._rendered = true;
        }
        return slotNodes || fallback;
      }
    }

    function resolveFilter(id) {
      return resolveAsset(this.$options, 'filters', id, true) || identity;
    }

    function checkKeyCodes(eventKeyCode, key, builtInAlias) {
      var keyCodes = config.keyCodes[key] || builtInAlias;
      if (Array.isArray(keyCodes)) {
        return keyCodes.indexOf(eventKeyCode) === -1;
      } else {
        return keyCodes !== eventKeyCode;
      }
    }

    function bindObjectProps(data, tag, value, asProp, isSync) {
      if (value) {
        if (!isObject(value)) {
          "dev" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
        } else {
          if (Array.isArray(value)) {
            value = toObject(value);
          }
          var hash;
          var loop = function loop(key) {
            if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
              hash = data;
            } else {
              var type = data.attrs && data.attrs.type;
              hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
            }
            if (!(key in hash)) {
              hash[key] = value[key];

              if (isSync) {
                var on = data.on || (data.on = {});
                on["update:" + key] = function ($event) {
                  value[key] = $event;
                };
              }
            }
          };

          for (var key in value) {
            loop(key);
          }
        }
      }
      return data;
    }

    function renderStatic(index, isInFor) {
      var tree = this._staticTrees[index];

      if (tree && !isInFor) {
        return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
      }

      tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
      markStatic(tree, "__static__" + index, false);
      return tree;
    }

    function markOnce(tree, index, key) {
      markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
      return tree;
    }

    function markStatic(tree, key, isOnce) {
      if (Array.isArray(tree)) {
        for (var i = 0; i < tree.length; i++) {
          if (tree[i] && typeof tree[i] !== 'string') {
            markStaticNode(tree[i], key + "_" + i, isOnce);
          }
        }
      } else {
        markStaticNode(tree, key, isOnce);
      }
    }

    function markStaticNode(node, key, isOnce) {
      node.isStatic = true;
      node.key = key;
      node.isOnce = isOnce;
    }

    function bindObjectListeners(data, value) {
      if (value) {
        if (!isPlainObject(value)) {
          "dev" !== 'production' && warn('v-on without argument expects an Object value', this);
        } else {
          var on = data.on = data.on ? extend({}, data.on) : {};
          for (var key in value) {
            var existing = on[key];
            var ours = value[key];
            on[key] = existing ? [].concat(ours, existing) : ours;
          }
        }
      }
      return data;
    }

    function initRender(vm) {
      vm._vnode = null;
      vm._staticTrees = null;
      var parentVnode = vm.$vnode = vm.$options._parentVnode;
      var renderContext = parentVnode && parentVnode.context;
      vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
      vm.$scopedSlots = emptyObject;

      vm._c = function (a, b, c, d) {
        return createElement(vm, a, b, c, d, false);
      };

      vm.$createElement = function (a, b, c, d) {
        return createElement(vm, a, b, c, d, true);
      };

      var parentData = parentVnode && parentVnode.data;

      if (true) {
        defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, function () {
          !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
        }, true);
        defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, function () {
          !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
        }, true);
      } else {
        defineReactive$$1(vm, '$attrs', parentData && parentData.attrs, null, true);
        defineReactive$$1(vm, '$listeners', vm.$options._parentListeners, null, true);
      }
    }

    function renderMixin(Vue) {
      Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this);
      };

      Vue.prototype._render = function () {
        var vm = this;
        var ref = vm.$options;
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        var _parentVnode = ref._parentVnode;

        if (vm._isMounted) {
          for (var key in vm.$slots) {
            vm.$slots[key] = cloneVNodes(vm.$slots[key]);
          }
        }

        vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

        if (staticRenderFns && !vm._staticTrees) {
          vm._staticTrees = [];
        }

        vm.$vnode = _parentVnode;

        var vnode;
        try {
          vnode = render.call(vm._renderProxy, vm.$createElement);
        } catch (e) {
          handleError(e, vm, "render function");

          if (true) {
            vnode = vm.$options.renderError ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e) : vm._vnode;
          } else {
            vnode = vm._vnode;
          }
        }

        if (!(vnode instanceof VNode)) {
          if ("dev" !== 'production' && Array.isArray(vnode)) {
            warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
          }
          vnode = createEmptyVNode();
        }

        vnode.parent = _parentVnode;
        return vnode;
      };

      Vue.prototype._o = markOnce;
      Vue.prototype._n = toNumber;
      Vue.prototype._s = toString;
      Vue.prototype._l = renderList;
      Vue.prototype._t = renderSlot;
      Vue.prototype._q = looseEqual;
      Vue.prototype._i = looseIndexOf;
      Vue.prototype._m = renderStatic;
      Vue.prototype._f = resolveFilter;
      Vue.prototype._k = checkKeyCodes;
      Vue.prototype._b = bindObjectProps;
      Vue.prototype._v = createTextVNode;
      Vue.prototype._e = createEmptyVNode;
      Vue.prototype._u = resolveScopedSlots;
      Vue.prototype._g = bindObjectListeners;
    }

    var uid$1 = 0;

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;

        vm._uid = uid$1++;

        var startTag, endTag;

        if ("dev" !== 'production' && config.performance && mark) {
          startTag = "vue-perf-init:" + vm._uid;
          endTag = "vue-perf-end:" + vm._uid;
          mark(startTag);
        }

        vm._isVue = true;

        if (options && options._isComponent) {
          initInternalComponent(vm, options);
        } else {
          vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
        }

        if (true) {
          initProxy(vm);
        } else {
          vm._renderProxy = vm;
        }

        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        initInjections(vm);
        initState(vm);
        initProvide(vm);
        callHook(vm, 'created');

        if ("dev" !== 'production' && config.performance && mark) {
          vm._name = formatComponentName(vm, false);
          mark(endTag);
          measure(vm._name + " init", startTag, endTag);
        }

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };
    }

    function initInternalComponent(vm, options) {
      var opts = vm.$options = (0, _create2.default)(vm.constructor.options);

      opts.parent = options.parent;
      opts.propsData = options.propsData;
      opts._parentVnode = options._parentVnode;
      opts._parentListeners = options._parentListeners;
      opts._renderChildren = options._renderChildren;
      opts._componentTag = options._componentTag;
      opts._parentElm = options._parentElm;
      opts._refElm = options._refElm;
      if (options.render) {
        opts.render = options.render;
        opts.staticRenderFns = options.staticRenderFns;
      }
    }

    function resolveConstructorOptions(Ctor) {
      var options = Ctor.options;
      if (Ctor.super) {
        var superOptions = resolveConstructorOptions(Ctor.super);
        var cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
          Ctor.superOptions = superOptions;

          var modifiedOptions = resolveModifiedOptions(Ctor);

          if (modifiedOptions) {
            extend(Ctor.extendOptions, modifiedOptions);
          }
          options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
          if (options.name) {
            options.components[options.name] = Ctor;
          }
        }
      }
      return options;
    }

    function resolveModifiedOptions(Ctor) {
      var modified;
      var latest = Ctor.options;
      var extended = Ctor.extendOptions;
      var sealed = Ctor.sealedOptions;
      for (var key in latest) {
        if (latest[key] !== sealed[key]) {
          if (!modified) {
            modified = {};
          }
          modified[key] = dedupe(latest[key], extended[key], sealed[key]);
        }
      }
      return modified;
    }

    function dedupe(latest, extended, sealed) {
      if (Array.isArray(latest)) {
        var res = [];
        sealed = Array.isArray(sealed) ? sealed : [sealed];
        extended = Array.isArray(extended) ? extended : [extended];
        for (var i = 0; i < latest.length; i++) {
          if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
            res.push(latest[i]);
          }
        }
        return res;
      } else {
        return latest;
      }
    }

    function Vue$3(options) {
      if ("dev" !== 'production' && !(this instanceof Vue$3)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
    }

    initMixin(Vue$3);
    stateMixin(Vue$3);
    eventsMixin(Vue$3);
    lifecycleMixin(Vue$3);
    renderMixin(Vue$3);

    function initUse(Vue) {
      Vue.use = function (plugin) {
        var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
        if (installedPlugins.indexOf(plugin) > -1) {
          return this;
        }

        var args = toArray(arguments, 1);
        args.unshift(this);
        if (typeof plugin.install === 'function') {
          plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
          plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
      };
    }

    function initMixin$1(Vue) {
      Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this;
      };
    }

    function initExtend(Vue) {
      Vue.cid = 0;
      var cid = 1;

      Vue.extend = function (extendOptions) {
        extendOptions = extendOptions || {};
        var Super = this;
        var SuperId = Super.cid;
        var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
        if (cachedCtors[SuperId]) {
          return cachedCtors[SuperId];
        }

        var name = extendOptions.name || Super.options.name;
        if (true) {
          if (!/^[a-zA-Z][\w-]*$/.test(name)) {
            warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
          }
        }

        var Sub = function VueComponent(options) {
          this._init(options);
        };
        Sub.prototype = (0, _create2.default)(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.cid = cid++;
        Sub.options = mergeOptions(Super.options, extendOptions);
        Sub['super'] = Super;

        if (Sub.options.props) {
          initProps$1(Sub);
        }
        if (Sub.options.computed) {
          initComputed$1(Sub);
        }

        Sub.extend = Super.extend;
        Sub.mixin = Super.mixin;
        Sub.use = Super.use;

        ASSET_TYPES.forEach(function (type) {
          Sub[type] = Super[type];
        });

        if (name) {
          Sub.options.components[name] = Sub;
        }

        Sub.superOptions = Super.options;
        Sub.extendOptions = extendOptions;
        Sub.sealedOptions = extend({}, Sub.options);

        cachedCtors[SuperId] = Sub;
        return Sub;
      };
    }

    function initProps$1(Comp) {
      var props = Comp.options.props;
      for (var key in props) {
        proxy(Comp.prototype, "_props", key);
      }
    }

    function initComputed$1(Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
      }
    }

    function initAssetRegisters(Vue) {
      ASSET_TYPES.forEach(function (type) {
        Vue[type] = function (id, definition) {
          if (!definition) {
            return this.options[type + 's'][id];
          } else {
            if (true) {
              if (type === 'component' && config.isReservedTag(id)) {
                warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
              }
            }
            if (type === 'component' && isPlainObject(definition)) {
              definition.name = definition.name || id;
              definition = this.options._base.extend(definition);
            }
            if (type === 'directive' && typeof definition === 'function') {
              definition = { bind: definition, update: definition };
            }
            this.options[type + 's'][id] = definition;
            return definition;
          }
        };
      });
    }

    var patternTypes = [String, RegExp, Array];

    function getComponentName(opts) {
      return opts && (opts.Ctor.options.name || opts.tag);
    }

    function matches(pattern, name) {
      if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1;
      } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1;
      } else if (isRegExp(pattern)) {
        return pattern.test(name);
      }

      return false;
    }

    function pruneCache(cache, current, filter) {
      for (var key in cache) {
        var cachedNode = cache[key];
        if (cachedNode) {
          var name = getComponentName(cachedNode.componentOptions);
          if (name && !filter(name)) {
            if (cachedNode !== current) {
              pruneCacheEntry(cachedNode);
            }
            cache[key] = null;
          }
        }
      }
    }

    function pruneCacheEntry(vnode) {
      if (vnode) {
        vnode.componentInstance.$destroy();
      }
    }

    var KeepAlive = {
      name: 'keep-alive',
      abstract: true,

      props: {
        include: patternTypes,
        exclude: patternTypes
      },

      created: function created() {
        this.cache = (0, _create2.default)(null);
      },

      destroyed: function destroyed() {
        var this$1 = this;

        for (var key in this$1.cache) {
          pruneCacheEntry(this$1.cache[key]);
        }
      },

      watch: {
        include: function include(val) {
          pruneCache(this.cache, this._vnode, function (name) {
            return matches(val, name);
          });
        },
        exclude: function exclude(val) {
          pruneCache(this.cache, this._vnode, function (name) {
            return !matches(val, name);
          });
        }
      },

      render: function render() {
        var vnode = getFirstComponentChild(this.$slots.default);
        var componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
          var name = getComponentName(componentOptions);
          if (name && (this.include && !matches(this.include, name) || this.exclude && matches(this.exclude, name))) {
            return vnode;
          }
          var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
          if (this.cache[key]) {
            vnode.componentInstance = this.cache[key].componentInstance;
          } else {
            this.cache[key] = vnode;
          }
          vnode.data.keepAlive = true;
        }
        return vnode;
      }
    };

    var builtInComponents = {
      KeepAlive: KeepAlive
    };

    function initGlobalAPI(Vue) {
      var configDef = {};
      configDef.get = function () {
        return config;
      };
      if (true) {
        configDef.set = function () {
          warn('Do not replace the Vue.config object, set individual fields instead.');
        };
      }
      Object.defineProperty(Vue, 'config', configDef);

      Vue.util = {
        warn: warn,
        extend: extend,
        mergeOptions: mergeOptions,
        defineReactive: defineReactive$$1
      };

      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;

      Vue.options = (0, _create2.default)(null);
      ASSET_TYPES.forEach(function (type) {
        Vue.options[type + 's'] = (0, _create2.default)(null);
      });

      Vue.options._base = Vue;

      extend(Vue.options.components, builtInComponents);

      initUse(Vue);
      initMixin$1(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
    }

    initGlobalAPI(Vue$3);

    Object.defineProperty(Vue$3.prototype, '$isServer', {
      get: isServerRendering
    });

    Object.defineProperty(Vue$3.prototype, '$ssrContext', {
      get: function get() {
        return this.$vnode && this.$vnode.ssrContext;
      }
    });

    Vue$3.version = '2.4.2';

    var isReservedAttr = makeMap('style,class');

    var acceptValue = makeMap('input,textarea,option,select');
    var mustUseProp = function mustUseProp(tag, type, attr) {
      return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
    };

    var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

    var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

    var xlinkNS = 'http://www.w3.org/1999/xlink';

    var isXlink = function isXlink(name) {
      return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
    };

    var getXlinkProp = function getXlinkProp(name) {
      return isXlink(name) ? name.slice(6, name.length) : '';
    };

    var isFalsyAttrValue = function isFalsyAttrValue(val) {
      return val == null || val === false;
    };

    function genClassForVnode(vnode) {
      var data = vnode.data;
      var parentNode = vnode;
      var childNode = vnode;
      while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vnode;
        if (childNode.data) {
          data = mergeClassData(childNode.data, data);
        }
      }
      while (isDef(parentNode = parentNode.parent)) {
        if (parentNode.data) {
          data = mergeClassData(data, parentNode.data);
        }
      }
      return renderClass(data.staticClass, data.class);
    }

    function mergeClassData(child, parent) {
      return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class) ? [child.class, parent.class] : parent.class
      };
    }

    function renderClass(staticClass, dynamicClass) {
      if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass));
      }

      return '';
    }

    function concat(a, b) {
      return a ? b ? a + ' ' + b : a : b || '';
    }

    function stringifyClass(value) {
      if (Array.isArray(value)) {
        return stringifyArray(value);
      }
      if (isObject(value)) {
        return stringifyObject(value);
      }
      if (typeof value === 'string') {
        return value;
      }

      return '';
    }

    function stringifyArray(value) {
      var res = '';
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          if (res) {
            res += ' ';
          }
          res += stringified;
        }
      }
      return res;
    }

    function stringifyObject(value) {
      var res = '';
      for (var key in value) {
        if (value[key]) {
          if (res) {
            res += ' ';
          }
          res += key;
        }
      }
      return res;
    }

    var namespaceMap = {
      svg: 'http://www.w3.org/2000/svg',
      math: 'http://www.w3.org/1998/Math/MathML'
    };

    var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

    var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

    var isPreTag = function isPreTag(tag) {
      return tag === 'pre';
    };

    var isReservedTag = function isReservedTag(tag) {
      return isHTMLTag(tag) || isSVG(tag);
    };

    function getTagNamespace(tag) {
      if (isSVG(tag)) {
        return 'svg';
      }

      if (tag === 'math') {
        return 'math';
      }
    }

    var unknownElementCache = (0, _create2.default)(null);
    function isUnknownElement(tag) {
      if (!inBrowser) {
        return true;
      }
      if (isReservedTag(tag)) {
        return false;
      }
      tag = tag.toLowerCase();

      if (unknownElementCache[tag] != null) {
        return unknownElementCache[tag];
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
        return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
      } else {
        return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
      }
    }

    function query(el) {
      if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
          "dev" !== 'production' && warn('Cannot find element: ' + el);
          return document.createElement('div');
        }
        return selected;
      } else {
        return el;
      }
    }

    function createElement$1(tagName, vnode) {
      var elm = document.createElement(tagName);
      if (tagName !== 'select') {
        return elm;
      }

      if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple');
      }
      return elm;
    }

    function createElementNS(namespace, tagName) {
      return document.createElementNS(namespaceMap[namespace], tagName);
    }

    function createTextNode(text) {
      return document.createTextNode(text);
    }

    function createComment(text) {
      return document.createComment(text);
    }

    function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
    }

    function removeChild(node, child) {
      node.removeChild(child);
    }

    function appendChild(node, child) {
      node.appendChild(child);
    }

    function parentNode(node) {
      return node.parentNode;
    }

    function nextSibling(node) {
      return node.nextSibling;
    }

    function tagName(node) {
      return node.tagName;
    }

    function setTextContent(node, text) {
      node.textContent = text;
    }

    function setAttribute(node, key, val) {
      node.setAttribute(key, val);
    }

    var nodeOps = (0, _freeze2.default)({
      createElement: createElement$1,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      setAttribute: setAttribute
    });

    var ref = {
      create: function create(_, vnode) {
        registerRef(vnode);
      },
      update: function update(oldVnode, vnode) {
        if (oldVnode.data.ref !== vnode.data.ref) {
          registerRef(oldVnode, true);
          registerRef(vnode);
        }
      },
      destroy: function destroy(vnode) {
        registerRef(vnode, true);
      }
    };

    function registerRef(vnode, isRemoval) {
      var key = vnode.data.ref;
      if (!key) {
        return;
      }

      var vm = vnode.context;
      var ref = vnode.componentInstance || vnode.elm;
      var refs = vm.$refs;
      if (isRemoval) {
        if (Array.isArray(refs[key])) {
          remove(refs[key], ref);
        } else if (refs[key] === ref) {
          refs[key] = undefined;
        }
      } else {
        if (vnode.data.refInFor) {
          if (!Array.isArray(refs[key])) {
            refs[key] = [ref];
          } else if (refs[key].indexOf(ref) < 0) {
            refs[key].push(ref);
          }
        } else {
          refs[key] = ref;
        }
      }
    }

    var emptyNode = new VNode('', {}, []);

    var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

    function sameVnode(a, b) {
      return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
    }

    function sameInputType(a, b) {
      if (a.tag !== 'input') {
        return true;
      }
      var i;
      var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
      var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
      return typeA === typeB;
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i, key;
      var map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key)) {
          map[key] = i;
        }
      }
      return map;
    }

    function createPatchFunction(backend) {
      var i, j;
      var cbs = {};

      var modules = backend.modules;
      var nodeOps = backend.nodeOps;

      for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
          if (isDef(modules[j][hooks[i]])) {
            cbs[hooks[i]].push(modules[j][hooks[i]]);
          }
        }
      }

      function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
      }

      function createRmCb(childElm, listeners) {
        function remove$$1() {
          if (--remove$$1.listeners === 0) {
            removeNode(childElm);
          }
        }
        remove$$1.listeners = listeners;
        return remove$$1;
      }

      function removeNode(el) {
        var parent = nodeOps.parentNode(el);

        if (isDef(parent)) {
          nodeOps.removeChild(parent, el);
        }
      }

      var inPre = 0;
      function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
        vnode.isRootInsert = !nested;
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
          return;
        }

        var data = vnode.data;
        var children = vnode.children;
        var tag = vnode.tag;
        if (isDef(tag)) {
          if (true) {
            if (data && data.pre) {
              inPre++;
            }
            if (!inPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) && config.isUnknownElement(tag)) {
              warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
            }
          }
          vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
          setScope(vnode);

          {
            createChildren(vnode, children, insertedVnodeQueue);
            if (isDef(data)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
            }
            insert(parentElm, vnode.elm, refElm);
          }

          if ("dev" !== 'production' && data && data.pre) {
            inPre--;
          }
        } else if (isTrue(vnode.isComment)) {
          vnode.elm = nodeOps.createComment(vnode.text);
          insert(parentElm, vnode.elm, refElm);
        } else {
          vnode.elm = nodeOps.createTextNode(vnode.text);
          insert(parentElm, vnode.elm, refElm);
        }
      }

      function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        var i = vnode.data;
        if (isDef(i)) {
          var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
          if (isDef(i = i.hook) && isDef(i = i.init)) {
            i(vnode, false, parentElm, refElm);
          }

          if (isDef(vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue);
            if (isTrue(isReactivated)) {
              reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
            }
            return true;
          }
        }
      }

      function initComponent(vnode, insertedVnodeQueue) {
        if (isDef(vnode.data.pendingInsert)) {
          insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
          vnode.data.pendingInsert = null;
        }
        vnode.elm = vnode.componentInstance.$el;
        if (isPatchable(vnode)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
          setScope(vnode);
        } else {
          registerRef(vnode);

          insertedVnodeQueue.push(vnode);
        }
      }

      function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        var i;

        var innerNode = vnode;
        while (innerNode.componentInstance) {
          innerNode = innerNode.componentInstance._vnode;
          if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
            for (i = 0; i < cbs.activate.length; ++i) {
              cbs.activate[i](emptyNode, innerNode);
            }
            insertedVnodeQueue.push(innerNode);
            break;
          }
        }

        insert(parentElm, vnode.elm, refElm);
      }

      function insert(parent, elm, ref$$1) {
        if (isDef(parent)) {
          if (isDef(ref$$1)) {
            if (ref$$1.parentNode === parent) {
              nodeOps.insertBefore(parent, elm, ref$$1);
            }
          } else {
            nodeOps.appendChild(parent, elm);
          }
        }
      }

      function createChildren(vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
          }
        } else if (isPrimitive(vnode.text)) {
          nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
        }
      }

      function isPatchable(vnode) {
        while (vnode.componentInstance) {
          vnode = vnode.componentInstance._vnode;
        }
        return isDef(vnode.tag);
      }

      function invokeCreateHooks(vnode, insertedVnodeQueue) {
        for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
          cbs.create[i$1](emptyNode, vnode);
        }
        i = vnode.data.hook;
        if (isDef(i)) {
          if (isDef(i.create)) {
            i.create(emptyNode, vnode);
          }
          if (isDef(i.insert)) {
            insertedVnodeQueue.push(vnode);
          }
        }
      }

      function setScope(vnode) {
        var i;
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setAttribute(vnode.elm, i, '');
          }
          ancestor = ancestor.parent;
        }

        if (isDef(i = activeInstance) && i !== vnode.context && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
      }

      function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
          createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
        }
      }

      function invokeDestroyHook(vnode) {
        var i, j;
        var data = vnode.data;
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.destroy)) {
            i(vnode);
          }
          for (i = 0; i < cbs.destroy.length; ++i) {
            cbs.destroy[i](vnode);
          }
        }
        if (isDef(i = vnode.children)) {
          for (j = 0; j < vnode.children.length; ++j) {
            invokeDestroyHook(vnode.children[j]);
          }
        }
      }

      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
          var ch = vnodes[startIdx];
          if (isDef(ch)) {
            if (isDef(ch.tag)) {
              removeAndInvokeRemoveHook(ch);
              invokeDestroyHook(ch);
            } else {
              removeNode(ch.elm);
            }
          }
        }
      }

      function removeAndInvokeRemoveHook(vnode, rm) {
        if (isDef(rm) || isDef(vnode.data)) {
          var i;
          var listeners = cbs.remove.length + 1;
          if (isDef(rm)) {
            rm.listeners += listeners;
          } else {
            rm = createRmCb(vnode.elm, listeners);
          }

          if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
            removeAndInvokeRemoveHook(i, rm);
          }
          for (i = 0; i < cbs.remove.length; ++i) {
            cbs.remove[i](vnode, rm);
          }
          if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
            i(vnode, rm);
          } else {
            rm();
          }
        } else {
          removeNode(vnode.elm);
        }
      }

      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        var oldStartIdx = 0;
        var newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx, idxInOld, elmToMove, refElm;

        var canMove = !removeOnly;

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx];
          } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
          } else {
            if (isUndef(oldKeyToIdx)) {
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
            if (isUndef(idxInOld)) {
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            } else {
              elmToMove = oldCh[idxInOld];

              if ("dev" !== 'production' && !elmToMove) {
                warn('It seems there are duplicate keys that is causing an update error. ' + 'Make sure each v-for item has a unique key.');
              }
              if (sameVnode(elmToMove, newStartVnode)) {
                patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                oldCh[idxInOld] = undefined;
                canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
              } else {
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
              }
            }
          }
        }
        if (oldStartIdx > oldEndIdx) {
          refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
          addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
          removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
      }

      function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
        if (oldVnode === vnode) {
          return;
        }

        var elm = vnode.elm = oldVnode.elm;

        if (isTrue(oldVnode.isAsyncPlaceholder)) {
          if (isDef(vnode.asyncFactory.resolved)) {
            hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
          } else {
            vnode.isAsyncPlaceholder = true;
          }
          return;
        }

        if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
          vnode.componentInstance = oldVnode.componentInstance;
          return;
        }

        var i;
        var data = vnode.data;
        if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
          i(oldVnode, vnode);
        }

        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (isDef(data) && isPatchable(vnode)) {
          for (i = 0; i < cbs.update.length; ++i) {
            cbs.update[i](oldVnode, vnode);
          }
          if (isDef(i = data.hook) && isDef(i = i.update)) {
            i(oldVnode, vnode);
          }
        }
        if (isUndef(vnode.text)) {
          if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) {
              updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
            }
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) {
              nodeOps.setTextContent(elm, '');
            }
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
          } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
          } else if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '');
          }
        } else if (oldVnode.text !== vnode.text) {
          nodeOps.setTextContent(elm, vnode.text);
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
            i(oldVnode, vnode);
          }
        }
      }

      function invokeInsertHook(vnode, queue, initial) {
        if (isTrue(initial) && isDef(vnode.parent)) {
          vnode.parent.data.pendingInsert = queue;
        } else {
          for (var i = 0; i < queue.length; ++i) {
            queue[i].data.hook.insert(queue[i]);
          }
        }
      }

      var bailed = false;

      var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

      function hydrate(elm, vnode, insertedVnodeQueue) {
        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
          vnode.elm = elm;
          vnode.isAsyncPlaceholder = true;
          return true;
        }
        if (true) {
          if (!assertNodeMatch(elm, vnode)) {
            return false;
          }
        }
        vnode.elm = elm;
        var tag = vnode.tag;
        var data = vnode.data;
        var children = vnode.children;
        if (isDef(data)) {
          if (isDef(i = data.hook) && isDef(i = i.init)) {
            i(vnode, true);
          }
          if (isDef(i = vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue);
            return true;
          }
        }
        if (isDef(tag)) {
          if (isDef(children)) {
            if (!elm.hasChildNodes()) {
              createChildren(vnode, children, insertedVnodeQueue);
            } else {
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                  childrenMatch = false;
                  break;
                }
                childNode = childNode.nextSibling;
              }

              if (!childrenMatch || childNode) {
                if ("dev" !== 'production' && typeof console !== 'undefined' && !bailed) {
                  bailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                }
                return false;
              }
            }
          }
          if (isDef(data)) {
            for (var key in data) {
              if (!isRenderedModule(key)) {
                invokeCreateHooks(vnode, insertedVnodeQueue);
                break;
              }
            }
          }
        } else if (elm.data !== vnode.text) {
          elm.data = vnode.text;
        }
        return true;
      }

      function assertNodeMatch(node, vnode) {
        if (isDef(vnode.tag)) {
          return vnode.tag.indexOf('vue-component') === 0 || vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
        } else {
          return node.nodeType === (vnode.isComment ? 8 : 3);
        }
      }

      return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
        if (isUndef(vnode)) {
          if (isDef(oldVnode)) {
            invokeDestroyHook(oldVnode);
          }
          return;
        }

        var isInitialPatch = false;
        var insertedVnodeQueue = [];

        if (isUndef(oldVnode)) {
          isInitialPatch = true;
          createElm(vnode, insertedVnodeQueue, parentElm, refElm);
        } else {
          var isRealElement = isDef(oldVnode.nodeType);
          if (!isRealElement && sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
          } else {
            if (isRealElement) {
              if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                oldVnode.removeAttribute(SSR_ATTR);
                hydrating = true;
              }
              if (isTrue(hydrating)) {
                if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                  invokeInsertHook(vnode, insertedVnodeQueue, true);
                  return oldVnode;
                } else if (true) {
                  warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
                }
              }

              oldVnode = emptyNodeAt(oldVnode);
            }

            var oldElm = oldVnode.elm;
            var parentElm$1 = nodeOps.parentNode(oldElm);
            createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

            if (isDef(vnode.parent)) {
              var ancestor = vnode.parent;
              while (ancestor) {
                ancestor.elm = vnode.elm;
                ancestor = ancestor.parent;
              }
              if (isPatchable(vnode)) {
                for (var i = 0; i < cbs.create.length; ++i) {
                  cbs.create[i](emptyNode, vnode.parent);
                }
              }
            }

            if (isDef(parentElm$1)) {
              removeVnodes(parentElm$1, [oldVnode], 0, 0);
            } else if (isDef(oldVnode.tag)) {
              invokeDestroyHook(oldVnode);
            }
          }
        }

        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm;
      };
    }

    var directives = {
      create: updateDirectives,
      update: updateDirectives,
      destroy: function unbindDirectives(vnode) {
        updateDirectives(vnode, emptyNode);
      }
    };

    function updateDirectives(oldVnode, vnode) {
      if (oldVnode.data.directives || vnode.data.directives) {
        _update(oldVnode, vnode);
      }
    }

    function _update(oldVnode, vnode) {
      var isCreate = oldVnode === emptyNode;
      var isDestroy = vnode === emptyNode;
      var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
      var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

      var dirsWithInsert = [];
      var dirsWithPostpatch = [];

      var key, oldDir, dir;
      for (key in newDirs) {
        oldDir = oldDirs[key];
        dir = newDirs[key];
        if (!oldDir) {
          callHook$1(dir, 'bind', vnode, oldVnode);
          if (dir.def && dir.def.inserted) {
            dirsWithInsert.push(dir);
          }
        } else {
          dir.oldValue = oldDir.value;
          callHook$1(dir, 'update', vnode, oldVnode);
          if (dir.def && dir.def.componentUpdated) {
            dirsWithPostpatch.push(dir);
          }
        }
      }

      if (dirsWithInsert.length) {
        var callInsert = function callInsert() {
          for (var i = 0; i < dirsWithInsert.length; i++) {
            callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
          }
        };
        if (isCreate) {
          mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
        } else {
          callInsert();
        }
      }

      if (dirsWithPostpatch.length) {
        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
          for (var i = 0; i < dirsWithPostpatch.length; i++) {
            callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
          }
        });
      }

      if (!isCreate) {
        for (key in oldDirs) {
          if (!newDirs[key]) {
            callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
          }
        }
      }
    }

    var emptyModifiers = (0, _create2.default)(null);

    function normalizeDirectives$1(dirs, vm) {
      var res = (0, _create2.default)(null);
      if (!dirs) {
        return res;
      }
      var i, dir;
      for (i = 0; i < dirs.length; i++) {
        dir = dirs[i];
        if (!dir.modifiers) {
          dir.modifiers = emptyModifiers;
        }
        res[getRawDirName(dir)] = dir;
        dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
      }
      return res;
    }

    function getRawDirName(dir) {
      return dir.rawName || dir.name + "." + (0, _keys2.default)(dir.modifiers || {}).join('.');
    }

    function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
      var fn = dir.def && dir.def[hook];
      if (fn) {
        try {
          fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
        } catch (e) {
          handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
        }
      }
    }

    var baseModules = [ref, directives];

    function updateAttrs(oldVnode, vnode) {
      var opts = vnode.componentOptions;
      if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
        return;
      }
      if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
        return;
      }
      var key, cur, old;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs || {};
      var attrs = vnode.data.attrs || {};

      if (isDef(attrs.__ob__)) {
        attrs = vnode.data.attrs = extend({}, attrs);
      }

      for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
          setAttr(elm, key, cur);
        }
      }

      if (isIE9 && attrs.value !== oldAttrs.value) {
        setAttr(elm, 'value', attrs.value);
      }
      for (key in oldAttrs) {
        if (isUndef(attrs[key])) {
          if (isXlink(key)) {
            elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
          } else if (!isEnumeratedAttr(key)) {
            elm.removeAttribute(key);
          }
        }
      }
    }

    function setAttr(el, key, value) {
      if (isBooleanAttr(key)) {
        if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
        } else {
          el.setAttribute(key, key);
        }
      } else if (isEnumeratedAttr(key)) {
        el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
      } else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
          el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else {
          el.setAttributeNS(xlinkNS, key, value);
        }
      } else {
        if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
        } else {
          el.setAttribute(key, value);
        }
      }
    }

    var attrs = {
      create: updateAttrs,
      update: updateAttrs
    };

    function updateClass(oldVnode, vnode) {
      var el = vnode.elm;
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
        return;
      }

      var cls = genClassForVnode(vnode);

      var transitionClass = el._transitionClasses;
      if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
      }

      if (cls !== el._prevClass) {
        el.setAttribute('class', cls);
        el._prevClass = cls;
      }
    }

    var klass = {
      create: updateClass,
      update: updateClass
    };

    var validDivisionCharRE = /[\w).+\-_$\]]/;

    function parseFilters(exp) {
      var inSingle = false;
      var inDouble = false;
      var inTemplateString = false;
      var inRegex = false;
      var curly = 0;
      var square = 0;
      var paren = 0;
      var lastFilterIndex = 0;
      var c, prev, i, expression, filters;

      for (i = 0; i < exp.length; i++) {
        prev = c;
        c = exp.charCodeAt(i);
        if (inSingle) {
          if (c === 0x27 && prev !== 0x5C) {
            inSingle = false;
          }
        } else if (inDouble) {
          if (c === 0x22 && prev !== 0x5C) {
            inDouble = false;
          }
        } else if (inTemplateString) {
          if (c === 0x60 && prev !== 0x5C) {
            inTemplateString = false;
          }
        } else if (inRegex) {
          if (c === 0x2f && prev !== 0x5C) {
            inRegex = false;
          }
        } else if (c === 0x7C && exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
          if (expression === undefined) {
            lastFilterIndex = i + 1;
            expression = exp.slice(0, i).trim();
          } else {
            pushFilter();
          }
        } else {
          switch (c) {
            case 0x22:
              inDouble = true;break;
            case 0x27:
              inSingle = true;break;
            case 0x60:
              inTemplateString = true;break;
            case 0x28:
              paren++;break;
            case 0x29:
              paren--;break;
            case 0x5B:
              square++;break;
            case 0x5D:
              square--;break;
            case 0x7B:
              curly++;break;
            case 0x7D:
              curly--;break;}
          if (c === 0x2f) {
            var j = i - 1;
            var p = void 0;

            for (; j >= 0; j--) {
              p = exp.charAt(j);
              if (p !== ' ') {
                break;
              }
            }
            if (!p || !validDivisionCharRE.test(p)) {
              inRegex = true;
            }
          }
        }
      }

      if (expression === undefined) {
        expression = exp.slice(0, i).trim();
      } else if (lastFilterIndex !== 0) {
        pushFilter();
      }

      function pushFilter() {
        (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
        lastFilterIndex = i + 1;
      }

      if (filters) {
        for (i = 0; i < filters.length; i++) {
          expression = wrapFilter(expression, filters[i]);
        }
      }

      return expression;
    }

    function wrapFilter(exp, filter) {
      var i = filter.indexOf('(');
      if (i < 0) {
        return "_f(\"" + filter + "\")(" + exp + ")";
      } else {
        var name = filter.slice(0, i);
        var args = filter.slice(i + 1);
        return "_f(\"" + name + "\")(" + exp + "," + args;
      }
    }

    function baseWarn(msg) {
      console.error("[Vue compiler]: " + msg);
    }

    function pluckModuleFunction(modules, key) {
      return modules ? modules.map(function (m) {
        return m[key];
      }).filter(function (_) {
        return _;
      }) : [];
    }

    function addProp(el, name, value) {
      (el.props || (el.props = [])).push({ name: name, value: value });
    }

    function addAttr(el, name, value) {
      (el.attrs || (el.attrs = [])).push({ name: name, value: value });
    }

    function addDirective(el, name, rawName, value, arg, modifiers) {
      (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
    }

    function addHandler(el, name, value, modifiers, important, warn) {
      if ("dev" !== 'production' && warn && modifiers && modifiers.prevent && modifiers.passive) {
        warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.');
      }

      if (modifiers && modifiers.capture) {
        delete modifiers.capture;
        name = '!' + name;
      }
      if (modifiers && modifiers.once) {
        delete modifiers.once;
        name = '~' + name;
      }

      if (modifiers && modifiers.passive) {
        delete modifiers.passive;
        name = '&' + name;
      }
      var events;
      if (modifiers && modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
      } else {
        events = el.events || (el.events = {});
      }
      var newHandler = { value: value, modifiers: modifiers };
      var handlers = events[name];

      if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler);
      } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
      } else {
        events[name] = newHandler;
      }
    }

    function getBindingAttr(el, name, getStatic) {
      var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
      if (dynamicValue != null) {
        return parseFilters(dynamicValue);
      } else if (getStatic !== false) {
        var staticValue = getAndRemoveAttr(el, name);
        if (staticValue != null) {
          return (0, _stringify2.default)(staticValue);
        }
      }
    }

    function getAndRemoveAttr(el, name) {
      var val;
      if ((val = el.attrsMap[name]) != null) {
        var list = el.attrsList;
        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i].name === name) {
            list.splice(i, 1);
            break;
          }
        }
      }
      return val;
    }

    function genComponentModel(el, value, modifiers) {
      var ref = modifiers || {};
      var number = ref.number;
      var trim = ref.trim;

      var baseValueExpression = '$$v';
      var valueExpression = baseValueExpression;
      if (trim) {
        valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
      }
      if (number) {
        valueExpression = "_n(" + valueExpression + ")";
      }
      var assignment = genAssignmentCode(value, valueExpression);

      el.model = {
        value: "(" + value + ")",
        expression: "\"" + value + "\"",
        callback: "function (" + baseValueExpression + ") {" + assignment + "}"
      };
    }

    function genAssignmentCode(value, assignment) {
      var modelRs = parseModel(value);
      if (modelRs.idx === null) {
        return value + "=" + assignment;
      } else {
        return "$set(" + modelRs.exp + ", " + modelRs.idx + ", " + assignment + ")";
      }
    }

    var len;
    var str;
    var chr;
    var index$1;
    var expressionPos;
    var expressionEndPos;

    function parseModel(val) {
      str = val;
      len = str.length;
      index$1 = expressionPos = expressionEndPos = 0;

      if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
        return {
          exp: val,
          idx: null
        };
      }

      while (!eof()) {
        chr = next();

        if (isStringStart(chr)) {
          parseString(chr);
        } else if (chr === 0x5B) {
          parseBracket(chr);
        }
      }

      return {
        exp: val.substring(0, expressionPos),
        idx: val.substring(expressionPos + 1, expressionEndPos)
      };
    }

    function next() {
      return str.charCodeAt(++index$1);
    }

    function eof() {
      return index$1 >= len;
    }

    function isStringStart(chr) {
      return chr === 0x22 || chr === 0x27;
    }

    function parseBracket(chr) {
      var inBracket = 1;
      expressionPos = index$1;
      while (!eof()) {
        chr = next();
        if (isStringStart(chr)) {
          parseString(chr);
          continue;
        }
        if (chr === 0x5B) {
          inBracket++;
        }
        if (chr === 0x5D) {
          inBracket--;
        }
        if (inBracket === 0) {
          expressionEndPos = index$1;
          break;
        }
      }
    }

    function parseString(chr) {
      var stringQuote = chr;
      while (!eof()) {
        chr = next();
        if (chr === stringQuote) {
          break;
        }
      }
    }

    var warn$1;

    var RANGE_TOKEN = '__r';
    var CHECKBOX_RADIO_TOKEN = '__c';

    function model(el, dir, _warn) {
      warn$1 = _warn;
      var value = dir.value;
      var modifiers = dir.modifiers;
      var tag = el.tag;
      var type = el.attrsMap.type;

      if (true) {
        var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
        if (tag === 'input' && dynamicType) {
          warn$1("<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" + "v-model does not support dynamic input types. Use v-if branches instead.");
        }

        if (tag === 'input' && type === 'file') {
          warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.");
        }
      }

      if (el.component) {
        genComponentModel(el, value, modifiers);

        return false;
      } else if (tag === 'select') {
        genSelect(el, value, modifiers);
      } else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
      } else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
      } else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
      } else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers);

        return false;
      } else if (true) {
        warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.');
      }

      return true;
    }

    function genCheckboxModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
      var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
      addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
      addHandler(el, CHECKBOX_RADIO_TOKEN, "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + value + "=$$a.concat($$v))}" + "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" + "}else{" + genAssignmentCode(value, '$$c') + "}", null, true);
    }

    function genRadioModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
      addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
      addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
    }

    function genSelect(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";

      var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
      var code = "var $$selectedVal = " + selectedVal + ";";
      code = code + " " + genAssignmentCode(value, assignment);
      addHandler(el, 'change', code, null, true);
    }

    function genDefaultModel(el, value, modifiers) {
      var type = el.attrsMap.type;
      var ref = modifiers || {};
      var lazy = ref.lazy;
      var number = ref.number;
      var trim = ref.trim;
      var needCompositionGuard = !lazy && type !== 'range';
      var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';

      var valueExpression = '$event.target.value';
      if (trim) {
        valueExpression = "$event.target.value.trim()";
      }
      if (number) {
        valueExpression = "_n(" + valueExpression + ")";
      }

      var code = genAssignmentCode(value, valueExpression);
      if (needCompositionGuard) {
        code = "if($event.target.composing)return;" + code;
      }

      addProp(el, 'value', "(" + value + ")");
      addHandler(el, event, code, null, true);
      if (trim || number) {
        addHandler(el, 'blur', '$forceUpdate()');
      }
    }

    function normalizeEvents(on) {
      var event;

      if (isDef(on[RANGE_TOKEN])) {
        event = isIE ? 'change' : 'input';
        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
        delete on[RANGE_TOKEN];
      }
      if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        event = isChrome ? 'click' : 'change';
        on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
        delete on[CHECKBOX_RADIO_TOKEN];
      }
    }

    var target$1;

    function add$1(event, _handler, once$$1, capture, passive) {
      if (once$$1) {
        var oldHandler = _handler;
        var _target = target$1;
        _handler = function handler(ev) {
          var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
          if (res !== null) {
            remove$2(event, _handler, capture, _target);
          }
        };
      }
      target$1.addEventListener(event, _handler, supportsPassive ? { capture: capture, passive: passive } : capture);
    }

    function remove$2(event, handler, capture, _target) {
      (_target || target$1).removeEventListener(event, handler, capture);
    }

    function updateDOMListeners(oldVnode, vnode) {
      if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
        return;
      }
      var on = vnode.data.on || {};
      var oldOn = oldVnode.data.on || {};
      target$1 = vnode.elm;
      normalizeEvents(on);
      updateListeners(on, oldOn, add$1, remove$2, vnode.context);
    }

    var events = {
      create: updateDOMListeners,
      update: updateDOMListeners
    };

    function updateDOMProps(oldVnode, vnode) {
      if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
        return;
      }
      var key, cur;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {};

      if (isDef(props.__ob__)) {
        props = vnode.data.domProps = extend({}, props);
      }

      for (key in oldProps) {
        if (isUndef(props[key])) {
          elm[key] = '';
        }
      }
      for (key in props) {
        cur = props[key];

        if (key === 'textContent' || key === 'innerHTML') {
          if (vnode.children) {
            vnode.children.length = 0;
          }
          if (cur === oldProps[key]) {
            continue;
          }
        }

        if (key === 'value') {
          elm._value = cur;

          var strCur = isUndef(cur) ? '' : String(cur);
          if (shouldUpdateValue(elm, vnode, strCur)) {
            elm.value = strCur;
          }
        } else {
          elm[key] = cur;
        }
      }
    }

    function shouldUpdateValue(elm, vnode, checkVal) {
      return !elm.composing && (vnode.tag === 'option' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
    }

    function isDirty(elm, checkVal) {
      var notInFocus = true;

      try {
        notInFocus = document.activeElement !== elm;
      } catch (e) {}
      return notInFocus && elm.value !== checkVal;
    }

    function isInputChanged(elm, newVal) {
      var value = elm.value;
      var modifiers = elm._vModifiers;
      if (isDef(modifiers) && modifiers.number) {
        return toNumber(value) !== toNumber(newVal);
      }
      if (isDef(modifiers) && modifiers.trim) {
        return value.trim() !== newVal.trim();
      }
      return value !== newVal;
    }

    var domProps = {
      create: updateDOMProps,
      update: updateDOMProps
    };

    var parseStyleText = cached(function (cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
          var tmp = item.split(propertyDelimiter);
          tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return res;
    });

    function normalizeStyleData(data) {
      var style = normalizeStyleBinding(data.style);

      return data.staticStyle ? extend(data.staticStyle, style) : style;
    }

    function normalizeStyleBinding(bindingStyle) {
      if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
      }
      if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
      }
      return bindingStyle;
    }

    function getStyle(vnode, checkChild) {
      var res = {};
      var styleData;

      if (checkChild) {
        var childNode = vnode;
        while (childNode.componentInstance) {
          childNode = childNode.componentInstance._vnode;
          if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
            extend(res, styleData);
          }
        }
      }

      if (styleData = normalizeStyleData(vnode.data)) {
        extend(res, styleData);
      }

      var parentNode = vnode;
      while (parentNode = parentNode.parent) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
          extend(res, styleData);
        }
      }
      return res;
    }

    var cssVarRE = /^--/;
    var importantRE = /\s*!important$/;
    var setProp = function setProp(el, name, val) {
      if (cssVarRE.test(name)) {
        el.style.setProperty(name, val);
      } else if (importantRE.test(val)) {
        el.style.setProperty(name, val.replace(importantRE, ''), 'important');
      } else {
        var normalizedName = normalize(name);
        if (Array.isArray(val)) {
          for (var i = 0, len = val.length; i < len; i++) {
            el.style[normalizedName] = val[i];
          }
        } else {
          el.style[normalizedName] = val;
        }
      }
    };

    var vendorNames = ['Webkit', 'Moz', 'ms'];

    var emptyStyle;
    var normalize = cached(function (prop) {
      emptyStyle = emptyStyle || document.createElement('div').style;
      prop = camelize(prop);
      if (prop !== 'filter' && prop in emptyStyle) {
        return prop;
      }
      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = 0; i < vendorNames.length; i++) {
        var name = vendorNames[i] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    });

    function updateStyle(oldVnode, vnode) {
      var data = vnode.data;
      var oldData = oldVnode.data;

      if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
        return;
      }

      var cur, name;
      var el = vnode.elm;
      var oldStaticStyle = oldData.staticStyle;
      var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

      var oldStyle = oldStaticStyle || oldStyleBinding;

      var style = normalizeStyleBinding(vnode.data.style) || {};

      vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

      var newStyle = getStyle(vnode, true);

      for (name in oldStyle) {
        if (isUndef(newStyle[name])) {
          setProp(el, name, '');
        }
      }
      for (name in newStyle) {
        cur = newStyle[name];
        if (cur !== oldStyle[name]) {
          setProp(el, name, cur == null ? '' : cur);
        }
      }
    }

    var style = {
      create: updateStyle,
      update: updateStyle
    };

    function addClass(el, cls) {
      if (!cls || !(cls = cls.trim())) {
        return;
      }

      if (el.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (c) {
            return el.classList.add(c);
          });
        } else {
          el.classList.add(cls);
        }
      } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        if (cur.indexOf(' ' + cls + ' ') < 0) {
          el.setAttribute('class', (cur + cls).trim());
        }
      }
    }

    function removeClass(el, cls) {
      if (!cls || !(cls = cls.trim())) {
        return;
      }

      if (el.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(/\s+/).forEach(function (c) {
            return el.classList.remove(c);
          });
        } else {
          el.classList.remove(cls);
        }
        if (!el.classList.length) {
          el.removeAttribute('class');
        }
      } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        var tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
          cur = cur.replace(tar, ' ');
        }
        cur = cur.trim();
        if (cur) {
          el.setAttribute('class', cur);
        } else {
          el.removeAttribute('class');
        }
      }
    }

    function resolveTransition(def$$1) {
      if (!def$$1) {
        return;
      }

      if ((typeof def$$1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(def$$1)) === 'object') {
        var res = {};
        if (def$$1.css !== false) {
          extend(res, autoCssTransition(def$$1.name || 'v'));
        }
        extend(res, def$$1);
        return res;
      } else if (typeof def$$1 === 'string') {
        return autoCssTransition(def$$1);
      }
    }

    var autoCssTransition = cached(function (name) {
      return {
        enterClass: name + "-enter",
        enterToClass: name + "-enter-to",
        enterActiveClass: name + "-enter-active",
        leaveClass: name + "-leave",
        leaveToClass: name + "-leave-to",
        leaveActiveClass: name + "-leave-active"
      };
    });

    var hasTransition = inBrowser && !isIE9;
    var TRANSITION = 'transition';
    var ANIMATION = 'animation';

    var transitionProp = 'transition';
    var transitionEndEvent = 'transitionend';
    var animationProp = 'animation';
    var animationEndEvent = 'animationend';
    if (hasTransition) {
      if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
        transitionProp = 'WebkitTransition';
        transitionEndEvent = 'webkitTransitionEnd';
      }
      if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
        animationProp = 'WebkitAnimation';
        animationEndEvent = 'webkitAnimationEnd';
      }
    }

    var raf = inBrowser && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout;

    function nextFrame(fn) {
      raf(function () {
        raf(fn);
      });
    }

    function addTransitionClass(el, cls) {
      var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
      if (transitionClasses.indexOf(cls) < 0) {
        transitionClasses.push(cls);
        addClass(el, cls);
      }
    }

    function removeTransitionClass(el, cls) {
      if (el._transitionClasses) {
        remove(el._transitionClasses, cls);
      }
      removeClass(el, cls);
    }

    function whenTransitionEnds(el, expectedType, cb) {
      var ref = getTransitionInfo(el, expectedType);
      var type = ref.type;
      var timeout = ref.timeout;
      var propCount = ref.propCount;
      if (!type) {
        return cb();
      }
      var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function end() {
        el.removeEventListener(event, onEnd);
        cb();
      };
      var onEnd = function onEnd(e) {
        if (e.target === el) {
          if (++ended >= propCount) {
            end();
          }
        }
      };
      setTimeout(function () {
        if (ended < propCount) {
          end();
        }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
    }

    var transformRE = /\b(transform|all)(,|$)/;

    function getTransitionInfo(el, expectedType) {
      var styles = window.getComputedStyle(el);
      var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
      var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
      var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      var animationDelays = styles[animationProp + 'Delay'].split(', ');
      var animationDurations = styles[animationProp + 'Duration'].split(', ');
      var animationTimeout = getTimeout(animationDelays, animationDurations);

      var type;
      var timeout = 0;
      var propCount = 0;

      if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
          type = TRANSITION;
          timeout = transitionTimeout;
          propCount = transitionDurations.length;
        }
      } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
          type = ANIMATION;
          timeout = animationTimeout;
          propCount = animationDurations.length;
        }
      } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
        propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
      }
      var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
      return {
        type: type,
        timeout: timeout,
        propCount: propCount,
        hasTransform: hasTransform
      };
    }

    function getTimeout(delays, durations) {
      while (delays.length < durations.length) {
        delays = delays.concat(delays);
      }

      return Math.max.apply(null, durations.map(function (d, i) {
        return toMs(d) + toMs(delays[i]);
      }));
    }

    function toMs(s) {
      return Number(s.slice(0, -1)) * 1000;
    }

    function enter(vnode, toggleDisplay) {
      var el = vnode.elm;

      if (isDef(el._leaveCb)) {
        el._leaveCb.cancelled = true;
        el._leaveCb();
      }

      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
        return;
      }

      if (isDef(el._enterCb) || el.nodeType !== 1) {
        return;
      }

      var css = data.css;
      var type = data.type;
      var enterClass = data.enterClass;
      var enterToClass = data.enterToClass;
      var enterActiveClass = data.enterActiveClass;
      var appearClass = data.appearClass;
      var appearToClass = data.appearToClass;
      var appearActiveClass = data.appearActiveClass;
      var beforeEnter = data.beforeEnter;
      var enter = data.enter;
      var afterEnter = data.afterEnter;
      var enterCancelled = data.enterCancelled;
      var beforeAppear = data.beforeAppear;
      var appear = data.appear;
      var afterAppear = data.afterAppear;
      var appearCancelled = data.appearCancelled;
      var duration = data.duration;

      var context = activeInstance;
      var transitionNode = activeInstance.$vnode;
      while (transitionNode && transitionNode.parent) {
        transitionNode = transitionNode.parent;
        context = transitionNode.context;
      }

      var isAppear = !context._isMounted || !vnode.isRootInsert;

      if (isAppear && !appear && appear !== '') {
        return;
      }

      var startClass = isAppear && appearClass ? appearClass : enterClass;
      var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
      var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

      var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
      var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
      var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
      var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

      var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

      if ("dev" !== 'production' && explicitEnterDuration != null) {
        checkDuration(explicitEnterDuration, 'enter', vnode);
      }

      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(enterHook);

      var cb = el._enterCb = once(function () {
        if (expectsCSS) {
          removeTransitionClass(el, toClass);
          removeTransitionClass(el, activeClass);
        }
        if (cb.cancelled) {
          if (expectsCSS) {
            removeTransitionClass(el, startClass);
          }
          enterCancelledHook && enterCancelledHook(el);
        } else {
          afterEnterHook && afterEnterHook(el);
        }
        el._enterCb = null;
      });

      if (!vnode.data.show) {
        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
          var parent = el.parentNode;
          var pendingNode = parent && parent._pending && parent._pending[vnode.key];
          if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
            pendingNode.elm._leaveCb();
          }
          enterHook && enterHook(el, cb);
        });
      }

      beforeEnterHook && beforeEnterHook(el);
      if (expectsCSS) {
        addTransitionClass(el, startClass);
        addTransitionClass(el, activeClass);
        nextFrame(function () {
          addTransitionClass(el, toClass);
          removeTransitionClass(el, startClass);
          if (!cb.cancelled && !userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        });
      }

      if (vnode.data.show) {
        toggleDisplay && toggleDisplay();
        enterHook && enterHook(el, cb);
      }

      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }

    function leave(vnode, rm) {
      var el = vnode.elm;

      if (isDef(el._enterCb)) {
        el._enterCb.cancelled = true;
        el._enterCb();
      }

      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
        return rm();
      }

      if (isDef(el._leaveCb) || el.nodeType !== 1) {
        return;
      }

      var css = data.css;
      var type = data.type;
      var leaveClass = data.leaveClass;
      var leaveToClass = data.leaveToClass;
      var leaveActiveClass = data.leaveActiveClass;
      var beforeLeave = data.beforeLeave;
      var leave = data.leave;
      var afterLeave = data.afterLeave;
      var leaveCancelled = data.leaveCancelled;
      var delayLeave = data.delayLeave;
      var duration = data.duration;

      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(leave);

      var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

      if ("dev" !== 'production' && isDef(explicitLeaveDuration)) {
        checkDuration(explicitLeaveDuration, 'leave', vnode);
      }

      var cb = el._leaveCb = once(function () {
        if (el.parentNode && el.parentNode._pending) {
          el.parentNode._pending[vnode.key] = null;
        }
        if (expectsCSS) {
          removeTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveActiveClass);
        }
        if (cb.cancelled) {
          if (expectsCSS) {
            removeTransitionClass(el, leaveClass);
          }
          leaveCancelled && leaveCancelled(el);
        } else {
          rm();
          afterLeave && afterLeave(el);
        }
        el._leaveCb = null;
      });

      if (delayLeave) {
        delayLeave(performLeave);
      } else {
        performLeave();
      }

      function performLeave() {
        if (cb.cancelled) {
          return;
        }

        if (!vnode.data.show) {
          (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
        }
        beforeLeave && beforeLeave(el);
        if (expectsCSS) {
          addTransitionClass(el, leaveClass);
          addTransitionClass(el, leaveActiveClass);
          nextFrame(function () {
            addTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveClass);
            if (!cb.cancelled && !userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          });
        }
        leave && leave(el, cb);
        if (!expectsCSS && !userWantsControl) {
          cb();
        }
      }
    }

    function checkDuration(val, name, vnode) {
      if (typeof val !== 'number') {
        warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + (0, _stringify2.default)(val) + ".", vnode.context);
      } else if (isNaN(val)) {
        warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
      }
    }

    function isValidDuration(val) {
      return typeof val === 'number' && !isNaN(val);
    }

    function getHookArgumentsLength(fn) {
      if (isUndef(fn)) {
        return false;
      }
      var invokerFns = fn.fns;
      if (isDef(invokerFns)) {
        return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
      } else {
        return (fn._length || fn.length) > 1;
      }
    }

    function _enter(_, vnode) {
      if (vnode.data.show !== true) {
        enter(vnode);
      }
    }

    var transition = inBrowser ? {
      create: _enter,
      activate: _enter,
      remove: function remove$$1(vnode, rm) {
        if (vnode.data.show !== true) {
          leave(vnode, rm);
        } else {
          rm();
        }
      }
    } : {};

    var platformModules = [attrs, klass, events, domProps, style, transition];

    var modules = platformModules.concat(baseModules);

    var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

    var isTextInputType = makeMap('text,number,password,search,email,tel,url');

    if (isIE9) {
      document.addEventListener('selectionchange', function () {
        var el = document.activeElement;
        if (el && el.vmodel) {
          trigger(el, 'input');
        }
      });
    }

    var model$1 = {
      inserted: function inserted(el, binding, vnode) {
        if (vnode.tag === 'select') {
          var cb = function cb() {
            setSelected(el, binding, vnode.context);
          };
          cb();

          if (isIE || isEdge) {
            setTimeout(cb, 0);
          }
          el._vOptions = [].map.call(el.options, getValue);
        } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
          el._vModifiers = binding.modifiers;
          if (!binding.modifiers.lazy) {
            el.addEventListener('change', onCompositionEnd);
            if (!isAndroid) {
              el.addEventListener('compositionstart', onCompositionStart);
              el.addEventListener('compositionend', onCompositionEnd);
            }

            if (isIE9) {
              el.vmodel = true;
            }
          }
        }
      },
      componentUpdated: function componentUpdated(el, binding, vnode) {
        if (vnode.tag === 'select') {
          setSelected(el, binding, vnode.context);

          var prevOptions = el._vOptions;
          var curOptions = el._vOptions = [].map.call(el.options, getValue);
          if (curOptions.some(function (o, i) {
            return !looseEqual(o, prevOptions[i]);
          })) {
            trigger(el, 'change');
          }
        }
      }
    };

    function setSelected(el, binding, vm) {
      var value = binding.value;
      var isMultiple = el.multiple;
      if (isMultiple && !Array.isArray(value)) {
        "dev" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
        return;
      }
      var selected, option;
      for (var i = 0, l = el.options.length; i < l; i++) {
        option = el.options[i];
        if (isMultiple) {
          selected = looseIndexOf(value, getValue(option)) > -1;
          if (option.selected !== selected) {
            option.selected = selected;
          }
        } else {
          if (looseEqual(getValue(option), value)) {
            if (el.selectedIndex !== i) {
              el.selectedIndex = i;
            }
            return;
          }
        }
      }
      if (!isMultiple) {
        el.selectedIndex = -1;
      }
    }

    function getValue(option) {
      return '_value' in option ? option._value : option.value;
    }

    function onCompositionStart(e) {
      e.target.composing = true;
    }

    function onCompositionEnd(e) {
      if (!e.target.composing) {
        return;
      }
      e.target.composing = false;
      trigger(e.target, 'input');
    }

    function trigger(el, type) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, true, true);
      el.dispatchEvent(e);
    }

    function locateNode(vnode) {
      return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
    }

    var show = {
      bind: function bind(el, ref, vnode) {
        var value = ref.value;

        vnode = locateNode(vnode);
        var transition$$1 = vnode.data && vnode.data.transition;
        var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
        if (value && transition$$1) {
          vnode.data.show = true;
          enter(vnode, function () {
            el.style.display = originalDisplay;
          });
        } else {
          el.style.display = value ? originalDisplay : 'none';
        }
      },

      update: function update(el, ref, vnode) {
        var value = ref.value;
        var oldValue = ref.oldValue;

        if (value === oldValue) {
          return;
        }
        vnode = locateNode(vnode);
        var transition$$1 = vnode.data && vnode.data.transition;
        if (transition$$1) {
          vnode.data.show = true;
          if (value) {
            enter(vnode, function () {
              el.style.display = el.__vOriginalDisplay;
            });
          } else {
            leave(vnode, function () {
              el.style.display = 'none';
            });
          }
        } else {
          el.style.display = value ? el.__vOriginalDisplay : 'none';
        }
      },

      unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
        if (!isDestroy) {
          el.style.display = el.__vOriginalDisplay;
        }
      }
    };

    var platformDirectives = {
      model: model$1,
      show: show
    };

    var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
    };

    function getRealChild(vnode) {
      var compOptions = vnode && vnode.componentOptions;
      if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children));
      } else {
        return vnode;
      }
    }

    function extractTransitionData(comp) {
      var data = {};
      var options = comp.$options;

      for (var key in options.propsData) {
        data[key] = comp[key];
      }

      var listeners = options._parentListeners;
      for (var key$1 in listeners) {
        data[camelize(key$1)] = listeners[key$1];
      }
      return data;
    }

    function placeholder(h, rawChild) {
      if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
          props: rawChild.componentOptions.propsData
        });
      }
    }

    function hasParentTransition(vnode) {
      while (vnode = vnode.parent) {
        if (vnode.data.transition) {
          return true;
        }
      }
    }

    function isSameChild(child, oldChild) {
      return oldChild.key === child.key && oldChild.tag === child.tag;
    }

    function isAsyncPlaceholder(node) {
      return node.isComment && node.asyncFactory;
    }

    var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,

      render: function render(h) {
        var this$1 = this;

        var children = this.$options._renderChildren;
        if (!children) {
          return;
        }

        children = children.filter(function (c) {
          return c.tag || isAsyncPlaceholder(c);
        });

        if (!children.length) {
          return;
        }

        if ("dev" !== 'production' && children.length > 1) {
          warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
        }

        var mode = this.mode;

        if ("dev" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
          warn('invalid <transition> mode: ' + mode, this.$parent);
        }

        var rawChild = children[0];

        if (hasParentTransition(this.$vnode)) {
          return rawChild;
        }

        var child = getRealChild(rawChild);

        if (!child) {
          return rawChild;
        }

        if (this._leaving) {
          return placeholder(h, rawChild);
        }

        var id = "__transition-" + this._uid + "-";
        child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

        var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
        var oldRawChild = this._vnode;
        var oldChild = getRealChild(oldRawChild);

        if (child.data.directives && child.data.directives.some(function (d) {
          return d.name === 'show';
        })) {
          child.data.show = true;
        }

        if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild)) {
          var oldData = oldChild && (oldChild.data.transition = extend({}, data));

          if (mode === 'out-in') {
            this._leaving = true;
            mergeVNodeHook(oldData, 'afterLeave', function () {
              this$1._leaving = false;
              this$1.$forceUpdate();
            });
            return placeholder(h, rawChild);
          } else if (mode === 'in-out') {
            if (isAsyncPlaceholder(child)) {
              return oldRawChild;
            }
            var delayedLeave;
            var performLeave = function performLeave() {
              delayedLeave();
            };
            mergeVNodeHook(data, 'afterEnter', performLeave);
            mergeVNodeHook(data, 'enterCancelled', performLeave);
            mergeVNodeHook(oldData, 'delayLeave', function (leave) {
              delayedLeave = leave;
            });
          }
        }

        return rawChild;
      }
    };

    var props = extend({
      tag: String,
      moveClass: String
    }, transitionProps);

    delete props.mode;

    var TransitionGroup = {
      props: props,

      render: function render(h) {
        var tag = this.tag || this.$vnode.data.tag || 'span';
        var map = (0, _create2.default)(null);
        var prevChildren = this.prevChildren = this.children;
        var rawChildren = this.$slots.default || [];
        var children = this.children = [];
        var transitionData = extractTransitionData(this);

        for (var i = 0; i < rawChildren.length; i++) {
          var c = rawChildren[i];
          if (c.tag) {
            if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
              children.push(c);
              map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
            } else if (true) {
              var opts = c.componentOptions;
              var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
              warn("<transition-group> children must be keyed: <" + name + ">");
            }
          }
        }

        if (prevChildren) {
          var kept = [];
          var removed = [];
          for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
            var c$1 = prevChildren[i$1];
            c$1.data.transition = transitionData;
            c$1.data.pos = c$1.elm.getBoundingClientRect();
            if (map[c$1.key]) {
              kept.push(c$1);
            } else {
              removed.push(c$1);
            }
          }
          this.kept = h(tag, null, kept);
          this.removed = removed;
        }

        return h(tag, null, children);
      },

      beforeUpdate: function beforeUpdate() {
        this.__patch__(this._vnode, this.kept, false, true);
        this._vnode = this.kept;
      },

      updated: function updated() {
        var children = this.prevChildren;
        var moveClass = this.moveClass || (this.name || 'v') + '-move';
        if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
          return;
        }

        children.forEach(callPendingCbs);
        children.forEach(recordPosition);
        children.forEach(applyTranslation);

        var body = document.body;
        var f = body.offsetHeight;

        children.forEach(function (c) {
          if (c.data.moved) {
            var el = c.elm;
            var s = el.style;
            addTransitionClass(el, moveClass);
            s.transform = s.WebkitTransform = s.transitionDuration = '';
            el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
              if (!e || /transform$/.test(e.propertyName)) {
                el.removeEventListener(transitionEndEvent, cb);
                el._moveCb = null;
                removeTransitionClass(el, moveClass);
              }
            });
          }
        });
      },

      methods: {
        hasMove: function hasMove(el, moveClass) {
          if (!hasTransition) {
            return false;
          }

          if (this._hasMove) {
            return this._hasMove;
          }

          var clone = el.cloneNode();
          if (el._transitionClasses) {
            el._transitionClasses.forEach(function (cls) {
              removeClass(clone, cls);
            });
          }
          addClass(clone, moveClass);
          clone.style.display = 'none';
          this.$el.appendChild(clone);
          var info = getTransitionInfo(clone);
          this.$el.removeChild(clone);
          return this._hasMove = info.hasTransform;
        }
      }
    };

    function callPendingCbs(c) {
      if (c.elm._moveCb) {
        c.elm._moveCb();
      }

      if (c.elm._enterCb) {
        c.elm._enterCb();
      }
    }

    function recordPosition(c) {
      c.data.newPos = c.elm.getBoundingClientRect();
    }

    function applyTranslation(c) {
      var oldPos = c.data.pos;
      var newPos = c.data.newPos;
      var dx = oldPos.left - newPos.left;
      var dy = oldPos.top - newPos.top;
      if (dx || dy) {
        c.data.moved = true;
        var s = c.elm.style;
        s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
        s.transitionDuration = '0s';
      }
    }

    var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
    };

    Vue$3.config.mustUseProp = mustUseProp;
    Vue$3.config.isReservedTag = isReservedTag;
    Vue$3.config.isReservedAttr = isReservedAttr;
    Vue$3.config.getTagNamespace = getTagNamespace;
    Vue$3.config.isUnknownElement = isUnknownElement;

    extend(Vue$3.options.directives, platformDirectives);
    extend(Vue$3.options.components, platformComponents);

    Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

    Vue$3.prototype.$mount = function (el, hydrating) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating);
    };

    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue$3);
        } else if ("dev" !== 'production' && isChrome) {
          console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
        }
      }
      if ("dev" !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
        console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
      }
    }, 0);

    function shouldDecode(content, encoded) {
      var div = document.createElement('div');
      div.innerHTML = "<div a=\"" + content + "\"/>";
      return div.innerHTML.indexOf(encoded) > 0;
    }

    var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

    var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
    var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

    var buildRegex = cached(function (delimiters) {
      var open = delimiters[0].replace(regexEscapeRE, '\\$&');
      var close = delimiters[1].replace(regexEscapeRE, '\\$&');
      return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
    });

    function parseText(text, delimiters) {
      var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
      if (!tagRE.test(text)) {
        return;
      }
      var tokens = [];
      var lastIndex = tagRE.lastIndex = 0;
      var match, index;
      while (match = tagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push((0, _stringify2.default)(text.slice(lastIndex, index)));
        }

        var exp = parseFilters(match[1].trim());
        tokens.push("_s(" + exp + ")");
        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        tokens.push((0, _stringify2.default)(text.slice(lastIndex)));
      }
      return tokens.join('+');
    }

    function transformNode(el, options) {
      var warn = options.warn || baseWarn;
      var staticClass = getAndRemoveAttr(el, 'class');
      if ("dev" !== 'production' && staticClass) {
        var expression = parseText(staticClass, options.delimiters);
        if (expression) {
          warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.');
        }
      }
      if (staticClass) {
        el.staticClass = (0, _stringify2.default)(staticClass);
      }
      var classBinding = getBindingAttr(el, 'class', false);
      if (classBinding) {
        el.classBinding = classBinding;
      }
    }

    function genData(el) {
      var data = '';
      if (el.staticClass) {
        data += "staticClass:" + el.staticClass + ",";
      }
      if (el.classBinding) {
        data += "class:" + el.classBinding + ",";
      }
      return data;
    }

    var klass$1 = {
      staticKeys: ['staticClass'],
      transformNode: transformNode,
      genData: genData
    };

    function transformNode$1(el, options) {
      var warn = options.warn || baseWarn;
      var staticStyle = getAndRemoveAttr(el, 'style');
      if (staticStyle) {
        if (true) {
          var expression = parseText(staticStyle, options.delimiters);
          if (expression) {
            warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.');
          }
        }
        el.staticStyle = (0, _stringify2.default)(parseStyleText(staticStyle));
      }

      var styleBinding = getBindingAttr(el, 'style', false);
      if (styleBinding) {
        el.styleBinding = styleBinding;
      }
    }

    function genData$1(el) {
      var data = '';
      if (el.staticStyle) {
        data += "staticStyle:" + el.staticStyle + ",";
      }
      if (el.styleBinding) {
        data += "style:(" + el.styleBinding + "),";
      }
      return data;
    }

    var style$1 = {
      staticKeys: ['staticStyle'],
      transformNode: transformNode$1,
      genData: genData$1
    };

    var modules$1 = [klass$1, style$1];

    function text(el, dir) {
      if (dir.value) {
        addProp(el, 'textContent', "_s(" + dir.value + ")");
      }
    }

    function html(el, dir) {
      if (dir.value) {
        addProp(el, 'innerHTML', "_s(" + dir.value + ")");
      }
    }

    var directives$1 = {
      model: model,
      text: text,
      html: html
    };

    var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');

    var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');

    var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');

    var baseOptions = {
      expectHTML: true,
      modules: modules$1,
      directives: directives$1,
      isPreTag: isPreTag,
      isUnaryTag: isUnaryTag,
      mustUseProp: mustUseProp,
      canBeLeftOpenTag: canBeLeftOpenTag,
      isReservedTag: isReservedTag,
      getTagNamespace: getTagNamespace,
      staticKeys: genStaticKeys(modules$1)
    };

    var decoder;

    var he = {
      decode: function decode(html) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = html;
        return decoder.textContent;
      }
    };

    var singleAttrIdentifier = /([^\s"'<>/=]+)/;
    var singleAttrAssign = /(?:=)/;
    var singleAttrValues = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^\s"'=<>`]+)/.source];
    var attribute = new RegExp('^\\s*' + singleAttrIdentifier.source + '(?:\\s*(' + singleAttrAssign.source + ')' + '\\s*(?:' + singleAttrValues.join('|') + '))?');

    var ncname = '[a-zA-Z_][\\w\\-\\.]*';
    var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
    var startTagOpen = new RegExp('^<' + qnameCapture);
    var startTagClose = /^\s*(\/?)>/;
    var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
    var doctype = /^<!DOCTYPE [^>]+>/i;
    var comment = /^<!--/;
    var conditionalComment = /^<!\[/;

    var IS_REGEX_CAPTURING_BROKEN = false;
    'x'.replace(/x(.)?/g, function (m, g) {
      IS_REGEX_CAPTURING_BROKEN = g === '';
    });

    var isPlainTextElement = makeMap('script,style,textarea', true);
    var reCache = {};

    var decodingMap = {
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&amp;': '&',
      '&#10;': '\n'
    };
    var encodedAttr = /&(?:lt|gt|quot|amp);/g;
    var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

    var isIgnoreNewlineTag = makeMap('pre,textarea', true);
    var shouldIgnoreFirstNewline = function shouldIgnoreFirstNewline(tag, html) {
      return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
    };

    function decodeAttr(value, shouldDecodeNewlines) {
      var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
      return value.replace(re, function (match) {
        return decodingMap[match];
      });
    }

    function parseHTML(html, options) {
      var stack = [];
      var expectHTML = options.expectHTML;
      var isUnaryTag$$1 = options.isUnaryTag || no;
      var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
      var index = 0;
      var last, lastTag;
      while (html) {
        last = html;

        if (!lastTag || !isPlainTextElement(lastTag)) {
          var textEnd = html.indexOf('<');
          if (textEnd === 0) {
            if (comment.test(html)) {
              var commentEnd = html.indexOf('-->');

              if (commentEnd >= 0) {
                if (options.shouldKeepComment) {
                  options.comment(html.substring(4, commentEnd));
                }
                advance(commentEnd + 3);
                continue;
              }
            }

            if (conditionalComment.test(html)) {
              var conditionalEnd = html.indexOf(']>');

              if (conditionalEnd >= 0) {
                advance(conditionalEnd + 2);
                continue;
              }
            }

            var doctypeMatch = html.match(doctype);
            if (doctypeMatch) {
              advance(doctypeMatch[0].length);
              continue;
            }

            var endTagMatch = html.match(endTag);
            if (endTagMatch) {
              var curIndex = index;
              advance(endTagMatch[0].length);
              parseEndTag(endTagMatch[1], curIndex, index);
              continue;
            }

            var startTagMatch = parseStartTag();
            if (startTagMatch) {
              handleStartTag(startTagMatch);
              if (shouldIgnoreFirstNewline(lastTag, html)) {
                advance(1);
              }
              continue;
            }
          }

          var text = void 0,
              rest = void 0,
              next = void 0;
          if (textEnd >= 0) {
            rest = html.slice(textEnd);
            while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
              next = rest.indexOf('<', 1);
              if (next < 0) {
                break;
              }
              textEnd += next;
              rest = html.slice(textEnd);
            }
            text = html.substring(0, textEnd);
            advance(textEnd);
          }

          if (textEnd < 0) {
            text = html;
            html = '';
          }

          if (options.chars && text) {
            options.chars(text);
          }
        } else {
          var endTagLength = 0;
          var stackedTag = lastTag.toLowerCase();
          var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
          var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
            endTagLength = endTag.length;
            if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
              text = text.replace(/<!--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
            }
            if (shouldIgnoreFirstNewline(stackedTag, text)) {
              text = text.slice(1);
            }
            if (options.chars) {
              options.chars(text);
            }
            return '';
          });
          index += html.length - rest$1.length;
          html = rest$1;
          parseEndTag(stackedTag, index - endTagLength, index);
        }

        if (html === last) {
          options.chars && options.chars(html);
          if ("dev" !== 'production' && !stack.length && options.warn) {
            options.warn("Mal-formatted tag at end of template: \"" + html + "\"");
          }
          break;
        }
      }

      parseEndTag();

      function advance(n) {
        index += n;
        html = html.substring(n);
      }

      function parseStartTag() {
        var start = html.match(startTagOpen);
        if (start) {
          var match = {
            tagName: start[1],
            attrs: [],
            start: index
          };
          advance(start[0].length);
          var end, attr;
          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length);
            match.attrs.push(attr);
          }
          if (end) {
            match.unarySlash = end[1];
            advance(end[0].length);
            match.end = index;
            return match;
          }
        }
      }

      function handleStartTag(match) {
        var tagName = match.tagName;
        var unarySlash = match.unarySlash;

        if (expectHTML) {
          if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
            parseEndTag(lastTag);
          }
          if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
            parseEndTag(tagName);
          }
        }

        var unary = isUnaryTag$$1(tagName) || !!unarySlash;

        var l = match.attrs.length;
        var attrs = new Array(l);
        for (var i = 0; i < l; i++) {
          var args = match.attrs[i];

          if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
            if (args[3] === '') {
              delete args[3];
            }
            if (args[4] === '') {
              delete args[4];
            }
            if (args[5] === '') {
              delete args[5];
            }
          }
          var value = args[3] || args[4] || args[5] || '';
          attrs[i] = {
            name: args[1],
            value: decodeAttr(value, options.shouldDecodeNewlines)
          };
        }

        if (!unary) {
          stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
          lastTag = tagName;
        }

        if (options.start) {
          options.start(tagName, attrs, unary, match.start, match.end);
        }
      }

      function parseEndTag(tagName, start, end) {
        var pos, lowerCasedTagName;
        if (start == null) {
          start = index;
        }
        if (end == null) {
          end = index;
        }

        if (tagName) {
          lowerCasedTagName = tagName.toLowerCase();
        }

        if (tagName) {
          for (pos = stack.length - 1; pos >= 0; pos--) {
            if (stack[pos].lowerCasedTag === lowerCasedTagName) {
              break;
            }
          }
        } else {
          pos = 0;
        }

        if (pos >= 0) {
          for (var i = stack.length - 1; i >= pos; i--) {
            if ("dev" !== 'production' && (i > pos || !tagName) && options.warn) {
              options.warn("tag <" + stack[i].tag + "> has no matching end tag.");
            }
            if (options.end) {
              options.end(stack[i].tag, start, end);
            }
          }

          stack.length = pos;
          lastTag = pos && stack[pos - 1].tag;
        } else if (lowerCasedTagName === 'br') {
          if (options.start) {
            options.start(tagName, [], true, start, end);
          }
        } else if (lowerCasedTagName === 'p') {
          if (options.start) {
            options.start(tagName, [], false, start, end);
          }
          if (options.end) {
            options.end(tagName, start, end);
          }
        }
      }
    }

    var onRE = /^@|^v-on:/;
    var dirRE = /^v-|^@|^:/;
    var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
    var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

    var argRE = /:(.*)$/;
    var bindRE = /^:|^v-bind:/;
    var modifierRE = /\.[^.]+/g;

    var decodeHTMLCached = cached(he.decode);

    var warn$2;
    var delimiters;
    var transforms;
    var preTransforms;
    var postTransforms;
    var platformIsPreTag;
    var platformMustUseProp;
    var platformGetTagNamespace;

    function parse(template, options) {
      warn$2 = options.warn || baseWarn;

      platformIsPreTag = options.isPreTag || no;
      platformMustUseProp = options.mustUseProp || no;
      platformGetTagNamespace = options.getTagNamespace || no;

      transforms = pluckModuleFunction(options.modules, 'transformNode');
      preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
      postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

      delimiters = options.delimiters;

      var stack = [];
      var preserveWhitespace = options.preserveWhitespace !== false;
      var root;
      var currentParent;
      var inVPre = false;
      var inPre = false;
      var warned = false;

      function warnOnce(msg) {
        if (!warned) {
          warned = true;
          warn$2(msg);
        }
      }

      function endPre(element) {
        if (element.pre) {
          inVPre = false;
        }
        if (platformIsPreTag(element.tag)) {
          inPre = false;
        }
      }

      parseHTML(template, {
        warn: warn$2,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldKeepComment: options.comments,
        start: function start(tag, attrs, unary) {
          var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag);

          if (isIE && ns === 'svg') {
            attrs = guardIESVGBug(attrs);
          }

          var element = {
            type: 1,
            tag: tag,
            attrsList: attrs,
            attrsMap: makeAttrsMap(attrs),
            parent: currentParent,
            children: []
          };
          if (ns) {
            element.ns = ns;
          }

          if (isForbiddenTag(element) && !isServerRendering()) {
            element.forbidden = true;
            "dev" !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.');
          }

          for (var i = 0; i < preTransforms.length; i++) {
            preTransforms[i](element, options);
          }

          if (!inVPre) {
            processPre(element);
            if (element.pre) {
              inVPre = true;
            }
          }
          if (platformIsPreTag(element.tag)) {
            inPre = true;
          }
          if (inVPre) {
            processRawAttrs(element);
          } else {
            processFor(element);
            processIf(element);
            processOnce(element);
            processKey(element);

            element.plain = !element.key && !attrs.length;

            processRef(element);
            processSlot(element);
            processComponent(element);
            for (var i$1 = 0; i$1 < transforms.length; i$1++) {
              transforms[i$1](element, options);
            }
            processAttrs(element);
          }

          function checkRootConstraints(el) {
            if (true) {
              if (el.tag === 'slot' || el.tag === 'template') {
                warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.');
              }
              if (el.attrsMap.hasOwnProperty('v-for')) {
                warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.');
              }
            }
          }

          if (!root) {
            root = element;
            checkRootConstraints(root);
          } else if (!stack.length) {
            if (root.if && (element.elseif || element.else)) {
              checkRootConstraints(element);
              addIfCondition(root, {
                exp: element.elseif,
                block: element
              });
            } else if (true) {
              warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.");
            }
          }
          if (currentParent && !element.forbidden) {
            if (element.elseif || element.else) {
              processIfConditions(element, currentParent);
            } else if (element.slotScope) {
              currentParent.plain = false;
              var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
            } else {
              currentParent.children.push(element);
              element.parent = currentParent;
            }
          }
          if (!unary) {
            currentParent = element;
            stack.push(element);
          } else {
            endPre(element);
          }

          for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
            postTransforms[i$2](element, options);
          }
        },

        end: function end() {
          var element = stack[stack.length - 1];
          var lastNode = element.children[element.children.length - 1];
          if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
            element.children.pop();
          }

          stack.length -= 1;
          currentParent = stack[stack.length - 1];
          endPre(element);
        },

        chars: function chars(text) {
          if (!currentParent) {
            if (true) {
              if (text === template) {
                warnOnce('Component template requires a root element, rather than just text.');
              } else if (text = text.trim()) {
                warnOnce("text \"" + text + "\" outside root element will be ignored.");
              }
            }
            return;
          }

          if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
            return;
          }
          var children = currentParent.children;
          text = inPre || text.trim() ? isTextTag(currentParent) ? text : decodeHTMLCached(text) : preserveWhitespace && children.length ? ' ' : '';
          if (text) {
            var expression;
            if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
              children.push({
                type: 2,
                expression: expression,
                text: text
              });
            } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
              children.push({
                type: 3,
                text: text
              });
            }
          }
        },
        comment: function comment(text) {
          currentParent.children.push({
            type: 3,
            text: text,
            isComment: true
          });
        }
      });
      return root;
    }

    function processPre(el) {
      if (getAndRemoveAttr(el, 'v-pre') != null) {
        el.pre = true;
      }
    }

    function processRawAttrs(el) {
      var l = el.attrsList.length;
      if (l) {
        var attrs = el.attrs = new Array(l);
        for (var i = 0; i < l; i++) {
          attrs[i] = {
            name: el.attrsList[i].name,
            value: (0, _stringify2.default)(el.attrsList[i].value)
          };
        }
      } else if (!el.pre) {
        el.plain = true;
      }
    }

    function processKey(el) {
      var exp = getBindingAttr(el, 'key');
      if (exp) {
        if ("dev" !== 'production' && el.tag === 'template') {
          warn$2("<template> cannot be keyed. Place the key on real elements instead.");
        }
        el.key = exp;
      }
    }

    function processRef(el) {
      var ref = getBindingAttr(el, 'ref');
      if (ref) {
        el.ref = ref;
        el.refInFor = checkInFor(el);
      }
    }

    function processFor(el) {
      var exp;
      if (exp = getAndRemoveAttr(el, 'v-for')) {
        var inMatch = exp.match(forAliasRE);
        if (!inMatch) {
          "dev" !== 'production' && warn$2("Invalid v-for expression: " + exp);
          return;
        }
        el.for = inMatch[2].trim();
        var alias = inMatch[1].trim();
        var iteratorMatch = alias.match(forIteratorRE);
        if (iteratorMatch) {
          el.alias = iteratorMatch[1].trim();
          el.iterator1 = iteratorMatch[2].trim();
          if (iteratorMatch[3]) {
            el.iterator2 = iteratorMatch[3].trim();
          }
        } else {
          el.alias = alias;
        }
      }
    }

    function processIf(el) {
      var exp = getAndRemoveAttr(el, 'v-if');
      if (exp) {
        el.if = exp;
        addIfCondition(el, {
          exp: exp,
          block: el
        });
      } else {
        if (getAndRemoveAttr(el, 'v-else') != null) {
          el.else = true;
        }
        var elseif = getAndRemoveAttr(el, 'v-else-if');
        if (elseif) {
          el.elseif = elseif;
        }
      }
    }

    function processIfConditions(el, parent) {
      var prev = findPrevElement(parent.children);
      if (prev && prev.if) {
        addIfCondition(prev, {
          exp: el.elseif,
          block: el
        });
      } else if (true) {
        warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.");
      }
    }

    function findPrevElement(children) {
      var i = children.length;
      while (i--) {
        if (children[i].type === 1) {
          return children[i];
        } else {
          if ("dev" !== 'production' && children[i].text !== ' ') {
            warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.");
          }
          children.pop();
        }
      }
    }

    function addIfCondition(el, condition) {
      if (!el.ifConditions) {
        el.ifConditions = [];
      }
      el.ifConditions.push(condition);
    }

    function processOnce(el) {
      var once$$1 = getAndRemoveAttr(el, 'v-once');
      if (once$$1 != null) {
        el.once = true;
      }
    }

    function processSlot(el) {
      if (el.tag === 'slot') {
        el.slotName = getBindingAttr(el, 'name');
        if ("dev" !== 'production' && el.key) {
          warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.");
        }
      } else {
        var slotTarget = getBindingAttr(el, 'slot');
        if (slotTarget) {
          el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
        }
        if (el.tag === 'template') {
          el.slotScope = getAndRemoveAttr(el, 'scope');
        }
      }
    }

    function processComponent(el) {
      var binding;
      if (binding = getBindingAttr(el, 'is')) {
        el.component = binding;
      }
      if (getAndRemoveAttr(el, 'inline-template') != null) {
        el.inlineTemplate = true;
      }
    }

    function processAttrs(el) {
      var list = el.attrsList;
      var i, l, name, rawName, value, modifiers, isProp;
      for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (dirRE.test(name)) {
          el.hasBindings = true;

          modifiers = parseModifiers(name);
          if (modifiers) {
            name = name.replace(modifierRE, '');
          }
          if (bindRE.test(name)) {
            name = name.replace(bindRE, '');
            value = parseFilters(value);
            isProp = false;
            if (modifiers) {
              if (modifiers.prop) {
                isProp = true;
                name = camelize(name);
                if (name === 'innerHtml') {
                  name = 'innerHTML';
                }
              }
              if (modifiers.camel) {
                name = camelize(name);
              }
              if (modifiers.sync) {
                addHandler(el, "update:" + camelize(name), genAssignmentCode(value, "$event"));
              }
            }
            if (isProp || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
              addProp(el, name, value);
            } else {
              addAttr(el, name, value);
            }
          } else if (onRE.test(name)) {
            name = name.replace(onRE, '');
            addHandler(el, name, value, modifiers, false, warn$2);
          } else {
            name = name.replace(dirRE, '');

            var argMatch = name.match(argRE);
            var arg = argMatch && argMatch[1];
            if (arg) {
              name = name.slice(0, -(arg.length + 1));
            }
            addDirective(el, name, rawName, value, arg, modifiers);
            if ("dev" !== 'production' && name === 'model') {
              checkForAliasModel(el, value);
            }
          }
        } else {
          if (true) {
            var expression = parseText(value, delimiters);
            if (expression) {
              warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.');
            }
          }
          addAttr(el, name, (0, _stringify2.default)(value));
        }
      }
    }

    function checkInFor(el) {
      var parent = el;
      while (parent) {
        if (parent.for !== undefined) {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    function parseModifiers(name) {
      var match = name.match(modifierRE);
      if (match) {
        var ret = {};
        match.forEach(function (m) {
          ret[m.slice(1)] = true;
        });
        return ret;
      }
    }

    function makeAttrsMap(attrs) {
      var map = {};
      for (var i = 0, l = attrs.length; i < l; i++) {
        if ("dev" !== 'production' && map[attrs[i].name] && !isIE && !isEdge) {
          warn$2('duplicate attribute: ' + attrs[i].name);
        }
        map[attrs[i].name] = attrs[i].value;
      }
      return map;
    }

    function isTextTag(el) {
      return el.tag === 'script' || el.tag === 'style';
    }

    function isForbiddenTag(el) {
      return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
    }

    var ieNSBug = /^xmlns:NS\d+/;
    var ieNSPrefix = /^NS\d+:/;

    function guardIESVGBug(attrs) {
      var res = [];
      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (!ieNSBug.test(attr.name)) {
          attr.name = attr.name.replace(ieNSPrefix, '');
          res.push(attr);
        }
      }
      return res;
    }

    function checkForAliasModel(el, value) {
      var _el = el;
      while (_el) {
        if (_el.for && _el.alias === value) {
          warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.");
        }
        _el = _el.parent;
      }
    }

    var isStaticKey;
    var isPlatformReservedTag;

    var genStaticKeysCached = cached(genStaticKeys$1);

    function optimize(root, options) {
      if (!root) {
        return;
      }
      isStaticKey = genStaticKeysCached(options.staticKeys || '');
      isPlatformReservedTag = options.isReservedTag || no;

      markStatic$1(root);

      markStaticRoots(root, false);
    }

    function genStaticKeys$1(keys) {
      return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs' + (keys ? ',' + keys : ''));
    }

    function markStatic$1(node) {
      node.static = isStatic(node);
      if (node.type === 1) {
        if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
          return;
        }
        for (var i = 0, l = node.children.length; i < l; i++) {
          var child = node.children[i];
          markStatic$1(child);
          if (!child.static) {
            node.static = false;
          }
        }
        if (node.ifConditions) {
          for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
            var block = node.ifConditions[i$1].block;
            markStatic$1(block);
            if (!block.static) {
              node.static = false;
            }
          }
        }
      }
    }

    function markStaticRoots(node, isInFor) {
      if (node.type === 1) {
        if (node.static || node.once) {
          node.staticInFor = isInFor;
        }

        if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
          node.staticRoot = true;
          return;
        } else {
          node.staticRoot = false;
        }
        if (node.children) {
          for (var i = 0, l = node.children.length; i < l; i++) {
            markStaticRoots(node.children[i], isInFor || !!node.for);
          }
        }
        if (node.ifConditions) {
          for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
            markStaticRoots(node.ifConditions[i$1].block, isInFor);
          }
        }
      }
    }

    function isStatic(node) {
      if (node.type === 2) {
        return false;
      }
      if (node.type === 3) {
        return true;
      }
      return !!(node.pre || !node.hasBindings && !node.if && !node.for && !isBuiltInTag(node.tag) && isPlatformReservedTag(node.tag) && !isDirectChildOfTemplateFor(node) && (0, _keys2.default)(node).every(isStaticKey));
    }

    function isDirectChildOfTemplateFor(node) {
      while (node.parent) {
        node = node.parent;
        if (node.tag !== 'template') {
          return false;
        }
        if (node.for) {
          return true;
        }
      }
      return false;
    }

    var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
    var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

    var keyCodes = {
      esc: 27,
      tab: 9,
      enter: 13,
      space: 32,
      up: 38,
      left: 37,
      right: 39,
      down: 40,
      'delete': [8, 46]
    };

    var genGuard = function genGuard(condition) {
      return "if(" + condition + ")return null;";
    };

    var modifierCode = {
      stop: '$event.stopPropagation();',
      prevent: '$event.preventDefault();',
      self: genGuard("$event.target !== $event.currentTarget"),
      ctrl: genGuard("!$event.ctrlKey"),
      shift: genGuard("!$event.shiftKey"),
      alt: genGuard("!$event.altKey"),
      meta: genGuard("!$event.metaKey"),
      left: genGuard("'button' in $event && $event.button !== 0"),
      middle: genGuard("'button' in $event && $event.button !== 1"),
      right: genGuard("'button' in $event && $event.button !== 2")
    };

    function genHandlers(events, isNative, warn) {
      var res = isNative ? 'nativeOn:{' : 'on:{';
      for (var name in events) {
        var handler = events[name];

        if ("dev" !== 'production' && name === 'click' && handler && handler.modifiers && handler.modifiers.right) {
          warn("Use \"contextmenu\" instead of \"click.right\" since right clicks " + "do not actually fire \"click\" events.");
        }
        res += "\"" + name + "\":" + genHandler(name, handler) + ",";
      }
      return res.slice(0, -1) + '}';
    }

    function genHandler(name, handler) {
      if (!handler) {
        return 'function(){}';
      }

      if (Array.isArray(handler)) {
        return "[" + handler.map(function (handler) {
          return genHandler(name, handler);
        }).join(',') + "]";
      }

      var isMethodPath = simplePathRE.test(handler.value);
      var isFunctionExpression = fnExpRE.test(handler.value);

      if (!handler.modifiers) {
        return isMethodPath || isFunctionExpression ? handler.value : "function($event){" + handler.value + "}";
      } else {
        var code = '';
        var genModifierCode = '';
        var keys = [];
        for (var key in handler.modifiers) {
          if (modifierCode[key]) {
            genModifierCode += modifierCode[key];

            if (keyCodes[key]) {
              keys.push(key);
            }
          } else {
            keys.push(key);
          }
        }
        if (keys.length) {
          code += genKeyFilter(keys);
        }

        if (genModifierCode) {
          code += genModifierCode;
        }
        var handlerCode = isMethodPath ? handler.value + '($event)' : isFunctionExpression ? "(" + handler.value + ")($event)" : handler.value;
        return "function($event){" + code + handlerCode + "}";
      }
    }

    function genKeyFilter(keys) {
      return "if(!('button' in $event)&&" + keys.map(genFilterCode).join('&&') + ")return null;";
    }

    function genFilterCode(key) {
      var keyVal = parseInt(key, 10);
      if (keyVal) {
        return "$event.keyCode!==" + keyVal;
      }
      var alias = keyCodes[key];
      return "_k($event.keyCode," + (0, _stringify2.default)(key) + (alias ? ',' + (0, _stringify2.default)(alias) : '') + ")";
    }

    function on(el, dir) {
      if ("dev" !== 'production' && dir.modifiers) {
        warn("v-on without argument does not support modifiers.");
      }
      el.wrapListeners = function (code) {
        return "_g(" + code + "," + dir.value + ")";
      };
    }

    function bind$1(el, dir) {
      el.wrapData = function (code) {
        return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
      };
    }

    var baseDirectives = {
      on: on,
      bind: bind$1,
      cloak: noop
    };

    var CodegenState = function CodegenState(options) {
      this.options = options;
      this.warn = options.warn || baseWarn;
      this.transforms = pluckModuleFunction(options.modules, 'transformCode');
      this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
      this.directives = extend(extend({}, baseDirectives), options.directives);
      var isReservedTag = options.isReservedTag || no;
      this.maybeComponent = function (el) {
        return !isReservedTag(el.tag);
      };
      this.onceId = 0;
      this.staticRenderFns = [];
    };

    function generate(ast, options) {
      var state = new CodegenState(options);
      var code = ast ? genElement(ast, state) : '_c("div")';
      return {
        render: "with(this){return " + code + "}",
        staticRenderFns: state.staticRenderFns
      };
    }

    function genElement(el, state) {
      if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state);
      } else if (el.once && !el.onceProcessed) {
        return genOnce(el, state);
      } else if (el.for && !el.forProcessed) {
        return genFor(el, state);
      } else if (el.if && !el.ifProcessed) {
        return genIf(el, state);
      } else if (el.tag === 'template' && !el.slotTarget) {
        return genChildren(el, state) || 'void 0';
      } else if (el.tag === 'slot') {
        return genSlot(el, state);
      } else {
        var code;
        if (el.component) {
          code = genComponent(el.component, el, state);
        } else {
          var data = el.plain ? undefined : genData$2(el, state);

          var children = el.inlineTemplate ? null : genChildren(el, state, true);
          code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
        }

        for (var i = 0; i < state.transforms.length; i++) {
          code = state.transforms[i](el, code);
        }
        return code;
      }
    }

    function genStatic(el, state) {
      el.staticProcessed = true;
      state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
      return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
    }

    function genOnce(el, state) {
      el.onceProcessed = true;
      if (el.if && !el.ifProcessed) {
        return genIf(el, state);
      } else if (el.staticInFor) {
        var key = '';
        var parent = el.parent;
        while (parent) {
          if (parent.for) {
            key = parent.key;
            break;
          }
          parent = parent.parent;
        }
        if (!key) {
          "dev" !== 'production' && state.warn("v-once can only be used inside v-for that is keyed. ");
          return genElement(el, state);
        }
        return "_o(" + genElement(el, state) + "," + state.onceId++ + (key ? "," + key : "") + ")";
      } else {
        return genStatic(el, state);
      }
    }

    function genIf(el, state, altGen, altEmpty) {
      el.ifProcessed = true;
      return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
    }

    function genIfConditions(conditions, state, altGen, altEmpty) {
      if (!conditions.length) {
        return altEmpty || '_e()';
      }

      var condition = conditions.shift();
      if (condition.exp) {
        return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
      } else {
        return "" + genTernaryExp(condition.block);
      }

      function genTernaryExp(el) {
        return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
      }
    }

    function genFor(el, state, altGen, altHelper) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
      var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

      if ("dev" !== 'production' && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
        state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", true);
      }

      el.forProcessed = true;
      return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
    }

    function genData$2(el, state) {
      var data = '{';

      var dirs = genDirectives(el, state);
      if (dirs) {
        data += dirs + ',';
      }

      if (el.key) {
        data += "key:" + el.key + ",";
      }

      if (el.ref) {
        data += "ref:" + el.ref + ",";
      }
      if (el.refInFor) {
        data += "refInFor:true,";
      }

      if (el.pre) {
        data += "pre:true,";
      }

      if (el.component) {
        data += "tag:\"" + el.tag + "\",";
      }

      for (var i = 0; i < state.dataGenFns.length; i++) {
        data += state.dataGenFns[i](el);
      }

      if (el.attrs) {
        data += "attrs:{" + genProps(el.attrs) + "},";
      }

      if (el.props) {
        data += "domProps:{" + genProps(el.props) + "},";
      }

      if (el.events) {
        data += genHandlers(el.events, false, state.warn) + ",";
      }
      if (el.nativeEvents) {
        data += genHandlers(el.nativeEvents, true, state.warn) + ",";
      }

      if (el.slotTarget) {
        data += "slot:" + el.slotTarget + ",";
      }

      if (el.scopedSlots) {
        data += genScopedSlots(el.scopedSlots, state) + ",";
      }

      if (el.model) {
        data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
      }

      if (el.inlineTemplate) {
        var inlineTemplate = genInlineTemplate(el, state);
        if (inlineTemplate) {
          data += inlineTemplate + ",";
        }
      }
      data = data.replace(/,$/, '') + '}';

      if (el.wrapData) {
        data = el.wrapData(data);
      }

      if (el.wrapListeners) {
        data = el.wrapListeners(data);
      }
      return data;
    }

    function genDirectives(el, state) {
      var dirs = el.directives;
      if (!dirs) {
        return;
      }
      var res = 'directives:[';
      var hasRuntime = false;
      var i, l, dir, needRuntime;
      for (i = 0, l = dirs.length; i < l; i++) {
        dir = dirs[i];
        needRuntime = true;
        var gen = state.directives[dir.name];
        if (gen) {
          needRuntime = !!gen(el, dir, state.warn);
        }
        if (needRuntime) {
          hasRuntime = true;
          res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + (0, _stringify2.default)(dir.value) : '') + (dir.arg ? ",arg:\"" + dir.arg + "\"" : '') + (dir.modifiers ? ",modifiers:" + (0, _stringify2.default)(dir.modifiers) : '') + "},";
        }
      }
      if (hasRuntime) {
        return res.slice(0, -1) + ']';
      }
    }

    function genInlineTemplate(el, state) {
      var ast = el.children[0];
      if ("dev" !== 'production' && (el.children.length > 1 || ast.type !== 1)) {
        state.warn('Inline-template components must have exactly one child element.');
      }
      if (ast.type === 1) {
        var inlineRenderFns = generate(ast, state.options);
        return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
          return "function(){" + code + "}";
        }).join(',') + "]}";
      }
    }

    function genScopedSlots(slots, state) {
      return "scopedSlots:_u([" + (0, _keys2.default)(slots).map(function (key) {
        return genScopedSlot(key, slots[key], state);
      }).join(',') + "])";
    }

    function genScopedSlot(key, el, state) {
      if (el.for && !el.forProcessed) {
        return genForScopedSlot(key, el, state);
      }
      return "{key:" + key + ",fn:function(" + String(el.attrsMap.scope) + "){" + "return " + (el.tag === 'template' ? genChildren(el, state) || 'void 0' : genElement(el, state)) + "}}";
    }

    function genForScopedSlot(key, el, state) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
      var iterator2 = el.iterator2 ? "," + el.iterator2 : '';
      el.forProcessed = true;
      return "_l((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + genScopedSlot(key, el, state) + '})';
    }

    function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
      var children = el.children;
      if (children.length) {
        var el$1 = children[0];

        if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
          return (altGenElement || genElement)(el$1, state);
        }
        var normalizationType = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
        var gen = altGenNode || genNode;
        return "[" + children.map(function (c) {
          return gen(c, state);
        }).join(',') + "]" + (normalizationType ? "," + normalizationType : '');
      }
    }

    function getNormalizationType(children, maybeComponent) {
      var res = 0;
      for (var i = 0; i < children.length; i++) {
        var el = children[i];
        if (el.type !== 1) {
          continue;
        }
        if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
          return needsNormalization(c.block);
        })) {
          res = 2;
          break;
        }
        if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
          return maybeComponent(c.block);
        })) {
          res = 1;
        }
      }
      return res;
    }

    function needsNormalization(el) {
      return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
    }

    function genNode(node, state) {
      if (node.type === 1) {
        return genElement(node, state);
      }if (node.type === 3 && node.isComment) {
        return genComment(node);
      } else {
        return genText(node);
      }
    }

    function genText(text) {
      return "_v(" + (text.type === 2 ? text.expression : transformSpecialNewlines((0, _stringify2.default)(text.text))) + ")";
    }

    function genComment(comment) {
      return "_e(" + (0, _stringify2.default)(comment.text) + ")";
    }

    function genSlot(el, state) {
      var slotName = el.slotName || '"default"';
      var children = genChildren(el, state);
      var res = "_t(" + slotName + (children ? "," + children : '');
      var attrs = el.attrs && "{" + el.attrs.map(function (a) {
        return camelize(a.name) + ":" + a.value;
      }).join(',') + "}";
      var bind$$1 = el.attrsMap['v-bind'];
      if ((attrs || bind$$1) && !children) {
        res += ",null";
      }
      if (attrs) {
        res += "," + attrs;
      }
      if (bind$$1) {
        res += (attrs ? '' : ',null') + "," + bind$$1;
      }
      return res + ')';
    }

    function genComponent(componentName, el, state) {
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
    }

    function genProps(props) {
      var res = '';
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        res += "\"" + prop.name + "\":" + transformSpecialNewlines(prop.value) + ",";
      }
      return res.slice(0, -1);
    }

    function transformSpecialNewlines(text) {
      return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    }

    var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');

    var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

    var identRE = /[A-Za-z_$][\w$]*/;

    var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

    function detectErrors(ast) {
      var errors = [];
      if (ast) {
        checkNode(ast, errors);
      }
      return errors;
    }

    function checkNode(node, errors) {
      if (node.type === 1) {
        for (var name in node.attrsMap) {
          if (dirRE.test(name)) {
            var value = node.attrsMap[name];
            if (value) {
              if (name === 'v-for') {
                checkFor(node, "v-for=\"" + value + "\"", errors);
              } else if (onRE.test(name)) {
                checkEvent(value, name + "=\"" + value + "\"", errors);
              } else {
                checkExpression(value, name + "=\"" + value + "\"", errors);
              }
            }
          }
        }
        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            checkNode(node.children[i], errors);
          }
        }
      } else if (node.type === 2) {
        checkExpression(node.expression, node.text, errors);
      }
    }

    function checkEvent(exp, text, errors) {
      var stipped = exp.replace(stripStringRE, '');
      var keywordMatch = stipped.match(unaryOperatorsRE);
      if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
        errors.push("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
      }
      checkExpression(exp, text, errors);
    }

    function checkFor(node, text, errors) {
      checkExpression(node.for || '', text, errors);
      checkIdentifier(node.alias, 'v-for alias', text, errors);
      checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
      checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
    }

    function checkIdentifier(ident, type, text, errors) {
      if (typeof ident === 'string' && !identRE.test(ident)) {
        errors.push("invalid " + type + " \"" + ident + "\" in expression: " + text.trim());
      }
    }

    function checkExpression(exp, text, errors) {
      try {
        new Function("return " + exp);
      } catch (e) {
        var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
        if (keywordMatch) {
          errors.push("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim());
        } else {
          errors.push("invalid expression: " + text.trim());
        }
      }
    }

    function createFunction(code, errors) {
      try {
        return new Function(code);
      } catch (err) {
        errors.push({ err: err, code: code });
        return noop;
      }
    }

    function createCompileToFunctionFn(compile) {
      var cache = (0, _create2.default)(null);

      return function compileToFunctions(template, options, vm) {
        options = options || {};

        if (true) {
          try {
            new Function('return 1');
          } catch (e) {
            if (e.toString().match(/unsafe-eval|CSP/)) {
              warn('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
            }
          }
        }

        var key = options.delimiters ? String(options.delimiters) + template : template;
        if (cache[key]) {
          return cache[key];
        }

        var compiled = compile(template, options);

        if (true) {
          if (compiled.errors && compiled.errors.length) {
            warn("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
              return "- " + e;
            }).join('\n') + '\n', vm);
          }
          if (compiled.tips && compiled.tips.length) {
            compiled.tips.forEach(function (msg) {
              return tip(msg, vm);
            });
          }
        }

        var res = {};
        var fnGenErrors = [];
        res.render = createFunction(compiled.render, fnGenErrors);
        res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
          return createFunction(code, fnGenErrors);
        });

        if (true) {
          if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
            warn("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
              var err = ref.err;
              var code = ref.code;

              return err.toString() + " in\n\n" + code + "\n";
            }).join('\n'), vm);
          }
        }

        return cache[key] = res;
      };
    }

    function createCompilerCreator(baseCompile) {
      return function createCompiler(baseOptions) {
        function compile(template, options) {
          var finalOptions = (0, _create2.default)(baseOptions);
          var errors = [];
          var tips = [];
          finalOptions.warn = function (msg, tip) {
            (tip ? tips : errors).push(msg);
          };

          if (options) {
            if (options.modules) {
              finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
            }

            if (options.directives) {
              finalOptions.directives = extend((0, _create2.default)(baseOptions.directives), options.directives);
            }

            for (var key in options) {
              if (key !== 'modules' && key !== 'directives') {
                finalOptions[key] = options[key];
              }
            }
          }

          var compiled = baseCompile(template, finalOptions);
          if (true) {
            errors.push.apply(errors, detectErrors(compiled.ast));
          }
          compiled.errors = errors;
          compiled.tips = tips;
          return compiled;
        }

        return {
          compile: compile,
          compileToFunctions: createCompileToFunctionFn(compile)
        };
      };
    }

    var createCompiler = createCompilerCreator(function baseCompile(template, options) {
      var ast = parse(template.trim(), options);
      optimize(ast, options);
      var code = generate(ast, options);
      return {
        ast: ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
      };
    });

    var ref$1 = createCompiler(baseOptions);
    var compileToFunctions = ref$1.compileToFunctions;

    var idToTemplate = cached(function (id) {
      var el = query(id);
      return el && el.innerHTML;
    });

    var mount = Vue$3.prototype.$mount;
    Vue$3.prototype.$mount = function (el, hydrating) {
      el = el && query(el);

      if (el === document.body || el === document.documentElement) {
        "dev" !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
        return this;
      }

      var options = this.$options;

      if (!options.render) {
        var template = options.template;
        if (template) {
          if (typeof template === 'string') {
            if (template.charAt(0) === '#') {
              template = idToTemplate(template);

              if ("dev" !== 'production' && !template) {
                warn("Template element not found or is empty: " + options.template, this);
              }
            }
          } else if (template.nodeType) {
            template = template.innerHTML;
          } else {
            if (true) {
              warn('invalid template option:' + template, this);
            }
            return this;
          }
        } else if (el) {
          template = getOuterHTML(el);
        }
        if (template) {
          if ("dev" !== 'production' && config.performance && mark) {
            mark('compile');
          }

          var ref = compileToFunctions(template, {
            shouldDecodeNewlines: shouldDecodeNewlines,
            delimiters: options.delimiters,
            comments: options.comments
          }, this);
          var render = ref.render;
          var staticRenderFns = ref.staticRenderFns;
          options.render = render;
          options.staticRenderFns = staticRenderFns;

          if ("dev" !== 'production' && config.performance && mark) {
            mark('compile end');
            measure(this._name + " compile", 'compile', 'compile end');
          }
        }
      }
      return mount.call(this, el, hydrating);
    };

    function getOuterHTML(el) {
      if (el.outerHTML) {
        return el.outerHTML;
      } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
      }
    }

    Vue$3.compile = compileToFunctions;

    __webpack_exports__["default"] = Vue$3;
  }).call(__webpack_exports__, __webpack_require__(8));
}, function (module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(3)(true);

  exports.i(__webpack_require__(11), "");

  exports.push([module.i, "\n#app {\n    float: left;\n    width: 100%;\n}\n", "", { "version": 3, "sources": ["/vu/wangyi/src/src/App.vue?079d1273"], "names": [], "mappings": ";AAoBA;IACA,YAAA;IACA,YAAA;CACA", "file": "App.vue", "sourcesContent": ["<template>\n    <div id=\"app\">\n        <top></top>\n    </div>\n</template>\n\n<script>\n\n    import top from './components/top.vue'\n\n    export default {\n        name: 'app',\n        components: {\n            top\n        }\n    }\n</script>\n\n<style>\n    @import './style/common.css';\n    #app {\n        float: left;\n        width: 100%;\n    }\n</style>"], "sourceRoot": "" }]);
}, function (module, exports) {
  module.exports = function (useSourceMap) {
    var list = [];

    list.toString = function toString() {
      return this.map(function (item) {
        var content = cssWithMappingToString(item, useSourceMap);
        if (item[2]) {
          return "@media " + item[2] + "{" + content + "}";
        } else {
          return content;
        }
      }).join("");
    };

    list.i = function (modules, mediaQuery) {
      if (typeof modules === "string") modules = [[null, modules, ""]];
      var alreadyImportedModules = {};
      for (var i = 0; i < this.length; i++) {
        var id = this[i][0];
        if (typeof id === "number") alreadyImportedModules[id] = true;
      }
      for (i = 0; i < modules.length; i++) {
        var item = modules[i];

        if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
          if (mediaQuery && !item[2]) {
            item[2] = mediaQuery;
          } else if (mediaQuery) {
            item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
          }
          list.push(item);
        }
      }
    };
    return list;
  };

  function cssWithMappingToString(item, useSourceMap) {
    var content = item[1] || '';
    var cssMapping = item[3];
    if (!cssMapping) {
      return content;
    }

    if (useSourceMap && typeof btoa === 'function') {
      var sourceMapping = toComment(cssMapping);
      var sourceURLs = cssMapping.sources.map(function (source) {
        return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
      });

      return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
    }

    return [content].join('\n');
  }

  function toComment(sourceMap) {
    var base64 = btoa(unescape(encodeURIComponent((0, _stringify2.default)(sourceMap))));
    var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

    return '/*# ' + data + ' */';
  }
}, function (module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(3)(true);

  exports.push([module.i, "\n.m-top[data-v-60cc1685]{\n    height: 70px;\n    background-position: 0 -80px;\n    background-repeat: repeat-x;\n}\n.wrap[data-v-60cc1685]{\n    width:1100px;\n    margin:0 auto;\n}\n.m-top .logo[data-v-60cc1685] {\n    float: left;\n    width: 176px;\n}\n.m-top .logo a[data-v-60cc1685] {\n    float: left;\n    width: 157px;\n    height: 33px;\n    padding: 22px 20px 0 0;\n    background-position: 0 15px;\n    text-indent: -9999px;\n}\n.m-nav[data-v-60cc1685] {\n    float: left;\n}\n.m-nav li[data-v-60cc1685] {\n    position: relative;\n    background-position: right -300px;\n}\n.m-nav li[data-v-60cc1685], .m-nav li span[data-v-60cc1685], .m-nav a[data-v-60cc1685], .m-nav a em[data-v-60cc1685] {\n    float: left;\n    height: 70px;\n    font-size: 14px;\n}\n.m-nav a[data-v-60cc1685] {\n    position: relative;\n    padding-left: 2px;\n    text-align: center;\n    line-height: 76px;\n}\n.m-nav a em[data-v-60cc1685] {\n    padding: 0 20px 0 18px;\n    overflow: hidden;\n    color: #ccc;\n    text-shadow: 0 1px 0 #1b1b1b;\n    cursor: pointer;\n}\n.m-nav a.z-slt[data-v-60cc1685] {\n    position: relative;\n    margin: 0 -1px;\n    background-position: left -155px;\n}\n.m-nav a.z-slt em[data-v-60cc1685] {\n    padding: 0 21px 0 19px;\n    background-position: right -155px;\n}\n.m-nav .cor[data-v-60cc1685] {\n    display: none;\n}\n.m-nav a.z-slt .cor[data-v-60cc1685] {\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 63px;\n    width: 14px;\n    height: 9px;\n    margin-left: -7px;\n    overflow: hidden;\n    background-position: -226px 0;\n}\n.m-msg[data-v-60cc1685] {\n    position: relative;\n    float: right;\n    width: 34px;\n    height: 28px;\n    margin: 17px 0 0 20px;\n    background-position: 0 -49px;\n}\n.m-msg .bub[data-v-60cc1685] {\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n.u-bub[data-v-60cc1685] {\n    display: block;\n    position: relative;\n    zoom: 1;\n    width: 22px;\n    height: 22px;\n    color: #fff;\n    text-align: center;\n    line-height: 23px;\n    font-weight: bold;\n}\n.m-srch .srchbg[data-v-60cc1685] {\n    margin-top: 21px;\n    background-position: 0 -550px;\n}\n.m-srch[data-v-60cc1685], .m-srch .srchbg[data-v-60cc1685] {\n    float: right;\n    width: 210px;\n    height: 31px;\n}\n.m-srch .parent[data-v-60cc1685] {\n    display: block;\n    position: relative;\n    margin: 8px 0 0 33px;\n}\n.m-srch .parent input[data-v-60cc1685] {\n    width: 90%;\n    margin: 0;\n    padding: 0;\n    background: transparent;\n    color: #fff;\n    outline: none;\n}\n.m-srch .parent input[data-v-60cc1685] {\n    color: #333;\n}\n.m-subnav[data-v-60cc1685] {\n    z-index: 90;\n    height: 35px;\n    background-position: 0 -230px;\n    background-repeat: repeat-x;\n}\n.m-subnav-up[data-v-60cc1685] {\n    height: 5px;\n    overflow: hidden;\n}\n.m-subnav .wrap[data-v-60cc1685] {\n    width: 911px;\n    padding-left: 168px;\n    margin: 0 auto;\n}\n.f-pr[data-v-60cc1685] {\n    position: relative;\n    zoom: 1;\n}\n.m-subnav .nav li[data-v-60cc1685] {\n    display: inline;\n    margin: 0 17px;\n}\n.m-subnav .nav li[data-v-60cc1685], .m-subnav .nav a[data-v-60cc1685], .m-subnav .nav em[data-v-60cc1685] {\n    float: left;\n    height: 35px;\n    overflow: hidden;\n}\n.m-subnav .nav li[data-v-60cc1685], .m-subnav .nav a[data-v-60cc1685], .m-subnav .nav em[data-v-60cc1685] {\n    float: left;\n    height: 35px;\n    overflow: hidden;\n}\n.m-subnav .nav a[data-v-60cc1685] {\n    padding-left: 14px;\n}\n.m-subnav .nav a[data-v-60cc1685]:hover, .m-subnav .nav a.z-slt[data-v-60cc1685] {\n    background-position: left -268px;\n}\n.m-subnav .nav li[data-v-60cc1685], .m-subnav .nav a[data-v-60cc1685], .m-subnav .nav em[data-v-60cc1685] {\n    float: left;\n    height: 35px;\n    overflow: hidden;\n}\n.m-subnav .nav em[data-v-60cc1685] {\n    padding-right: 14px;\n    line-height: 37px;\n    color: #fff;\n    text-shadow: 0 1px 0 #650303;\n}\n.m-subnav .nav a:hover em[data-v-60cc1685], .m-subnav .nav a.z-slt em[data-v-60cc1685] {\n    background-position: right -268px;\n}\n", "", { "version": 3, "sources": ["/vu/wangyi/src/components/src/components/top.vue?bf386376"], "names": [], "mappings": ";AA6EA;IACA,aAAA;IACA,6BAAA;IACA,4BAAA;CACA;AACA;IACA,aAAA;IACA,cAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,aAAA;IACA,uBAAA;IACA,4BAAA;IACA,qBAAA;CACA;AACA;IACA,YAAA;CACA;AACA;IACA,mBAAA;IACA,kCAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,gBAAA;CACA;AACA;IACA,mBAAA;IACA,kBAAA;IACA,mBAAA;IACA,kBAAA;CACA;AACA;IACA,uBAAA;IACA,iBAAA;IACA,YAAA;IACA,6BAAA;IACA,gBAAA;CACA;AACA;IACA,mBAAA;IACA,eAAA;IACA,iCAAA;CACA;AACA;IACA,uBAAA;IACA,kCAAA;CACA;AACA;IACA,cAAA;CACA;AACA;IACA,eAAA;IACA,mBAAA;IACA,UAAA;IACA,UAAA;IACA,YAAA;IACA,YAAA;IACA,kBAAA;IACA,iBAAA;IACA,8BAAA;CACA;AACA;IACA,mBAAA;IACA,aAAA;IACA,YAAA;IACA,aAAA;IACA,sBAAA;IACA,6BAAA;CACA;AACA;IACA,mBAAA;IACA,OAAA;IACA,SAAA;CACA;AACA;IACA,eAAA;IACA,mBAAA;IACA,QAAA;IACA,YAAA;IACA,aAAA;IACA,YAAA;IACA,mBAAA;IACA,kBAAA;IACA,kBAAA;CACA;AACA;IACA,iBAAA;IACA,8BAAA;CACA;AACA;IACA,aAAA;IACA,aAAA;IACA,aAAA;CACA;AACA;IACA,eAAA;IACA,mBAAA;IACA,qBAAA;CACA;AACA;IACA,WAAA;IACA,UAAA;IACA,WAAA;IACA,wBAAA;IACA,YAAA;IACA,cAAA;CACA;AACA;IACA,YAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,8BAAA;IACA,4BAAA;CACA;AACA;IACA,YAAA;IACA,iBAAA;CACA;AACA;IACA,aAAA;IACA,oBAAA;IACA,eAAA;CACA;AACA;IACA,mBAAA;IACA,QAAA;CACA;AACA;IACA,gBAAA;IACA,eAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;CACA;AACA;IACA,mBAAA;CACA;AACA;IACA,iCAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,iBAAA;CACA;AACA;IACA,oBAAA;IACA,kBAAA;IACA,YAAA;IACA,6BAAA;CACA;AACA;IACA,kCAAA;CACA", "file": "top.vue", "sourcesContent": ["<template>\n    <div>\n        <div class=\"m-top\">\n            <div class=\"wrap\">\n                <h1 class=\"logo\">\n                    <a href=\"/#\">wangyi yun yinyue</a>\n                </h1>\n                <ul class=\"m-nav j-tflag\">\n                    <li class=\"fst\">\n                        <span v-on:click=\"isSubNav=false\">\n                            <a class=\"z-slt\"><em>fa xian yinyue</em><sub class=\"cor\"></sub> </a>\n                        </span>\n                    </li>\n                    <li>\n                        <span v-on:click=\"isSubNav=true\">\n                            <!--todo: get api result-->\n                        </span>\n                    </li>\n                    <li>\n                        <span>\n                            <a href=\"#\"><em>peng you</em><sub class=\"cor\"></sub><i class=\"dot u-icn u-icn-68 f-alpha j-t\" style=\"\"></i> </a>\n                        </span>\n                    </li>\n                    <li>\n                        <span>\n                            <a href=\"#\" target=\"_blank\"><em>shang cheng</em></a>\n                        </span>\n                    </li>\n                </ul>\n                <a class=\"m-msg f-pr j-tflag\" href=\"#\">\n                    <i class=\"bub -u-bub\"></i>\n                </a>\n                <div class=\"m-srch f-pr j-suggest\" id=\"g_search\">\n                    <div class=\"srchbg\">\n                        <span class=\"parent\">\n                            <input type=\"text\" class=\"txt j-flag\" style=\"...\" value=\"lijian\">\n                        </span>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"m-subnav m-subnav-up f-pr j-tflag\" v-if=\"isSubNav\">\n            <div class=\"shadow\"></div>\n        </div>\n        <div class=\"m-subnav j-tflaf\">\n            <div class=\"wrap f-pr\">\n                <ul class=\"nav\">\n                    <li><a><em>tuijian</em></a></li>\n                    <li><a><em>paihangban</em></a></li>\n                    <li>\n                        <!--todo: gei api result-->\n                    </li>\n                    <li><a><em>zhu bo dian tai</em></a></li>\n                    <li>\n                        <!--todo: get api result-->\n                    </li>\n                    <li><a><em>ge shou</em></a></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</template>\n\n<script>\n    export default {\n        name: 'top',\n        data() {\n            return {\n                msg: 'this is the header of demo',\n                isSubNav: false\n            }\n        }\n    }\n</script>\n\n<style scoped>\n    .m-top{\n        height: 70px;\n        background-position: 0 -80px;\n        background-repeat: repeat-x;\n    }\n    .wrap{\n        width:1100px;\n        margin:0 auto;\n    }\n    .m-top .logo {\n        float: left;\n        width: 176px;\n    }\n    .m-top .logo a {\n        float: left;\n        width: 157px;\n        height: 33px;\n        padding: 22px 20px 0 0;\n        background-position: 0 15px;\n        text-indent: -9999px;\n    }\n    .m-nav {\n        float: left;\n    }\n    .m-nav li {\n        position: relative;\n        background-position: right -300px;\n    }\n    .m-nav li, .m-nav li span, .m-nav a, .m-nav a em {\n        float: left;\n        height: 70px;\n        font-size: 14px;\n    }\n    .m-nav a {\n        position: relative;\n        padding-left: 2px;\n        text-align: center;\n        line-height: 76px;\n    }\n    .m-nav a em {\n        padding: 0 20px 0 18px;\n        overflow: hidden;\n        color: #ccc;\n        text-shadow: 0 1px 0 #1b1b1b;\n        cursor: pointer;\n    }\n    .m-nav a.z-slt {\n        position: relative;\n        margin: 0 -1px;\n        background-position: left -155px;\n    }\n    .m-nav a.z-slt em {\n        padding: 0 21px 0 19px;\n        background-position: right -155px;\n    }\n    .m-nav .cor {\n        display: none;\n    }\n    .m-nav a.z-slt .cor {\n        display: block;\n        position: absolute;\n        left: 50%;\n        top: 63px;\n        width: 14px;\n        height: 9px;\n        margin-left: -7px;\n        overflow: hidden;\n        background-position: -226px 0;\n    }\n    .m-msg {\n        position: relative;\n        float: right;\n        width: 34px;\n        height: 28px;\n        margin: 17px 0 0 20px;\n        background-position: 0 -49px;\n    }\n    .m-msg .bub {\n        position: absolute;\n        top: 0;\n        right: 0;\n    }\n    .u-bub {\n        display: block;\n        position: relative;\n        zoom: 1;\n        width: 22px;\n        height: 22px;\n        color: #fff;\n        text-align: center;\n        line-height: 23px;\n        font-weight: bold;\n    }\n    .m-srch .srchbg {\n        margin-top: 21px;\n        background-position: 0 -550px;\n    }\n    .m-srch, .m-srch .srchbg {\n        float: right;\n        width: 210px;\n        height: 31px;\n    }\n    .m-srch .parent {\n        display: block;\n        position: relative;\n        margin: 8px 0 0 33px;\n    }\n    .m-srch .parent input {\n        width: 90%;\n        margin: 0;\n        padding: 0;\n        background: transparent;\n        color: #fff;\n        outline: none;\n    }\n    .m-srch .parent input {\n        color: #333;\n    }\n    .m-subnav {\n        z-index: 90;\n        height: 35px;\n        background-position: 0 -230px;\n        background-repeat: repeat-x;\n    }\n    .m-subnav-up {\n        height: 5px;\n        overflow: hidden;\n    }\n    .m-subnav .wrap {\n        width: 911px;\n        padding-left: 168px;\n        margin: 0 auto;\n    }\n    .f-pr {\n        position: relative;\n        zoom: 1;\n    }\n    .m-subnav .nav li {\n        display: inline;\n        margin: 0 17px;\n    }\n    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {\n        float: left;\n        height: 35px;\n        overflow: hidden;\n    }\n    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {\n        float: left;\n        height: 35px;\n        overflow: hidden;\n    }\n    .m-subnav .nav a {\n        padding-left: 14px;\n    }\n    .m-subnav .nav a:hover, .m-subnav .nav a.z-slt {\n        background-position: left -268px;\n    }\n    .m-subnav .nav li, .m-subnav .nav a, .m-subnav .nav em {\n        float: left;\n        height: 35px;\n        overflow: hidden;\n    }\n    .m-subnav .nav em {\n        padding-right: 14px;\n        line-height: 37px;\n        color: #fff;\n        text-shadow: 0 1px 0 #650303;\n    }\n    .m-subnav .nav a:hover em, .m-subnav .nav a.z-slt em {\n        background-position: right -268px;\n    }\n</style>"], "sourceRoot": "" }]);
}, function (module, exports, __webpack_require__) {

  var hasDocument = typeof document !== 'undefined';

  if (typeof DEBUG !== 'undefined' && DEBUG) {
    if (!hasDocument) {
      throw new Error('vue-style-loader cannot be used in a non-browser environment. ' + "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
    }
  }

  var listToStyles = __webpack_require__(18);

  var stylesInDom = {};

  var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
  var singletonElement = null;
  var singletonCounter = 0;
  var isProduction = false;
  var noop = function noop() {};

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

  module.exports = function (parentId, list, _isProduction) {
    isProduction = _isProduction;

    var styles = listToStyles(parentId, list);
    addStylesToDom(styles);

    return function update(newList) {
      var mayRemove = [];
      for (var i = 0; i < styles.length; i++) {
        var item = styles[i];
        var domStyle = stylesInDom[item.id];
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
      if (newList) {
        styles = listToStyles(parentId, newList);
        addStylesToDom(styles);
      } else {
        styles = [];
      }
      for (var i = 0; i < mayRemove.length; i++) {
        var domStyle = mayRemove[i];
        if (domStyle.refs === 0) {
          for (var j = 0; j < domStyle.parts.length; j++) {
            domStyle.parts[j]();
          }
          delete stylesInDom[domStyle.id];
        }
      }
    };
  };

  function addStylesToDom(styles) {
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];
      if (domStyle) {
        domStyle.refs++;
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j](item.parts[j]);
        }
        for (; j < item.parts.length; j++) {
          domStyle.parts.push(addStyle(item.parts[j]));
        }
        if (domStyle.parts.length > item.parts.length) {
          domStyle.parts.length = item.parts.length;
        }
      } else {
        var parts = [];
        for (var j = 0; j < item.parts.length; j++) {
          parts.push(addStyle(item.parts[j]));
        }
        stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
      }
    }
  }

  function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    head.appendChild(styleElement);
    return styleElement;
  }

  function addStyle(obj) {
    var update, remove;
    var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');

    if (styleElement) {
      if (isProduction) {
        return noop;
      } else {
        styleElement.parentNode.removeChild(styleElement);
      }
    }

    if (isOldIE) {
      var styleIndex = singletonCounter++;
      styleElement = singletonElement || (singletonElement = createStyleElement());
      update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
      remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
    } else {
      styleElement = createStyleElement();
      update = applyToTag.bind(null, styleElement);
      remove = function remove() {
        styleElement.parentNode.removeChild(styleElement);
      };
    }

    update(obj);

    return function updateStyle(newObj) {
      if (newObj) {
        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
          return;
        }
        update(obj = newObj);
      } else {
        remove();
      }
    };
  }

  var replaceText = function () {
    var textStore = [];

    return function (index, replacement) {
      textStore[index] = replacement;
      return textStore.filter(Boolean).join('\n');
    };
  }();

  function applyToSingletonTag(styleElement, index, remove, obj) {
    var css = remove ? '' : obj.css;

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = replaceText(index, css);
    } else {
      var cssNode = document.createTextNode(css);
      var childNodes = styleElement.childNodes;
      if (childNodes[index]) styleElement.removeChild(childNodes[index]);
      if (childNodes.length) {
        styleElement.insertBefore(cssNode, childNodes[index]);
      } else {
        styleElement.appendChild(cssNode);
      }
    }
  }

  function applyToTag(styleElement, obj) {
    var css = obj.css;
    var media = obj.media;
    var sourceMap = obj.sourceMap;

    if (media) {
      styleElement.setAttribute('media', media);
    }

    if (sourceMap) {
      css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';

      css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent((0, _stringify2.default)(sourceMap)))) + ' */';
    }

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css;
    } else {
      while (styleElement.firstChild) {
        styleElement.removeChild(styleElement.firstChild);
      }
      styleElement.appendChild(document.createTextNode(css));
    }
  }
}, function (module, exports) {

  module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier) {
    var esModule;
    var scriptExports = rawScriptExports = rawScriptExports || {};

    var type = (0, _typeof3.default)(rawScriptExports.default);
    if (type === 'object' || type === 'function') {
      esModule = rawScriptExports;
      scriptExports = rawScriptExports.default;
    }

    var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports;

    if (compiledTemplate) {
      options.render = compiledTemplate.render;
      options.staticRenderFns = compiledTemplate.staticRenderFns;
    }

    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;
    if (moduleIdentifier) {
      hook = function hook(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        }

        if (injectStyles) {
          injectStyles.call(this, context);
        }

        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };

      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = injectStyles;
    }

    if (hook) {
      var functional = options.functional;
      var existing = functional ? options.render : options.beforeCreate;
      if (!functional) {
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      } else {
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return existing(h, context);
        };
      }
    }

    return {
      esModule: esModule,
      exports: scriptExports,
      options: options
    };
  };
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
  var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(9);

  function main() {
    var element = document.createElement("div");
    element.classList.add("app");
    return element;
  }

  document.body.appendChild(main());

  window.vm = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
    el: '#app',
    template: '<App/>',
    components: { App: __WEBPACK_IMPORTED_MODULE_1__App_vue__["a"] }
  });
}, function (module, exports) {

  var g;

  g = function () {
    return this;
  }();

  try {
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === "object") g = window;
  }

  module.exports = g;
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(19);
  var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_634dfcb0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(24);
  var disposed = false;
  function injectStyle(ssrContext) {
    if (disposed) return;
    __webpack_require__(10);
  }
  var normalizeComponent = __webpack_require__(6);

  var __vue_styles__ = injectStyle;

  var __vue_scopeId__ = null;

  var __vue_module_identifier__ = null;
  var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a"], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_634dfcb0_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a"], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
  Component.options.__file = "src/App.vue";
  if (Component.esModule && (0, _keys2.default)(Component.esModule).some(function (key) {
    return key !== "default" && key.substr(0, 2) !== "__";
  })) {
    console.error("named exports are not supported in *.vue files.");
  }
  if (Component.options.functional) {
    console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.");
  }

  if (true) {
    (function () {
      var hotAPI = __webpack_require__(0);
      hotAPI.install(__webpack_require__(1), false);
      if (!hotAPI.compatible) return;
      module.hot.accept();
      if (!module.hot.data) {
        hotAPI.createRecord("data-v-634dfcb0", Component.options);
      } else {
        hotAPI.reload("data-v-634dfcb0", Component.options);
      }
      module.hot.dispose(function (data) {
        disposed = true;
      });
    })();
  }

  __webpack_exports__["a"] = Component.exports;
}, function (module, exports, __webpack_require__) {
  var content = __webpack_require__(2);
  if (typeof content === 'string') content = [[module.i, content, '']];
  if (content.locals) module.exports = content.locals;

  var update = __webpack_require__(5)("c0fe353a", content, false);

  if (true) {
    if (!content.locals) {
      module.hot.accept(2, function () {
        var newContent = __webpack_require__(2);
        if (typeof newContent === 'string') newContent = [[module.i, newContent, '']];
        update(newContent);
      });
    }

    module.hot.dispose(function () {
      update();
    });
  }
}, function (module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(3)(true);

  exports.push([module.i, "*{\n    padding: 0px;\n    margin:0px;\n}\n.m-top, .m-top .logo a, .m-nav li, .m-nav li span, .m-nav a, .m-nav a em, .m-nav .cor, .m-nav .hot, .m-srch .srchbg, .m-subnav, .m-subnav .nav a, .m-subnav .nav em, .m-tophead, .m-mail, .m-tophead .head .mask, .m-msg {\n    background: url(" + __webpack_require__(12) + ") no-repeat 0 9999px;\n}\nli, s {\n    list-style: none;\n}\na {\n    text-decoration: none;\n    color: #333;\n}\nem, i {\n    font-style: normal;\n    text-align: left;\n    font-size: inherit;\n}\n.m-srch, .m-srch .srchbg {\n    float: right;\n    width: 210px;\n    height: 31px;\n}\n.f-pr {\n    position: relative;\n    zoom: 1;\n}\nbody, textarea, select, input, button {\n    font-size: 12px;\n    color: #333;\n    font-family: Arial, Helvetica, sans-serif;\n    -webkit-text-size-adjust: none;\n}\nimg, .txt {\n    border: 0;\n}\n.g-bd, .g-bd1, .g-bd2, .g-bd3, .g-bd4, .g-bd5, .g-bd6, .g-bd7 {\n    width: 980px;\n    /*min-height: 700px;*/\n    _height: 700px;\n    margin: 0 auto;\n    background-color: #fff;\n    border: 1px solid #d3d3d3;\n    border-width: 0 1px;\n}\n.s-bg, .v-hd2, .n-disk li {\n    background: url(" + __webpack_require__(13) + ") no-repeat 0 9999px;\n}\n.f-tdn, .f-tdn:hover {\n    text-decoration: none;\n}\n.f-ff2 {\n    font-family: \"Microsoft Yahei\", Arial, Helvetica, sans-serif;\n}\na, a *, .f-hand, .f-hand * {\n    cursor: pointer;\n}\na {\n    text-decoration: none;\n    color: #333;\n}\n.u-cover .bottom, .u-cover .msk, .n-musicsd .lst .avatar .msk {\n    background: url(" + __webpack_require__(14) + ") no-repeat;\n}\n.u-cover .icon-headset, .u-cover .icon-play {\n    display: inline-block;\n}\n.u-cover .ply, .u-cover .icon-headset, .u-cover .icon-play, .u-face .msk, .n-note .head .msk, .icn-vip, .icn-daren, .u-checkbox {\n    background: url(" + __webpack_require__(15) + ") no-repeat;\n}\n.f-thide {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    word-wrap: normal;\n}\n.u-btn2, .u-btn2 i, .u-btn2 .icn, .u-btni, .u-btni i, .u-tag, .u-tag i, .u-btni-addply .ply {\n    background: url(" + __webpack_require__(16) + ") no-repeat 0 9999px;\n}\n.u-icn, .u-title-1 .out .icon {\n    background: url(" + __webpack_require__(17) + ") no-repeat 0 9999px;\n}", "", { "version": 3, "sources": ["/vu/wangyi/src/style/common.css"], "names": [], "mappings": "AAAA;IACI,aAAa;IACb,WAAW;CACd;AACD;IACI,6DAA0D;CAC7D;AACD;IACI,iBAAiB;CACpB;AACD;IACI,sBAAsB;IACtB,YAAY;CACf;AACD;IACI,mBAAmB;IACnB,iBAAiB;IACjB,mBAAmB;CACtB;AACD;IACI,aAAa;IACb,aAAa;IACb,aAAa;CAChB;AACD;IACI,mBAAmB;IACnB,QAAQ;CACX;AACD;IACI,gBAAgB;IAChB,YAAY;IACZ,0CAA0C;IAC1C,+BAA+B;CAClC;AACD;IACI,UAAU;CACb;AACD;IACI,aAAa;IACb,sBAAsB;KACtB,cAAe;IACf,eAAe;IACf,uBAAuB;IACvB,0BAA0B;IAC1B,oBAAoB;CACvB;AACD;IACI,6DAAyD;CAC5D;AACD;IACI,sBAAsB;CACzB;AACD;IACI,6DAA6D;CAChE;AACD;IACI,gBAAgB;CACnB;AACD;IACI,sBAAsB;IACtB,YAAY;CACf;AACD;IACI,oDAAmD;CACtD;AACD;IACI,sBAAsB;CACzB;AACD;IACI,oDAAkD;CACrD;AACD;IACI,iBAAiB;IACjB,wBAAwB;IACxB,oBAAoB;IACpB,kBAAkB;CACrB;AACD;IACI,6DAA2D;CAC9D;AACD;IACI,6DAAwD;CAC3D", "file": "common.css", "sourcesContent": ["*{\n    padding: 0px;\n    margin:0px;\n}\n.m-top, .m-top .logo a, .m-nav li, .m-nav li span, .m-nav a, .m-nav a em, .m-nav .cor, .m-nav .hot, .m-srch .srchbg, .m-subnav, .m-subnav .nav a, .m-subnav .nav em, .m-tophead, .m-mail, .m-tophead .head .mask, .m-msg {\n    background: url(./../image/topbar.png) no-repeat 0 9999px;\n}\nli, s {\n    list-style: none;\n}\na {\n    text-decoration: none;\n    color: #333;\n}\nem, i {\n    font-style: normal;\n    text-align: left;\n    font-size: inherit;\n}\n.m-srch, .m-srch .srchbg {\n    float: right;\n    width: 210px;\n    height: 31px;\n}\n.f-pr {\n    position: relative;\n    zoom: 1;\n}\nbody, textarea, select, input, button {\n    font-size: 12px;\n    color: #333;\n    font-family: Arial, Helvetica, sans-serif;\n    -webkit-text-size-adjust: none;\n}\nimg, .txt {\n    border: 0;\n}\n.g-bd, .g-bd1, .g-bd2, .g-bd3, .g-bd4, .g-bd5, .g-bd6, .g-bd7 {\n    width: 980px;\n    /*min-height: 700px;*/\n    _height: 700px;\n    margin: 0 auto;\n    background-color: #fff;\n    border: 1px solid #d3d3d3;\n    border-width: 0 1px;\n}\n.s-bg, .v-hd2, .n-disk li {\n    background: url(./../image/index.png) no-repeat 0 9999px;\n}\n.f-tdn, .f-tdn:hover {\n    text-decoration: none;\n}\n.f-ff2 {\n    font-family: \"Microsoft Yahei\", Arial, Helvetica, sans-serif;\n}\na, a *, .f-hand, .f-hand * {\n    cursor: pointer;\n}\na {\n    text-decoration: none;\n    color: #333;\n}\n.u-cover .bottom, .u-cover .msk, .n-musicsd .lst .avatar .msk {\n    background: url(./../image/coverall.png) no-repeat;\n}\n.u-cover .icon-headset, .u-cover .icon-play {\n    display: inline-block;\n}\n.u-cover .ply, .u-cover .icon-headset, .u-cover .icon-play, .u-face .msk, .n-note .head .msk, .icn-vip, .icn-daren, .u-checkbox {\n    background: url(./../image/iconall.png) no-repeat;\n}\n.f-thide {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    word-wrap: normal;\n}\n.u-btn2, .u-btn2 i, .u-btn2 .icn, .u-btni, .u-btni i, .u-tag, .u-tag i, .u-btni-addply .ply {\n    background: url(./../image/button2.png) no-repeat 0 9999px;\n}\n.u-icn, .u-title-1 .out .icon {\n    background: url(./../image/icon.png) no-repeat 0 9999px;\n}"], "sourceRoot": "" }]);
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "c9718a6bf21a9a19b6a6816ac277db41.png";
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "5556d9cf1a530e492c5f1672a71918aa.png";
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "6cb90dbc94e586bfc5a53d5410b1cac2.png";
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "14cf6759baeb756f995698173f6ad09d.png";
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "b54144b2606be8a0168d76062ed0d826.png";
}, function (module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "76a5cfe1a1f5ee6eb2449a47b2603b40.png";
}, function (module, exports) {
  module.exports = function listToStyles(parentId, list) {
    var styles = [];
    var newStyles = {};
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var id = item[0];
      var css = item[1];
      var media = item[2];
      var sourceMap = item[3];
      var part = {
        id: parentId + ':' + i,
        css: css,
        media: media,
        sourceMap: sourceMap
      };
      if (!newStyles[id]) {
        styles.push(newStyles[id] = { id: id, parts: [part] });
      } else {
        newStyles[id].parts.push(part);
      }
    }
    return styles;
  };
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var __WEBPACK_IMPORTED_MODULE_0__components_top_vue__ = __webpack_require__(20);

  __webpack_exports__["a"] = {
    name: 'app',
    components: {
      top: __WEBPACK_IMPORTED_MODULE_0__components_top_vue__["a"]
    }
  };
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_vue__ = __webpack_require__(22);
  var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60cc1685_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_top_vue__ = __webpack_require__(23);
  var disposed = false;
  function injectStyle(ssrContext) {
    if (disposed) return;
    __webpack_require__(21);
  }
  var normalizeComponent = __webpack_require__(6);

  var __vue_styles__ = injectStyle;

  var __vue_scopeId__ = "data-v-60cc1685";

  var __vue_module_identifier__ = null;
  var Component = normalizeComponent(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_top_vue__["a"], __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60cc1685_hasScoped_true_node_modules_vue_loader_lib_selector_type_template_index_0_top_vue__["a"], __vue_styles__, __vue_scopeId__, __vue_module_identifier__);
  Component.options.__file = "src/components/top.vue";
  if (Component.esModule && (0, _keys2.default)(Component.esModule).some(function (key) {
    return key !== "default" && key.substr(0, 2) !== "__";
  })) {
    console.error("named exports are not supported in *.vue files.");
  }
  if (Component.options.functional) {
    console.error("[vue-loader] top.vue: functional components are not supported with templates, they should use render functions.");
  }

  if (true) {
    (function () {
      var hotAPI = __webpack_require__(0);
      hotAPI.install(__webpack_require__(1), false);
      if (!hotAPI.compatible) return;
      module.hot.accept();
      if (!module.hot.data) {
        hotAPI.createRecord("data-v-60cc1685", Component.options);
      } else {
        hotAPI.reload("data-v-60cc1685", Component.options);
      }
      module.hot.dispose(function (data) {
        disposed = true;
      });
    })();
  }

  __webpack_exports__["a"] = Component.exports;
}, function (module, exports, __webpack_require__) {
  var content = __webpack_require__(4);
  if (typeof content === 'string') content = [[module.i, content, '']];
  if (content.locals) module.exports = content.locals;

  var update = __webpack_require__(5)("2d5f439d", content, false);

  if (true) {
    if (!content.locals) {
      module.hot.accept(4, function () {
        var newContent = __webpack_require__(4);
        if (typeof newContent === 'string') newContent = [[module.i, newContent, '']];
        update(newContent);
      });
    }

    module.hot.dispose(function () {
      update();
    });
  }
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  __webpack_exports__["a"] = {
    name: 'top',
    data: function data() {
      return {
        msg: 'this is the header of demo',
        isSubNav: false
      };
    }
  };
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var render = function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('div', [_c('div', {
      staticClass: "m-top"
    }, [_c('div', {
      staticClass: "wrap"
    }, [_vm._m(0), _vm._v(" "), _c('ul', {
      staticClass: "m-nav j-tflag"
    }, [_c('li', {
      staticClass: "fst"
    }, [_c('span', {
      on: {
        "click": function click($event) {
          _vm.isSubNav = false;
        }
      }
    }, [_vm._m(1)])]), _vm._v(" "), _c('li', [_c('span', {
      on: {
        "click": function click($event) {
          _vm.isSubNav = true;
        }
      }
    })]), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)]), _vm._v(" "), _vm._m(4), _vm._v(" "), _vm._m(5)])]), _vm._v(" "), _vm.isSubNav ? _c('div', {
      staticClass: "m-subnav m-subnav-up f-pr j-tflag"
    }, [_c('div', {
      staticClass: "shadow"
    })]) : _vm._e(), _vm._v(" "), _vm._m(6)]);
  };
  var staticRenderFns = [function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('h1', {
      staticClass: "logo"
    }, [_c('a', {
      attrs: {
        "href": "/#"
      }
    }, [_vm._v("wangyi yun yinyue")])]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('a', {
      staticClass: "z-slt"
    }, [_c('em', [_vm._v("fa xian yinyue")]), _c('sub', {
      staticClass: "cor"
    })]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('li', [_c('span', [_c('a', {
      attrs: {
        "href": "#"
      }
    }, [_c('em', [_vm._v("peng you")]), _c('sub', {
      staticClass: "cor"
    }), _c('i', {
      staticClass: "dot u-icn u-icn-68 f-alpha j-t"
    })])])]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('li', [_c('span', [_c('a', {
      attrs: {
        "href": "#",
        "target": "_blank"
      }
    }, [_c('em', [_vm._v("shang cheng")])])])]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('a', {
      staticClass: "m-msg f-pr j-tflag",
      attrs: {
        "href": "#"
      }
    }, [_c('i', {
      staticClass: "bub -u-bub"
    })]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('div', {
      staticClass: "m-srch f-pr j-suggest",
      attrs: {
        "id": "g_search"
      }
    }, [_c('div', {
      staticClass: "srchbg"
    }, [_c('span', {
      staticClass: "parent"
    }, [_c('input', {
      staticClass: "txt j-flag",
      staticStyle: {},
      attrs: {
        "type": "text",
        "value": "lijian"
      }
    })])])]);
  }, function () {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('div', {
      staticClass: "m-subnav j-tflaf"
    }, [_c('div', {
      staticClass: "wrap f-pr"
    }, [_c('ul', {
      staticClass: "nav"
    }, [_c('li', [_c('a', [_c('em', [_vm._v("tuijian")])])]), _vm._v(" "), _c('li', [_c('a', [_c('em', [_vm._v("paihangban")])])]), _vm._v(" "), _c('li'), _vm._v(" "), _c('li', [_c('a', [_c('em', [_vm._v("zhu bo dian tai")])])]), _vm._v(" "), _c('li'), _vm._v(" "), _c('li', [_c('a', [_c('em', [_vm._v("ge shou")])])])])])]);
  }];
  render._withStripped = true;
  var esExports = { render: render, staticRenderFns: staticRenderFns };
  __webpack_exports__["a"] = esExports;
  if (true) {
    module.hot.accept();
    if (module.hot.data) {
      __webpack_require__(0).rerender("data-v-60cc1685", esExports);
    }
  }
}, function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  var render = function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_c('top')], 1);
  };
  var staticRenderFns = [];
  render._withStripped = true;
  var esExports = { render: render, staticRenderFns: staticRenderFns };
  __webpack_exports__["a"] = esExports;
  if (true) {
    module.hot.accept();
    if (module.hot.data) {
      __webpack_require__(0).rerender("data-v-634dfcb0", esExports);
    }
  }
}], [7]);
//# sourceMappingURL=main.bundle.js.map