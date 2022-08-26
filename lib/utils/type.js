/*
 * @Author: Salt
 * @Date: 2022-08-26 21:56:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-26 22:08:19
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
export function isBigint(u) {
    return typeof u === 'bigint';
}
export function isUndefined(u) {
    return u === undefined;
}
export function isNull(u) {
    return u === null;
}
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
