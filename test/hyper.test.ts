/*
 * @Author: Salt
 * @Date: 2022-10-05 09:52:17
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:45:36
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\hyper.test.ts
 */
import { h, splitOption } from '../src/index'

it('快速生成DOM测试 Hyper utils test - splitOption', () => {
  const fn = () => {}
  const option = { onClick: fn, href: '', dataSet: {}, style: {} }
  expect(splitOption(option)).toStrictEqual([
    { href: '' },
    { onClick: fn },
    { dataSet: {}, style: {} },
  ])
})

it('快速生成DOM测试 Hyper utils test - h', () => {
  const fn = jest.fn()
  const href = 'https://www.awa.com/'
  const awa = 'awa'
  const color = 'rgb(170, 143, 220)'
  // 基本测试
  const el = h('a', { onClick: fn, href, dataSet: { awa }, style: { color } })
  expect(el.href).toBe(href)
  expect(el.style.color).toBe(color)
  expect(el.getAttribute('data-awa')).toBe(awa)
  expect(fn).toBeCalledTimes(0)
  el.click()
  expect(fn).toBeCalledTimes(1)
  // 测试过滤`undefined`属性
  const el2 = h('a', { href: undefined })
  expect(el2.href).toBe('')
  // 测试子元素
  const el3 = h('a', null, [1, '2', 3], ['4'], h('span', null, '5', [6]))
  expect(el3.textContent).toBe('123456')
})
