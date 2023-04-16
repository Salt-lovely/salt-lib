/*
 * @Author: Salt
 * @Date: 2022-08-30 12:55:25
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-14 22:05:25
 * @Description: 对象操作相关
 * @FilePath: \salt-lib\src\utils\object.ts
 */
import {
  isArray,
  isDate,
  isFunction,
  isMap,
  isObject,
  isPrimitiveObject,
  isRegExp,
  isSet,
} from './type/index'

const unsafePropNames: Set<string | number> = new Set([
  '__proto__',
  'constructor',
  'prototype',
  'toString',
  'hasOwnProperty',
  'toLocaleString',
  'valueOf',
  'isPrototypeOf',
  'propertyIsEnumerable',
])
/** `propName`是否可用于属性名攻击 */
export function isUnsafePropName(propName: string | number) {
  return unsafePropNames.has(propName)
}
/** `propName`是否无法用于属性名攻击 */
export function isSafePropName(propName: string | number) {
  return !unsafePropNames.has(propName)
}
/** 将对象中可枚举`enumerable`的不安全属性设为`undefined` */
export function filterUnsafeProp<T extends object>(obj: T): T {
  for (const p in obj) {
    // @ts-ignore
    if (isUnsafePropName(p)) obj[p] = undefined
  }
  return obj
}
/** 遍历对象中可枚举`enumerable`的安全属性
 * @param obj 要遍历的对象
 * @param fn 回调函数
 * @param deleteUnsafeProp 是否顺道删除不安全属性，默认为否
 */
export function forSafePropsInObject<
  T extends object,
  P extends Extract<keyof T, string>
>(
  obj: T,
  fn?: (propName: P, value: T[P]) => void,
  deleteUnsafeProp = false
): T {
  // 没有回调
  if (!isFunction(fn)) {
    if (deleteUnsafeProp) return filterUnsafeProp(obj)
    else return obj
  }
  if (deleteUnsafeProp) {
    for (const p in obj)
      if (typeof obj[p] !== 'undefined') {
        if (isSafePropName(p)) fn(p as P, obj[p as P])
        // 删掉不安全属性
        // @ts-ignore
        else obj[p] = undefined
      }
  } else {
    // 不删除不安全属性
    for (const p in obj) {
      if (typeof obj[p] !== 'undefined' && isSafePropName(p)) {
        fn(p as P, obj[p as P])
      }
    }
  }
  return obj
}
/** 使用`prop`拓展`obj`，可以指定属性
 * @param obj 被拓展的对象
 * @param prop 拓展用的对象
 * @param options 默认为不可枚举、可修改、可写入
 */
export function extend<O extends object, N extends object>(
  obj: O,
  prop: N,
  options?: {
    enumerable?: boolean
    configurable?: boolean
    writable?: boolean
  }
): O & N {
  const enumerable = options?.enumerable ?? false
  const configurable = options?.configurable ?? true
  const writable = options?.writable ?? true
  forSafePropsInObject(prop, (key, value) => {
    Object.defineProperty(obj, key, {
      enumerable,
      configurable,
      writable,
      value,
    })
  })
  return obj as O & N
}
/**
 * 深度克隆（全复制）一个简单对象`{}`或数组`[]`，**无法**正确处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 如果要处理这些特殊的对象，请尝试`deepClonePlus`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export function deepClone<T>(obj: T): T {
  const map = new Map()
  const res = _deepClone(obj, map)
  map.clear() // 严防内存泄漏
  return res
}
function _deepClone<T>(obj: T, map: Map<any, any>): T {
  if (isObject(obj)) {
    // 循环调用
    if (map.has(obj)) return map.get(obj)
    // 新的对象
    if (isArray(obj)) {
      const arr = [] as T & object & any[]
      map.set(obj, arr)
      obj.forEach((el) => arr.push(_deepClone(el, map)))
      return arr
    }
    const res = {} as T
    map.set(obj, res)
    for (const key in obj) {
      res[key] = _deepClone(obj[key], map)
    }
    const symbols = Object.getOwnPropertySymbols(obj)
    // @ts-ignore
    symbols.forEach((symbol) => (res[symbol] = _deepClone(obj[symbol], map)))
    return res
  } else return obj
}
/**
 * 深度克隆（全复制）一个对象`{}`或数组`[]`，可以处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 但是性能不如`deepClone`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export function deepClonePlus<T>(obj: T): T {
  const map = new Map()
  const res = _deepClonePlus(obj, map)
  map.clear() // 严防内存泄漏
  return res
}
function _deepClonePlus<T>(obj: T, map: Map<any, any>): T {
  if (isObject(obj)) {
    // 循环调用
    if (map.has(obj)) return map.get(obj)
    if (isPrimitiveObject(obj)) return Object(obj.valueOf()) as unknown as T
    if (isDate(obj)) return new Date(obj.valueOf()) as unknown as T
    if (isRegExp(obj)) return new RegExp(obj) as unknown as T
    if (isMap(obj)) {
      const _map = new Map()
      map.set(obj, _map)
      for (const item of obj)
        _map.set(_deepClonePlus(item[0], map), _deepClonePlus(item[1], map))
      return _map as unknown as T
    }
    if (isSet(obj)) {
      const _set = new Set()
      map.set(obj, _set)
      obj.forEach((item) => _set.add(_deepClonePlus(item, map)))
      return _set as unknown as T
    }
    if (isArray(obj)) {
      const arr = [] as T & object & any[]
      map.set(obj, arr)
      obj.forEach((el) => arr.push(_deepClonePlus(el, map)))
      return arr
    }
    // 新的对象
    const res = Object.create(obj.constructor?.prototype || null)
    map.set(obj, res)
    for (const key in obj) {
      res[key] = _deepClonePlus(obj[key], map)
    }
    const symbols = Object.getOwnPropertySymbols(obj)
    // @ts-ignore
    symbols.forEach((sym) => (res[sym] = _deepClonePlus(obj[sym], map)))
    return res
  } else return obj
}
