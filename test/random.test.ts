/*
 * @Author: Salt
 * @Date: 2022-09-08 20:32:37
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-08 20:59:08
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\test\random.test.ts
 */
import {
  randomChoice,
  randomHex,
  randomInt,
  randomIntBoth,
  randomIntCeil,
  uuidNil,
  uuidRandom,
  uuidV4,
} from '../src/index'

const loopTimes = 1e4
const arr10 = Array(10).fill(0)
it('随机数测试 Random utils test - randomInt', () => {
  const arr = arr10.map(() => 0)
  for (let i = 0; i < loopTimes; i++) {
    const r = randomInt(0, 10)
    expect(r).toBeGreaterThanOrEqual(0)
    expect(r).toBeLessThan(10)
    arr[r] += 1
  }
  expect(arr[0] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[3] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[6] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[9] / loopTimes).toBeCloseTo(0.1, 1)
})
it('随机数测试 Random utils test - randomIntCeil', () => {
  const arr = arr10.map(() => 0)
  for (let i = 0; i < loopTimes; i++) {
    const r = randomIntCeil(-1, 9)
    expect(r).toBeGreaterThan(-1)
    expect(r).toBeLessThanOrEqual(9)
    arr[r] += 1
  }
  expect(arr[0] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[3] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[6] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[9] / loopTimes).toBeCloseTo(0.1, 1)
})
it('随机数测试 Random utils test - randomIntBoth', () => {
  const arr = arr10.map(() => 0)
  for (let i = 0; i < loopTimes; i++) {
    const r = randomIntBoth(0, 9)
    expect(r).toBeGreaterThanOrEqual(0)
    expect(r).toBeLessThanOrEqual(9)
    arr[r] += 1
  }
  expect(arr[0] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[3] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[6] / loopTimes).toBeCloseTo(0.1, 1)
  expect(arr[9] / loopTimes).toBeCloseTo(0.1, 1)
})
it('随机数测试 Random utils test - randomHex', () => {
  const test1 = RegExp.prototype.test.bind(/^[0-9a-f]{1}$/)
  const test4 = RegExp.prototype.test.bind(/^[0-9a-f]{4}$/)
  const test8 = RegExp.prototype.test.bind(/^[0-9a-f]{8}$/)
  const max = Math.ceil(loopTimes / 10) // 比较费资源所以少一些
  for (let i = 0; i < max; i++) {
    expect(test1(randomHex(1))).toBe(true)
    expect(test4(randomHex(4))).toBe(true)
    expect(test8(randomHex(8))).toBe(true)
  }
})
it('随机数测试 Random utils test - randomChoice', () => {
  const arr = arr10.map(() => randomHex(8))
  for (let i = 0; i < loopTimes; i++) {
    expect(arr.includes(randomChoice(arr))).toBe(true)
  }
})
it('随机数测试 Random utils test - uuid', () => {
  const testR = RegExp.prototype.test.bind(
    /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/
  )
  const test4 = RegExp.prototype.test.bind(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  )
  const max = Math.ceil(loopTimes / 10) // 比较费资源所以少一些
  for (let i = 0; i < max; i++) {
    expect(testR(uuidRandom())).toBe(true)
    expect(test4(uuidV4())).toBe(true)
  }
  expect(uuidNil).toBe('00000000-0000-0000-0000-000000000000')
})
