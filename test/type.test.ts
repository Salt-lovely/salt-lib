/*
 * @Author: Salt
 * @Date: 2022-09-04 23:14:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:46:16
 * @Description: 类型测试
 * @FilePath: \salt-lib\test\type.test.ts
 */
import {
  isString,
  isStringObject,
  isNumber,
  isNumberObject,
  isBigInt,
  isBigIntObject,
  isBoolean,
  isBooleanObject,
  isSymbol,
  isSymbolObject,
  isPrimitiveObject,
  isNil,
  isNull,
  isUndefined,
  isFunction,
  isObject,
  isDate,
  isRegExp,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isArray,
  isArrayLike,
  isArrayLikeObject,
  isInteger,
  isValidLength,
} from '../src/index'

it('类型测试 Type utils test - String Number Boolean', () => {
  expect(isString('string')).toBe(true)
  expect(isString(new String())).toBe(false)
  expect(isString(true)).toBe(false)
  expect(isString(1234)).toBe(false)

  expect(isStringObject('string')).toBe(false)
  expect(isStringObject(new String())).toBe(true)
  expect(isStringObject(true)).toBe(false)
  expect(isStringObject(1234)).toBe(false)

  expect(isNumber(1)).toBe(true)
  expect(isNumber(new Number())).toBe(false)
  expect(isNumber('123')).toBe(false)
  expect(isNumber(false)).toBe(false)

  expect(isNumberObject(1)).toBe(false)
  expect(isNumberObject(new Number())).toBe(true)
  expect(isNumberObject('123')).toBe(false)
  expect(isNumberObject(false)).toBe(false)
  // 整数
  expect(isInteger(1)).toBe(true)
  expect(isInteger(new Number(1))).toBe(false)
  expect(isInteger(1.23)).toBe(false)
  expect(isInteger(false)).toBe(false)

  expect(isBoolean(true)).toBe(true)
  expect(isBoolean(new Boolean())).toBe(false)
  expect(isBoolean('123')).toBe(false)
  expect(isBoolean(12345)).toBe(false)

  expect(isBooleanObject(true)).toBe(false)
  expect(isBooleanObject(new Boolean())).toBe(true)
  expect(isBooleanObject('123')).toBe(false)
  expect(isBooleanObject(12345)).toBe(false)
})
it('类型测试 Type utils test - bigint symbol null undefined', () => {
  // bigint
  // expect(isBigInt(12345n)).toBe(true)
  // expect(isBigInt(BigInt(123))).toBe(true)
  expect(isBigInt(12345)).toBe(false)
  expect(isBigInt(false)).toBe(false)

  // expect(isBigIntObject(Object(1n))).toBe(true)
  // expect(isBigIntObject(BigInt(123))).toBe(false)
  expect(isBigIntObject(true)).toBe(false)
  expect(isBigIntObject(1234)).toBe(false)
  // symbol
  expect(isSymbol(Symbol())).toBe(true)
  expect(isSymbol(Symbol('123'))).toBe(true)
  expect(isSymbol(Symbol('123').description)).toBe(false)
  expect(isSymbol('123')).toBe(false)

  expect(isSymbolObject(Object(Symbol()))).toBe(true)
  expect(isSymbolObject(Symbol())).toBe(false)
  expect(isSymbolObject(true)).toBe(false)
  expect(isSymbolObject(1234)).toBe(false)

  expect(isPrimitiveObject(Object(1))).toBe(true)
  expect(isPrimitiveObject(Object('1'))).toBe(true)
  expect(isPrimitiveObject(Object(true))).toBe(true)
  expect(isPrimitiveObject(Object(Symbol()))).toBe(true)
  // expect(isPrimitiveObject(Object(1n))).toBe(true)
  expect(isPrimitiveObject(1)).toBe(false)
  expect(isPrimitiveObject('1')).toBe(false)
  expect(isPrimitiveObject(true)).toBe(false)
  expect(isPrimitiveObject(Symbol())).toBe(false)
  // expect(isPrimitiveObject(1n)).toBe(true)

  // null
  expect(isNull(null)).toBe(true)
  expect(isNull(undefined)).toBe(false)
  expect(isNull(0)).toBe(false)
  expect(isNull(false)).toBe(false)
  // undefined
  expect(isUndefined(null)).toBe(false)
  expect(isUndefined(undefined)).toBe(true)
  expect(isUndefined(0)).toBe(false)
  expect(isUndefined(false)).toBe(false)
  // nil
  expect(isNil(null)).toBe(true)
  expect(isNil(undefined)).toBe(true)
  expect(isNil(0)).toBe(false)
  expect(isNil(false)).toBe(false)
})
it('类型测试 Type utils test - object Array ArrayLike', () => {
  // object
  expect(isObject(null)).toBe(false)
  expect(isObject(1234)).toBe(false)
  expect(isObject('""')).toBe(false)
  expect(isObject({})).toBe(true)
  expect(isObject([])).toBe(true)
  expect(isObject(new String())).toBe(true)
  // Array
  var arrLike = { 0: 0, 1: 1, 2: 2, length: 3 }
  expect(isArray(null)).toBe(false)
  expect(isArray(1234)).toBe(false)
  expect(isArray('""')).toBe(false)
  expect(isArray({})).toBe(false)
  expect(isArray([])).toBe(true)
  expect(isArray(arrLike)).toBe(false)
  // ArrayLike
  expect(isValidLength(0)).toBe(true)
  expect(isValidLength(1234)).toBe(true)
  expect(isValidLength(0.23)).toBe(false)
  expect(isValidLength(-12)).toBe(false)

  expect(isArrayLike(null)).toBe(false)
  expect(isArrayLike(1234)).toBe(false)
  expect(isArrayLike('""')).toBe(true)
  expect(isArrayLike({})).toBe(false)
  expect(isArrayLike([])).toBe(true)
  expect(isArrayLike(arrLike)).toBe(true)

  expect(isArrayLikeObject(null)).toBe(false)
  expect(isArrayLikeObject(1234)).toBe(false)
  expect(isArrayLikeObject('""')).toBe(false)
  expect(isArrayLikeObject({})).toBe(false)
  expect(isArrayLikeObject([])).toBe(true)
  expect(isArrayLikeObject(arrLike)).toBe(true)
})
it('类型测试 Type utils test - function Date RegExp Map Set', () => {
  // function
  expect(isFunction(isFunction)).toBe(true)
  expect(isFunction(() => {})).toBe(true)
  expect(isFunction(true)).toBe(false)
  expect(isFunction(1234)).toBe(false)
  // Date
  expect(isDate(new Date())).toBe(true)
  expect(isDate(Date)).toBe(false)
  expect(isDate(Date())).toBe(false)
  expect(isDate(1234)).toBe(false)
  // RegExp
  expect(isRegExp(/456/)).toBe(true)
  expect(isRegExp(RegExp)).toBe(false)
  expect(isRegExp(new RegExp('123'))).toBe(true)
  expect(isRegExp('123')).toBe(false)
  // Map
  expect(isMap(new Map())).toBe(true)
  expect(isMap(Map)).toBe(false)
  expect(isMap([])).toBe(false)
  expect(isMap(new Set())).toBe(false)
  // Set
  expect(isSet(new Set())).toBe(true)
  expect(isSet(Set)).toBe(false)
  expect(isSet([])).toBe(false)
  expect(isSet(new Map())).toBe(false)
  // WeakMap
  expect(isWeakMap(new WeakMap())).toBe(true)
  expect(isWeakMap(new Map())).toBe(false)
  expect(isWeakMap(WeakMap)).toBe(false)
  expect(isWeakMap(new Set())).toBe(false)
  // WeakSet
  expect(isWeakSet(new WeakSet())).toBe(true)
  expect(isWeakSet(new Set())).toBe(false)
  expect(isWeakSet(WeakSet)).toBe(false)
  expect(isWeakSet(new Map())).toBe(false)
})
