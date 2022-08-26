/*
 * @Author: Salt
 * @Date: 2022-08-26 21:56:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-26 22:08:19
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
export function isBigint(u: unknown): u is bigint {
  return typeof u === 'bigint'
}
export function isUndefined(u: unknown): u is undefined {
  return u === undefined
}
export function isNull(u: unknown): u is null {
  return u === null
}
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
