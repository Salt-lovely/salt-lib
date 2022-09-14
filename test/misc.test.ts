/*
 * @Author: Salt
 * @Date: 2022-09-14 22:13:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-14 22:18:10
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\misc.test.ts
 */
import { assert } from '../src/index'

it('杂项测试 Misc utils test - assert', () => {
  expect(assert(true, 'owo')).toBe(undefined)
  expect(() => assert('')).toThrow(Error)
  expect(() => assert(false, 'awa')).toThrow('awa')
  expect(() => assert(0, 'qwq')).toThrow('qwq')
})
