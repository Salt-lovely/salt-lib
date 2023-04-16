/*
 * @Author: Salt
 * @Date: 2023-04-16 19:34:32
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:49:29
 * @Description: 比较复杂的类型判断
 * @FilePath: \salt-lib\src\utils\type\object.ts
 */
import { getGlobal } from '../misc'
import { isInteger, isNil, isObject } from "./base"

const global = /* @__PURE__ */ getGlobal()

/** 断言参数是一个合规的`obj.length` */
export function isValidLength(len: unknown): len is number {
  return isInteger(len) && len > -1 && len < Number.MAX_SAFE_INTEGER
}
export const isArray = /* @__PURE__ */ (() => Array.isArray)()
/** 断言参数是一个类数组，如数组、类型数组、字符串 */
export function isArrayLike(u: unknown): u is ArrayLike<any> {
  return !isNil(u) && isValidLength((u as any).length)
}
/** 断言参数是一个类数组**对象**，如数组、类型数组 */
export function isArrayLikeObject(u: unknown): u is ArrayLike<any> & object {
  return isObject(u) && isValidLength((u as any).length)
}
// 断言原生对象
/** 断言参数是一个`Date` */
export function isDate(u: unknown): u is Date {
  return !!global.Date && u instanceof Date
}
/** 断言参数是一个`RegExp` */
export function isRegExp(u: unknown): u is RegExp {
  return u instanceof RegExp
}
/** 断言参数是一个`Set` */
export function isSet(u: unknown): u is Set<any> {
  return !!global.Set && u instanceof Set
}
/** 断言参数是一个`Map` */
export function isMap(u: unknown): u is Map<any, any> {
  return !!global.Map && u instanceof Map
}
/** 断言参数是一个`WeakSet` */
export function isWeakSet(u: unknown): u is WeakSet<any> {
  return !!global.WeakSet && u instanceof WeakSet
}
/** 断言参数是一个`WeakMap` */
export function isWeakMap(u: unknown): u is WeakMap<any, any> {
  return !!global.WeakMap && u instanceof WeakMap
}
/** 断言参数是一个**类**`Promise`对象，即`PromiseLike` */
export function isPromiseLike(u: unknown): u is PromiseLike<any> {
  return (
    !!u &&
    (typeof u === 'object' || typeof u === 'function') &&
    // @ts-ignore
    typeof u.then === 'function'
  )
}
/** 断言参数是一个`Promise` */
export function isPromise(u: unknown): u is Promise<any> {
  return !!u && u instanceof Promise
}