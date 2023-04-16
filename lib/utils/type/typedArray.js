/*
 * @Author: Salt
 * @Date: 2023-04-16 21:56:38
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 22:11:24
 * @Description: 类型数组
 * @FilePath: \salt-lib\src\utils\type\typedArray.ts
 */
import { getTag } from './utils';
const allTypedArrayTags = /* @__PURE__ */ (() => new Set([
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
]))();
/** 断言参数是一个`TypedArray`(类型数组) */
export function isTypedArray(u) {
    return allTypedArrayTags.has(getTag(u));
}
/** 断言参数是一个`Int8Array`(Int8型的类型数组) */
export function isInt8Array(u) {
    return getTag(u) === 'Int8Array';
}
/** 断言参数是一个`Uint8Array`(Uint8型的类型数组) */
export function isUint8Array(u) {
    return getTag(u) === 'Uint8Array';
}
/** 断言参数是一个`Uint8ClampedArray`(Uint8Clamped型的类型数组) */
export function isUint8ClampedArray(u) {
    return getTag(u) === 'Uint8ClampedArray';
}
/** 断言参数是一个`Int16Array`(Int16型的类型数组) */
export function isInt16Array(u) {
    return getTag(u) === 'Int16Array';
}
/** 断言参数是一个`Uint16Array`(Uint16型的类型数组) */
export function isUint16Array(u) {
    return getTag(u) === 'Uint16Array';
}
/** 断言参数是一个`Int32Array`(Int32型的类型数组) */
export function isInt32Array(u) {
    return getTag(u) === 'Int32Array';
}
/** 断言参数是一个`Uint32Array`(Uint32型的类型数组) */
export function isUint32Array(u) {
    return getTag(u) === 'Uint32Array';
}
/** 断言参数是一个`Float32Array`(Float32型的类型数组) */
export function isFloat32Array(u) {
    return getTag(u) === 'Float32Array';
}
/** 断言参数是一个`Float64Array`(Float64型的类型数组) */
export function isFloat64Array(u) {
    return getTag(u) === 'Float64Array';
}
/** 断言参数是一个`BigInt64Array`(BigInt64型的类型数组) */
export function isBigInt64Array(u) {
    return getTag(u) === 'BigInt64Array';
}
/** 断言参数是一个`BigUint64Array`(BigUint64型的类型数组) */
export function isBigUint64Array(u) {
    return getTag(u) === 'BigUint64Array';
}
