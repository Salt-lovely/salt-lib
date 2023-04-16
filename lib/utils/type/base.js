/*
 * @Author: Salt
 * @Date: 2023-04-16 19:32:57
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:36:17
 * @Description: 判断基本类型
 * @FilePath: \salt-lib\src\utils\type\base.ts
 */
export function isString(u) {
    return typeof u === 'string';
}
export function isNumber(u) {
    return typeof u === 'number';
}
/** 断言参数是一个整数 */
export const isInteger = /* @__PURE__ */ (() => Number.isInteger ||
    function isInteger(u) {
        return isNumber(u) && isFinite(u) && Math.floor(u) === u;
    })();
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
/** 断言参数是一个函数 */
export function isFunction(u) {
    return typeof u === 'function';
}
/** 断言参数是`object`但不是`null` */
export function isObject(u) {
    return !!u && typeof u === 'object';
}
// 断言原生类型的特定对象
/** 断言参数是一个String的**包装对象** */
export function isStringObject(u) {
    return u instanceof String;
}
/** 断言参数是一个Number的**包装对象** */
export function isNumberObject(u) {
    return u instanceof Number;
}
/** 断言参数是一个Number的**包装对象** */
export function isBooleanObject(u) {
    return u instanceof Boolean;
}
/** 断言参数是一个BigInt的**包装对象** */
export function isBigIntObject(u) {
    return !!global.BigInt && u instanceof BigInt;
}
/** 断言参数是一个Symbol的**包装对象** */
export function isSymbolObject(u) {
    return !!global.Symbol && u instanceof Symbol;
}
/** 断言参数是一个原生类型的**包装对象** */
export function isPrimitiveObject(u) {
    return (isObject(u) &&
        (u instanceof String ||
            u instanceof Number ||
            u instanceof Boolean ||
            u instanceof Symbol ||
            (!!BigInt && u instanceof BigInt)));
}
