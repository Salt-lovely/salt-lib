/*
 * @Author: Salt
 * @Date: 2022-08-26 21:56:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-19 22:05:30
 * @Description: 类型守卫
 * @FilePath: \salt-lib\src\utils\type.ts
 */
export function isString(u) {
    return typeof u === 'string';
}
export function isNumber(u) {
    return typeof u === 'number';
}
export function isBoolean(u) {
    return typeof u === 'boolean';
}
export function isSymbol(u) {
    return typeof u === 'symbol';
}
export function isBigInt(u) {
    return typeof u === 'bigint';
}
export function isUndefined(u) {
    return u === undefined;
}
export function isNull(u) {
    return u === null;
}
/** 断言参数是一个空值(`null`和`undefined`) */
export function isNil(u) {
    return u === null || u === undefined;
}
export function isFunction(u) {
    return typeof u === 'function';
}
/** 断言参数是`object`但不是`null` */
export function isObject(u) {
    return !!u && typeof u === 'object';
}
/** 断言参数是一个整数 */
export const isInteger = /* @__PURE__ */ (() => Number.isInteger ||
    function isInteger(u) {
        return isNumber(u) && isFinite(u) && Math.floor(u) === u;
    })();
/** 断言参数是一个合规的`obj.length` */
export function isValidLength(len) {
    return isInteger(len) && len > -1 && len < Number.MAX_SAFE_INTEGER;
}
export const isArray = /* @__PURE__ */ (() => Array.isArray)();
/** 断言参数是一个类数组 */
export function isArrayLike(u) {
    return !isNil(u) && isValidLength(u.length);
}
/** 断言参数是一个类数组**对象** */
export function isArrayLikeObject(u) {
    return isObject(u) && isValidLength(u.length);
}
// 断言原生类型的特定对象
export function isStringObject(u) {
    return u instanceof String;
}
export function isNumberObject(u) {
    return u instanceof Number;
}
export function isBooleanObject(u) {
    return u instanceof Boolean;
}
export function isBigIntObject(u) {
    return !!BigInt && u instanceof BigInt;
}
export function isSymbolObject(u) {
    return u instanceof Symbol;
}
export function isPrimitiveObject(u) {
    return (isObject(u) &&
        (u instanceof String ||
            u instanceof Number ||
            u instanceof Boolean ||
            u instanceof Symbol ||
            (!!BigInt && u instanceof BigInt)));
}
// 断言原生对象
export function isDate(u) {
    return u instanceof Date;
}
export function isRegExp(u) {
    return u instanceof RegExp;
}
/** 断言参数是一个`Set`，使用之前建议`polyfillES6` */
export function isSet(u) {
    return u instanceof Set;
}
/** 断言参数是一个`Map`，使用之前建议`polyfillES6` */
export function isMap(u) {
    return u instanceof Map;
}
/** 断言参数是一个`WeakSet`，使用之前建议`polyfillES6` */
export function isWeakSet(u) {
    return u instanceof WeakSet;
}
/** 断言参数是一个`WeakMap`，使用之前建议`polyfillES6` */
export function isWeakMap(u) {
    return u instanceof WeakMap;
}
