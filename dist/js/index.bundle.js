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
/******/ 	__webpack_require__.p = "https://leechikit.github.io/resources/article/turntables/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(31);

	__webpack_require__(32);

	var _audioContext = __webpack_require__(40);

	var _audioContext2 = _interopRequireDefault(_audioContext);

	var _createSource = __webpack_require__(41);

	var _createSource2 = _interopRequireDefault(_createSource);

	var _createOscillator = __webpack_require__(110);

	var _createOscillator2 = _interopRequireDefault(_createOscillator);

	var _createDisk = __webpack_require__(111);

	var _createDisk2 = _interopRequireDefault(_createDisk);

	var _createSongList = __webpack_require__(112);

	var _createSongList2 = _interopRequireDefault(_createSongList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var disk1 = new _createDisk2.default({
		selector: '#song-wrap-1',
		soundName: 'Heavy',
		loop: false
	});

	var disk2 = new _createDisk2.default({
		selector: '#song-wrap-2',
		soundName: 'Good Goodbye',
		loop: false
	});

	(0, _createSongList2.default)({
		selector: '#JsongList'
	});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports) {

	module.exports = "module.exports = __webpack_public_path__ + \"html/index.html\";";

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @name: audioContext
	 * @description: 获取AudioContext对象
	 * @author: lizijie
	 * @update: 
	 */

	var audioContext = void 0;

	try {
	  audioContext = new (window.AudioContext || window.webkitAudioContext)();
	} catch (e) {
	  alert("Web Audio API is not supported in this browser");
	}

	exports.default = audioContext;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _audioContext = __webpack_require__(40);

	var _audioContext2 = _interopRequireDefault(_audioContext);

	var _bufferList = __webpack_require__(42);

	var _bufferList2 = _interopRequireDefault(_bufferList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name: createSource
	 * @description: 创建Source对象
	 * @author: lizijie
	 * @update: 
	 */

	var buffers = _bufferList2.default;

	function Source(obj) {
	  this.config = obj;
	}

	/**
	 * 开始播放
	 *
	 * @param: {Number} second 播放位置
	 */
	Source.prototype.start = function () {
	  var _this = this;

	  var second = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	  if (!this.bufferSource) {
	    this.bufferSource = _audioContext2.default.createBufferSource();
	    this.gainNode = _audioContext2.default.createGain();
	    this.filter = _audioContext2.default.createBiquadFilter();
	    this.filter.type = 'lowpass';
	    this.filter.frequency.value = 5000;
	    this.bufferSource.buffer = buffers[this.config.soundName];
	    this.bufferSource.loop = this.config.loop;
	    this.bufferSource.connect(this.gainNode);
	    this.gainNode.connect(this.filter);
	    this.filter.connect(_audioContext2.default.destination);
	    this.bufferSource.onended = function () {
	      _this.bufferSource = null;
	    };

	    second = second > this.bufferSource.buffer.duration ? 0 : second;
	    this.bufferSource.start(0, second);
	  }
	};

	/**
	 * 停止播放
	 *
	 */
	Source.prototype.stop = function () {
	  this.bufferSource && this.bufferSource.stop();
	};

	/**
	 * 控制音量
	 *
	 * @param: {Number} value 音量
	 */
	Source.prototype.controlVolume = function (value) {
	  this.bufferSource && (this.gainNode.gain.value = value);
	};

	/**
	 * 控制播放速度
	 *
	 * @param: {Number} rate 原速度的倍数
	 */
	Source.prototype.controlRate = function (rate) {
	  this.bufferSource && (this.bufferSource.playbackRate.value = rate);
	};

	/**
	 * 控制播放频率
	 *
	 * @param: {Number} value 频率
	 */
	Source.prototype.controlFrequency = function (value) {
	  this.bufferSource && (this.filter.frequency.value = value);
	};

	exports.default = Source;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(43);

	var _promise2 = _interopRequireDefault(_promise);

	var _decodeAudioData = __webpack_require__(108);

	var _decodeAudioData2 = _interopRequireDefault(_decodeAudioData);

	var _audioContext = __webpack_require__(40);

	var _audioContext2 = _interopRequireDefault(_audioContext);

	var _soundList = __webpack_require__(109);

	var _soundList2 = _interopRequireDefault(_soundList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建promise
	var promise = function promise() {
		return _promise2.default.resolve();
	}; /**
	    * @name: createBufferList
	    * @description: 创建音频buffer对象列表
	    * @author: lizijie
	    * @update: 
	    */
	// import Promise from 'core-js/es6/promise';

	var bufferList = {};

	/**
	 * 创建buffer列表
	 *
	 */
	function createBufferList() {
		var promiseArrs = [];
		// 遍历存储音频文件地址

		var _loop = function _loop(key) {
			var bufferPromise = promise().then(function () {
				return (0, _decodeAudioData2.default)(_audioContext2.default, _soundList2.default[key].link);
			}).then(function (buffer) {
				bufferList[key] = buffer;
				return promise();
			});
			promiseArrs.push(bufferPromise);
		};

		for (var key in _soundList2.default) {
			_loop(key);
		}
		_promise2.default.all(promiseArrs).then(function (values) {
			downloadCallback();
		});
	}

	/**
	 * 音频下载完成回调
	 *
	 */
	function downloadCallback() {
		document.body.className = '';
	}

	createBufferList();

	exports.default = bufferList;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(90);
	__webpack_require__(94);
	module.exports = __webpack_require__(54).Promise;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(47)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(50)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(48)
	  , defined   = __webpack_require__(49);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(51)
	  , $export        = __webpack_require__(52)
	  , redefine       = __webpack_require__(67)
	  , hide           = __webpack_require__(57)
	  , has            = __webpack_require__(68)
	  , Iterators      = __webpack_require__(69)
	  , $iterCreate    = __webpack_require__(70)
	  , setToStringTag = __webpack_require__(86)
	  , getPrototypeOf = __webpack_require__(88)
	  , ITERATOR       = __webpack_require__(87)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(53)
	  , core      = __webpack_require__(54)
	  , ctx       = __webpack_require__(55)
	  , hide      = __webpack_require__(57)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
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
/* 53 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(56);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(58)
	  , createDesc = __webpack_require__(66);
	module.exports = __webpack_require__(62) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(59)
	  , IE8_DOM_DEFINE = __webpack_require__(61)
	  , toPrimitive    = __webpack_require__(65)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(62) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(60);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(62) && !__webpack_require__(63)(function(){
	  return Object.defineProperty(__webpack_require__(64)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(63)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(60)
	  , document = __webpack_require__(53).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(60);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(57);

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(71)
	  , descriptor     = __webpack_require__(66)
	  , setToStringTag = __webpack_require__(86)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(57)(IteratorPrototype, __webpack_require__(87)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(59)
	  , dPs         = __webpack_require__(72)
	  , enumBugKeys = __webpack_require__(84)
	  , IE_PROTO    = __webpack_require__(81)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(64)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(85).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(58)
	  , anObject = __webpack_require__(59)
	  , getKeys  = __webpack_require__(73);

	module.exports = __webpack_require__(62) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(74)
	  , enumBugKeys = __webpack_require__(84);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(68)
	  , toIObject    = __webpack_require__(75)
	  , arrayIndexOf = __webpack_require__(78)(false)
	  , IE_PROTO     = __webpack_require__(81)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(76)
	  , defined = __webpack_require__(49);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(77);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(75)
	  , toLength  = __webpack_require__(79)
	  , toIndex   = __webpack_require__(80);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(48)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(48)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(82)('keys')
	  , uid    = __webpack_require__(83);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(53)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53).document && document.documentElement;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(58).f
	  , has = __webpack_require__(68)
	  , TAG = __webpack_require__(87)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(82)('wks')
	  , uid        = __webpack_require__(83)
	  , Symbol     = __webpack_require__(53).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(68)
	  , toObject    = __webpack_require__(89)
	  , IE_PROTO    = __webpack_require__(81)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(49);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var global        = __webpack_require__(53)
	  , hide          = __webpack_require__(57)
	  , Iterators     = __webpack_require__(69)
	  , TO_STRING_TAG = __webpack_require__(87)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(92)
	  , step             = __webpack_require__(93)
	  , Iterators        = __webpack_require__(69)
	  , toIObject        = __webpack_require__(75);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 93 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(51)
	  , global             = __webpack_require__(53)
	  , ctx                = __webpack_require__(55)
	  , classof            = __webpack_require__(95)
	  , $export            = __webpack_require__(52)
	  , isObject           = __webpack_require__(60)
	  , aFunction          = __webpack_require__(56)
	  , anInstance         = __webpack_require__(96)
	  , forOf              = __webpack_require__(97)
	  , speciesConstructor = __webpack_require__(101)
	  , task               = __webpack_require__(102).set
	  , microtask          = __webpack_require__(104)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(87)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(105)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(86)($Promise, PROMISE);
	__webpack_require__(106)(PROMISE);
	Wrapper = __webpack_require__(54)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(107)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(77)
	  , TAG = __webpack_require__(87)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(55)
	  , call        = __webpack_require__(98)
	  , isArrayIter = __webpack_require__(99)
	  , anObject    = __webpack_require__(59)
	  , toLength    = __webpack_require__(79)
	  , getIterFn   = __webpack_require__(100)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(59);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(69)
	  , ITERATOR   = __webpack_require__(87)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(95)
	  , ITERATOR  = __webpack_require__(87)('iterator')
	  , Iterators = __webpack_require__(69);
	module.exports = __webpack_require__(54).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(59)
	  , aFunction = __webpack_require__(56)
	  , SPECIES   = __webpack_require__(87)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(55)
	  , invoke             = __webpack_require__(103)
	  , html               = __webpack_require__(85)
	  , cel                = __webpack_require__(64)
	  , global             = __webpack_require__(53)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(77)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(53)
	  , macrotask = __webpack_require__(102).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(77)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(57);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(53)
	  , core        = __webpack_require__(54)
	  , dP          = __webpack_require__(58)
	  , DESCRIPTORS = __webpack_require__(62)
	  , SPECIES     = __webpack_require__(87)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(87)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(43);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name: decodeAudioData
	 * @description: 异步解码音频文件
	 * @author: lizijie
	 * @update: 
	 */

	function decodeAudioData(audioContext, url) {
		return new _promise2.default(function (resolve) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = function () {
				audioContext.decodeAudioData(request.response, function (buffer) {
					if (!buffer) {
						alert('error decoding file data: ' + url);
						return;
					} else {
						resolve(buffer);
					}
				});
			};
			request.onerror = function () {
				alert('BufferLoader: XHR error');
			};
			request.send();
		});
	}

	exports.default = decodeAudioData;

/***/ }),
/* 109 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @name: soundList
	 * @description: 配置音频文件
	 * @author: lizijie
	 * @update: 
	 */

	exports.default = {
		'Good Goodbye': {
			cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004XEwud03XB6I.jpg',
			link: 'https://leechikit.github.io/resources/article/turntables/song/GoodGoodBye.m4a'
		},
		'Heavy': {
			cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001TZBRx2mZw8A.jpg',
			link: 'https://leechikit.github.io/resources/article/turntables/song/Heavy.m4a'
		},
		'Numb': {
			cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002vmOxc3x7FWa.jpg',
			link: 'https://leechikit.github.io/resources/article/turntables/song/Numb.m4a'
		},
		'In The End': {
			cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004ImTxE1OkGqR.jpg',
			link: 'https://leechikit.github.io/resources/article/turntables/song/InTheEnd.m4a'
		}
	};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _audioContext = __webpack_require__(40);

	var _audioContext2 = _interopRequireDefault(_audioContext);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Oscillator(obj) {
	  this.config = obj;
	}

	/**
	 * 开始播放
	 *
	 * @param: {Number} second 播放位置
	 */
	/**
	 * @name: createOscillator
	 * @description: 创作音调
	 * @author: lizijie
	 * @update: 
	 */

	Oscillator.prototype.start = function () {
	  var _this = this;

	  var second = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	  if (!this.oscillator) {
	    this.oscillator = _audioContext2.default.createOscillator();
	    this.gainNode = _audioContext2.default.createGain();
	    this.oscillator.type = this.config.type;
	    this.oscillator.frequency.value = this.config.frequency;
	    this.oscillator.connect(this.gainNode);
	    this.gainNode.connect(_audioContext2.default.destination);
	    this.gainNode.gain.value = 0.1;
	    this.oscillator.onended = function () {
	      _this.oscillator = null;
	    };

	    this.oscillator.start(0, second);
	  }
	};

	/**
	 * 停止播放
	 *
	 */
	Oscillator.prototype.stop = function () {
	  this.oscillator && this.oscillator.stop();
	};

	/**
	 * 改变频率
	 *
	 * @param: {Number} value 频率
	 */
	Oscillator.prototype.controlFrequency = function (value) {
	  this.oscillator && (this.oscillator.frequency.value = value);
	};

	exports.default = Oscillator;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _audioContext = __webpack_require__(40);

	var _audioContext2 = _interopRequireDefault(_audioContext);

	var _createSource = __webpack_require__(41);

	var _createSource2 = _interopRequireDefault(_createSource);

	var _createOscillator = __webpack_require__(110);

	var _createOscillator2 = _interopRequireDefault(_createOscillator);

	var _soundList = __webpack_require__(109);

	var _soundList2 = _interopRequireDefault(_soundList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 音量最小
	/**
	 * @name: createDisk
	 * @description: 创建磁碟
	 * @author: lizijie
	 * @update: 
	 */
	var VOLUMNMIN = 0;
	// 音量最大
	var VOLUMNMAX = 100;
	// 频率最小
	var FREQUENCYMIN = 0;
	// 频率最大
	var FREQUENCYMAX = 10000;

	var diskCount = 0;

	function Disk(obj) {
		this.selector = obj.selector;
		this.isStart = false;
		this.isMousedown = false;
		this.isRotating = false;
		this.mouseDownDegree = 0;
		this.mouseDownRotate = 0;
		this.volumn = 1;
		this.frequency = 5000;
		this.loop = obj.loop;
		this.soundName = obj.soundName;
		this.sound = new _createSource2.default({
			soundName: obj.soundName,
			loop: obj.loop || true
		});
		this.oscillator = new _createOscillator2.default({
			type: 'square',
			frequency: 700
		});
		this.index = ++diskCount;
		this.init();
		this.bindEvent();
	}

	/**
	 * 初始化
	 *
	 */
	Disk.prototype.init = function () {
		var containerEl = document.querySelector(this.selector);
		containerEl.style.position = 'relative';
		// 创建磁碟
		var diskEl = document.createElement('div');
		diskEl.className = 'song-disk disk-' + this.index;
		containerEl.append(diskEl);
		var offset = diskEl.getBoundingClientRect();
		this.originX = offset.left + offset.width / 2;
		this.originY = offset.top + offset.height / 2;
		this.diskEl = document.querySelector('.song-disk.disk-' + this.index);
		// 创建针
		var needleEl = document.createElement('div');
		needleEl.className = 'song-needle needle-' + this.index;
		containerEl.append(needleEl);
		// 创建封面
		var coverEl = document.createElement('div');
		coverEl.className = 'song-cover cover-' + this.index;
		var coverImg = document.createElement('img');
		coverImg.src = _soundList2.default[this.soundName].cover;
		coverEl.append(coverImg);
		diskEl.append(coverEl);
		// 创建控制条列表
		var controlListEl = document.createElement('div');
		controlListEl.className = 'control-list';
		containerEl.append(controlListEl);
		// 创建音量控制条
		var volumnEl = document.createElement('p');
		volumnEl.className = 'control';
		volumnEl.innerHTML = '<input type="range" min="' + VOLUMNMIN + '" max="' + VOLUMNMAX + '" id="volumn-' + this.index + '"><span class="mark">\u97F3<br/>\u91CF</span>';
		controlListEl.append(volumnEl);
		// 创建音频控制条
		var frequencyEl = document.createElement('p');
		frequencyEl.className = 'control';
		frequencyEl.innerHTML = '<input type="range" min="' + FREQUENCYMIN + '" max="' + FREQUENCYMAX + '" id="frequency-' + this.index + '"><span class="mark">\u9891<br/>\u7387</span>';
		controlListEl.append(frequencyEl);
	};

	/**
	 * 绑定事件
	 *
	 */
	Disk.prototype.bindEvent = function () {
		this.controlVolumnHandle();
		this.controlFrequencyHandle();
		this.mousemoveDiskHandle();
		this.mousedownDiskHandle();
		this.mouseupDiskHandle();
		this.mouseleaveDiskHandle();
		this.clickNeedleHandle();
		this.dragoverDiskHandle();
		this.dropDiskHandle();
		this.clickRangeHandle();
		this.mousemoveRangeHandle();
	};

	/**
	 * 播放音乐
	 *
	 */
	Disk.prototype.startSound = function () {
		var _this = this;

		var needleEl = document.querySelector('.song-needle.needle-' + this.index);
		needleEl.setAttribute('data-status', 'on');
		setTimeout(function () {
			_this.sound.start();
			_this.duration = _this.sound.bufferSource.buffer.duration;
			_this.duration > 1 && window.requestAnimationFrame(function () {
				_this.startProgress();
			});
			_this.isStart = true;
			_this.isRotating = true;
		}, 500);
	};

	/**
	 * 停止音乐
	 *
	 */
	Disk.prototype.stopSound = function () {
		var needleEl = document.querySelector('.song-needle.needle-' + this.index);
		needleEl.setAttribute('data-status', '');
		this.sound.stop();
		this.resetProgress();
		this.resetVolumn();
		this.resetFrequency();
		this.isStart = false;
		this.isRotating = false;
	};

	/**
	 * 音频播放进度
	 *
	 */
	Disk.prototype.startProgress = function (duration) {
		var _this2 = this;

		if (this.isStart && this.isRotating && this.duration > 1) {
			var degree = 16.7 / 1000 / this.duration * 360;
			this.rotate(degree);
			window.requestAnimationFrame(function () {
				_this2.startProgress();
			});
		}
	};

	/**
	 * 重置播放进度
	 *
	 */
	Disk.prototype.resetProgress = function () {
		this.diskEl.style['transform'] = 'rotate(0)';
		this.diskEl.style['transition'] = 'transform .5s ease-in-out';
	};

	/**
	 * 磁碟旋转增加指定度数
	 *
	 */
	Disk.prototype.rotate = function (degree) {
		var nowDegree = utils.getRotateDegree(this.diskEl);
		degree += +nowDegree;
		this.rotateTo(degree);
	};

	/**
	 * 磁碟旋转到指定度数
	 *
	 */
	Disk.prototype.rotateTo = function (degree) {
		degree = degree.toFixed(2);
		this.diskEl.style['transform'] = 'rotate(' + degree + 'deg)';
		this.diskEl.style['transition'] = 'none';
	};

	/**
	 * 控制音量事件
	 *
	 */
	Disk.prototype.controlVolumnHandle = function () {
		var _this3 = this;

		document.querySelector('#volumn-' + this.index).addEventListener('change', function (event) {
			_this3.volumn = event.target.value / 50;
			_this3.sound.controlVolume(_this3.volumn);
		});
	};

	/**
	 * 重置音量
	 *
	 */
	Disk.prototype.resetVolumn = function () {
		document.querySelector('#volumn-' + this.index).value = (VOLUMNMAX - VOLUMNMIN) / 2;
	};

	/**
	 * 控制频率事件
	 *
	 */
	Disk.prototype.controlFrequencyHandle = function () {
		var _this4 = this;

		document.querySelector('#frequency-' + this.index).addEventListener('change', function (event) {
			_this4.frequency = event.target.value;
			_this4.sound.controlFrequency(_this4.frequency);
		});
	};

	/**
	 * 重置频率
	 *
	 */
	Disk.prototype.resetFrequency = function () {
		document.querySelector('#frequency-' + this.index).value = 5000;
	};

	/**
	 * 设置封面
	 *
	 */
	Disk.prototype.setCover = function (soundName) {
		var cover = _soundList2.default[soundName].cover;
		if (soundName !== this.soundName && cover) {
			this.soundName = soundName;
			document.querySelector('.song-cover.cover-' + this.index + '>img').src = cover;
		}
	};

	/**
	 * 滑动磁碟
	 *
	 */
	Disk.prototype.mousemoveDiskHandle = function () {
		var _this5 = this;

		this.diskEl.addEventListener('mousemove', function (event) {
			if (_this5.isStart && _this5.isMousedown) {
				var pageX = event.pageX;
				var pageY = event.pageY;
				var degree = utils.countDegree(pageX, pageY, _this5.originX, _this5.originY);
				var diffDegree = degree - _this5.mouseDownDegree < 0 ? degree - _this5.mouseDownDegree + 360 : degree - _this5.mouseDownDegree;
				_this5.rotateTo(degree - _this5.mouseDownDegree + _this5.mouseDownRotate);
				_this5.oscillator.controlFrequency(Math.abs(degree - _this5.mouseDownDegree) * 50);
			}
		});
	};

	/**
	 * 鼠标点击磁碟
	 *
	 */
	Disk.prototype.mousedownDiskHandle = function () {
		var _this6 = this;

		this.diskEl.addEventListener('mousedown', function (event) {
			if (_this6.isStart && _this6.duration > 1) {
				var pageX = event.pageX;
				var pageY = event.pageY;
				_this6.mouseDownDegree = utils.countDegree(pageX, pageY, _this6.originX, _this6.originY);
				_this6.mouseDownRotate = utils.getRotateDegree(_this6.diskEl);
				_this6.sound.stop();
				_this6.oscillator.start();
				_this6.isMousedown = true;
				_this6.isRotating = !_this6.isRotating;
			}
		});
	};

	/**
	 * 鼠标松开磁碟
	 *
	 */
	Disk.prototype.mouseupDiskHandle = function () {
		var _this7 = this;

		this.diskEl.addEventListener('mouseup', function (event) {
			if (_this7.isStart && _this7.isMousedown) {
				_this7.isMousedown = false;
				var degree = utils.getRotateDegree(_this7.diskEl);
				_this7.isRotating = !_this7.isRotating;
				_this7.sound.start(degree / 360 * _this7.duration);
				_this7.sound.controlVolume(_this7.volumn);
				_this7.sound.controlFrequency(_this7.frequency);
				_this7.oscillator.stop();
				window.requestAnimationFrame(function () {
					_this7.startProgress();
				});
			}
		});
	};

	/**
	 * 鼠标离开磁碟
	 *
	 */
	Disk.prototype.mouseleaveDiskHandle = function () {
		var _this8 = this;

		this.diskEl.addEventListener('mouseleave', function (event) {
			if (_this8.isStart && _this8.isMousedown) {
				_this8.isMousedown = false;
				var degree = utils.getRotateDegree(_this8.diskEl);
				_this8.isRotating = !_this8.isRotating;
				_this8.sound.start(degree / 360 * _this8.duration);
				_this8.sound.controlVolume(_this8.volumn);
				_this8.sound.controlFrequency(_this8.frequency);
				_this8.oscillator.stop();
				window.requestAnimationFrame(function () {
					_this8.startProgress();
				});
			}
		});
	};

	/**
	 * 鼠标点击针
	 *
	 */
	Disk.prototype.clickNeedleHandle = function () {
		var _this9 = this;

		var needleEl = document.querySelector('.song-needle.needle-' + this.index);
		needleEl.addEventListener('click', function (event) {
			_this9.isStart ? _this9.stopSound() : _this9.startSound();
		});
	};

	/**
	 * dragover
	 *
	 */
	Disk.prototype.dragoverDiskHandle = function () {
		this.diskEl.addEventListener("dragover", function (event) {
			event.preventDefault();
		});
	};

	/**
	 * drop
	 *
	 */
	Disk.prototype.dropDiskHandle = function () {
		var _this10 = this;

		this.diskEl.addEventListener("drop", function (event) {
			var dataList = event.dataTransfer.items;
			for (var i = 0, len = dataList.length; i < len; i++) {
				if (dataList[i].kind == "string" && dataList[i].type.match("^text/plain")) {
					dataList[i].getAsString(function (name) {
						_this10.stopSound();
						_this10.sound = new _createSource2.default({
							soundName: name,
							loop: _this10.loop || true
						});
						_this10.setCover(name);
					});
				}
			}
		});
	};

	/**
	 * input[type="range"] click handle
	 *
	 */
	Disk.prototype.clickRangeHandle = function () {
		var rangeEls = document.querySelectorAll('input[type="range"]');
		for (var i = 0, len = rangeEls.length; i < len; i++) {
			rangeEls[i].addEventListener('click', function (event) {
				var val = event.target.value;
				var max = event.target.max;
				var min = event.target.min;
				var percentage = val / (max - min) * 100 + '%';
				utils.changeRangeBackground(event.target, percentage);
			});
		}
	};

	/**
	 * input[type="range"] mousemove handle
	 *
	 */
	Disk.prototype.mousemoveRangeHandle = function () {
		var rangeEls = document.querySelectorAll('input[type="range"]');
		for (var i = 0, len = rangeEls.length; i < len; i++) {
			rangeEls[i].addEventListener('mousemove', function (event) {
				var val = event.target.value;
				var max = event.target.max;
				var min = event.target.min;
				var percentage = val / (max - min) * 100 + '%';
				utils.changeRangeBackground(event.target, percentage);
			});
		}
	};

	/**
	 * 工具
	 *
	 */
	var utils = {
		// 获取旋转度数
		getRotateDegree: function getRotateDegree(elem) {
			var reg = /transform:\s*rotate\((\d+\.?\d*)deg\)/;
			var style = elem.style.cssText;
			return style.match(reg) && +style.match(reg)[1] || 0;
		},

		// 已知两点计算度数 x2,y2是原点
		countDegree: function countDegree(x1, y1, x2, y2) {
			var x = Math.abs(x1 - x2);
			var y = Math.abs(y1 - y2);
			var z = Math.sqrt(x * x + y * y);
			var degree = Math.round(Math.asin(y / z) / Math.PI * 180);
			// 第一象限
			if (x1 >= x2 && y1 < y2) {
				degree = 90 - degree;
				// 第四象限
			} else if (x1 >= x2 && y1 >= y2) {
				degree = 90 + degree;
			} else if (x1 < x2 && y1 >= y2) {
				degree = 270 - degree;
			} else if (x1 < x2 && y1 < y2) {
				degree = 270 + degree;
			}
			return degree;
		},

		// input[type="range"]背景颜色
		changeRangeBackground: function changeRangeBackground(target, percentage) {
			target.style.backgroundImage = '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + percentage + ',#fff ' + percentage + ', #fff 100%)';
		}
	};

	exports.default = Disk;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _soundList = __webpack_require__(109);

	var _soundList2 = _interopRequireDefault(_soundList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 音频列表元素
	var songListEl = document.querySelector('#JsongList'); /**
	                                                        * @name: createSongList
	                                                        * @description: 创建音频列表
	                                                        * @author: lizijie
	                                                        * @update: 
	                                                        */

	var img = document.createElement('img');
	img.src = "https://leechikit.github.io/resources/article/turntables/image/dragdefault.png";
	/**
	 * 创建音频列表
	 *
	 */
	function createSongList(obj) {
		var selector = obj.selector;
		var container = document.querySelector(selector);
		var ulEl = document.createElement('ul');
		for (var key in _soundList2.default) {
			var liEl = document.createElement('li');
			liEl.innerHTML = key;
			liEl.setAttribute('data-song', key);
			liEl.setAttribute('draggable', true);
			ulEl.appendChild(liEl);
		}
		container.appendChild(ulEl);
		preload();
		eventBind();
	}

	/**
	 * 绑定事件
	 *
	 */
	function eventBind() {
		dragstartHandle();
		dragendHandle();
	}

	/**
	 * dragstart
	 *
	 */
	function dragstartHandle() {
		songListEl.addEventListener('dragstart', function (event) {
			/*setDragImage start*/
			event.dataTransfer.setDragImage(img, 100, 100);
			/*setDragImage end*/

			var dataList = event.dataTransfer.items;
			dataList.add(event.target.getAttribute('data-song'), "text/plain");
			console.log("dragstart");
		});
	}

	/**
	 * dragend
	 *
	 */
	function dragendHandle() {
		songListEl.addEventListener("dragend", function (event) {
			var dataList = event.dataTransfer.items;
			dataList.clear();
			console.log("dragend");
		});
	}

	/**
	 * preload
	 *
	 */
	function preload() {
		var img = document.createElement('img');
		img.src = "../image/dragdefault.png";
	}

	exports.default = createSongList;

/***/ })
/******/ ]);