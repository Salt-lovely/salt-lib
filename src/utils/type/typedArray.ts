/*
 * @Author: Salt
 * @Date: 2023-04-16 21:56:38
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 23:13:06
 * @Description: 类型数组
 * @FilePath: \salt-lib\src\utils\type\typedArray.ts
 */
import { getTag } from './utils'

const allTypedArrayTags = new Set([
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Int16Array',
  'Uint16Array',
  'Int32Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
])
type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigUint64Array
  | BigInt64Array
  | Float32Array
  | Float64Array
/** 断言参数是一个`TypedArray`(类型数组) */
export function isTypedArray(u: unknown): u is TypedArray {
  return allTypedArrayTags.has(getTag(u))
}
/** 断言参数是一个`Int8Array`(Int8型的类型数组) */
export function isInt8Array(u: unknown): u is Int8Array {
  return getTag(u) === 'Int8Array'
}
/** 断言参数是一个`Uint8Array`(Uint8型的类型数组) */
export function isUint8Array(u: unknown): u is Uint8Array {
  return getTag(u) === 'Uint8Array'
}
/** 断言参数是一个`Uint8ClampedArray`(Uint8Clamped型的类型数组) */
export function isUint8ClampedArray(u: unknown): u is Uint8ClampedArray {
  return getTag(u) === 'Uint8ClampedArray'
}
/** 断言参数是一个`Int16Array`(Int16型的类型数组) */
export function isInt16Array(u: unknown): u is Int16Array {
  return getTag(u) === 'Int16Array'
}
/** 断言参数是一个`Uint16Array`(Uint16型的类型数组) */
export function isUint16Array(u: unknown): u is Uint16Array {
  return getTag(u) === 'Uint16Array'
}
/** 断言参数是一个`Int32Array`(Int32型的类型数组) */
export function isInt32Array(u: unknown): u is Int32Array {
  return getTag(u) === 'Int32Array'
}
/** 断言参数是一个`Uint32Array`(Uint32型的类型数组) */
export function isUint32Array(u: unknown): u is Uint32Array {
  return getTag(u) === 'Uint32Array'
}
/** 断言参数是一个`Float32Array`(Float32型的类型数组) */
export function isFloat32Array(u: unknown): u is Float32Array {
  return getTag(u) === 'Float32Array'
}
/** 断言参数是一个`Float64Array`(Float64型的类型数组) */
export function isFloat64Array(u: unknown): u is Float64Array {
  return getTag(u) === 'Float64Array'
}
/** 断言参数是一个`BigInt64Array`(BigInt64型的类型数组) */
export function isBigInt64Array(u: unknown): u is BigInt64Array {
  return getTag(u) === 'BigInt64Array'
}
/** 断言参数是一个`BigUint64Array`(BigUint64型的类型数组) */
export function isBigUint64Array(u: unknown): u is BigUint64Array {
  return getTag(u) === 'BigUint64Array'
}
