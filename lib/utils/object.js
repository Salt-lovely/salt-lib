/*
 * @Author: Salt
 * @Date: 2022-08-30 12:55:25
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 23:17:23
 * @Description: 对象操作相关
 * @FilePath: \salt-lib\src\utils\object.ts
 */
import { isArray, isArrayBuffer, isTypedArray, isDataView, isDate, isFunction, isMap, isObject, isPrimitiveObject, isRegExp, isSet, } from './type/index';
const unsafePropNames = new Set([
    '__proto__',
    'constructor',
    'prototype',
    'toString',
    'hasOwnProperty',
    'toLocaleString',
    'valueOf',
    'isPrototypeOf',
    'propertyIsEnumerable',
]);
/** `propName`是否可用于属性名攻击\
 * 不安全的属性名如`__proto__`可能污染全局代码\
 * **NodeJs编写的服务端**尤为需要注意，因为很多操作会隐性调用\
 * `toString`、`valueOf`等方法，进而执行恶意代码 */
export function isUnsafePropName(propName) {
    return unsafePropNames.has(propName);
}
/** `propName`是否无法用于属性名攻击 */
export function isSafePropName(propName) {
    return !unsafePropNames.has(propName);
}
/** **这个方法不能正确处理复杂对象**\
 * 其中不包含`obj`中可枚举`enumerable`的不安全属性\
 * 返回浅拷贝得到的新对象，类型与`obj`基本一致 */
export function filterUnsafeProp(obj) {
    var _a;
    const res = isArray(obj)
        ? obj.slice()
        : Object.create(((_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.prototype) || null);
    for (const key in obj) {
        if (isSafePropName(key))
            res[key] = obj[key];
    }
    const symbols = Object.getOwnPropertySymbols(obj);
    // @ts-ignore
    symbols.forEach((sym) => (res[sym] = obj[sym]));
    return res;
}
/** 遍历对象中可枚举`enumerable`的安全属性\
 * 若没有设置`deleteUnsafeProp`，返回输入的`obj`\
 * 若此参数设为`true`，返回浅拷贝得到的删除了不安全属性的新对象
 * @param obj 要遍历的对象
 * @param fn 回调函数
 * @param deleteUnsafeProp 是否顺道删除不安全属性，默认为否
 */
export function forSafePropsInObject(obj, fn, deleteUnsafeProp = false) {
    // 没有回调
    if (!isFunction(fn)) {
        if (deleteUnsafeProp)
            return filterUnsafeProp(obj);
        else
            return obj;
    }
    const safeObj = filterUnsafeProp(obj);
    for (const p in safeObj)
        if (typeof safeObj[p] !== 'undefined') {
            fn(p, safeObj[p]);
        }
    if (deleteUnsafeProp)
        return safeObj;
    else
        return obj;
}
/** 使用`prop`拓展`obj`，可以指定属性
 * @param obj 被拓展的对象
 * @param prop 拓展用的对象
 * @param options 默认为不可枚举、可修改、可写入
 */
export function extend(obj, prop, options) {
    var _a, _b, _c;
    const enumerable = (_a = options === null || options === void 0 ? void 0 : options.enumerable) !== null && _a !== void 0 ? _a : false;
    const configurable = (_b = options === null || options === void 0 ? void 0 : options.configurable) !== null && _b !== void 0 ? _b : true;
    const writable = (_c = options === null || options === void 0 ? void 0 : options.writable) !== null && _c !== void 0 ? _c : true;
    forSafePropsInObject(prop, (key, value) => {
        Object.defineProperty(obj, key, {
            enumerable,
            configurable,
            writable,
            value,
        });
    });
    return obj;
}
/**
 * 深度克隆（全复制）一个简单对象`{}`或数组`[]`，**无法**正确处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 如果要处理这些特殊的对象，请尝试`deepClonePlus`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export function deepClone(obj) {
    const map = new Map();
    const res = _deepClone(obj, map);
    map.clear(); // 严防内存泄漏
    return res;
}
function _deepClone(obj, map) {
    if (isObject(obj)) {
        // 循环调用
        if (map.has(obj))
            return map.get(obj);
        // 新的对象
        if (isArray(obj)) {
            const arr = [];
            map.set(obj, arr);
            obj.forEach((el) => arr.push(_deepClone(el, map)));
            return arr;
        }
        const res = {};
        map.set(obj, res);
        for (const key in obj) {
            res[key] = _deepClone(obj[key], map);
        }
        const symbols = Object.getOwnPropertySymbols(obj);
        // @ts-ignore
        symbols.forEach((symbol) => (res[symbol] = _deepClone(obj[symbol], map)));
        return res;
    }
    else
        return obj;
}
/**
 * 深度克隆（全复制）一个对象`{}`或数组`[]`，可以处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 但是性能不如`deepClone`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export function deepClonePlus(obj) {
    const map = new Map();
    const res = _deepClonePlus(obj, map);
    map.clear(); // 严防内存泄漏
    return res;
}
function _deepClonePlus(obj, map) {
    var _a;
    if (isObject(obj)) {
        // 循环调用
        if (map.has(obj))
            return map.get(obj);
        if (isPrimitiveObject(obj))
            return Object(obj.valueOf());
        if (isDate(obj))
            return new Date(obj.valueOf());
        if (isRegExp(obj))
            return new RegExp(obj);
        if (isMap(obj)) {
            const _map = new Map();
            map.set(obj, _map);
            for (const item of obj)
                _map.set(_deepClonePlus(item[0], map), _deepClonePlus(item[1], map));
            return _map;
        }
        if (isSet(obj)) {
            const _set = new Set();
            map.set(obj, _set);
            obj.forEach((item) => _set.add(_deepClonePlus(item, map)));
            return _set;
        }
        if (isArray(obj)) {
            const arr = [];
            map.set(obj, arr);
            obj.forEach((el) => arr.push(_deepClonePlus(el, map)));
            return arr;
        }
        if (isArrayBuffer(obj))
            return _deepCloneArrayBuffer(obj);
        if (isDataView(obj)) {
            return new obj.constructor(_deepCloneArrayBuffer(obj.buffer), obj.byteOffset, obj.byteLength);
        }
        if (isTypedArray(obj)) {
            return new obj.constructor(_deepCloneArrayBuffer(obj.buffer), obj.byteOffset, obj.length);
        }
        // 新的对象
        const res = Object.create(((_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.prototype) || null);
        map.set(obj, res);
        for (const key in obj) {
            res[key] = _deepClonePlus(obj[key], map);
        }
        const symbols = Object.getOwnPropertySymbols(obj);
        // @ts-ignore
        symbols.forEach((sym) => (res[sym] = _deepClonePlus(obj[sym], map)));
        return res;
    }
    else
        return obj;
}
function _deepCloneArrayBuffer(arrayBuffer) {
    const result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
}
