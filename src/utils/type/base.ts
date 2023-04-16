/*
 * @Author: Salt
 * @Date: 2023-04-16 19:32:57
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:36:17
 * @Description: 判断基本类型
 * @FilePath: \salt-lib\src\utils\type\base.ts
 */
export function isString(u: unknown): u is string {
  return typeof u === 'string'
}
export function isNumber(u: unknown): u is number {
  return typeof u === 'number'
}
/** 断言参数是一个整数 */
export const isInteger = /* @__PURE__ */ (() =>
  (Number.isInteger as (u: unknown) => u is number) ||
  function isInteger(u: unknown): u is number {
    return isNumber(u) && isFinite(u) && Math.floor(u) === u
  })()
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
/** 断言参数是一个函数 */
export function isFunction(u: unknown): u is Function {
  return typeof u === 'function'
}
/** 断言参数是`object`但不是`null` */
export function isObject(u: unknown): u is object {
  return !!u && typeof u === 'object'
}
// 断言原生类型的特定对象
/** 断言参数是一个String的**包装对象** */
export function isStringObject(u: unknown): u is String {
  return u instanceof String
}
/** 断言参数是一个Number的**包装对象** */
export function isNumberObject(u: unknown): u is Number {
  return u instanceof Number
}
/** 断言参数是一个Number的**包装对象** */
export function isBooleanObject(u: unknown): u is Boolean {
  return u instanceof Boolean
}
/** 断言参数是一个BigInt的**包装对象** */
export function isBigIntObject(u: unknown): u is BigInt {
  return !!global.BigInt && u instanceof BigInt
}
/** 断言参数是一个Symbol的**包装对象** */
export function isSymbolObject(u: unknown): u is Symbol {
  return !!global.Symbol && u instanceof Symbol
}
/** 断言参数是一个原生类型的**包装对象** */
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