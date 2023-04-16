/*
 * @Author: Salt
 * @Date: 2022-09-23 22:54:47
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 20:52:18
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\type.ts
 */

import { DocSection } from '../document'

const typeUtils: DocSection = {
  title: '类型守卫 “Type Guard” Methods',
  name: 'type',
  main: [
    {
      name: 'isString',
      desc: '断言传入的参数为字符串',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: "isString('123') // true\nisString(123) // false",
    },

    {
      name: 'isStringObject',
      desc: '断言传入的参数为字符串对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        "isStringObject(Object('123')) // true\nisStringObject('123') // false",
    },

    {
      name: 'isNumber',
      desc: '断言传入的参数为数字',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: "isNumber(123) // true\nisNumber('123') // false",
    },

    {
      name: 'isNumberObject',
      desc: '断言传入的参数为数字对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isNumberObject(Object(123)) // true\nisNumberObject(123) // false',
    },

    {
      name: 'isBigInt',
      desc: '断言传入的参数为大数',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isBigInt(123n) // true\nisBigInt(123) // false',
    },

    {
      name: 'isBigIntObject',
      desc: '断言传入的参数为大数对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isBigIntObject(Object(123n)) // true\nisBigIntObject(123n) // false',
    },

    {
      name: 'isBoolean',
      desc: '断言传入的参数为布尔型',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isBoolean(true) // true\nisBoolean(1) // false',
    },

    {
      name: 'isBooleanObject',
      desc: '断言传入的参数为布尔型对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isBooleanObject(Object(true)) // true\nisBooleanObject(true) // false',
    },

    {
      name: 'isSymbol',
      desc: '断言传入的参数为Symbol',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isSymbol(Symbol()) // true\nisSymbol(Symbol) // false',
    },

    {
      name: 'isSymbolObject',
      desc: '断言传入的参数为Symbol对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isSymbolObject(Object(Symbol())) // true\nisSymbolObject(Symbol()) // false',
    },

    {
      name: 'isPrimitiveObject',
      desc: '断言传入的参数为原生类型对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isPrimitiveObject(Object(1)) // true\nisPrimitiveObject({}) // false',
    },

    {
      name: 'isNil',
      desc: '断言传入的参数为<code>null</code>或<code>undefined</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isNil(null) // true\nisNil(false) // false',
    },

    {
      name: 'isNull',
      desc: '断言传入的参数为<code>null</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isNull(null) // true\nisNull(undefined) // false',
    },

    {
      name: 'isUndefined',
      desc: '断言传入的参数为<code>undefined</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isUndefined(undefined) // true\nisUndefined(null) // false',
    },

    {
      name: 'isFunction',
      desc: '断言传入的参数为函数',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isFunction(isFunction) // true\nisFunction({}) // false',
    },

    {
      name: 'isObject',
      desc: '断言传入的参数为对象，不包括函数和<code>null</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isObject({}) // true\nisObject(null) // false',
    },

    {
      name: 'isDate',
      desc: '断言传入的参数为<code>Date</code>对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isDate(new Date()) // true\nisDate({}) // false',
    },

    {
      name: 'isRegExp',
      desc: '断言传入的参数为正则表达式',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isRegExp(/123/) // true\nisRegExp("/123/") // false',
    },

    {
      name: 'isMap',
      desc: '断言传入的参数为<code>Map</code>对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isMap(new Map()) // true\nisMap([]) // false',
    },

    {
      name: 'isSet',
      desc: '断言传入的参数为<code>Set</code>对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isSet(new Set()) // true\nisSet({}) // false',
    },

    {
      name: 'isWeakMap',
      desc: '断言传入的参数为<code>WeakMap</code>对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isWeakMap(new WeakMap()) // true\nisWeakMap([]) // false',
    },

    {
      name: 'isWeakSet',
      desc: '断言传入的参数为<code>WeakSet</code>对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isWeakSet(new WeakSet()) // true\nisWeakSet({}) // false',
    },

    {
      name: 'isArray',
      desc: '断言传入的参数为数组',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isArray([]) // true\nisArray({ length: 0 }) // false',
    },

    {
      name: 'isArrayLike',
      desc: '断言传入的参数为类数组',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isArrayLike("") // true\nisArrayLike({ length: 0 }) // true\nisArrayLike({}) // false',
    },

    {
      name: 'isArrayLikeObject',
      desc: '断言传入的参数为类数组对象',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isArrayLikeObject("") // false\nisArrayLikeObject({ length: 0 }) // true\nisArrayLikeObject({}) // false',
    },

    {
      name: 'isInteger',
      desc: '断言传入的参数为整数',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isInteger(123) // true\nisInteger(1.3) // false',
    },

    {
      name: 'isValidLength',
      desc: '断言传入的参数为一个合规的<code>obj.length</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isValidLength(12) // true\nisValidLength(-1) // false',
    },

    {
      name: 'isPromise',
      desc: '断言传入的参数为一个<code>Promise</code>',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example: 'isPromise(Promise.resolve()) // true\nisPromise({ then() {} }) // false\nisPromise({}) // false',
    },

    {
      name: 'isPromiseLike',
      desc: '断言传入的参数为一个类<code>Promise</code>对象，此类对象的特征是有一个<code>then</code>方法',
      args: [{ name: 'u', type: 'any', desc: '要断言的参数' }],
      return: 'boolean',
      example:
        'isPromise(Promise.resolve()) // true\nisPromise({ then() {} }) // true\nisPromise({}) // false',
    },
  ],
}

export default typeUtils
