/*
 * @Author: Salt
 * @Date: 2022-09-19 22:10:06
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-19 22:11:34
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\console.test.ts
 */
import { $debug, $error, $info, $log, $warn } from '../src/index'

it('控制台方法测试 console utils test', () => {
  expect($debug()).resolves.toBe(undefined)
  expect($error()).resolves.toBe(undefined)
  expect($info()).resolves.toBe(undefined)
  expect($log()).resolves.toBe(undefined)
  expect($warn()).resolves.toBe(undefined)

  expect($debug(1)).resolves.toBe(undefined)
  expect($error(1)).resolves.toBe(undefined)
  expect($info(1)).resolves.toBe(undefined)
  expect($log(1)).resolves.toBe(undefined)
  expect($warn(1)).resolves.toBe(undefined)

  expect($debug('1', ['test', 3])).resolves.toBe(undefined)
  expect($error('1', ['test', 3])).resolves.toBe(undefined)
  expect($info('1', ['test', 3])).resolves.toBe(undefined)
  expect($log('1', ['test', 3])).resolves.toBe(undefined)
  expect($warn('1', ['test', 3])).resolves.toBe(undefined)
})
