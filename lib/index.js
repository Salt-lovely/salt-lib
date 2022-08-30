/*
 * @Author: Salt
 * @Date: 2022-08-23 21:59:03
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 23:02:49
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\index.ts
 */
export { sleep, waitTill, defer, docReady, waitDocReady } from './utils/async';
export { $debug, $error, $info, $log, $warn } from './utils/console';
export { $, $$, isOutside, clickOutside, offset } from './utils/dom';
export { assert } from './utils/misc';
export { isSafePropName, isUnsafePropName, filterUnsafeProp, forSafePropsInObject, extend, } from './utils/object';
export { addScript, addStyle, addStyleUrl, addTempScript, setStyle, setStyleUrl, } from './utils/resource';
export { isString, isNumber, isBigint, isBoolean, isNil, isNull, isSymbol, isUndefined, isFunction, isObject, isArray, isArrayLike, isArrayLikeObject, isInteger, isValidLength, } from './utils/type';
export { polyfillIO, polyfillES5, polyfillES6, polyfillES7, polyfillES8, } from './polyfill/index';
