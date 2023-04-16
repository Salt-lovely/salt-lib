/*
 * @Author: Salt
 * @Date: 2022-09-12 14:01:00
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 21:48:21
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\object.test.ts
 */
import {
  isSafePropName,
  isUnsafePropName,
  filterUnsafeProp,
  forSafePropsInObject,
  extend,
  deepClone,
  deepClonePlus,
  isStringObject,
  isNumberObject,
  isBooleanObject,
  isDate,
  isRegExp,
  isString,
} from '../src/index'

it('对象操作测试 Object utils test - SafePropName', () => {
  expect(isSafePropName('a')).toBe(true)
  expect(isSafePropName(1)).toBe(true)
  expect(isSafePropName('__proto__')).toBe(false)
  expect(isSafePropName('constructor')).toBe(false)
  expect(isSafePropName('toString')).toBe(false)
  expect(isSafePropName('valueOf')).toBe(false)

  expect(isUnsafePropName('a')).toBe(false)
  expect(isUnsafePropName(1)).toBe(false)
  expect(isUnsafePropName('prototype')).toBe(true)
  expect(isUnsafePropName('hasOwnProperty')).toBe(true)
  expect(isUnsafePropName('propertyIsEnumerable')).toBe(true)
  expect(isUnsafePropName('isPrototypeOf')).toBe(true)

  const obj = Object.create(null) as any
  obj.toString = 'a'
  obj.__proto__ = 'a'
  obj.valueOf = 'a'
  obj.propertyIsEnumerable = 'a'
  obj.awa = 'b'
  obj.cwc = 'b'
  obj['1'] = 'b'

  const safeObj = filterUnsafeProp(obj)
  expect(safeObj.toString).toBe(undefined)
  expect(safeObj.__proto__).toBe(undefined)
  expect(safeObj.valueOf).toBe(undefined)
  expect(safeObj.propertyIsEnumerable).toBe(undefined)
  expect(safeObj.awa).toBe('b')
  expect(safeObj.cwc).toBe('b')
  expect(safeObj['1']).toBe('b')

  // forSafePropsInObject
  // 有回调
  let s = ''
  obj.toString = 'a'
  obj.__proto__ = 'a'
  obj.valueOf = 'a'
  obj.propertyIsEnumerable = 'a'
  obj.awa = 'b'
  obj.cwc = 'b'
  obj['1'] = 'b'
  const obj1 = forSafePropsInObject(obj, (p, v) => {
    expect(isUnsafePropName(p)).toBe(false)
    expect(isSafePropName(p)).toBe(true)
    expect(v).toBe('b')
    s += v
  })
  expect(s).toBe('bbb')
  expect(obj1.toString).toBe('a')
  expect(obj1.__proto__).toBe('a')
  expect(obj1.valueOf).toBe('a')
  expect(obj1.propertyIsEnumerable).toBe('a')
  expect(obj1.awa).toBe('b')
  expect(obj1.cwc).toBe('b')
  expect(obj1['1']).toBe('b')
  const obj2 = forSafePropsInObject(
    obj,
    (p, v) => {
      expect(isUnsafePropName(p)).toBe(false)
      expect(isSafePropName(p)).toBe(true)
      expect(v).toBe('b')
      s += v
    },
    true
  )
  expect(s).toBe('bbbbbb')
  expect(obj2.toString).toBe(undefined)
  expect(obj2.__proto__).toBe(undefined)
  expect(obj2.valueOf).toBe(undefined)
  expect(obj2.propertyIsEnumerable).toBe(undefined)
  expect(obj2.awa).toBe('b')
  expect(obj2.cwc).toBe('b')
  expect(obj2['1']).toBe('b')

  // 没有回调
  obj.toString = 'a'
  obj.__proto__ = 'a'
  obj.valueOf = 'a'
  obj.propertyIsEnumerable = 'a'
  obj.awa = 'b'
  obj.cwc = 'b'
  obj['1'] = 'b'
  const obj3 = forSafePropsInObject(obj)
  expect(obj3.toString).toBe('a')
  expect(obj3.__proto__).toBe('a')
  expect(obj3.valueOf).toBe('a')
  expect(obj3.propertyIsEnumerable).toBe('a')
  expect(obj3.awa).toBe('b')
  expect(obj3.cwc).toBe('b')
  expect(obj3['1']).toBe('b')
  const obj4 = forSafePropsInObject(obj, undefined, true)
  expect(obj4.toString).toBe(undefined)
  expect(obj4.__proto__).toBe(undefined)
  expect(obj4.valueOf).toBe(undefined)
  expect(obj4.propertyIsEnumerable).toBe(undefined)
  expect(obj4.awa).toBe('b')
  expect(obj4.cwc).toBe('b')
  expect(obj4['1']).toBe('b')
})

it('对象操作测试 Object utils test - 基本测试 extend deepClone', () => {
  // 基础测试
  const _obj = { a: 'a', b: [{ c: 'c' }, { d: ['d'] }, { true: true }] } as any
  const __obj = extend(
    _obj,
    { awa: { qwq: 1 } },
    { enumerable: true, configurable: true, writable: true }
  )
  const obj = extend(__obj, { o: {} })
  expect(obj.awa.qwq).toBe(1)
  expect(obj.b[1].d![0]).toBe('d')
  expect(obj.b[0].c!).toBe('c')
  expect(obj.a).toBe('a')

  const _awa = deepClone(obj)
  expect(_awa.o).toBe(undefined) // o 不可枚举
  expect(_awa.awa.qwq).toBe(1)
  _awa.awa.qwq = 1234
  expect(_awa.awa.qwq).toBe(1234)
  _awa.b[1].d![0] = 1234
  _awa.a = 1234

  const _qwq = deepClonePlus(obj)
  expect(_qwq.o).toBe(undefined) // o 不可枚举
  expect(_qwq.awa.qwq).toBe(1)
  _qwq.awa.qwq = 4321
  expect(_qwq.awa.qwq).toBe(4321)
  _qwq.b[1].d![0] = 4321
  _qwq.a = 4321

  expect(obj.awa.qwq).toBe(1) // 原对象不能改变
})

it('对象操作测试 Object utils test - 循环引用 Loop Ref', () => {
  // 循环引用测试
  /** 循环引用`selfObj` */
  const sym1 = Symbol()
  /** 循环引用`loopArr` */
  const sym2 = Symbol()
  const selfObj = { a: { b: {} as any } as any, c: [{ d: 1 }] } as any
  selfObj.a.b.selfObj = selfObj
  selfObj.a.selfObj = selfObj
  selfObj[sym1] = selfObj
  const loopArr = [{ a: 1 }] as any[]
  loopArr[1] = loopArr
  selfObj.a.b.loopArr = loopArr
  selfObj.a.loopArr = loopArr
  selfObj[sym2] = loopArr

  const selfObj_awa = deepClone(selfObj)
  expect(selfObj_awa === selfObj_awa.a.selfObj).toBe(true)
  expect(selfObj_awa === selfObj_awa.a.b.selfObj).toBe(true)
  expect(selfObj_awa === selfObj_awa[sym1]).toBe(true)
  expect(selfObj_awa.a.b.loopArr === selfObj_awa.a.loopArr).toBe(true)
  expect(selfObj_awa.a.loopArr === selfObj_awa.a.loopArr[1]).toBe(true)
  expect(selfObj_awa.a.loopArr[1][0].a).toBe(1)
  expect(selfObj_awa[sym2][0].a).toBe(1)
  selfObj_awa.a.b.loopArr[1][0].a = 1234
  expect(selfObj_awa.a.loopArr[0].a).toBe(1234)

  const selfObj_qwq = deepClonePlus(selfObj)
  expect(selfObj_qwq === selfObj_qwq.a.selfObj).toBe(true)
  expect(selfObj_qwq === selfObj_qwq.a.b.selfObj).toBe(true)
  expect(selfObj_qwq === selfObj_qwq[sym1]).toBe(true)
  expect(selfObj_qwq.a.b.loopArr === selfObj_qwq.a.loopArr).toBe(true)
  expect(selfObj_qwq.a.loopArr === selfObj_qwq.a.loopArr[1]).toBe(true)
  expect(selfObj_qwq.a.loopArr[1][0].a).toBe(1)
  expect(selfObj_qwq[sym2][0].a).toBe(1)
  selfObj_qwq.a.b.loopArr[1][0].a = 4321
  expect(selfObj_qwq.a.loopArr[0].a).toBe(4321)
})

it('对象操作测试 Object utils test - 循环引用 Set Map  Loop Ref of Set Map', () => {
  const obj = Object.create(null) as any
  obj.toString = 'a'
  obj.__proto__ = 'a'
  // deepClonePlus 循环引用 Set Map 测试
  const loopSet = {
    set: new Set(),
    map: new Map(),
    date: new Date(),
    reg: /123/i,
    str: Object('awa'),
    num: Object(12345),
    boo: Object(false),
    obj,
  } as any
  loopSet.loopSet = loopSet
  loopSet.set.add(loopSet)
  loopSet.set.add(loopSet.set)
  loopSet.map.set(loopSet, loopSet.map)
  loopSet.map.set(loopSet.map, loopSet)
  const loopSet_qwq = deepClonePlus(loopSet)
  // Set与Map的自引用正确
  expect(loopSet_qwq.set.has(loopSet_qwq)).toBe(true)
  expect(loopSet_qwq.set.has(loopSet_qwq.set)).toBe(true)
  expect(loopSet_qwq.map.get(loopSet_qwq) === loopSet_qwq.map).toBe(true)
  expect(loopSet_qwq.map.get(loopSet_qwq.map) === loopSet_qwq).toBe(true)
  // 不得包含以前的元素
  expect(loopSet_qwq.set.has(loopSet)).toBe(false)
  expect(loopSet_qwq.set.has(loopSet.set)).toBe(false)
  expect(loopSet_qwq.map.has(loopSet)).toBe(false)
  expect(loopSet_qwq.map.has(loopSet.map)).toBe(false)
  // 其他内容
  expect(isDate(loopSet_qwq.loopSet.date)).toBe(true)
  expect(isRegExp(loopSet_qwq.loopSet.reg)).toBe(true)
  expect(isStringObject(loopSet_qwq.loopSet.str)).toBe(true)
  expect(isNumberObject(loopSet_qwq.loopSet.num)).toBe(true)
  expect(isBooleanObject(loopSet_qwq.loopSet.boo)).toBe(true)
  // 原型正确
  expect(isString(loopSet_qwq.loopSet.obj.toString)).toBe(true)
  expect(isString(loopSet_qwq.obj.__proto__)).toBe(true)
})
