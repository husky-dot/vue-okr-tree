module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a2a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "606e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OkrTree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3a2a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OkrTree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OkrTree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VueOkrTree", function() { return /* reexport */ OkrTree; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"72ff8ab4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/vue-okr-tree/OkrTree.vue?vue&type=template&id=cd546d7a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"org-chart-container"},[_c('div',{ref:"orgChartRoot",staticClass:"org-chart-node-children",class:{
      vertical: _vm.direction === 'vertical',
      horizontal: _vm.direction === 'horizontal',
      'show-collapsable': _vm.showCollapsable,
      'one-branch': _vm.data.length === 1
    }},_vm._l((_vm.root.childNodes),function(child){return _c('OkrTreeNode',{key:_vm.getNodeKey(child),attrs:{"node":child,"root":_vm.root,"orkstyle":"","show-collapsable":_vm.showCollapsable,"label-width":_vm.labelWidth,"label-height":_vm.labelHeight,"renderContent":_vm.renderContent,"nodeBtnContent":_vm.nodeBtnContent,"selected-key":_vm.selectedKey,"default-expand-all":_vm.defaultExpandAll,"node-key":_vm.nodeKey,"show-node-num":_vm.showNodeNum,"props":_vm.props}})}),1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTree.vue?vue&type=template&id=cd546d7a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"72ff8ab4-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/vue-okr-tree/OkrTreeNode.vue?vue&type=template&id=d3c9d8f4&
var OkrTreeNodevue_type_template_id_d3c9d8f4_render = function () {
var this$1 = this;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.node.visible)?_c('div',{staticClass:"org-chart-node",class:{
    collapsed: !_vm.node.leftExpanded || !_vm.node.expanded,
    'is-leaf': _vm.isLeaf,
    'is-current': _vm.node.isCurrent,
    'is-left-child-node': _vm.isLeftChildNode,
    'is-not-child':
      _vm.node.level === 1 &&
      _vm.node.childNodes.length <= 0 &&
      _vm.leftChildNodes.length <= 0,
    'only-both-tree-node': _vm.node.level === 1 && _vm.tree.store.onlyBothTree,
  },on:{"contextmenu":function ($event) { return this$1.handleContextMenu($event); }}},[_c('transition',{attrs:{"duration":_vm.animateDuration,"name":_vm.animateName}},[(_vm.showLeftChildNode)?_c('div',{staticClass:"org-chart-node-left-children",style:({
        visibility: _vm.node.leftExpanded ? '' : 'hidden',
        height: _vm.node.leftExpanded ? '' : '0',
      })},_vm._l((_vm.leftChildNodes),function(child){return _c('OkrTreeNode',{key:_vm.getNodeKey(child),attrs:{"show-collapsable":_vm.showCollapsable,"node":child,"label-width":_vm.labelWidth,"label-height":_vm.labelHeight,"renderContent":_vm.renderContent,"nodeBtnContent":_vm.nodeBtnContent,"selected-key":_vm.selectedKey,"node-key":_vm.nodeKey,"props":_vm.props,"show-node-num":_vm.showNodeNum,"is-left-child-node":""}})}),1):_vm._e()]),_c('div',{staticClass:"org-chart-node-label",class:{
      'is-root-label': _vm.node.level === 1,
      'is-not-right-child': _vm.node.level === 1 && _vm.node.childNodes.length <= 0,
      'is-not-left-child': _vm.node.level === 1 && _vm.leftChildNodes.length <= 0,
    }},[(_vm.showNodeLeftBtn && _vm.leftChildNodes.length > 0)?_c('div',{staticClass:"org-chart-node-left-btn",class:{ expanded: _vm.node.leftExpanded },on:{"click":function($event){return _vm.handleBtnClick('left')}}},[(_vm.showNodeNum)?[(!_vm.node.leftExpanded)?_c('span',{staticClass:"org-chart-node-btn-text"},[_vm._v("\n          "+_vm._s(_vm.node.level === 1 && _vm.leftChildNodes.length > 0
              ? _vm.leftChildNodes.length
              : _vm.node.childNodes.length)+"\n        ")]):_vm._e()]:_c('node-btn-content',{attrs:{"node":_vm.node}},[_vm._t("default")],2)],2):_vm._e(),_c('div',{staticClass:"org-chart-node-label-inner",class:_vm.computeLabelClass,style:(_vm.computeLabelStyle),on:{"click":_vm.handleNodeClick}},[_c('node-content',{attrs:{"node":_vm.node}},[_vm._t("default",[_vm._v("\n          "+_vm._s(_vm.node.label)+"\n        ")])],2)],1),(_vm.showNodeBtn && !_vm.isLeftChildNode)?_c('div',{staticClass:"org-chart-node-btn",class:{ expanded: _vm.node.expanded },on:{"click":function($event){return _vm.handleBtnClick('right')}}},[(_vm.showNodeNum)?[(!_vm.node.expanded)?_c('span',{staticClass:"org-chart-node-btn-text"},[_vm._v("\n          "+_vm._s(_vm.node.childNodes.length)+"\n        ")]):_vm._e()]:_c('node-btn-content',{attrs:{"node":_vm.node}},[_vm._t("default")],2)],2):_vm._e()]),_c('transition',{attrs:{"duration":_vm.animateDuration,"name":_vm.animateName}},[(!_vm.isLeftChildNode && _vm.node.childNodes && _vm.node.childNodes.length > 0)?_c('div',{staticClass:"org-chart-node-children",style:({
        visibility: _vm.node.expanded ? '' : 'hidden',
        height: _vm.node.expanded ? '' : '0',
      })},_vm._l((_vm.node.childNodes),function(child){return _c('OkrTreeNode',{key:_vm.getNodeKey(child),attrs:{"show-collapsable":_vm.showCollapsable,"node":child,"label-width":_vm.labelWidth,"label-height":_vm.labelHeight,"renderContent":_vm.renderContent,"nodeBtnContent":_vm.nodeBtnContent,"selected-key":_vm.selectedKey,"node-key":_vm.nodeKey,"show-node-num":_vm.showNodeNum,"props":_vm.props}})}),1):_vm._e()])],1):_vm._e()}
var OkrTreeNodevue_type_template_id_d3c9d8f4_staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTreeNode.vue?vue&type=template&id=d3c9d8f4&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./src/lib/vue-okr-tree/model/util.js

var NODE_KEY = "$treeNodeId";
var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};
var util_getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
var findNearestComponent = function findNearestComponent(element, componentName) {
  var target = element;

  while (target && target.tagName !== "BODY") {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }

    target = target.parentNode;
  }

  return null;
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/vue-okr-tree/OkrTreeNode.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var OkrTreeNodevue_type_script_lang_js_ = ({
  name: 'OkrTreeNode',
  inject: ['okrEventBus'],
  props: {
    props: {},
    node: {
      default: function _default() {
        return {};
      }
    },
    root: {
      default: function _default() {
        return {};
      }
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 判断是否是左子树的节点，样式需要改
    isLeftChildNode: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 展开节点的内容渲染 Function
    nodeBtnContent: Function,
    // 显示节点数
    showNodeNum: Boolean,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String
  },
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;

        if (parent._props.renderContent) {
          return parent._props.renderContent(h, this.node);
        } else {
          return this.$scopedSlots.default(this.node);
        }
      }
    },
    // 渲染展开节点的样式
    NodeBtnContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;

        if (parent._props.nodeBtnContent) {
          return parent._props.nodeBtnContent(h, this.node);
        } else {
          if (this.$scopedSlots.default) {
            return this.$scopedSlots.default(this.node);
          }
        }
      }
    }
  },
  computed: {
    isLeaf: function isLeaf() {
      if (this.node.level === 1) {
        if (this.leftChildNodes.length == 0 && this.node.childNodes.length == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return this.node.isLeaf;
      }
    },
    leftChildNodes: function leftChildNodes() {
      if (this.tree.store.onlyBothTree) {
        if (this.isLeftChildNode) {
          return this.node.childNodes;
        } else {
          return this.node.leftChildNodes;
        }
      }

      return [];
    },
    animateName: function animateName() {
      if (this.tree.store.animate) {
        return this.tree.store.animateName;
      }

      return '';
    },
    animateDuration: function animateDuration() {
      if (this.tree.store.animate) {
        return this.tree.store.animateDuration;
      }

      return 0;
    },
    // 是否显示展开按钮
    showNodeBtn: function showNodeBtn() {
      if (this.isLeftChildNode) {
        return this.tree.store.direction === 'horizontal' && this.showCollapsable && this.leftChildNodes.length > 0 || this.level === 1;
      }

      return this.showCollapsable && this.node.childNodes && this.node.childNodes.length > 0;
    },
    showNodeLeftBtn: function showNodeLeftBtn() {
      return this.tree.store.direction === 'horizontal' && this.showCollapsable && this.leftChildNodes.length > 0;
    },
    // 节点的宽度
    computeLabelStyle: function computeLabelStyle() {
      var _this$labelWidth = this.labelWidth,
          labelWidth = _this$labelWidth === void 0 ? 'auto' : _this$labelWidth,
          _this$labelHeight = this.labelHeight,
          labelHeight = _this$labelHeight === void 0 ? 'auto' : _this$labelHeight;

      if (typeof labelWidth === 'number') {
        labelWidth = "".concat(labelWidth, "px");
      }

      if (typeof labelHeight === 'number') {
        labelHeight = "".concat(labelHeight, "px");
      }

      return {
        width: labelWidth,
        height: labelHeight
      };
    },
    computeLabelClass: function computeLabelClass() {
      var clsArr = [];
      var store = this.tree.store;

      if (store.labelClassName) {
        if (typeof store.labelClassName === 'function') {
          clsArr.push(store.labelClassName(this.node));
        } else {
          clsArr.push(store.labelClassName);
        }
      }

      if (store.currentLableClassName && this.node.isCurrent) {
        if (typeof store.currentLableClassName === 'function') {
          clsArr.push(store.currentLableClassName(this.node));
        } else {
          clsArr.push(store.currentLableClassName);
        }
      }

      if (this.node.isCurrent) {
        clsArr.push('is-current');
      }

      return clsArr;
    },
    computNodeStyle: function computNodeStyle() {
      return {
        display: this.node.expanded ? '' : 'none'
      };
    },
    computLeftNodeStyle: function computLeftNodeStyle() {
      return {
        display: this.node.leftExpanded ? '' : 'none'
      };
    },
    // 是否显示左子数
    showLeftChildNode: function showLeftChildNode() {
      return this.tree.onlyBothTree && this.tree.store.direction === 'horizontal' && this.leftChildNodes && this.leftChildNodes.length > 0;
    }
  },
  watch: {
    'node.expanded': function nodeExpanded(val) {// this.$nextTick(() => this.expanded = val);
    },
    'node.leftExpanded': function nodeLeftExpanded(val) {// this.$nextTick(() => this.expanded = val);
    }
  },
  data: function data() {
    return {
      // node 的展开状态
      expanded: false,
      tree: null
    };
  },
  created: function created() {
    var parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    var tree = this.tree;

    if (!tree) {
      console.warn("Can not find node's tree.");
    }
  },
  methods: {
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },
    handleNodeClick: function handleNodeClick() {
      var store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit('node-click', this.node.data, this.node, this);
    },
    handleBtnClick: function handleBtnClick(isLeft) {
      isLeft = isLeft === 'left';
      var store = this.tree.store; // 表示是OKR飞书模式

      if (store.onlyBothTree) {
        if (isLeft) {
          if (this.node.leftExpanded) {
            this.node.leftExpanded = false;
            this.tree.$emit('node-collapse', this.node.data, this.node, this);
          } else {
            this.node.leftExpanded = true;
            this.tree.$emit('node-expand', this.node.data, this.node, this);
          }

          return;
        }
      }

      if (this.node.expanded) {
        this.node.collapse();
        this.tree.$emit('node-collapse', this.node.data, this.node, this);
      } else {
        this.node.expand();
        this.tree.$emit('node-expand', this.node.data, this.node, this);
      }
    },
    handleContextMenu: function handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }

      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTreeNode.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_okr_tree_OkrTreeNodevue_type_script_lang_js_ = (OkrTreeNodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTreeNode.vue





/* normalize component */

var component = normalizeComponent(
  vue_okr_tree_OkrTreeNodevue_type_script_lang_js_,
  OkrTreeNodevue_type_template_id_d3c9d8f4_render,
  OkrTreeNodevue_type_template_id_d3c9d8f4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var OkrTreeNode = (component.exports);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./src/lib/vue-okr-tree/model/merge.js
/* harmony default export */ var merge = (function (target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i] || {};

    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];

        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});
// CONCATENATED MODULE: ./src/lib/vue-okr-tree/model/node.js






var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];

  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};

var nodeIdSeed = 0;

var node_Node = /*#__PURE__*/function () {
  function Node(options) {
    var isLeftChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Node);

    this.isLeftChild = isLeftChild;
    this.id = nodeIdSeed++;
    this.data = null;
    this.expanded = false;
    this.leftExpanded = false;
    this.isCurrent = false;
    this.visible = true;
    this.parent = null;

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    this.level = 0;
    this.childNodes = [];
    this.leftChildNodes = [];

    if (this.parent) {
      this.level = this.parent.level + 1;
    }

    var store = this.store;

    if (!store) {
      throw new Error('[Node]store is required!');
    }

    store.registerNode(this);

    if (this.data) {
      this.setData(this.data, isLeftChild);

      if (store.defaultExpandAll || !store.showCollapsable) {
        this.expanded = true;
        this.leftExpanded = true;
      }
    }

    if (!Array.isArray(this.data)) {
      markNodeData(this, this.data);
    }

    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;

    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, true);
    }

    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    }

    this.updateLeafState();
  }

  _createClass(Node, [{
    key: "setData",
    value: function setData(data, isLeftChild) {
      if (!Array.isArray(data)) {
        markNodeData(this, data);
      }

      var store = this.store;
      this.data = data;
      this.childNodes = [];
      var children;

      if (this.level === 0 && this.data instanceof Array) {
        children = this.data;
      } else {
        children = getPropertyFromData(this, 'children') || [];
      }

      for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({
          data: children[i]
        }, null, null, isLeftChild);
      }
    }
  }, {
    key: "hasLeftChild",
    // 是否是 OKR 飞书模式
    value: function hasLeftChild() {
      var store = this.store;
      return store.onlyBothTree && store.direction === 'horizontal';
    }
  }, {
    key: "insertChild",
    value: function insertChild(child, index, batch, isLeftChild) {
      if (!child) throw new Error('insertChild error: child is required.');

      if (!(child instanceof Node)) {
        if (!batch) {
          var children = this.getChildren(true);

          if (children.indexOf(child.data) === -1) {
            if (index === undefined || index === null || index < 0) {
              children.push(child.data);
            } else {
              children.splice(index, 0, child.data);
            }
          }
        }

        merge(child, {
          parent: this,
          store: this.store
        });
        child = new Node(child, isLeftChild);
      }

      child.level = this.level + 1;

      if (index === undefined || index === null || index < 0) {
        this.childNodes.push(child);
      } else {
        this.childNodes.splice(index, 0, child);
      }

      this.updateLeafState();
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      var forceInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // this is data
      if (this.level === 0) return this.data;
      var data = this.data;
      if (!data) return null;
      var props = this.store.props;
      var children = 'children';

      if (props) {
        children = props.children || 'children';
      }

      if (data[children] === undefined) {
        data[children] = null;
      }

      if (forceInit && !data[children]) {
        data[children] = [];
      }

      return data[children];
    }
  }, {
    key: "updateLeafState",
    value: function updateLeafState() {
      if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
        this.isLeaf = this.isLeafByUser;
        return;
      }

      var childNodes = this.childNodes;

      if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
        this.isLeaf = !childNodes || childNodes.length === 0;
        return;
      }

      this.isLeaf = false;
    }
  }, {
    key: "updateLeftLeafState",
    value: function updateLeftLeafState() {
      if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
        this.isLeaf = this.isLeafByUser;
        return;
      }

      var childNodes = this.leftChildNodes;

      if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
        this.isLeaf = !childNodes || childNodes.length === 0;
        return;
      }

      this.isLeaf = false;
    } // 节点的收起

  }, {
    key: "collapse",
    value: function collapse() {
      this.expanded = false;
    } // 节点的展开

  }, {
    key: "expand",
    value: function expand(callback, expandParent) {
      var _this = this;

      var done = function done() {
        if (expandParent) {
          var parent = _this.parent;

          while (parent.level > 0) {
            parent.isLeftChild ? parent.leftExpanded = true : parent.expanded = true;
            parent = parent.parent;
          }
        }

        _this.isLeftChild ? _this.leftExpanded = true : _this.expanded = true;
        if (callback) callback();
      };

      done();
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var children = this.getChildren() || [];
      var dataIndex = children.indexOf(child.data);

      if (dataIndex > -1) {
        children.splice(dataIndex, 1);
      }

      var index = this.childNodes.indexOf(child);

      if (index > -1) {
        this.store && this.store.deregisterNode(child);
        child.parent = null;
        this.childNodes.splice(index, 1);
      }

      this.updateLeafState();
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, ref) {
      var index;

      if (ref) {
        index = this.childNodes.indexOf(ref);
      }

      this.insertChild(child, index);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(child, ref) {
      var index;

      if (ref) {
        index = this.childNodes.indexOf(ref);
        if (index !== -1) index += 1;
      }

      this.insertChild(child, index);
    }
  }, {
    key: "key",
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: "label",
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }]);

  return Node;
}();


// CONCATENATED MODULE: ./src/lib/vue-okr-tree/model/tree-store.js







var tree_store_TreeStore = /*#__PURE__*/function () {
  function TreeStore(options) {
    _classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.nodesMap = {};
    this.root = new node_Node({
      data: this.data,
      store: this
    }, false);
    this.setLeftData(this.leftData);
  }

  _createClass(TreeStore, [{
    key: "filter",
    value: function filter(value) {
      var childName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "childNodes";
      this.filterRight(value, childName);
    } // 过滤默认节点

  }, {
    key: "filterRight",
    value: function filterRight(value, childName) {
      var filterNodeMethod = this.filterNodeMethod;

      var traverse = function traverse(node, childName) {
        var childNodes;

        if (node.root) {
          childNodes = node.root.childNodes[0][childName];
        } else {
          childNodes = node.childNodes;
        }

        childNodes.forEach(function (child) {
          child.visible = filterNodeMethod.call(child, value, child.data, child);
          traverse(child, childName);
        });

        if (!node.visible && childNodes.length) {
          var allHidden = true;
          allHidden = !childNodes.some(function (child) {
            return child.visible;
          });

          if (node.root) {
            node.root.visible = allHidden === false;
          } else {
            node.visible = allHidden === false;
          }
        }

        if (!value) return;
        if (node.visible) node.expand();
      };

      traverse(this, childName);
    }
  }, {
    key: "registerNode",
    value: function registerNode(node) {
      var key = this.key;
      if (!key || !node || !node.data) return;
      var nodeKey = node.key;
      if (nodeKey !== undefined) this.nodesMap[node.key] = node;
    }
  }, {
    key: "deregisterNode",
    value: function deregisterNode(node) {
      var _this = this;

      var key = this.key;
      if (!key || !node || !node.data) return;
      node.childNodes.forEach(function (child) {
        _this.deregisterNode(child);
      });
      delete this.nodesMap[node.key];
    }
  }, {
    key: "setData",
    value: function setData(newVal) {
      var instanceChanged = newVal !== this.root.data;

      if (instanceChanged) {
        this.root.setData(newVal);
      } else {
        this.root.updateChildren();
      }

      this.setLeftData(this.leftData);
    }
  }, {
    key: "setLeftData",
    value: function setLeftData(leftData) {
      if (this.root.store.onlyBothTree) {
        if (!leftData) throw new Error("[Tree] leftData is required in onlyBothTree");

        if (this.leftData) {
          this.isLeftChilds = new node_Node({
            data: leftData,
            store: this
          }, true);

          if (this.isLeftChilds) {
            this.root.childNodes[0].leftChildNodes = this.isLeftChilds.childNodes[0].childNodes;
            this.root.childNodes[0].leftExpanded = this.isLeftChilds.childNodes[0].leftExpanded;
          }
        }
      }
    }
  }, {
    key: "updateChildren",
    value: function updateChildren(key, data) {
      var node = this.nodesMap[key];
      if (!node) return;
      var childNodes = node.childNodes;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        var child = childNodes[i];
        this.remove(child.data);
      }

      for (var _i = 0, j = data.length; _i < j; _i++) {
        var _child = data[_i];
        this.append(_child, node.data);
      }
    }
  }, {
    key: "getNode",
    value: function getNode(data) {
      if (data instanceof node_Node) return data;
      var key = _typeof(data) !== "object" ? data : util_getNodeKey(this.key, data);
      return this.nodesMap[key] || null;
    }
  }, {
    key: "setDefaultExpandedKeys",
    value: function setDefaultExpandedKeys(keys) {
      var _this2 = this;

      keys = keys || [];
      this.defaultExpandedKeys = keys;
      keys.forEach(function (key) {
        var node = _this2.getNode(key);

        if (node) node.expand(null, true);
      });
    }
  }, {
    key: "setCurrentNode",
    value: function setCurrentNode(currentNode) {
      var prevCurrentNode = this.currentNode;

      if (prevCurrentNode) {
        prevCurrentNode.isCurrent = false;
      }

      this.currentNode = currentNode;
      this.currentNode.isCurrent = true;
    }
  }, {
    key: "setUserCurrentNode",
    value: function setUserCurrentNode(node) {
      var key = node.key;
      var currNode = this.nodesMap[key];
      this.setCurrentNode(currNode);
    }
  }, {
    key: "setCurrentNodeKey",
    value: function setCurrentNodeKey(key) {
      if (key === null || key === undefined) {
        this.currentNode && (this.currentNode.isCurrent = false);
        this.currentNode = null;
        return;
      }

      var node = this.getNode(key);

      if (node) {
        this.setCurrentNode(node);
      }
    }
  }, {
    key: "getCurrentNode",
    value: function getCurrentNode() {
      return this.currentNode;
    }
  }, {
    key: "remove",
    value: function remove(data) {
      var node = this.getNode(data);

      if (node && node.parent) {
        if (node === this.currentNode) {
          this.currentNode = null;
        }

        node.parent.removeChild(node);
      }
    }
  }, {
    key: "append",
    value: function append(data, parentData) {
      var parentNode = parentData ? this.getNode(parentData) : this.root;

      if (parentNode) {
        parentNode.insertChild({
          data: data
        });
      }
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertBefore({
        data: data
      }, refNode);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertAfter({
        data: data
      }, refNode);
    }
  }]);

  return TreeStore;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/vue-okr-tree/OkrTree.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var OkrTreevue_type_script_lang_js_ = ({
  name: "OkrTree",
  components: {
    OkrTreeNode: OkrTreeNode
  },
  provide: function provide() {
    return {
      okrEventBus: this.okrEventBus
    };
  },
  props: {
    data: {
      // 源数据
      required: true
    },
    leftData: {
      // 源数据
      type: Array
    },
    // 方向
    direction: {
      type: String,
      default: "vertical"
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 飞书 OKR 模式
    onlyBothTree: {
      type: Boolean,
      default: false
    },
    orkstyle: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 展开节点的内容渲染 Function
    nodeBtnContent: Function,
    // 显示节点数
    showNodeNum: Boolean,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 树节点的样式
    labelClassName: [Function, String],
    // 当前选中节点样式
    currentLableClassName: [Function, String],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 当前选中的节点
    currentNodeKey: [String, Number],
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String,
    defaultExpandedKeys: {
      type: Array
    },
    filterNodeMethod: Function,
    props: {
      default: function _default() {
        return {
          leftChildren: "leftChildren",
          children: "children",
          label: "label",
          disabled: "disabled"
        };
      }
    },
    // 动画
    animate: {
      type: Boolean,
      default: false
    },
    animateName: {
      type: String,
      default: "okr-zoom-in-center"
    },
    animateDuration: {
      type: Number,
      default: 200
    }
  },
  computed: {
    ondeClass: function ondeClass() {
      return {
        findNode: null
      };
    }
  },
  data: function data() {
    return {
      okrEventBus: new external_commonjs_vue_commonjs2_vue_root_Vue_default.a(),
      store: null,
      root: null
    };
  },
  created: function created() {
    this.isTree = true;
    this.store = new tree_store_TreeStore({
      key: this.nodeKey,
      data: this.data,
      leftData: this.leftData,
      props: this.props,
      defaultExpandedKeys: this.defaultExpandedKeys,
      showCollapsable: this.showCollapsable,
      currentNodeKey: this.currentNodeKey,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      labelClassName: this.labelClassName,
      currentLableClassName: this.currentLableClassName,
      onlyBothTree: this.onlyBothTree,
      direction: this.direction,
      animate: this.animate,
      animateName: this.animateName
    });
    this.root = this.store.root;
  },
  watch: {
    data: function data(newVal) {
      this.store.setData(newVal);
    },
    leftData: function leftData(newVal) {
      this.store.setLeftData(newVal);
    },
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    }
  },
  methods: {
    filter: function filter(value) {
      if (!this.filterNodeMethod) throw new Error("[Tree] filterNodeMethod is required when filter");
      this.store.filter(value);

      if (this.onlyBothTree) {
        this.store.filter(value, "leftChildNodes");
      }
    },
    getNodeKey: function getNodeKey(node) {
      return util_getNodeKey(this.nodeKey, node.data);
    },
    // 通过 node 设置某个节点的当前选中状态
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCurrentNode");
      this.store.setUserCurrentNode(node);
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 node
    getNode: function getNode(data) {
      return this.store.getNode(data);
    },
    // 通过 key 设置某个节点的当前选中状态
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCurrentKey");
      this.store.setCurrentNodeKey(key);
    },
    remove: function remove(data) {
      this.store.remove(data);
    },
    // 获取当前被选中节点的 data
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in getCurrentKey");
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    append: function append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in updateKeyChild");
      this.store.updateChildren(key, data);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTree.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_okr_tree_OkrTreevue_type_script_lang_js_ = (OkrTreevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/lib/vue-okr-tree/OkrTree.vue?vue&type=style&index=0&lang=css&
var OkrTreevue_type_style_index_0_lang_css_ = __webpack_require__("606e");

// CONCATENATED MODULE: ./src/lib/vue-okr-tree/OkrTree.vue






/* normalize component */

var OkrTree_component = normalizeComponent(
  vue_okr_tree_OkrTreevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var OkrTree = (OkrTree_component.exports);
// CONCATENATED MODULE: ./src/lib/index.js

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
//# sourceMappingURL=vue-okr-tree.common.js.map