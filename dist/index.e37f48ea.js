// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fA0o9":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"aenu9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
/// new codes
var _viewJs = require("./view/view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _newTaskViewJs = require("./view/newTaskView.js");
var _newTaskViewJsDefault = parcelHelpers.interopDefault(_newTaskViewJs);
var _editTaskViewJs = require("./view/editTaskView.js");
var _editTaskViewJsDefault = parcelHelpers.interopDefault(_editTaskViewJs);
var _taskViewJs = require("./view/taskView.js");
var _taskViewJsDefault = parcelHelpers.interopDefault(_taskViewJs);
var _modelJs = require("./model.js");
var _listViewJs = require("./view/listView.js");
var _listViewJsDefault = parcelHelpers.interopDefault(_listViewJs);
var _categoryViewJs = require("./view/categoryView.js");
var _categoryViewJsDefault = parcelHelpers.interopDefault(_categoryViewJs);
var _searchViewJs = require("./view/searchView.js");
var _searchViewJsDefault = parcelHelpers.interopDefault(_searchViewJs);
"use strict";
// class Task {
//   id = (Date.now() + "").slice(-10);
//   doneDate;
//   constructor(title, date, cat, description = "", repeatCount = 0) {
//     this.title = title;
//     this.date = date;
//     this.cat = cat;
//     this.description = description;
//     this.status = false;
//     this.repeatCount = repeatCount;
//   }
// }
// class App {
//   #allTasks = [];
//   #sorted = false;
//   #allCats = ["Main"];
//   #currentId;
//   #currentCat = "Main";
//   constructor() {
//     this._getLocalStorage();
//     // category handlers
//     formCategory.addEventListener("submit", this._newCat.bind(this));
//     btnCategoryAdd.addEventListener("click", this._hideShowCatForm.bind(this));
//     btnCategoryDel.addEventListener("click", this._delCat.bind(this));
//     selectCategory.addEventListener("change", this._changeCat.bind(this));
//     // tabs  handler
//     tabsList.addEventListener("click", this._changeTab.bind(this));
//     // click on task handler
//     tabsBodyTasksLists.addEventListener("click", this._checkTask.bind(this));
//     tabsBodySearchRes.addEventListener("click", this._checkTask.bind(this));
//     // main buttons handlers
//     btnSort.addEventListener("click", this._sortList.bind(this));
//     btnSearch.addEventListener("click", this._hideShowSearchForm.bind(this));
//     btnNew.addEventListener("click", this._hideShowNewForm.bind(this));
//     // new task form handlers
//     btnNewClose.addEventListener("click", this._hideShowNewForm.bind(this));
//     btnNewSave.addEventListener("click", this._newTask.bind(this));
//     btnNewRep.addEventListener("click", this._addRepetition);
//     btnGCal.addEventListener("click", this._saveToGcal);
//     // edit task form handlers
//     btnEditClose.addEventListener("click", this._hideShowEditForm);
//     btnEditDel.addEventListener("click", this._delTask.bind(this));
//     btnEditSave.addEventListener("click", this._saveEdit.bind(this));
//     btnEditRep.addEventListener("click", this._addRepetition);
//     // theme toggle handler
//     btnThemeToggle.addEventListener("click", this._changeTheme);
//     // search section handler
//     btnSearchClose.addEventListener(
//       "click",
//       this._hideShowSearchForm.bind(this)
//     );
//     inputSearch.oninput = this._searchTask.bind(this);
//     // message handler
//     btnMessageClose.addEventListener("click", this._closeMessage);
//     overlay.addEventListener("click", this._closeMessage);
//   }
//   // localStorage functions
//   _setLocalStorage() {
//     localStorage.setItem("allTasks", JSON.stringify(this.#allTasks));
//     localStorage.setItem("allCats", JSON.stringify(this.#allCats));
//   }
//   _getLocalStorage() {
//     //  get last theme color from local storage and set it to site's theme
//     if (currentTheme === "dark") {
//       document.body.classList.toggle("dark-theme");
//       document.querySelector(".fa-moon").classList.add("hidden");
//       document.querySelector(".fa-sun").classList.remove("hidden");
//     } else if (currentTheme === "light") {
//       document.body.classList.toggle("light-theme");
//       document.querySelector(".fa-sun").classList.add("hidden");
//       document.querySelector(".fa-moon").classList.remove("hidden");
//     }
//     // show messages for empty lists
//     if (this.#allTasks.length === 0) {
//       let textMsg = `<div class="message--no-task">All tasks are done !</div>`;
//       let textMsg2 = `<div class="message--no-task">No task has been done !</div>`;
//       tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", textMsg);
//       tabsBodyTasksDone.insertAdjacentHTML("afterbegin", textMsg2);
//     }
//     // recive all tasks from local storage
//     const data = JSON.parse(localStorage.getItem("allTasks"));
//     if (!data) return;
//     // recive all categories  from local storage
//     const data2 = JSON.parse(localStorage.getItem("allCats"));
//     // save all tasks and categories to variables
//     this.#allCats = data2;
//     this.#allTasks = data;
//     // create category list from all categories
//     this._createCatsList(selectCategory);
//     // set current category to categoy selection value
//     this.#currentCat = selectCategory.value;
//     // show all tasks unsorted, category = "Main"
//     this._renderAllTasks(false, this.#allCats[0]);
//   }
//   // category functions
//   _newCat(e) {
//     e.preventDefault();
//     const newCat = document.querySelector(".input--category-title").value;
//     if (!newCat) return;
//     // formate new category to capital
//     const newCateFormatted =
//       newCat.at(0).toUpperCase() + newCat.slice(1).toLowerCase();
//     // check for duplicate category name
//     if (!this.#allCats.some((cat) => cat === newCateFormatted)) {
//       // add new category to all categories array
//       this.#allCats.push(newCateFormatted);
//       // hide category from
//       this._hideShowCatForm(e);
//       // save to local storage
//       this._setLocalStorage();
//       // create new category list
//       this._createCatsList(selectCategory);
//       // set category selection to new category
//       selectCategory.value = newCateFormatted;
//       // show new category tasks
//       this._changeCat(e);
//     } else {
//       this._alertError("duplicate cat");
//     }
//   }
//   _hideShowCatForm(e) {
//     e.preventDefault();
//     btnCategoryAdd.classList.toggle("rotate-z");
//     selectCategory.classList.toggle("hidden");
//     document.querySelector(".form--category").classList.toggle("hidden");
//     document.querySelector(".input--category-title").value = "";
//     document.querySelector(".input--category-title").focus();
//   }
//   _delCat(e) {
//     // check if "new category" form is visible
//     if (!formCategory.classList.contains("hidden")) return;
//     // check if user is deleting main category
//     if (selectCategory.value !== "Main") {
//       if (
//         confirm(
//           `Are you sure you want to delete "${selectCategory.value}" list?`
//         )
//       ) {
//         // delete "THAT" category from all categories array
//         this.#allCats.splice(
//           this.#allCats.findIndex((cat) => cat === selectCategory.value),
//           1
//         );
//         // set tasks' category was "THAT" category to "main" category
//         this.#allTasks.forEach((task) => {
//           if (task.cat === selectCategory.value) task.cat = "Main";
//         });
//         // save to local storage
//         this._setLocalStorage();
//         // create new category list
//         this._createCatsList(selectCategory);
//         // create new category list for new and edit forms
//         this._createCatsList(inputNewCat);
//         this._createCatsList(inputEditCat);
//         // show category tasks
//         this._changeCat(e);
//       }
//     } else {
//       return this._alertError("delete main");
//     }
//   }
//   _changeCat(e) {
//     e.preventDefault();
//     selectCategory.blur();
//     this.#currentCat = selectCategory.value;
//     // show all tasks unsorted from current category
//     this._renderAllTasks(false, this.#currentCat);
//   }
//   _createCatsList(place) {
//     // clean "place" content
//     place.innerHTML = "";
//     let html = "";
//     this.#allCats.forEach((cat) => {
//       html += `<option value="${cat}">${cat}</option>`;
//     });
//     place.insertAdjacentHTML("beforeend", html);
//   }
//   // task form functions
//   _newTask(e) {
//     e.preventDefault();
//     // check for alerts
//     // no title alert
//     if (document.querySelector(".input--new-title").value === "")
//       return this._alertError("no task title");
//     // no date alert
//     if (
//       document.querySelector(".input--new-repeat-count")?.value > 0 &&
//       document.querySelector(".input--new-date").value === ""
//     )
//       return this._alertError("no task date");
//     // wrong repeat count
//     if (document.querySelector(".input--new-repeat-count")?.value < 0)
//       return this._alertError("wrong repeat count");
//     // collect data from form
//     const newTaskTitle = document.querySelector(".input--new-title").value;
//     const newTaskDate = document.querySelector(".input--new-date").value;
//     const newTaskCat = document.querySelector(".input--new-cat").value
//       ? document.querySelector(".input--new-cat").value
//       : "Main";
//     const newTaskDescription = document.querySelector(".input--new-des").value;
//     const repeatPeriod = document.querySelector(".select--new-period")?.value;
//     let period;
//     if (repeatPeriod === "days") period = 1;
//     if (repeatPeriod === "weeks") period = 7;
//     if (repeatPeriod === "monthes") period = 30;
//     if (repeatPeriod === "years") period = 365;
//     // calculate repetition count
//     let repCount;
//     if (
//       !document.querySelector(".input--new-repeat-count") ||
//       document.querySelector(".input--new-repeat-count").value === ""
//     ) {
//       repCount = null;
//     } else {
//       repCount = document.querySelector(".input--new-repeat-count").value;
//     }
//     const newRepeatCount = repCount * period;
//     // create new task
//     let task = new Task(
//       newTaskTitle,
//       newTaskDate,
//       newTaskCat,
//       newTaskDescription,
//       newRepeatCount
//     );
//     // add new task to all tasks array
//     this.#allTasks.push(task);
//     // show all tasks unsorted from current category
//     this._renderAllTasks(false, newTaskCat);
//     // delete no task messages
//     document.querySelectorAll(".message--no-task").forEach((el) => el.remove());
//     // cleaning form inputs
//     document.querySelector(".input--new-title").value =
//       document.querySelector(".input--new-date").value =
//       document.querySelector(".input--new-cat").value =
//       document.querySelector(".input--new-des").value =
//         "";
//     document.querySelector(".input--new-repeat-count")
//       ? (document.querySelector(".input--new-repeat-count").value = "")
//       : "";
//     const el = document.querySelector(".form__field--repeat");
//     if (el) el.remove();
//     // hide new form
//     this._hideShowNewForm(e);
//     // save to localStorage
//     this._setLocalStorage();
//     // set category selection to current category
//     selectCategory.value = newTaskCat;
//   }
//   _hideShowNewForm(e) {
//     e.preventDefault();
//     // hide and show sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     tabsBodyNew.classList.toggle("hidden");
//     // add or remove max-hight
//     container.classList.toggle("container--max-height");
//     tabs.classList.toggle("tabs--max-height");
//     // focus on title
//     document.querySelector(".input--new-title").focus();
//     // create new category list for new forms from all categories array
//     if (tabsBodyTasksLists.classList.contains("hidden")) {
//       this._createCatsList(inputNewCat);
//       inputNewCat.value = this.#currentCat;
//     }
//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }
//     // cleaning new form inputs
//     if (tabsBodyNew.classList.contains("hidden")) {
//       document.querySelector(".input--new-title").value =
//         document.querySelector(".input--new-date").value =
//         document.querySelector(".input--new-cat").value =
//         document.querySelector(".input--new-des").value =
//           "";
//       document.querySelector(".input--new-repeat-count")
//         ? (document.querySelector(".input--new-repeat-count").value = "")
//         : "";
//       document.querySelector(".input--new-date").type = "text";
//       const el = document.querySelector(".form__field--repeat");
//       if (el) el.remove();
//     }
//   }
//   _hideShowEditForm(e) {
//     e.preventDefault();
//     // hide and show sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     tabsBodyEdit.classList.toggle("hidden");
//     // add or remove max-hight
//     container.classList.toggle("container--max-height");
//     tabs.classList.toggle("tabs--max-height");
//     // create new category list for edit form from all categories array
//     if (tabsBodyTasksLists.classList.contains("hidden")) {
//       this._createCatsList(inputEditCat);
//       inputNewCat.value = this.#currentCat;
//     }
//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }
//   }
//   _renderTask(task, status = false, search = false) {
//     const options = { month: "numeric", day: "numeric" };
//     const intlDate = task.date
//       ? new Intl.DateTimeFormat("en-US", options).format(new Date(task.date))
//       : "";
//     const isLate =
//       +new Date(task.date) / (1000 * 60 * 60 * 24) + 1 <
//       +new Date() / (1000 * 60 * 60 * 24);
//     let html = `
//       <div class="checkbox__body" data-id="${task.id}">
//         <input type="checkbox" ${
//           status === false ? "" : "checked"
//         } class="checkbox__input">
//         <div class="checkbox__label-title">${task.title}</div>
//         <div class="checkbox__label-date
//         ${isLate && !status ? "checkbox__label-late" : ""}">
//         ${status === false ? this._remainDays(task.date) : intlDate}</div>
//       </div>
//     `;
//     if (search) {
//       tabsBodySearchRes.insertAdjacentHTML("beforeend", html);
//     } else {
//       status === false
//         ? tabsBodyTasksUndone.insertAdjacentHTML("beforeend", html)
//         : tabsBodyTasksDone.insertAdjacentHTML("beforeend", html);
//     }
//   }
//   _renderAllTasks(sorted = false, cat) {
//     // clean undone and done tasks lists
//     document
//       .querySelectorAll(".tabs__body--tasks-list")
//       .forEach((list) => (list.innerHTML = ""));
//     // sort lists
//     let allTasks = sorted
//       ? this.#allTasks
//           .slice()
//           .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
//       : this.#allTasks;
//     // filter all tasks with current category
//     allTasks = allTasks.filter((task) => task.cat === cat);
//     let doneCount = 0;
//     let undoneCount = 0;
//     // show all tasks
//     allTasks.forEach((task) => {
//       this._renderTask(task, task.status);
//       // calc done count and undone count
//       task.status ? doneCount++ : undoneCount++;
//     });
//     if (allTasks.length === 0) {
//       let text = `<div class="message--no-task">All tasks are done!</div>`;
//       let text2 = `<div class="message--no-task">No task has been done!!</div>`;
//       tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", text);
//       tabsBodyTasksDone.insertAdjacentHTML("afterbegin", text2);
//     }
//     if (doneCount === 0 && undoneCount === 0) {
//       tabsDoneCount.textContent = "";
//       tabsUndoneCount.textContent = "";
//     } else {
//       tabsDoneCount.textContent = doneCount;
//       tabsUndoneCount.textContent = undoneCount;
//     }
//   }
//   _delTask(e) {
//     e.preventDefault();
//     if (confirm("Are you sure you want to delete this task")) {
//       // delete "THAT" task from all tasks array
//       this.#allTasks.splice(
//         this.#allTasks.findIndex((task) => task.id === this.#currentId),
//         1
//       );
//       // save all tasks to local storage
//       this._setLocalStorage();
//       // show all tasks
//       this._renderAllTasks(false, this.#currentCat);
//       // hide edit form
//       this._hideShowEditForm(e);
//     }
//   }
//   _saveEdit(e) {
//     e.preventDefault();
//     // check for alerts
//     // no title alert
//     if (document.querySelector(".input--edit-title").value === "")
//       return this._alertError("no task title");
//     // no date alert
//     if (
//       document.querySelector(".input--edit-repeat-count") &&
//       document.querySelector(".input--edit-date").value === ""
//     )
//       return this._alertError("no task date");
//     // wrong repetition count
//     if (document.querySelector(".input--edit-repeat-count")?.value <= 0)
//       return this._alertError("wrong repeat count");
//     // collect data from form inputs
//     const task = this.#allTasks.find((task) => task.id === this.#currentId);
//     task.title = document.querySelector(".input--edit-title").value;
//     task.date = document.querySelector(".input--edit-date").value;
//     task.cat = document.querySelector(".input--edit-cat").value;
//     task.description = document.querySelector(".input--edit-des").value;
//     // calculate repetition count
//     const repeatPeriod = document.querySelector(".select--edit-period")?.value;
//     let period;
//     if (repeatPeriod === "days") period = 1;
//     if (repeatPeriod === "weeks") period = 7;
//     if (repeatPeriod === "monthes") period = 30;
//     if (repeatPeriod === "years") period = 365;
//     task.repeatCount =
//       document.querySelector(".input--edit-repeat-count")?.value * period;
//     // save the task in local storage
//     this._setLocalStorage();
//     // show all tasks
//     this._renderAllTasks(false, this.#currentCat);
//     // hide edit form
//     this._hideShowEditForm(e);
//   }
//   _addRepetition(value) {
//     const el = document.querySelector(".form__field--repeat");
//     // find the status is "new" or "edit"
//     let status;
//     if (!tabsBodyNew.classList.contains("hidden")) {
//       status = "new";
//     } else {
//       status = "edit";
//     }
//     // change repeat btn style and text
//     if (value > 0) {
//       if (el) {
//         el.remove();
//       }
//       btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnEditRep.classList.add("move-repeat");
//     } else {
//       if (el) {
//         btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
//         btnNewRep.classList.remove("move-repeat");
//         btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
//         btnEditRep.classList.remove("move-repeat");
//         return el.remove();
//       }
//       btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnNewRep.classList.add("move-repeat");
//       btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
//       btnEditRep.classList.add("move-repeat");
//     }
//     // element of repeation
//     let html = `
//       <div class="form__field form__field--repeat">
//       <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
//         <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
//         value= ${value ? value : ""} />
//         <select class="select--period select--${status}-period ">
//           <option value="days">days</option>
//           <option value="weeks">weeks</option>
//           <option value="monthes">monthes</option>
//           <option value="years">years</option>
//         </select>
//       </div>
//     `;
//     // find exact place to implement
//     let place = !tabsBodyNew.classList.contains("hidden")
//       ? ".field--new-date"
//       : ".field--edit-date";
//     document.querySelector(place).insertAdjacentHTML("afterend", html);
//   }
//   _saveToGcal() {
//     const title = document.querySelector(".input--new-title").value;
//     const date = new Date(document.querySelector(".input--new-date").value);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, 0);
//     const day = String(date.getDate()).padStart(2, 0);
//     const des = document.querySelector(".input--new-des").value;
//     // let link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Zhttps://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${des}&dates=${year}${month}${day}T110000Z%2F${year}${month}${day}T110100Z`;
//     let link = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${year}${month}${day}%2F${year}${month}${day}&details=${des}&location=&text=${title}`;
//     window.open(link, "_blank");
//   }
//   // Search functions
//   _searchTask() {
//     // clean past data from html
//     tabsBodySearchRes.innerHTML = "";
//     // find all tasks match the search word
//     if (inputSearch.value !== "") {
//       const resTasks = this.#allTasks.filter((task) =>
//         task.title.includes(inputSearch.value)
//       );
//       resTasks.forEach((task) => this._renderTask(task, false, true));
//     }
//   }
//   _hideShowSearchForm(e) {
//     e.preventDefault();
//     // hide sections
//     btnThemeToggle.classList.toggle("hidden");
//     boxCat.classList.toggle("hidden");
//     tabsBodyTasksLists.classList.toggle("hidden");
//     buttons.classList.toggle("hidden");
//     document.querySelector(".tabs__list").classList.toggle("hidden");
//     tabsBodySearch.classList.toggle("hidden");
//     tabsBodySearchRes.classList.toggle("hidden");
//     // clean past search and focus on search input
//     inputSearch.value = "";
//     inputSearch.focus();
//     tabsBodySearchRes.innerHTML = "";
//     // add max and min height
//     container.classList.toggle("container--max-height");
//     // remove new category form and styles if user click on new task btn
//     if (!formCategory.classList.contains("hidden")) {
//       formCategory.classList.add("hidden");
//       selectCategory.classList.remove("hidden");
//       btnCategoryAdd.classList.remove("rotate-z");
//     }
//   }
//   // tasks list functions
//   _checkTask(e) {
//     const taskEl = e.target.closest(".checkbox__body");
//     if (!taskEl) return;
//     // find "THAT" task
//     const task = this.#allTasks.find((task) => task.id === taskEl.dataset.id);
//     // checkbox part
//     if (e.target.classList.contains("checkbox__input")) {
//       // change task status
//       task.status = !task.status;
//       // play audio if status is done
//       const checkboxAudio = document.querySelector("audio");
//       if (task.status) checkboxAudio.play();
//       // create date of complitition
//       task.doneDate = new Date();
//       // disappear task
//       taskEl.remove();
//       // create a new task if there is repeation and the status is done
//       if (task.status && task.repeatCount > 0) {
//         let newtask = new Task(
//           task.title,
//           new Date(
//             new Date(task.date).getTime() +
//               task.repeatCount * 24 * 60 * 60 * 1000
//           ),
//           task.cat,
//           task.description,
//           task.repeatCount
//         );
//         // save new task to all tasks array
//         this.#allTasks.push(newtask);
//       }
//       // save  to localStorage
//       this._setLocalStorage();
//       // show all tasks unsorted with 1 second delay
//       setTimeout(function () {
//         app._renderAllTasks(false, app.#currentCat);
//       }, 1000);
//       return;
//     }
//     // edit part
//     // show edit form
//     this._hideShowEditForm(e);
//     // fill edit form inputs
//     document.querySelector(".input--edit-title").value = task.title;
//     document.querySelector(".input--edit-date").valueAsDate = new Date(
//       task.date
//     );
//     document.querySelector(".input--edit-des").value = task.description;
//     if (task.repeatCount > 0) {
//       this._addRepetition(task.repeatCount);
//     } else {
//       if (document.querySelector(".form__field--repeat"))
//         document.querySelector(".form__field--repeat").remove();
//     }
//     inputEditCat.value = task.cat;
//     this.#currentId = task.id;
//     if (document.querySelector(".form__field--done-date"))
//       document.querySelector(".form__field--done-date").remove();
//     // add complitition to edit form
//     if (task.status) {
//       // add done date to task
//       task.doneDate = new Date(task.doneDate);
//       const options = {
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//       };
//       const intlDate = new Intl.DateTimeFormat("en-US", options).format(
//         task.doneDate
//       );
//       let htmlEl = `
//             <div class="form__field form__field--done-date">
//             <i class="far fa-check-circle form__label"></i>
//               <label class="form__label--done-date">Completed on ${intlDate}</label>
//             </div>
//           `;
//       document
//         .querySelector(".field--edit-cat")
//         .insertAdjacentHTML("beforebegin", htmlEl);
//     }
//   }
//   _changeTab(e) {
//     const target = e.target.closest(".tabs__item");
//     // check if clicked tab is current tab
//     if (!target.classList.contains("tabs--active")) {
//       // delete class "active--tab" from all tabs
//       document
//         .querySelectorAll(".tabs__item")
//         .forEach((tab) => tab.classList.remove("tabs--active"));
//       // add class "active--tab" to target tab
//       target.classList.add("tabs--active");
//       // show active tab's list
//       document
//         .querySelectorAll(".tabs__body--tasks-list")
//         .forEach((list) => list.classList.toggle("hidden"));
//       // show all tasks
//       this._renderAllTasks(false, this.#currentCat);
//     }
//   }
//   _sortList() {
//     this.#sorted = !this.#sorted;
//     this._renderAllTasks(this.#sorted, this.#currentCat);
//   }
//   _remainDays(date) {
//     // if there is no date, return nothing
//     if (!date) return "";
//     // create date from task's date and now
//     const now = +new Date();
//     const taskDate = new Date(date);
//     // calculate days between task's date and now
//     const remDays = Math.trunc(
//       (taskDate.getTime() - now) / (1000 * 60 * 60 * 24)
//     );
//     // retrun text or remain days
//     if (remDays < -1)
//       return new Intl.DateTimeFormat("en-US", {
//         month: "numeric",
//         day: "numeric",
//       }).format(taskDate);
//     if (remDays === -1) return "Yesterday";
//     if (remDays === 0) return "Today";
//     if (remDays === 1) return "Tomorrow";
//     if (remDays < 7)
//       return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
//         taskDate
//       );
//     if (remDays >= 7)
//       return new Intl.DateTimeFormat("en-US", {
//         month: "numeric",
//         day: "numeric",
//       }).format(taskDate);
//   }
//   // message functions
//   _alertError(err, showBtns) {
//     // add an overlay layer to whole view
//     overlay.classList.remove("hidden");
//     // remove hidden class form message
//     document.querySelector(".message").classList.remove("hidden");
//     // switch errors
//     let msg;
//     switch (err) {
//       case "no task title":
//         msg = "Please enter a title.";
//         break;
//       case "no task date":
//         msg = "Please enter a date.";
//         break;
//       case "wrong repeat count":
//         msg = "Please enter a positive number to repeat count.";
//         break;
//       case "delete main":
//         msg = `You can't delete "Main" category!`;
//         break;
//       case "duplicate cat":
//         msg = `This category is already exist!`;
//         break;
//       case "confirm to delete task":
//         msg = `Are you sure you want to delete this task?
//         `;
//         break;
//     }
//     let msgEl = `<div class="message__body--text">${msg}</div>`;
//     document
//       .querySelector(".message__body")
//       .insertAdjacentHTML("afterbegin", msgEl);
//     if (showBtns) messageBtns.classList.remove("hidden");
//   }
//   _closeMessage() {
//     document.querySelector(".overlay").classList.add("hidden");
//     document.querySelector(".message").classList.add("hidden");
//     document.querySelector(".message__body--text").remove();
//     messageBtns.classList.add("hidden");
//   }
//   // theme functions
//   _changeTheme() {
//     let theme;
//     if (prefersDarkScheme.matches) {
//       document.body.classList.toggle("light-theme");
//       theme = document.body.classList.contains("light-theme")
//         ? "light"
//         : "dark";
//     } else {
//       document.body.classList.toggle("dark-theme");
//       theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
//     }
//     // change theme icon
//     document.querySelector(".fa-sun").classList.toggle("hidden");
//     document.querySelector(".fa-moon").classList.toggle("hidden");
//     // save current theme to local storage
//     localStorage.setItem("theme", theme);
//   }
// }
// const app = new App();
const controlNewTask = function() {
    (0, _taskViewJsDefault.default).render();
    (0, _taskViewJsDefault.default).updateCategories(_modelJs.state.allCats, _modelJs.state.curCat);
};
const controlAddRepeat = function() {
    (0, _taskViewJsDefault.default).repeat();
};
const controlClose = function() {
    (0, _taskViewJsDefault.default).close();
};
const controlSaveTask = function() {
    const data = (0, _taskViewJsDefault.default).save();
    (0, _taskViewJsDefault.default).close();
    _modelJs.newTask(data);
    (0, _categoryViewJsDefault.default).changeCat(_modelJs.state.curCat);
    (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
};
const controlChangeTab = function(e) {
    (0, _listViewJsDefault.default).changeTab(e);
    (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
};
const controlCheckTask = function(id) {
    _modelJs.checkTask(id);
    // show all tasks on selected category
    (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
};
const controlEditTask = function(id) {
    // console.log(model.editTask(id));
    const task = _modelJs.editTask(id);
    (0, _taskViewJsDefault.default).render(task);
    (0, _taskViewJsDefault.default).updateCategories(_modelJs.state.allCats, task.cat);
};
const controlDelete = function(id) {
    if (_modelJs.deleteTask(id)) {
        (0, _taskViewJsDefault.default).close();
        (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
    }
};
// category section
const controlNewCategory = function() {
    (0, _categoryViewJsDefault.default).showCatForm();
};
const controlSaveCat = function() {
    // recieve data from categoryView
    const newCat = (0, _categoryViewJsDefault.default).newCategory();
    // check new category in model
    const newCatModel = _modelJs.newCat(newCat);
    if (!newCatModel) return;
    // update category list
    (0, _categoryViewJsDefault.default).updateCategories(_modelJs.state.allCats, _modelJs.state.curCat);
    // change category
    controlChangeCat(newCatModel);
    // hide new category form
    (0, _categoryViewJsDefault.default).showCatForm();
};
const controlChangeCat = function(cat = "Main") {
    // change category
    (0, _categoryViewJsDefault.default).changeCat(cat);
    // save current category
    _modelJs.state.curCat = cat;
    // show all tasks on selected category
    (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
};
const controlDelCat = function(cat) {
    _modelJs.delCat(cat);
    (0, _categoryViewJsDefault.default).updateCategories(_modelJs.state.allCats, _modelJs.state.curCat);
    controlChangeCat();
};
// search section
const controlSearchBtn = function() {
    (0, _searchViewJsDefault.default).render();
};
const controlSearchWord = function() {
    const word = (0, _searchViewJsDefault.default).searchWord();
    if (!word) return;
    const data = _modelJs.searchTask(word);
    console.log(data);
    data.forEach((task)=>{
        (0, _listViewJsDefault.default)._renderTask(task, true);
    });
};
const controlCloseSearch = function() {
    (0, _searchViewJsDefault.default).close();
};
//////////////////////////
const init = function() {
    // load data from local storage
    _modelJs.getLocalStorage();
    // show all tasks unsorted, category = "Main"
    (0, _listViewJsDefault.default).renderAllTasks(_modelJs.state.allTasks, false, _modelJs.state.curCat);
    // update all categories
    (0, _categoryViewJsDefault.default).updateCategories(_modelJs.state.allCats, _modelJs.state.curCat);
    // change tab
    (0, _listViewJsDefault.default).addHandlerChangeTab(controlChangeTab);
    // change cat
    (0, _categoryViewJsDefault.default).addHandlerChangeCat(controlChangeCat);
    // new cat
    (0, _categoryViewJsDefault.default).addHandlerBtnCat(controlNewCategory);
    (0, _categoryViewJsDefault.default).addHandlerSaveCat(controlSaveCat);
    // delete cat
    (0, _categoryViewJsDefault.default).addHandlerDelCat(controlDelCat);
    // new task form
    (0, _listViewJsDefault.default).addHandlerNewButton(controlNewTask);
    // add repeat section
    (0, _taskViewJsDefault.default).addHandlerRepeat(controlAddRepeat);
    // close form
    (0, _taskViewJsDefault.default).addHandlerClose(controlClose);
    // save new task
    (0, _taskViewJsDefault.default).addHandlerSave(controlSaveTask);
    // check task
    (0, _listViewJsDefault.default).addHandlerCheck(controlCheckTask);
    // edit task
    (0, _listViewJsDefault.default).addHandlerEdit(controlEditTask);
    // delete task
    (0, _taskViewJsDefault.default).addHandlerDelete(controlDelete);
    // search btn
    (0, _listViewJsDefault.default).addHandlerSearchButton(controlSearchBtn);
    //close search
    (0, _searchViewJsDefault.default).addHandlerCloseSearch(controlCloseSearch);
    //
    (0, _searchViewJsDefault.default).addHandlerSearch(controlSearchWord);
};
init();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./view/newTaskView.js":"dlZDs","./view/view.js":"4wVyX","./model.js":"Y4A21","./view/listView.js":"gsaRP","./view/categoryView.js":"iLAn5","./view/editTaskView.js":"aOo6R","./view/taskView.js":"7FIfZ","./view/searchView.js":"blwqv"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"dlZDs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class TaskView extends (0, _viewJsDefault.default) {
    // _parentEl = document.querySelector(".tabs__body--new");
    _parentEl = document.querySelector(".tabs__body--task");
    _childEl = document.querySelector(".input--cat");
    // show() {
    //   this.hide();
    //   this._parentEl.classList.remove("hidden");
    //   // add or remove max-hight
    //   this.container.classList.add("container--max-height");
    //   this.tabs.classList.add("tabs--max-height");
    // }
    // render(task = "") {
    //   // this.hide();
    //   // this._clearInputs();
    //   // this._parentEl.classList.remove("hidden");
    //   // this._parentEl.classList.remove("hidden");
    //   // // add or remove max-hight
    //   // this.container.classList.add("container--max-height");
    //   // this.tabs.classList.add("tabs--max-height");
    //   // // focus on title
    //   // document.querySelector(".input--new-title").focus();
    //   // //////////////////////////////////////////
    //   // new codes
    //   this.show();
    //   this._parentEl.innerHTML = "";
    //   const markup = `
    //   <form class="form form--edit" data-id="${task ? task.id : ""}">
    //       <i class="far fa-times button--close button--edit-close"></i>
    //       <div class="form__field">
    //       <i class="far fa-pen form__label"></i>
    //       <input
    //           class="input input--edit-title"
    //           type="text"
    //           placeholder="Title"
    //           value="${task ? task.title : ""}"
    //       />
    //       </div>
    //       <div class="form__field field--edit-date">
    //       <i class="far fa-calendar form__label"></i>
    //       <input class="input input--edit-date" type="date" value="${
    //         task ? task.date : ""
    //       }"/>
    //       <span class="button--rep button--edit-rep"
    //           ><i class="far fa-repeat-alt"></i> repeat</span
    //       >
    //       </div>
    //       <div class="form__field field--edit-cat">
    //       <i class="far fa-folder-open form__label"></i>
    //       <select class="input input--edit-cat">
    //       </select>
    //       </div>
    //       <div class="form__field">
    //       <i class="far fa-quote-left form__label"></i>
    //       <textarea
    //           class="input--des input--edit-des"
    //           cols="30"
    //           rows="3"
    //           placeholder="Description"
    //       >${task ? task.description : ""}</textarea>
    //       </div>
    //       <div class="form__field field--btns">
    //       <input
    //           class="button--save button--edit-save"
    //           type="submit"
    //           value="Save"
    //       />
    //       <button class="button--edit-del">Delete task</button>
    //       </div>
    //   </form>
    //   `;
    //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
    //   // this._childEl = document.querySelector(".input--edit-cat");
    // }
    _clearInputs() {
        // cleaning form inputs
        document.querySelector(".input--new-title").value = document.querySelector(".input--new-date").value = document.querySelector(".input--new-cat").value = document.querySelector(".input--new-des").value = "";
        document.querySelector(".input--new-repeat-count") && (document.querySelector(".input--new-repeat-count").value = "");
        const el = document.querySelector(".form__field--repeat");
        if (el) el.remove();
    }
    // save() {
    //   const title = document.querySelector(".input--new-title").value;
    //   const date = document.querySelector(".input--new-date").value;
    //   const cat = document.querySelector(".input--new-cat").value
    //     ? document.querySelector(".input--new-cat").value
    //     : "Main";
    //   const description = document.querySelector(".input--new-des").value;
    //   const repeatPeriod = document.querySelector(".select--new-period")?.value;
    //   let period;
    //   if (repeatPeriod === "days") period = 1;
    //   if (repeatPeriod === "weeks") period = 7;
    //   if (repeatPeriod === "monthes") period = 30;
    //   if (repeatPeriod === "years") period = 365;
    //   // calculate repetition count
    //   let repCount;
    //   if (
    //     !document.querySelector(".input--new-repeat-count") ||
    //     document.querySelector(".input--new-repeat-count").value === ""
    //   ) {
    //     repCount = null;
    //   } else {
    //     repCount = document.querySelector(".input--new-repeat-count").value;
    //   }
    //   const repeatCount = repCount * period;
    //   const taskData = [title, date, cat, description, repeatCount];
    //   return taskData;
    // }
    save() {
        const title = document.querySelector(".input--title").value;
        const date = document.querySelector(".input--date").value;
        const cat = document.querySelector(".input--cat").value ? document.querySelector(".input--cat").value : "Main";
        const description = document.querySelector(".input--des").value;
        const repeatPeriod = document.querySelector(".select--period")?.value;
        let period;
        if (repeatPeriod === "days") period = 1;
        if (repeatPeriod === "weeks") period = 7;
        if (repeatPeriod === "monthes") period = 30;
        if (repeatPeriod === "years") period = 365;
        // calculate repetition count
        let repCount;
        if (!document.querySelector(".input--repeat-count") || document.querySelector(".input--repeat-count").value === "") repCount = null;
        else repCount = document.querySelector(".input--repeat-count").value;
        const repeatCount = repCount * period;
        const taskData = [
            title,
            date,
            cat,
            description,
            repeatCount
        ];
        return taskData;
    }
    repeat(value) {
        const el = document.querySelector(".form__field--repeat");
        // find the status is "new" or "edit"
        let status;
        if (!this.tabsBodyNew.classList.contains("hidden")) status = "new";
        else status = "edit";
        // change repeat btn style and text
        if (value > 0) {
            if (el) el.remove();
            this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnEditRep.classList.add("move-repeat");
        } else {
            if (el) {
                this.btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
                this.btnNewRep.classList.remove("move-repeat");
                this.btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
                this.btnEditRep.classList.remove("move-repeat");
                return el.remove();
            }
            this.btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnNewRep.classList.add("move-repeat");
            this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnEditRep.classList.add("move-repeat");
        }
        // element of repeation
        let html = `
              <div class="form__field form__field--repeat">
              <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
                <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
                value="${value ? value : ""}" />
                <select class="select--period select--${status}-period ">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="monthes">monthes</option>
                  <option value="years">years</option>
                </select>
        
              </div>
        
            `;
        // find exact place to implement
        let place = !this.tabsBodyNew.classList.contains("hidden") ? ".field--new-date" : ".field--edit-date";
        document.querySelector(place).insertAdjacentHTML("afterend", html);
    }
    // handlers
    addHandlerRender(handler) {
        this.btnNew.addEventListener("click", handler);
    }
    // addHandlerSave(handler) {
    //   this._parentEl.addEventListener("click", function (e) {
    //     e.preventDefault();
    //     const btn = e.target.closest(".button--new-save");
    //     if (!btn) return;
    //     handler();
    //   });
    // }
    addHandlerRepeat(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--new-rep");
            if (!btn) return;
            handler();
        });
    }
}
exports.default = new TaskView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./view.js":"4wVyX"}],"4wVyX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class View {
    container = document.querySelector(".container");
    // category elements
    boxCat = document.querySelector(".box--cat");
    selectCategory = document.querySelector(".select--category");
    formCategory = document.querySelector(".form--category");
    btnCategoryAdd = document.querySelector(".button--category-add");
    btnCategoryDel = document.querySelector(".button--category-del");
    // tabs elements
    tabs = document.querySelector(".tabs");
    tabsList = document.querySelector(".tabs__list");
    tabsSection = document.querySelector(".tabs__section");
    tabsDoneCount = document.querySelector(".tabs--done-count");
    tabsUndoneCount = document.querySelector(".tabs--undone-count");
    tabsBodyTasksDone = document.querySelector(".tabs__body--tasks-done");
    tabsBodyTasksLists = document.querySelector(".tabs__body--tasks-lists");
    tabsBodyTasksUndone = document.querySelector(".tabs__body--tasks-undone");
    // search elements
    inputSearch = document.querySelector(".input--search");
    tabsBodySearch = document.querySelector(".tabs__body--search");
    btnSearchClose = document.querySelector(".button--search-close");
    tabsBodySearchRes = document.querySelector(".tabs__body--search-res");
    // new form elements
    btnNewRep = document.querySelector(".button--new-rep");
    inputNewCat = document.querySelector(".input--new-cat");
    tabsBodyNew = document.querySelector(".tabs__body--new");
    btnNewSave = document.querySelector(".button--new-save");
    btnNewClose = document.querySelector(".button--new-close");
    btnGCal = document.querySelector(".gcal");
    // edit form elements
    btnEditDel = document.querySelector(".button--edit-del");
    btnEditRep = document.querySelector(".button--edit-rep");
    inputEditCat = document.querySelector(".input--edit-cat");
    tabsBodyEdit = document.querySelector(".tabs__body--edit");
    btnEditSave = document.querySelector(".button--edit-save");
    btnEditClose = document.querySelector(".button--edit-close");
    // main buttons elements
    buttons = document.querySelector(".buttons");
    btnNew = document.querySelector(".button--new");
    btnSort = document.querySelector(".button--sort");
    btnSearch = document.querySelector(".button--search");
    // theme elements
    currentTheme = localStorage.getItem("theme");
    btnThemeToggle = document.querySelector(".button--theme-toggle");
    prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    // message elements
    overlay = document.querySelector(".overlay");
    messageBtns = document.querySelector(".message__buttons");
    btnMessageClose = document.querySelector(".button--message-close");
    //
    _parentEl;
    _childEl;
    close() {
        // show default section
        this.btnThemeToggle.classList.remove("hidden");
        this.boxCat.classList.remove("hidden");
        this.tabsBodyTasksLists.classList.remove("hidden");
        this.tabsList.classList.remove("hidden");
        this.buttons.classList.remove("hidden");
        // hide sections
        // this.tabsBodyNew.classList.add("hidden");
        // this.tabsBodyEdit.classList.add("hidden");
        this._parentEl.classList.add("hidden");
        this._childEl.classList.add("hidden");
        // clean elemets
        this._parentEl.innerHTML = "";
        // add or remove max-hight
        this.container.classList.remove("container--max-height");
        this.tabs.classList.remove("tabs--max-height");
    }
    show() {
        // hide rest parts
        this.btnThemeToggle.classList.add("hidden");
        this.boxCat.classList.add("hidden");
        this.tabsBodyTasksLists.classList.add("hidden");
        this.tabsList.classList.add("hidden");
        this.buttons.classList.add("hidden");
        this.tabsBodyNew.classList.add("hidden");
        // show parent element
        this._parentEl.classList.remove("hidden");
        // add or remove max-hight
        this.container.classList.add("container--max-height");
        this.tabs.classList.add("tabs--max-height");
    }
    // render with new and edit tags
    // render(task = "") {
    //   this.show();
    //   this._parentEl.innerHTML = "";
    //   // ${task ? "edit" : "new"}
    //   const markup = `
    //   <form class="form form--${task ? "edit" : "new"}" data-id="${
    //     task ? task.id : ""
    //   }">
    //       <i class="far fa-times button--close button--${
    //         task ? "edit" : "new"
    //       }-close"></i>
    //       <div class="form__field">
    //       <i class="far fa-pen form__label"></i>
    //       <input
    //           class="input input--${task ? "edit" : "new"}-title"
    //           type="text"
    //           placeholder="Title"
    //           value="${task ? task.title : ""}"
    //       />
    //       </div>
    //       <div class="form__field field--${task ? "edit" : "new"}-date">
    //       <i class="far fa-calendar form__label"></i>
    //       <input class="input input--${task ? "edit" : "new"}-date"  ${
    //     task
    //       ? `type="date" value="${task.date}`
    //       : `type="text"
    //     onfocus="(this.type='date')"
    //     placeholder="Date"`
    //   } "/>
    //       <span class="button--rep button--${task ? "edit" : "new"}-rep"
    //           ><i class="far fa-repeat-alt"></i> repeat</span
    //       >
    //       </div>
    //       <div class="form__field field--${task ? "edit" : "new"}-cat">
    //       <i class="far fa-folder-open form__label"></i>
    //       <select class="input input--${task ? "edit" : "new"}-cat">
    //       </select>
    //       </div>
    //       <div class="form__field">
    //       <i class="far fa-quote-left form__label"></i>
    //       <textarea
    //           class="input--des input--${task ? "edit" : "new"}-des"
    //           cols="30"
    //           rows="3"
    //           placeholder="Description"
    //       >${task ? task.description : ""}</textarea>
    //       </div>
    //       <div class="form__field field--btns">
    //       <input
    //           class="button--save button--${task ? "edit" : "new"}-save"
    //           type="submit"
    //           value="Save"
    //       />
    //       ${
    //         task
    //           ? `<button class="button--edit-del">Delete task</button>
    //       </div>`
    //           : ""
    //       }
    //   </form>
    //   `;
    //   this._parentEl.insertAdjacentHTML("afterbegin", markup);
    //   if (task) this._childEl = document.querySelector(".input--edit-cat");
    // }
    addHandlerClose(handler) {
        this._parentEl.addEventListener("click", function(e) {
            const btn = e.target.closest(".fa-times");
            if (btn) handler();
        });
    }
    updateCategories(cats, curCate) {
        // clean "place" content
        if (!this._childEl) return;
        this._childEl.innerHTML = "";
        let html = "";
        cats.forEach((cat)=>{
            html += `<option ${cat === curCate ? "selected" : ""} value="${cat}">${cat}</option>`;
        });
        this._childEl.insertAdjacentHTML("beforeend", html);
    }
}
exports.default = View;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Y4A21":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "newTask", ()=>newTask);
parcelHelpers.export(exports, "newCat", ()=>newCat);
parcelHelpers.export(exports, "delCat", ()=>delCat);
parcelHelpers.export(exports, "getLocalStorage", ()=>getLocalStorage);
parcelHelpers.export(exports, "checkTask", ()=>checkTask);
parcelHelpers.export(exports, "editTask", ()=>editTask);
parcelHelpers.export(exports, "deleteTask", ()=>deleteTask);
parcelHelpers.export(exports, "searchTask", ()=>searchTask);
const state = {
    allTasks: [],
    allCats: [
        "Main",
        "a"
    ],
    curCat: "Main",
    task: {},
    search: {
        query: "",
        results: []
    }
};
class Task {
    id = (Date.now() + "").slice(-10);
    doneDate;
    constructor(title, date, cat, description = "", repeatCount = 0){
        this.title = title;
        this.date = date;
        this.cat = cat;
        this.description = description;
        this.status = false;
        this.repeatCount = repeatCount;
    }
}
const newTask = function(data) {
    state.curCat = data[2];
    const id = data[5];
    if (!id) {
        let task = new Task(...data);
        state.allTasks.push(task);
    } else {
        const task1 = state.allTasks.find((task)=>task.id === id);
        task1.title = data[0];
        task1.date = data[1];
        task1.cat = data[2];
        task1.description = data[3];
        task1.repeatCount = data[4];
    }
    _setLocalStorage();
    return state;
};
const newCat = function(newCat1) {
    // formate new category to capital
    const newCateFormatted = newCat1.at(0).toUpperCase() + newCat1.slice(1).toLowerCase();
    // check for duplicate category name
    if (!state.allCats.some((cat)=>cat === newCateFormatted)) {
        // add new category to all categories array
        state.allCats.push(newCateFormatted);
        //   // hide category from
        //   this._hideShowCatForm(e);
        // save to local storage
        _setLocalStorage();
        //   // create new category list
        //   this._createCatsList(selectCategory);
        // // set category selection to new category
        // this.selectCategory.value = newCateFormatted;
        // // show new category tasks
        // this.changeCat();
        return newCateFormatted;
    } else //   this._alertError("duplicate cat");
    console.log("duplicate cat");
};
const delCat = function(cat) {
    // check if user is deleting main category
    if (cat !== "Main") {
        if (confirm(`Are you sure you want to delete "${cat}" list?`)) {
            // delete "THAT" category from all categories array
            state.allCats.splice(state.allCats.findIndex((c)=>c === cat), 1);
            // set tasks' category was "THAT" category to "main" category
            state.allTasks.forEach((task)=>{
                if (task.cat === cat) task.cat = "Main";
            });
            //   // save to local storage
            _setLocalStorage();
        //   // create new category list
        //   this._createCatsList(selectCategory);
        //   // create new category list for new and edit forms
        //   this._createCatsList(inputNewCat);
        //   this._createCatsList(inputEditCat);
        //   // show category tasks
        //   this._changeCat(e);
        }
    } else // return this._alertError("delete main");
    console.log("erorr delete cat");
};
// localStorage functions
const _setLocalStorage = function() {
    localStorage.setItem("allTasks", JSON.stringify(state.allTasks));
    localStorage.setItem("allCats", JSON.stringify(state.allCats));
};
const getLocalStorage = function() {
    //  get last theme color from local storage and set it to site's theme
    //   if (currentTheme === "dark") {
    //     document.body.classList.toggle("dark-theme");
    //     document.querySelector(".fa-moon").classList.add("hidden");
    //     document.querySelector(".fa-sun").classList.remove("hidden");
    //   } else if (currentTheme === "light") {
    //     document.body.classList.toggle("light-theme");
    //     document.querySelector(".fa-sun").classList.add("hidden");
    //     document.querySelector(".fa-moon").classList.remove("hidden");
    //   }
    //   // show messages for empty lists
    //   if (this.#allTasks.length === 0) {
    //     let textMsg = `<div class="message--no-task">All tasks are done !</div>`;
    //     let textMsg2 = `<div class="message--no-task">No task has been done !</div>`;
    //     tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", textMsg);
    //     tabsBodyTasksDone.insertAdjacentHTML("afterbegin", textMsg2);
    //   }
    // recive all tasks from local storage
    const data = JSON.parse(localStorage.getItem("allTasks"));
    if (!data) return;
    state.allTasks = data;
    // recive all categories  from local storage
    const data2 = JSON.parse(localStorage.getItem("allCats"));
    if (Array.isArray(data2) && data2.length === 0) return;
    // save all tasks and categories to variables
    state.allCats = data2;
//   // create category list from all categories
//   this._createCatsList(selectCategory);
//   // set current category to categoy selection value
//   this.#currentCat = selectCategory.value;
};
const checkTask = function(id) {
    const task3 = state.allTasks.find((task)=>task.id === id);
    task3.status = !task3.status;
    // save in local storage
    _setLocalStorage();
};
const editTask = function(id) {
    const task4 = state.allTasks.find((task)=>task.id === id);
    return task4;
};
const deleteTask = function(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        const index = state.allTasks.findIndex((task)=>task.id === id);
        state.allTasks.splice(index, 1);
        _setLocalStorage();
        return true;
    }
};
const searchTask = function(word) {
    const resTasks = state.allTasks.filter((task)=>task.title.includes(word));
    return resTasks;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gsaRP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class ListView extends (0, _viewJsDefault.default) {
    _parentEl = document.querySelector(".tabs__body--tasks-lists");
    _remainDays(date) {
        // if there is no date, return nothing
        if (!date) return "";
        // create date from task's date and now
        const now = +new Date();
        const taskDate = new Date(date);
        // calculate days between task's date and now
        const remDays = Math.trunc((taskDate.getTime() - now) / 86400000);
        // retrun text or remain days
        if (remDays < -1) return new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            day: "numeric"
        }).format(taskDate);
        if (remDays === -1) return "Yesterday";
        if (remDays === 0) return "Today";
        if (remDays === 1) return "Tomorrow";
        if (remDays < 7) return new Intl.DateTimeFormat("en-US", {
            weekday: "short"
        }).format(taskDate);
        if (remDays >= 7) return new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            day: "numeric"
        }).format(taskDate);
    }
    _renderTask(task, search = false) {
        const options = {
            month: "numeric",
            day: "numeric"
        };
        const intlDate = task.date ? new Intl.DateTimeFormat("en-US", options).format(new Date(task.date)) : "";
        const status = task.status;
        const isLate = +new Date(task.date) / 86400000 + 1 < +new Date() / 86400000;
        let html = `
      <div class="checkbox__body" data-id="${task.id}">
        <input type="checkbox" ${status === false ? "" : "checked"} class="checkbox__input">

        <div class="checkbox__label-title">${task.title}</div>

        <div class="checkbox__label-date
        ${isLate && !status ? "checkbox__label-late" : ""}">
        ${status === false ? this._remainDays(task.date) : intlDate}</div>

      </div>
    `;
        // console.log(tabsBodyTasksUndone);
        // ${status === false ? this._remainDays(task.date) : intlDate}</div>
        if (search) this.tabsBodySearchRes.insertAdjacentHTML("beforeend", html);
        else status === false ? this.tabsBodyTasksUndone.insertAdjacentHTML("beforeend", html) : this.tabsBodyTasksDone.insertAdjacentHTML("beforeend", html);
    }
    renderAllTasks(tasks, sorted = false, cat = "Main") {
        // clean undone and done tasks lists
        document.querySelectorAll(".tabs__body--tasks-list").forEach((list)=>list.innerHTML = "");
        // sort lists
        let allTasks = sorted ? tasks.slice().sort((a, b)=>Date.parse(a.date) - Date.parse(b.date)) : tasks;
        // filter all tasks with current category
        allTasks = allTasks.filter((task)=>task.cat === cat);
        let doneCount = 0;
        let undoneCount = 0;
        // show all tasks
        allTasks.forEach((task)=>{
            this._renderTask(task);
            // calc done count and undone count
            task.status ? doneCount++ : undoneCount++;
        });
        if (allTasks.length === 0) {
            let text = `<div class="message--no-task">All tasks are done!</div>`;
            let text2 = `<div class="message--no-task">No task has been done!!</div>`;
            this.tabsBodyTasksUndone.insertAdjacentHTML("afterbegin", text);
            this.tabsBodyTasksDone.insertAdjacentHTML("afterbegin", text2);
        }
        if (doneCount === 0 && undoneCount === 0) {
            this.tabsDoneCount.textContent = "";
            this.tabsUndoneCount.textContent = "";
        } else {
            this.tabsDoneCount.textContent = doneCount;
            this.tabsUndoneCount.textContent = undoneCount;
        }
    }
    changeTab(e) {
        const target = e.target.closest(".tabs__item");
        // check if clicked tab is current tab
        if (!target.classList.contains("tabs--active")) {
            // delete class "active--tab" from all tabs
            document.querySelectorAll(".tabs__item").forEach((tab)=>tab.classList.remove("tabs--active"));
            // add class "active--tab" to target tab
            target.classList.add("tabs--active");
            // show active tab's list
            document.querySelectorAll(".tabs__body--tasks-list").forEach((list)=>list.classList.toggle("hidden"));
        }
    }
    // handlers
    addHandlerChangeTab(handler) {
        this.tabsList.addEventListener("click", function(e) {
            e.preventDefault();
            handler(e);
        });
    }
    addHandlerCheck(handler) {
        this._parentEl.addEventListener("click", function(e) {
            const btn = e.target.closest(".checkbox__input");
            if (!btn) return;
            const id = e.target.closest(".checkbox__body").dataset.id;
            // play audio if status is done
            const checkboxAudio = document.querySelector("audio");
            if (btn.checked) checkboxAudio.play();
            handler(id);
        });
    }
    addHandlerEdit(handler) {
        this._parentEl.addEventListener("click", function(e) {
            if (e.target.classList.contains("checkbox__input")) return;
            const btn = e.target.closest(".checkbox__body");
            if (!btn) return;
            const id = e.target.closest(".checkbox__body").dataset.id;
            handler(id);
        });
    }
    addHandlerNewButton(handler) {
        this.btnNew.addEventListener("click", handler);
    }
    addHandlerSearchButton(handler) {
        this.btnSearch.addEventListener("click", handler);
    }
}
exports.default = new ListView();

},{"./view.js":"4wVyX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iLAn5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class CategoryView extends (0, _viewJsDefault.default) {
    _parentEl = this.selectCategory;
    _childEl = this.selectCategory;
    changeCat(cat) {
        this.selectCategory.blur();
        this.selectCategory.value = cat;
        return cat;
    }
    showCatForm() {
        this.btnCategoryAdd.classList.toggle("rotate-z");
        this.selectCategory.classList.toggle("hidden");
        document.querySelector(".form--category").classList.toggle("hidden");
        document.querySelector(".input--category-title").value = "";
        document.querySelector(".input--category-title").focus();
    }
    newCategory() {
        const newCat = document.querySelector(".input--category-title").value;
        if (newCat) return newCat;
    // // formate new category to capital
    // const newCateFormatted =
    //   newCat.at(0).toUpperCase() + newCat.slice(1).toLowerCase();
    // check for duplicate category name
    // if (!cats.some((cat) => cat === newCateFormatted)) {
    //   //   // add new category to all categories array
    //   //   this.#allCats.push(newCateFormatted);
    //   //   // hide category from
    //   //   this._hideShowCatForm(e);
    //   //   // save to local storage
    //   //   this._setLocalStorage();
    //   //   // create new category list
    //   //   this._createCatsList(selectCategory);
    //   // set category selection to new category
    //   this.selectCategory.value = newCateFormatted;
    //   // show new category tasks
    //   this.changeCat();
    //   return newCateFormatted;
    // } else {
    //   //   this._alertError("duplicate cat");
    //   console.log("duplicate cat");
    // }
    }
    delCategory(cat) {}
    // handlers
    addHandlerChangeCat(handler) {
        this.selectCategory.addEventListener("change", function() {
            const cat = document.querySelector(".select--category").value;
            handler(cat);
        });
    }
    addHandlerBtnCat(handler) {
        this.btnCategoryAdd.addEventListener("click", handler);
    }
    addHandlerSaveCat(handler) {
        this.formCategory.addEventListener("submit", function(e) {
            e.preventDefault();
            handler();
        });
    }
    addHandlerDelCat(handler) {
        this.btnCategoryDel.addEventListener("click", function(e) {
            e.preventDefault();
            const cat = document.querySelector(".select--category").value;
            // check if "new category" form is visible
            if (!document.querySelector(".form--category").classList.contains("hidden")) return;
            handler(cat);
        });
    }
}
exports.default = new CategoryView();

},{"./view.js":"4wVyX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aOo6R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class EditView extends (0, _viewJsDefault.default) {
    //   _parentEl = document.querySelector(".tabs__body--edit");
    _parentEl = document.querySelector(".tabs__body--task");
    _childEl;
    _data;
    //   render(task) {
    //     this.show();
    //     this._parentEl.innerHTML = "";
    //     const markup = `
    //     <form class="form form--edit" data-id="${task.id}">
    //         <i class="far fa-times button--close button--edit-close"></i>
    //         <div class="form__field">
    //         <i class="far fa-pen form__label"></i>
    //         <input
    //             class="input input--edit-title"
    //             type="text"
    //             placeholder="Title"
    //             value="${task.title}"
    //         />
    //         </div>
    //         <div class="form__field field--edit-date">
    //         <i class="far fa-calendar form__label"></i>
    //         <input class="input input--edit-date" type="date" value="${task.date}"/>
    //         <span class="button--rep button--edit-rep"
    //             ><i class="far fa-repeat-alt"></i> repeat</span
    //         >
    //         </div>
    //         <div class="form__field field--edit-cat">
    //         <i class="far fa-folder-open form__label"></i>
    //         <select class="input input--edit-cat">
    //         </select>
    //         </div>
    //         <div class="form__field">
    //         <i class="far fa-quote-left form__label"></i>
    //         <textarea
    //             class="input--des input--edit-des"
    //             cols="30"
    //             rows="3"
    //             placeholder="Description"
    //         >${task.description}</textarea>
    //         </div>
    //         <div class="form__field field--btns">
    //         <input
    //             class="button--save button--edit-save"
    //             type="submit"
    //             value="Save"
    //         />
    //         <button class="button--edit-del">Delete task</button>
    //         </div>
    //     </form>
    //     `;
    //     this._parentEl.insertAdjacentHTML("afterbegin", markup);
    //     this._childEl = document.querySelector(".input--edit-cat");
    //   }
    delete() {}
    save() {
        const title = document.querySelector(".input--new-title").value;
        const date = document.querySelector(".input--new-date").value;
        const cat = document.querySelector(".input--new-cat").value ? document.querySelector(".input--new-cat").value : "Main";
        const description = document.querySelector(".input--new-des").value;
        const repeatPeriod = document.querySelector(".select--new-period")?.value;
        let period;
        if (repeatPeriod === "days") period = 1;
        if (repeatPeriod === "weeks") period = 7;
        if (repeatPeriod === "monthes") period = 30;
        if (repeatPeriod === "years") period = 365;
        // calculate repetition count
        let repCount;
        if (!document.querySelector(".input--new-repeat-count") || document.querySelector(".input--new-repeat-count").value === "") repCount = null;
        else repCount = document.querySelector(".input--new-repeat-count").value;
        const repeatCount = repCount * period;
        const taskData = [
            title,
            date,
            cat,
            description,
            repeatCount
        ];
        return taskData;
    }
    repeat(value) {
        const el = document.querySelector(".form__field--repeat");
        // find the status is "new" or "edit"
        let status;
        if (!this.tabsBodyNew.classList.contains("hidden")) status = "new";
        else status = "edit";
        // change repeat btn style and text
        if (value > 0) {
            if (el) el.remove();
            this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnEditRep.classList.add("move-repeat");
        } else {
            if (el) {
                this.btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
                this.btnNewRep.classList.remove("move-repeat");
                this.btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
                this.btnEditRep.classList.remove("move-repeat");
                return el.remove();
            }
            this.btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnNewRep.classList.add("move-repeat");
            this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
            this.btnEditRep.classList.add("move-repeat");
        }
        // element of repeation
        let html = `
              <div class="form__field form__field--repeat">
              <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
                <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
                value="${value ? value : ""}" />
                <select class="select--period select--${status}-period ">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="monthes">monthes</option>
                  <option value="years">years</option>
                </select>
        
              </div>
        
            `;
        // find exact place to implement
        let place = !this.tabsBodyNew.classList.contains("hidden") ? ".field--new-date" : ".field--edit-date";
        document.querySelector(place).insertAdjacentHTML("afterend", html);
    }
    // handlers
    addHandlerSave(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--edit-save");
            if (!btn) return;
            handler();
        });
    }
    addHandlerRepeat(handler) {
        this.btnNewRep.addEventListener("click", handler);
    }
    addHandlerDelete(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--edit-del");
            if (!btn) return;
            const id = e.target.closest(".form--edit").dataset.id;
            handler(id);
        });
    }
}
exports.default = new EditView();

},{"./view.js":"4wVyX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7FIfZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class TaskView extends (0, _viewJsDefault.default) {
    // _parentEl = document.querySelector(".tabs__body--new");
    _parentEl = document.querySelector(".tabs__body--task");
    _childEl = document.querySelector(".input--cat");
    save() {
        const title = document.querySelector(".input--title").value;
        const date = document.querySelector(".input--date").value;
        const cat = document.querySelector(".input--cat").value ? document.querySelector(".input--cat").value : "Main";
        const description = document.querySelector(".input--des").value;
        const repeatPeriod = document.querySelector(".select--period")?.value;
        let period;
        if (repeatPeriod === "days") period = 1;
        if (repeatPeriod === "weeks") period = 7;
        if (repeatPeriod === "monthes") period = 30;
        if (repeatPeriod === "years") period = 365;
        // calculate repetition count
        let repCount;
        if (!document.querySelector(".input--repeat-count") || document.querySelector(".input--repeat-count").value === "") repCount = null;
        else repCount = document.querySelector(".input--repeat-count").value;
        const repeatCount = repCount * period;
        const id = document.querySelector(".form").dataset?.id;
        const taskData = [
            title,
            date,
            cat,
            description,
            repeatCount,
            id
        ];
        return taskData;
    }
    render(task = "") {
        this.show();
        // ${task ? "edit" : "new"}
        const markup = `
    <form class="form form" data-id="${task ? task.id : ""}">
        <i class="far fa-times button--close"></i>
        <div class="form__field">
        <i class="far fa-pen form__label"></i>
        <input
            class="input input--title"
            type="text"
            placeholder="Title"
            value="${task ? task.title : ""}"
        />
        </div>
        <div class="form__field field-date">
        <i class="far fa-calendar form__label"></i>
        <input class="input input--date" type="date" ${task?.date ? `value="${task.date}"` : ``} />
        <span class="button--rep"
            ><i class="far fa-repeat-alt"></i> repeat</span
        >
        </div>
        <div class="form__field field-cat">
        <i class="far fa-folder-open form__label"></i>
        <select class="input input--cat">
        </select>
        </div>
        <div class="form__field">
        <i class="far fa-quote-left form__label"></i>
        <textarea
            class="input--des"
            cols="30"
            rows="3"
            placeholder="Description"
            
        >${task ? task.description : ""}</textarea>
        </div>
        <div class="form__field field--btns">
        <input
            class="button--save"
            type="submit"
            value="Save"
        />
        ${task ? `<button class="button--del">Delete task</button>
        </div>` : ""}
        
    </form>
    `;
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
        this._childEl = document.querySelector(".input--cat");
    }
    addHandlerSave(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--save");
            if (!btn) return;
            handler();
        });
    }
    addHandlerDelete(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--del");
            if (!btn) return;
            const id = e.target.closest(".form").dataset.id;
            handler(id);
        });
    }
    //   repeat(value) {
    //     const el = document.querySelector(".form__field--repeat");
    //     // find the status is "new" or "edit"
    //     let status;
    //     if (!this.tabsBodyNew.classList.contains("hidden")) {
    //       status = "new";
    //     } else {
    //       status = "edit";
    //     }
    //     // change repeat btn style and text
    //     if (value > 0) {
    //       if (el) {
    //         el.remove();
    //       }
    //       this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
    //       this.btnEditRep.classList.add("move-repeat");
    //     } else {
    //       if (el) {
    //         this.btnNewRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
    //         this.btnNewRep.classList.remove("move-repeat");
    //         this.btnEditRep.innerHTML = `<i class="far fa-repeat-alt"></i> repeat</span>`;
    //         this.btnEditRep.classList.remove("move-repeat");
    //         return el.remove();
    //       }
    //       this.btnNewRep.innerHTML = `<i class="far fa-times"></i>`;
    //       this.btnNewRep.classList.add("move-repeat");
    //       this.btnEditRep.innerHTML = `<i class="far fa-times"></i>`;
    //       this.btnEditRep.classList.add("move-repeat");
    //     }
    //     // element of repeation
    //     let html = `
    //               <div class="form__field form__field--repeat">
    //               <i class="far fa-repeat-alt form__label"></i><span class="form__label form__label--rep">Every</span>
    //                 <input class="input input--repeat-count input--${status}-repeat-count" type="number" min="1" max="1000" placeholder=""
    //                 value="${value ? value : ""}" />
    //                 <select class="select--period select--${status}-period ">
    //                   <option value="days">days</option>
    //                   <option value="weeks">weeks</option>
    //                   <option value="monthes">monthes</option>
    //                   <option value="years">years</option>
    //                 </select>
    //               </div>
    //             `;
    //     // find exact place to implement
    //     let place = !this.tabsBodyNew.classList.contains("hidden")
    //       ? ".field--new-date"
    //       : ".field--edit-date";
    //     document.querySelector(place).insertAdjacentHTML("afterend", html);
    //   }
    // handlers
    addHandlerRepeat(handler) {
        this._parentEl.addEventListener("click", function(e) {
            e.preventDefault();
            const btn = e.target.closest(".button--new-rep");
            if (!btn) return;
            handler();
        });
    }
}
exports.default = new TaskView();

},{"./view.js":"4wVyX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"blwqv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
class SearchView extends (0, _viewJsDefault.default) {
    // _parentEl = document.querySelector(".tabs__body--new");
    _parentEl = document.querySelector(".tabs__body--search-res");
    _childEl = document.querySelector(".box--search");
    render() {
        this.show();
        this._childEl = document.querySelector(".box--search");
        this._childEl.classList.remove("hidden");
        document.querySelector(".input--search").focus();
        document.querySelector(".input--search").value = "";
    }
    searchWord() {
        // clean past data from html
        this.tabsBodySearchRes.innerHTML = "";
        return this.inputSearch.value;
    // find all tasks match the search word
    // if (this.inputSearch.value !== "") {
    //   //   const resTasks = this.#allTasks.filter((task) =>
    //   //     task.title.includes(inputSearch.value)
    //   //   );
    //   //   resTasks.forEach((task) => this._renderTask(task, false, true));
    // }
    }
    addHandlerSearch(handler) {
        this.inputSearch.oninput = handler;
    }
    addHandlerCloseSearch(handler) {
        this._childEl.addEventListener("click", function(e) {
            const btn = e.target.closest(".fa-times");
            if (btn) handler();
        });
    }
}
exports.default = new SearchView();

},{"./view.js":"4wVyX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["fA0o9","aenu9"], "aenu9", "parcelRequirebb28")

//# sourceMappingURL=index.e37f48ea.js.map
