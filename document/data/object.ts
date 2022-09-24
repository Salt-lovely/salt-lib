/*
 * @Author: Salt
 * @Date: 2022-09-23 22:54:47
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-24 17:30:19
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\object.ts
 */

import { DocSection } from '../document'

const objectUtils: DocSection = {
  title: '对象操作方法 “object” Methods',
  name: 'object',
  main: [
    {
      name: 'isUnsafePropName',
      desc: '是否可用于属性名攻击',
      args: [
        {
          name: 'propName',
          desc: '要检查的属性名',
          type: 'string | number',
        },
      ],
      return: 'boolean',
      example:
        "isUnsafePropName('__proto__') // true\nisUnsafePropName('123') // false",
    },
    {
      name: 'isSafePropName',
      desc: '是否不可用于属性名攻击',
      args: [
        {
          name: 'propName',
          desc: '要检查的属性名',
          type: 'string | number',
        },
      ],
      return: 'boolean',
      example:
        "isSafePropName('__proto__') // false\nisSafePropName('123') // true",
    },
    {
      name: 'filterUnsafeProp',
      desc: '将对象中可枚举<code>enumerable</code>的不安全属性设为<code>undefined</code>',
      gene: 'T extends object',
      args: [
        {
          name: 'obj',
          type: 'T',
          desc: '需要检查的对象',
        },
      ],
      return: 'T',
      example:
        "filterUnsafeProp({a: 'a', toString: () => 'awa'}) // {a: 'a', toString: undefined}",
    },
    {
      name: 'extend',
      desc: '使用<code>prop</code>拓展<code>obj</code>，可以指定属性',
      gene: 'O extends object, N extends object',
      args: [
        { name: 'obj', desc: '被拓展的对象', type: 'O' },
        { name: 'prop', desc: '拓展用的对象', type: 'N' },
        {
          name: 'options',
          desc: '默认为不可枚举、可修改、可写入',
          type: '{ enumerable?: boolean; configurable?: boolean; writable?: boolean }',
          require: false,
        },
      ],
      return: 'O & N',
      example:
        'extend({ a: "a" }, { b: "b" }) // { a: "a", b: "b" } 其中“b”是不可枚举的',
    },
    {
      name: 'deepClone',
      desc: `
深度克隆（全复制）一个简单对象<code>{}</code>或数组<code>[]</code>，可以处理循环引用之类的特殊场景
<br/>
<b>无法</b>正确处理<code>String</code>、<code>Number</code>、<code>Date</code>、<code>Set</code>之类的特殊对象
<br/>
如果要处理这些特殊的对象，请尝试<code>deepClonePlus</code>`,
      gene: 'T',
      args: [
        {
          name: 'obj',
          type: 'T',
          desc: '需要全复制的对象，可以是简单对象或数组',
        },
      ],
      return: 'T',
      example: 'deepClone([[[{ a: "a" }]]]) // [[[{ a: "a" }]]]'
    },
    {
      name: 'deepClonePlus',
      desc: `
深度克隆（全复制）一个对象<code>{}</code>或数组<code>[]</code>，可以处理循环引用之类的特殊场景
<br/>
可以正确处理<code>String</code>、<code>Number</code>、<code>Date</code>、<code>Set</code>之类的特殊对象
<br/>
但是性能不如<code>deepClone</code>`,
      gene: 'T',
      args: [
        {
          name: 'obj',
          type: 'T',
          desc: '需要全复制的对象，可以是简单对象或数组',
        },
      ],
      return: 'T',
      example: `
const loopSet = { set: new Set() }
loopSet.set.add(loopSet) // 使用Set引用自身

const loopSetClone = deepClonePlus(loopSet)
loopSetClone.set.has(loopSetClone) // true
`
    },
  ],
}

export default objectUtils
