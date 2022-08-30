/*
 * @Author: Salt
 * @Date: 2022-08-26 21:56:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 23:05:55
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
export const isInteger = Number.isInteger ||
    function isInteger(u) {
        return isNumber(u) && isFinite(u) && Math.floor(u) === u;
    };
/** 断言参数是一个合规的`obj.length` */
export function isValidLength(len) {
    return isInteger(len) && len > -1 && len < Number.MAX_SAFE_INTEGER;
}
export const isArray = Array.isArray ||
    function isArray(u) {
        return u instanceof Array;
    };
/** 断言参数是一个类数组 */
export function isArrayLike(u) {
    return !isNil(u) && isValidLength(u.length);
}
/** 断言参数是一个类数组**对象** */
export function isArrayLikeObject(u) {
    return isObject(u) && isValidLength(u.length);
}
