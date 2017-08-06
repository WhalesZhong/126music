"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (modules) {
  var parentJsonpFunction = window["webpackJsonp"];
  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
    var moduleId,
        chunkId,
        i = 0,
        resolves = [],
        result;
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
    while (resolves.length) {
      resolves.shift()();
    }
    if (executeModules) {
      for (i = 0; i < executeModules.length; i++) {
        result = __webpack_require__(__webpack_require__.s = executeModules[i]);
      }
    }
    return result;
  };
  function hotDisposeChunk(chunkId) {
    delete installedChunks[chunkId];
  }
  var parentHotUpdateCallback = this["webpackHotUpdate"];
  this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) {
    hotAddUpdateChunk(chunkId, moreModules);
    if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
  };
  function hotDownloadUpdateChunk(chunkId) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
    head.appendChild(script);
  }
  function hotDownloadManifest(requestTimeout) {
    requestTimeout = requestTimeout || 10000;
    return new _promise2.default(function (resolve, reject) {
      if (typeof XMLHttpRequest === "undefined") return reject(new Error("No browser support"));
      try {
        var request = new XMLHttpRequest();
        var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
        request.open("GET", requestPath, true);
        request.timeout = requestTimeout;
        request.send(null);
      } catch (err) {
        return reject(err);
      }
      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (request.status === 0) {
          reject(new Error("Manifest request to " + requestPath + " timed out."));
        } else if (request.status === 404) {
          resolve();
        } else if (request.status !== 200 && request.status !== 304) {
          reject(new Error("Manifest request to " + requestPath + " failed."));
        } else {
          try {
            var update = JSON.parse(request.responseText);
          } catch (e) {
            reject(e);
            return;
          }
          resolve(update);
        }
      };
    });
  }
  var hotApplyOnUpdate = true;
  var hotCurrentHash = "6da3bafd3894c2dba196";var hotRequestTimeout = 10000;
  var hotCurrentModuleData = {};
  var hotCurrentChildModule;var hotCurrentParents = [];var hotCurrentParentsTemp = [];function hotCreateRequire(moduleId) {
    var me = installedModules[moduleId];
    if (!me) return __webpack_require__;
    var fn = function fn(request) {
      if (me.hot.active) {
        if (installedModules[request]) {
          if (installedModules[request].parents.indexOf(moduleId) < 0) installedModules[request].parents.push(moduleId);
        } else {
          hotCurrentParents = [moduleId];
          hotCurrentChildModule = request;
        }
        if (me.children.indexOf(request) < 0) me.children.push(request);
      } else {
        console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
        hotCurrentParents = [];
      }
      return __webpack_require__(request);
    };
    var ObjectFactory = function ObjectFactory(name) {
      return { configurable: true,
        enumerable: true,
        get: function get() {
          return __webpack_require__[name];
        },
        set: function set(value) {
          __webpack_require__[name] = value;
        }
      };
    };
    for (var name in __webpack_require__) {
      if (Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
        (0, _defineProperty2.default)(fn, name, ObjectFactory(name));
      }
    }
    fn.e = function (chunkId) {
      if (hotStatus === "ready") hotSetStatus("prepare");
      hotChunksLoading++;
      return __webpack_require__.e(chunkId).then(finishChunkLoading, function (err) {
        finishChunkLoading();
        throw err;
      });
      function finishChunkLoading() {
        hotChunksLoading--;
        if (hotStatus === "prepare") {
          if (!hotWaitingFilesMap[chunkId]) {
            hotEnsureUpdateChunk(chunkId);
          }
          if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            hotUpdateDownloaded();
          }
        }
      }
    };
    return fn;
  }
  function hotCreateModule(moduleId) {
    var hot = { _acceptedDependencies: {},
      _declinedDependencies: {},
      _selfAccepted: false,
      _selfDeclined: false,
      _disposeHandlers: [],
      _main: hotCurrentChildModule !== moduleId,
      active: true,
      accept: function accept(dep, callback) {
        if (typeof dep === "undefined") hot._selfAccepted = true;else if (typeof dep === "function") hot._selfAccepted = dep;else if ((typeof dep === "undefined" ? "undefined" : (0, _typeof3.default)(dep)) === "object") for (var i = 0; i < dep.length; i++) {
                hot._acceptedDependencies[dep[i]] = callback || function () {};
              } else hot._acceptedDependencies[dep] = callback || function () {};
      },
      decline: function decline(dep) {
        if (typeof dep === "undefined") hot._selfDeclined = true;else if ((typeof dep === "undefined" ? "undefined" : (0, _typeof3.default)(dep)) === "object") for (var i = 0; i < dep.length; i++) {
              hot._declinedDependencies[dep[i]] = true;
            } else hot._declinedDependencies[dep] = true;
      },
      dispose: function dispose(callback) {
        hot._disposeHandlers.push(callback);
      },
      addDisposeHandler: function addDisposeHandler(callback) {
        hot._disposeHandlers.push(callback);
      },
      removeDisposeHandler: function removeDisposeHandler(callback) {
        var idx = hot._disposeHandlers.indexOf(callback);
        if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
      },
      check: hotCheck,
      apply: hotApply,
      status: function status(l) {
        if (!l) return hotStatus;
        hotStatusHandlers.push(l);
      },
      addStatusHandler: function addStatusHandler(l) {
        hotStatusHandlers.push(l);
      },
      removeStatusHandler: function removeStatusHandler(l) {
        var idx = hotStatusHandlers.indexOf(l);
        if (idx >= 0) hotStatusHandlers.splice(idx, 1);
      },
      data: hotCurrentModuleData[moduleId]
    };
    hotCurrentChildModule = undefined;
    return hot;
  }
  var hotStatusHandlers = [];
  var hotStatus = "idle";
  function hotSetStatus(newStatus) {
    hotStatus = newStatus;
    for (var i = 0; i < hotStatusHandlers.length; i++) {
      hotStatusHandlers[i].call(null, newStatus);
    }
  }
  var hotWaitingFiles = 0;
  var hotChunksLoading = 0;
  var hotWaitingFilesMap = {};
  var hotRequestedFilesMap = {};
  var hotAvailableFilesMap = {};
  var hotDeferred;
  var hotUpdate, hotUpdateNewHash;
  function toModuleId(id) {
    var isNumber = +id + "" === id;
    return isNumber ? +id : id;
  }
  function hotCheck(apply) {
    if (hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
    hotApplyOnUpdate = apply;
    hotSetStatus("check");
    return hotDownloadManifest(hotRequestTimeout).then(function (update) {
      if (!update) {
        hotSetStatus("idle");
        return null;
      }
      hotRequestedFilesMap = {};
      hotWaitingFilesMap = {};
      hotAvailableFilesMap = update.c;
      hotUpdateNewHash = update.h;
      hotSetStatus("prepare");
      var promise = new _promise2.default(function (resolve, reject) {
        hotDeferred = { resolve: resolve,
          reject: reject
        };
      });
      hotUpdate = {};
      for (var chunkId in installedChunks) {
        hotEnsureUpdateChunk(chunkId);
      }
      if (hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
        hotUpdateDownloaded();
      }
      return promise;
    });
  }
  function hotAddUpdateChunk(chunkId, moreModules) {
    if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId]) return;
    hotRequestedFilesMap[chunkId] = false;
    for (var moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        hotUpdate[moduleId] = moreModules[moduleId];
      }
    }
    if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      hotUpdateDownloaded();
    }
  }
  function hotEnsureUpdateChunk(chunkId) {
    if (!hotAvailableFilesMap[chunkId]) {
      hotWaitingFilesMap[chunkId] = true;
    } else {
      hotRequestedFilesMap[chunkId] = true;
      hotWaitingFiles++;
      hotDownloadUpdateChunk(chunkId);
    }
  }
  function hotUpdateDownloaded() {
    hotSetStatus("ready");
    var deferred = hotDeferred;
    hotDeferred = null;
    if (!deferred) return;
    if (hotApplyOnUpdate) {
      _promise2.default.resolve().then(function () {
        return hotApply(hotApplyOnUpdate);
      }).then(function (result) {
        deferred.resolve(result);
      }, function (err) {
        deferred.reject(err);
      });
    } else {
      var outdatedModules = [];
      for (var id in hotUpdate) {
        if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          outdatedModules.push(toModuleId(id));
        }
      }
      deferred.resolve(outdatedModules);
    }
  }
  function hotApply(options) {
    if (hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
    options = options || {};
    var cb;
    var i;
    var j;
    var module;
    var moduleId;
    function getAffectedStuff(updateModuleId) {
      var outdatedModules = [updateModuleId];
      var outdatedDependencies = {};
      var queue = outdatedModules.slice().map(function (id) {
        return { chain: [id],
          id: id
        };
      });
      while (queue.length > 0) {
        var queueItem = queue.pop();
        var moduleId = queueItem.id;
        var chain = queueItem.chain;
        module = installedModules[moduleId];
        if (!module || module.hot._selfAccepted) continue;
        if (module.hot._selfDeclined) {
          return { type: "self-declined",
            chain: chain,
            moduleId: moduleId
          };
        }
        if (module.hot._main) {
          return { type: "unaccepted",
            chain: chain,
            moduleId: moduleId
          };
        }
        for (var i = 0; i < module.parents.length; i++) {
          var parentId = module.parents[i];
          var parent = installedModules[parentId];
          if (!parent) continue;
          if (parent.hot._declinedDependencies[moduleId]) {
            return { type: "declined",
              chain: chain.concat([parentId]),
              moduleId: moduleId,
              parentId: parentId
            };
          }
          if (outdatedModules.indexOf(parentId) >= 0) continue;
          if (parent.hot._acceptedDependencies[moduleId]) {
            if (!outdatedDependencies[parentId]) outdatedDependencies[parentId] = [];
            addAllToSet(outdatedDependencies[parentId], [moduleId]);
            continue;
          }
          delete outdatedDependencies[parentId];
          outdatedModules.push(parentId);
          queue.push({ chain: chain.concat([parentId]),
            id: parentId
          });
        }
      }
      return { type: "accepted",
        moduleId: updateModuleId,
        outdatedModules: outdatedModules,
        outdatedDependencies: outdatedDependencies
      };
    }
    function addAllToSet(a, b) {
      for (var i = 0; i < b.length; i++) {
        var item = b[i];
        if (a.indexOf(item) < 0) a.push(item);
      }
    }
    var outdatedDependencies = {};
    var outdatedModules = [];
    var appliedUpdate = {};
    var warnUnexpectedRequire = function warnUnexpectedRequire() {
      console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
    };
    for (var id in hotUpdate) {
      if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        moduleId = toModuleId(id);
        var result;
        if (hotUpdate[id]) {
          result = getAffectedStuff(moduleId);
        } else {
          result = { type: "disposed",
            moduleId: id
          };
        }
        var abortError = false;
        var doApply = false;
        var doDispose = false;
        var chainInfo = "";
        if (result.chain) {
          chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
        }
        switch (result.type) {case "self-declined":
            if (options.onDeclined) options.onDeclined(result);
            if (!options.ignoreDeclined) abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
            break;
          case "declined":
            if (options.onDeclined) options.onDeclined(result);
            if (!options.ignoreDeclined) abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
            break;
          case "unaccepted":
            if (options.onUnaccepted) options.onUnaccepted(result);
            if (!options.ignoreUnaccepted) abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
            break;
          case "accepted":
            if (options.onAccepted) options.onAccepted(result);
            doApply = true;
            break;
          case "disposed":
            if (options.onDisposed) options.onDisposed(result);
            doDispose = true;
            break;
          default:
            throw new Error("Unexception type " + result.type);
        }
        if (abortError) {
          hotSetStatus("abort");
          return _promise2.default.reject(abortError);
        }
        if (doApply) {
          appliedUpdate[moduleId] = hotUpdate[moduleId];
          addAllToSet(outdatedModules, result.outdatedModules);
          for (moduleId in result.outdatedDependencies) {
            if (Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
              if (!outdatedDependencies[moduleId]) outdatedDependencies[moduleId] = [];
              addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
            }
          }
        }
        if (doDispose) {
          addAllToSet(outdatedModules, [result.moduleId]);
          appliedUpdate[moduleId] = warnUnexpectedRequire;
        }
      }
    }
    var outdatedSelfAcceptedModules = [];
    for (i = 0; i < outdatedModules.length; i++) {
      moduleId = outdatedModules[i];
      if (installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted) outdatedSelfAcceptedModules.push({ module: moduleId,
          errorHandler: installedModules[moduleId].hot._selfAccepted
        });
    }
    hotSetStatus("dispose");
    (0, _keys2.default)(hotAvailableFilesMap).forEach(function (chunkId) {
      if (hotAvailableFilesMap[chunkId] === false) {
        hotDisposeChunk(chunkId);
      }
    });
    var idx;
    var queue = outdatedModules.slice();
    while (queue.length > 0) {
      moduleId = queue.pop();
      module = installedModules[moduleId];
      if (!module) continue;
      var data = {};
      var disposeHandlers = module.hot._disposeHandlers;
      for (j = 0; j < disposeHandlers.length; j++) {
        cb = disposeHandlers[j];
        cb(data);
      }
      hotCurrentModuleData[moduleId] = data;
      module.hot.active = false;
      delete installedModules[moduleId];
      for (j = 0; j < module.children.length; j++) {
        var child = installedModules[module.children[j]];
        if (!child) continue;
        idx = child.parents.indexOf(moduleId);
        if (idx >= 0) {
          child.parents.splice(idx, 1);
        }
      }
    }
    var dependency;
    var moduleOutdatedDependencies;
    for (moduleId in outdatedDependencies) {
      if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
        module = installedModules[moduleId];
        if (module) {
          moduleOutdatedDependencies = outdatedDependencies[moduleId];
          for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            dependency = moduleOutdatedDependencies[j];
            idx = module.children.indexOf(dependency);
            if (idx >= 0) module.children.splice(idx, 1);
          }
        }
      }
    }
    hotSetStatus("apply");
    hotCurrentHash = hotUpdateNewHash;
    for (moduleId in appliedUpdate) {
      if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
        modules[moduleId] = appliedUpdate[moduleId];
      }
    }
    var error = null;
    for (moduleId in outdatedDependencies) {
      if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
        module = installedModules[moduleId];
        moduleOutdatedDependencies = outdatedDependencies[moduleId];
        var callbacks = [];
        for (i = 0; i < moduleOutdatedDependencies.length; i++) {
          dependency = moduleOutdatedDependencies[i];
          cb = module.hot._acceptedDependencies[dependency];
          if (callbacks.indexOf(cb) >= 0) continue;
          callbacks.push(cb);
        }
        for (i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          try {
            cb(moduleOutdatedDependencies);
          } catch (err) {
            if (options.onErrored) {
              options.onErrored({ type: "accept-errored",
                moduleId: moduleId,
                dependencyId: moduleOutdatedDependencies[i],
                error: err
              });
            }
            if (!options.ignoreErrored) {
              if (!error) error = err;
            }
          }
        }
      }
    }
    for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      var item = outdatedSelfAcceptedModules[i];
      moduleId = item.module;
      hotCurrentParents = [moduleId];
      try {
        __webpack_require__(moduleId);
      } catch (err) {
        if (typeof item.errorHandler === "function") {
          try {
            item.errorHandler(err);
          } catch (err2) {
            if (options.onErrored) {
              options.onErrored({ type: "self-accept-error-handler-errored",
                moduleId: moduleId,
                error: err2,
                orginalError: err
              });
            }
            if (!options.ignoreErrored) {
              if (!error) error = err2;
            }
            if (!error) error = err;
          }
        } else {
          if (options.onErrored) {
            options.onErrored({ type: "self-accept-errored",
              moduleId: moduleId,
              error: err
            });
          }
          if (!options.ignoreErrored) {
            if (!error) error = err;
          }
        }
      }
    }
    if (error) {
      hotSetStatus("fail");
      return _promise2.default.reject(error);
    }
    hotSetStatus("idle");
    return new _promise2.default(function (resolve) {
      resolve(outdatedModules);
    });
  }
  var installedModules = {};
  var installedChunks = { 1: 0
  };
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = { i: moduleId,
      l: false,
      exports: {},
      hot: hotCreateModule(moduleId),
      parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
      children: []
    };
    modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
    module.l = true;
    return module.exports;
  }
  __webpack_require__.e = function requireEnsure(chunkId) {
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData === 0) {
      return new _promise2.default(function (resolve) {
        resolve();
      });
    }
    if (installedChunkData) {
      return installedChunkData[2];
    }
    var promise = new _promise2.default(function (resolve, reject) {
      installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[2] = promise;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;
    if (__webpack_require__.nc) {
      script.setAttribute("nonce", __webpack_require__.nc);
    }
    script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;
    function onScriptComplete() {
      script.onerror = script.onload = null;
      clearTimeout(timeout);
      var chunk = installedChunks[chunkId];
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
        }
        installedChunks[chunkId] = undefined;
      }
    };
    head.appendChild(script);
    return promise;
  };
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      (0, _defineProperty2.default)(exports, name, { configurable: false,
        enumerable: true,
        get: getter
      });
    }
  };
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module['default'];
    } : function getModuleExports() {
      return module;
    };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  __webpack_require__.p = "";
  __webpack_require__.oe = function (err) {
    console.error(err);throw err;
  };
  __webpack_require__.h = function () {
    return hotCurrentHash;
  };
})([]);
//# sourceMappingURL=polyfills.bundle.js.map