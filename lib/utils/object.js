/*
 * @Author: Salt
 * @Date: 2022-08-30 12:55:25
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-14 22:05:25
 * @Description: 对象操作相关
 * @FilePath: \salt-lib\src\utils\object.ts
 */
import { isArray, isDate, isFunction, isMap, isObject, isPrimitiveObject, isRegExp, isSet, } from './type';
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
/** `propName`是否可用于属性名攻击 */
export function isUnsafePropName(propName) {
    return unsafePropNames.has(propName);
}
/** `propName`是否无法用于属性名攻击 */
export function isSafePropName(propName) {
    return !unsafePropNames.has(propName);
}
/** 将对象中可枚举`enumerable`的不安全属性设为`undefined` */
export function filterUnsafeProp(obj) {
    for (const p in obj) {
        // @ts-ignore
        if (isUnsafePropName(p))
            obj[p] = undefined;
    }
    return obj;
}
/** 遍历对象中可枚举`enumerable`的安全属性
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
    if (deleteUnsafeProp) {
        for (const p in obj)
            if (typeof obj[p] !== 'undefined') {
                if (isSafePropName(p))
                    fn(p, obj[p]);
                // 删掉不安全属性
                // @ts-ignore
                else
                    obj[p] = undefined;
            }
    }
    else {
        // 不删除不安全属性
        for (const p in obj) {
            if (typeof obj[p] !== 'undefined' && isSafePropName(p)) {
                fn(p, obj[p]);
            }
        }
    }
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
