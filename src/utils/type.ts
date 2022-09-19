/*
 * @Author: Salt
 * @Date: 2022-08-26 21:56:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-19 22:05:30
 * @Description: 类型守卫
 * @FilePath: \salt-lib\src\utils\type.ts
 */
export function isString(u: unknown): u is string {
  return typeof u === 'string'
}
export function isNumber(u: unknown): u is number {
  return typeof u === 'number'
}
export function isBoolean(u: unknown): u is boolean {
  return typeof u === 'boolean'
}
export function isSymbol(u: unknown): u is symbol {
  return typeof u === 'symbol'
}
export function isBigInt(u: unknown): u is bigint {
  return typeof u === 'bigint'
}
export function isUndefined(u: unknown): u is undefined {
  return u === undefined
}
export function isNull(u: unknown): u is null {
  return u === null
}
/** 断言参数是一个空值(`null`和`undefined`) */
export function isNil(u: unknown): u is null | undefined {
  return u === null || u === undefined
}
export function isFunction(u: unknown): u is Function {
  return typeof u === 'function'
}
/** 断言参数是`object`但不是`null` */
export function isObject(u: unknown): u is object {
  return !!u && typeof u === 'object'
}
/** 断言参数是一个整数 */
export const isInteger = /* @__PURE__ */ (() =>
  (Number.isInteger as (u: unknown) => u is number) ||
  function isInteger(u: unknown): u is number {
    return isNumber(u) && isFinite(u) && Math.floor(u) === u
  })()
/** 断言参数是一个合规的`obj.length` */
export function isValidLength(len: unknown): len is number {
  return isInteger(len) && len > -1 && len < Number.MAX_SAFE_INTEGER
}
export const isArray = /* @__PURE__ */ (() => Array.isArray)()
/** 断言参数是一个类数组 */
export function isArrayLike(u: unknown): u is ArrayLike<any> {
  return !isNil(u) && isValidLength((u as any).length)
}
/** 断言参数是一个类数组**对象** */
export function isArrayLikeObject(u: unknown): u is ArrayLike<any> & object {
  return isObject(u) && isValidLength((u as any).length)
}
// 断言原生类型的特定对象
export function isStringObject(u: unknown): u is String {
  return u instanceof String
}
export function isNumberObject(u: unknown): u is Number {
  return u instanceof Number
}
export function isBooleanObject(u: unknown): u is Boolean {
  return u instanceof Boolean
}
export function isBigIntObject(u: unknown): u is BigInt {
  return !!BigInt && u instanceof BigInt
}
export function isSymbolObject(u: unknown): u is Symbol {
  return u instanceof Symbol
}
export function isPrimitiveObject(
  u: unknown
): u is String | Number | BigInt | Symbol | Boolean {
  return (
    isObject(u) &&
    (u instanceof String ||
      u instanceof Number ||
      u instanceof Boolean ||
      u instanceof Symbol ||
      (!!BigInt && u instanceof BigInt))
  )
}
// 断言原生对象
export function isDate(u: unknown): u is Date {
  return u instanceof Date
}
export function isRegExp(u: unknown): u is RegExp {
  return u instanceof RegExp
}
/** 断言参数是一个`Set`，使用之前建议`polyfillES6` */
export function isSet(u: unknown): u is Set<any> {
  return u instanceof Set
}
/** 断言参数是一个`Map`，使用之前建议`polyfillES6` */
export function isMap(u: unknown): u is Map<any, any> {
  return u instanceof Map
}
/** 断言参数是一个`WeakSet`，使用之前建议`polyfillES6` */
export function isWeakSet(u: unknown): u is WeakSet<any> {
  return u instanceof WeakSet
}
/** 断言参数是一个`WeakMap`，使用之前建议`polyfillES6` */
export function isWeakMap(u: unknown): u is WeakMap<any, any> {
  return u instanceof WeakMap
}
