/*
 * @Author: Salt
 * @Date: 2022-08-23 21:59:03
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 22:44:11
 * @Description: 汇总输出
 * @FilePath: \salt-lib\src\index.ts
 */
export { sleep, waitTill, defer, docReady, waitDocReady } from './utils/async'
export { $debug, $error, $info, $log, $warn } from './utils/console'
export { $, $$, isOutside, clickOutside, offset } from './utils/dom'
export { assert, getGlobal } from './utils/misc'
export {
  isSafePropName,
  isUnsafePropName,
  filterUnsafeProp,
  forSafePropsInObject,
  extend,
  deepClone,
  deepClonePlus,
} from './utils/object'
export {
  randomChoice,
  randomHex,
  randomInt,
  randomIntBoth,
  randomIntCeil,
  uuidNil,
  uuidRandom,
  uuidV4,
} from './utils/random'
export {
  addScript,
  addStyle,
  addStyleUrl,
  addTempScript,
  setStyle,
  setStyleUrl,
} from './utils/resource'
export {
  isString,
  isStringObject,
  isNumber,
  isNumberObject,
  isBigInt,
  isBigIntObject,
  isBoolean,
  isBooleanObject,
  isSymbol,
  isSymbolObject,
  isPrimitiveObject,
  isNil,
  isNull,
  isUndefined,
  isFunction,
  isObject,
  isArrayBuffer,
  isDataView,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isArray,
  isArrayLike,
  isArrayLikeObject,
  isInteger,
  isValidLength,
  isPromiseLike,
  isPromise,
  isTypedArray,
  isBigInt64Array,
  isBigUint64Array,
  isFloat32Array,
  isFloat64Array,
  isInt16Array,
  isInt32Array,
  isInt8Array,
  isUint16Array,
  isUint32Array,
  isUint8Array,
  isUint8ClampedArray,
} from './utils/type/index'
export { fixedEncodeURI, fixedEncodeURIComponent } from './utils/url'

export {
  polyfillIO,
  polyfillES5,
  polyfillES6,
  polyfillES7,
  polyfillES8,
} from './polyfill/index'

export { h, splitOption } from './hyper/index'

export { read, write, unsafeRead, readAndListen } from './storage/localStorage'
