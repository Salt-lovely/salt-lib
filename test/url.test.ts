/*
 * @Author: Salt
 * @Date: 2022-09-25 15:45:32
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-25 15:54:19
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\url.test.ts
 */
import { fixedEncodeURI, fixedEncodeURIComponent } from '../src/index'
it('URL测试 URL utils test - fixedEncodeURI', () => {
  expect(fixedEncodeURI('[测试]')).toBe('[%E6%B5%8B%E8%AF%95]')
  expect(fixedEncodeURI('  ')).toBe('%20%20')

  expect(fixedEncodeURIComponent('[测试]')).toBe('%5B%E6%B5%8B%E8%AF%95%5D')
  expect(fixedEncodeURIComponent('  ')).toBe('%20%20')
  expect(fixedEncodeURIComponent(123)).toBe('123')
  expect(fixedEncodeURIComponent(123456e20)).toBe('1.23456e%2B25')
  expect(fixedEncodeURIComponent('!\'()*')).toBe('%21%27%28%29%2A')
})
