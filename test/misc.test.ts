/*
 * @Author: Salt
 * @Date: 2022-09-14 22:13:07
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:45:32
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\misc.test.ts
 */
import { assert, getGlobal } from '../src/index'

it('杂项测试 Misc utils test - assert', () => {
  expect(assert(true, 'owo')).toBe(undefined)
  expect(() => assert('')).toThrow(Error)
  expect(() => assert(false, 'awa')).toThrow('awa')
  expect(() => assert(0, 'qwq')).toThrow('qwq')
})

it('杂项测试 Misc utils test - getGlobal', () => {
  expect(getGlobal()).toBe(window)
})
