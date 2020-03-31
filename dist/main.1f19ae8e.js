// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Model/location.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoords = getCoords;

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => resolve({
        coords: {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed
        },
        timestamp: position.timestamp
      }));
    } else {
      reject(new Error("Browser does not support geolocation!"));
    }
  });
}

async function getCoords() {
  try {
    const data = await getLocation();
    const cords = {
      lat: data.coords.latitude,
      long: data.coords.longitude
    };
    return cords; // console.log(coords);
  } catch (err) {
    console.log(err);
  }
} // getCoords();
},{}],"Model/current.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeatherAW = getWeatherAW;

async function getWeatherAW(lat, lng) {
  const cors = "https://cors-anywhere.herokuapp.com/";
  const key = "c3ec3275ce5f8cd5db0d598678dd0825";
  const result = await fetch(`${cors}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${key}
        `);
  const data = await result.json(); // console.log(data);

  const res = {
    temp: Math.round(data.main.temp),
    temp1: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    des: data.weather[0].description,
    feels: data.main.feels_like,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    id: data.id,
    name: data.name,
    country: data.sys.country
  }; // console.log(res);

  return res;
} // const getIcon = async () => {
//     const result = await fetch(
//         `https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/wn/10d@2x.png
//         `
//     );
//     const d = await result;
//     console.log(result);
// };
// getIcon();
},{}],"img/svg/spinner9.svg":[function(require,module,exports) {
module.exports = '#100738e6f15853e06ebc62487422b981';
},{}],"utils/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converDate = exports.widnDirection = exports.getDay = exports.clearAddIcon = exports.clearLoader = exports.renderLoader = exports.clearPage = exports.elements = void 0;

var _spinner = _interopRequireDefault(require("../img/svg/spinner9"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const elements = {
  body: document.querySelector(".body"),
  addIcon: document.querySelector(".add__icon"),
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".find-location")
};
exports.elements = elements;

const clearPage = () => {
  elements.body.innerHTML = "";
};

exports.clearPage = clearPage;

const renderLoader = parent => {
  const loader = `
    <div class="loader">
    <svg>
      <use xlink:href="${_spinner.default}"></use>
    </svg>
  </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

exports.renderLoader = renderLoader;

const clearLoader = () => {
  const loader = document.querySelector(`.loader`);
  if (loader) loader.parentElement.removeChild(loader);
};

exports.clearLoader = clearLoader;

const clearAddIcon = () => {
  elements.addIcon.innerHTML = "";
};

exports.clearAddIcon = clearAddIcon;

const getDay = date => {
  const weekDays = ["Sunday ", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date(date);
  const day = d.getDay();
  const currDay = weekDays[day];
  return currDay;
};

exports.getDay = getDay;

const widnDirection = windD => {
  if (windD.startsWith("E")) {
    return "East";
  } else if (windD.startsWith("W")) {
    return "West";
  } else if (windD.startsWith("S")) {
    return "South";
  } else {
    return "North";
  }
};

exports.widnDirection = widnDirection;

const converDate = d => {
  const reversDate = d.split("-").reverse().join("-");
  return reversDate;
};

exports.converDate = converDate;
},{"../img/svg/spinner9":"img/svg/spinner9.svg"}],"img/svg/plus-outline.svg":[function(require,module,exports) {
module.exports = '#73a68737f144f4e35837e0f501e05a3b';
},{}],"views/currentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adIcon = exports.weatherBasedOnGeoLocation = void 0;

var _utils = require("../utils/utils");

var _plusOutline = _interopRequireDefault(require("../img/svg/plus-outline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import plusOutline from "./img/svg/plus-outline";
const weatherBasedOnGeoLocation = res => {
  const markup = `

  <div class="forecast__geolocation-today">
        <div class="location__today">${res.name}</div>
      <div class="degree-today">
        <div class="num__today-temp">${res.temp}<sup>o</sup>C</div>
        <div class="forecast__icon-today">
        <img src="http://openweathermap.org/img/wn/${res.icon}@2x.png" alt="" >
        </div>
      </div>
      <div class="icon__section-today">
      <span><img src="../img/icon-umberella.png" alt="">${res.humidity}</span>
      <span><img src="../img/icon-wind.png" alt="">${res.windSpeed}</span>
      <span><img src="../img/icon-compass.png" alt="">${res.windSpeed}</span>
    </div>
  </div>
</div>
  `;
  _utils.elements.body.innerHTML = markup;
};

exports.weatherBasedOnGeoLocation = weatherBasedOnGeoLocation;

const adIcon = () => {
  const markup = ` 
      <svg  class="icon__add" viewBox="0 0 100 100">
        <use xlink:href="${_plusOutline.default}"></use>
      </svg>
    `;
  _utils.elements.addIcon.innerHTML = markup;
};

exports.adIcon = adIcon;
},{"../utils/utils":"utils/utils.js","../img/svg/plus-outline":"img/svg/plus-outline.svg"}],"Model/search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    try {
      const res = await fetch(`${proxy}https://www.metaweather.com/api/location/search/?query=${this.query}`);
      this.data = await res.json(); // console.log(data);

      this.name = await this.data[0].title;
      this.woeid = await this.data[0].woeid;
      this.lantLang = await this.data[0].latt_long; // console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }

}

exports.default = Search;
},{}],"Model/woeId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class WoeID {
  constructor(woeid) {
    this.woeid = woeid;
  }

  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    try {
      const res = await fetch(`${proxy}https://www.metaweather.com/api/location/${this.woeid}`);
      const data = await res.json(); // if (data) {
      //     this.consolidatedData = Array.from(data.consolidated_weather);
      //     // this.short = Array.from(data.consolidated_weather).splice(1);
      //     this.name = data.title;
      // }

      if (data) {
        this.consolidatedData = {
          dataComplete: Array.from(data.consolidated_weather).splice(0, 1),
          dataShort: Array.from(data.consolidated_weather).splice(1),
          dataName: data.title
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

}

exports.default = WoeID;
},{}],"views/searchView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearInput = exports.getInput = exports.renderError = exports.cityRender = exports.searchView = void 0;

var _utils = require("../utils/utils");

const searchView = () => {
  const markup = `
    <div class="hero">
    <div class="container container-input">
      <form  class="find-location" name="signup">
        <input type="text" class="search__field" name="text" placeholder="Find your location...">
        <input type="submit" name="submit" value="Find">
      </form>
    </div>
     `;
  _utils.elements.body.innerHTML = markup;
};

exports.searchView = searchView;

const cityRender = res => {
  const markup = `
    <div class="city__woied" data-woeid="${res.woeid}">
        <h1 class="city__name">
        - ${res.name} -
        </h1>
        <p class="city__latlong">${res.lantLang.split(",").join(" ")}</p>
        </div>
`;
  document.querySelector(".container-input").insertAdjacentHTML("afterend", markup);
};

exports.cityRender = cityRender;

const renderError = res => {
  const markup = `
  <div class="error">
    <h1>Something went wrong. Please try again! 😎</h1>
  </div>
`;
  _utils.elements.body.innerHTML = markup;
};

exports.renderError = renderError;

const getInput = () => {
  const queryValue = document.querySelector(".search__field").value;
  return queryValue;
};

exports.getInput = getInput;

const clearInput = () => document.querySelector(".search__field").value = ""; // export const deleteItem = woeid => {
//     const city = document.querySelector(`[data-woeid="${woeid}"]`);
//     if (city) item.parentElement.removeChild(city);
// };


exports.clearInput = clearInput;
},{"../utils/utils":"utils/utils.js"}],"views/woeidView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.woeidToday = void 0;

var _utils = require("../utils/utils");

const createDay = data => {
  return `<div class="forecast ">
<div class="forecast-header">
  <div class="day">${(0, _utils.getDay)(data.applicable_date)}</div>
</div>

<div class="forecast-content">
  <div class="forecast-icon">
    <img src="https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg" alt="" width=48>
  </div>
  <div class="temp">
    <div class="degree">${Math.round(data.the_temp)}&#176;C</div>
    <div class="min_temp">
    <small>Max: ${Math.round(data.max_temp)}&#176;</small>
    <small>Min: ${Math.round(data.min_temp)}&#176;</small>
  </div>
  </div>
</div>
</div>`;
};

const woeidToday = (n, data, d) => {
  const markup = `
    <div class="forecast-table">
      <div class="container">
        <div class="forecast-container">
          <div class="today forecast">
            <div class="forecast-header forecast-header-today">
              <div class="day">${(0, _utils.getDay)(data[0].applicable_date)}</div>
              <div class="date">${(0, _utils.converDate)(data[0].applicable_date)}</div>
            </div>

            <div class="forecast-content forecast-content-today">
              <div class="location">${n}</div>
              <div class="degree">
                <div class="num">${Math.round(data[0].the_temp)}&#176;C</div>
                <div class="forecast-icon">
                  <img src="https://www.metaweather.com/static/img/weather/${data[0].weather_state_abbr}.svg" alt="" width=90>
                </div>
              </div>

              <div class="wind-icons">
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-umbrella"></use>
                </svg>
                <span>${data[0].humidity}%</span>
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-wind"></use>
                </svg>
                <span>${Math.round(data[0].wind_speed)}km/h</span>
                <svg class="icon__small">
                  <use xlink:href="../img/sprite.svg#icon-compass"></use>
                </svg>
                <span>${(0, _utils.widnDirection)(data[0].wind_direction_compass)}</span>
              </div>
            </div>

          </div>

      ${d.map(el => createDay(el)).join("")}
              
        </div>
      </div>
    </div>`;
  _utils.elements.body.innerHTML = markup;
};

exports.woeidToday = woeidToday;
},{"../utils/utils":"utils/utils.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _location = require("./Model/location");

var _current = require("./Model/current");

var _utils = require("./utils/utils");

var _currentView = require("./views/currentView");

var _search = _interopRequireDefault(require("./Model/search"));

var _woeId = _interopRequireDefault(require("./Model/woeId"));

var _searchView = require("./views/searchView");

var _woeidView = require("./views/woeidView");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const state = {};
console.log(state);

const weatherOnGeoLocation = async () => {
  const {
    lat,
    long
  } = await (0, _location.getCoords)();
  console.log(lat, long);
  (0, _utils.renderLoader)(_utils.elements.body);

  try {
    state.w = await (0, _current.getWeatherAW)(lat, long);
    (0, _currentView.weatherBasedOnGeoLocation)(state.w);
    (0, _currentView.adIcon)();
  } catch (error) {
    console.log(error.message, error.status);
  }
};

window.addEventListener("load", weatherOnGeoLocation);

_utils.elements.addIcon.addEventListener("click", e => {
  const btn = e.target.closest(".icon__add");

  if (btn) {
    (0, _utils.clearPage)();
    (0, _searchView.searchView)();
    (0, _utils.clearAddIcon)();
  }
});

const controlSearch = async () => {
  // 1) Get query from view
  const query = await (0, _searchView.getInput)();
  console.log(query);

  if (query) {
    state.search = new _search.default(query);
    (0, _searchView.clearInput)();
    (0, _utils.renderLoader)(_utils.elements.body);

    try {
      const d = await state.search.getResults();

      if (state.search) {
        (0, _utils.clearLoader)();
        (0, _searchView.cityRender)(state.search);
      }
    } catch (err) {
      (0, _searchView.renderError)(state.search);
      (0, _utils.clearLoader)();
      console.log(err);
    }
  }
};

const cityController = async e => {
  const data = await e.target.closest(".city__woied").dataset.woeid;

  if (data) {
    console.log(data);
    state.d = new _woeId.default(data);
    console.log(e.target);

    try {
      await state.d.getResults();
      (0, _utils.clearPage)();
      (0, _utils.renderLoader)(_utils.elements.body);

      if (state.d) {
        (0, _utils.clearLoader)();
        (0, _woeidView.woeidToday)(state.d.consolidatedData.dataName, state.d.consolidatedData.dataComplete, state.d.consolidatedData.dataShort);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

_utils.elements.body.addEventListener("click", e => {
  const form = e.target.closest(".find-location");
  const city = e.target.closest(".city__woied");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      controlSearch();
    });
  }

  if (city) {
    city.addEventListener("click", cityController);
  }
});
},{"./Model/location":"Model/location.js","./Model/current":"Model/current.js","./utils/utils":"utils/utils.js","./views/currentView":"views/currentView.js","./Model/search":"Model/search.js","./Model/woeId":"Model/woeId.js","./views/searchView":"views/searchView.js","./views/woeidView":"views/woeidView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "11959" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map