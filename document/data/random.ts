/*
 * @Author: Salt
 * @Date: 2022-09-23 22:53:58
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-25 00:16:32
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\random.ts
 */
import { DocSection } from '../document'

const randomUtils: DocSection = {
  title: '随机数方法 “Random” Methods',
  name: 'random',
  main: [
    {
      name: 'randomInt',
      desc: '返回一个<code>[start, end)</code>区域内的整数',
      args: [
        { name: 'start', desc: '区间最小值', type: 'number', default: '0' },
        {
          name: 'end',
          desc: '区间最大值，结果中<b>不包括</b>此数',
          type: 'number',
          default: '100',
        },
      ],
      return: 'number',
      example: '',
    },
    {
      name: 'randomIntCeil',
      desc: '返回一个<code>(start, end]</code>区域内的整数',
      args: [
        {
          name: 'start',
          desc: '区间最小值，结果中<b>不包括</b>此数',
          type: 'number',
          default: '0',
        },
        { name: 'end', desc: '区间最大值', type: 'number', default: '100' },
      ],
      return: 'number',
      example: '',
    },
    {
      name: 'randomIntBoth',
      desc: '返回一个<code>[start, end]</code>区域内的整数',
      args: [
        { name: 'start', desc: '区间最小值', type: 'number', default: '0' },
        { name: 'end', desc: '区间最大值', type: 'number', default: '100' },
      ],
      return: 'number',
      example: '',
    },
    {
      name: 'randomChoice',
      desc: '从数组或类数组中随机抽取一个元素',
      gene: 'T',
      args: [{ name: 'arr', type: 'ArrayLike<T>', desc: '数组或类数组' }],
      return: 'T',
      example:
        'randomChoice([1, 2, 3])\nrandomChoice({ 0: 1, 1: 2, 2: 3, length: 3 })',
    },
    {
      name: 'randomHex',
      desc: '快速生成十六进制字符串<code>0 1 ... e f</code>',
      args: [
        {
          name: 'len',
          type: 'number',
          desc: '字符串长度，<b>不能超过13</b>',
        },
      ],
      return: 'string',
      example:
        'randomHex(4) // ae53, bcf9, 098e ...\nrandomHex(2) // a3, 79, 2e ...',
    },
    {
      name: 'uuidV4',
      desc: '生成一个v4版uuid，遵循<a href="https://www.ietf.org/rfc/rfc4122.txt">RFC4122</a>规范',
      return: 'string',
    },
    {
      name: 'uuidRandom',
      desc: '生成一个全随机uuid，类似v4，但是版本位和变型位也随机',
      return: 'string',
    },
  ],
}

export default randomUtils
