/*
 * @Author: Salt
 * @Date: 2022-08-31 13:21:23
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-08 20:46:47
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\utils\random.ts
 */
/**
 * 返回一个`[start, end)`区域内的整数
 * @param start 区间最小值，默认为`0`
 * @param end 区间最大值，结果中**不包括**此数，默认为`100`
 */
export function randomInt(start = 0, end = 100) {
  return Math.floor(Math.random() * (end - start)) + start
}
/**
 * 返回一个`(start, end]`区域内的整数
 * @param start 区间最小值，结果中**不包括**此数，默认为`0`
 * @param end 区间最大值，默认为`100`
 */
export function randomIntCeil(start = 0, end = 100) {
  return Math.ceil(Math.random() * (end - start)) + start
}
/**
 * 返回一个`[start, end]`区域内的整数
 * @param start 区间最小值，默认为`0`
 * @param end 区间最大值，默认为`100`
 */
export function randomIntBoth(start = 0, end = 100) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}
/**
 * 从数组或类数组中随机抽取一个元素
 * @param arr 数组或类数组
 */
export function randomChoice<T>(arr: ArrayLike<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
/** 快速生成十六进制字符串`0 1 ... e f`，`len`不能大于`13` */
export function randomHex(len: number) {
  let str = Math.floor(Math.random() * 16 ** len).toString(16)
  while (str.length < len) str = '0' + str // 考虑到兼容性，不使用 padStart
  return str
}
/** 生成一个v4版uuid，https://www.ietf.org/rfc/rfc4122.txt */
export function uuidV4() {
  return (
    randomHex(8) +
    '-' +
    randomHex(4) +
    '-4' +
    randomHex(3) +
    '-' +
    '89ab'[Math.floor(Math.random() * 4)] +
    randomHex(3) +
    '-' +
    randomHex(12)
  )
}
/** 生成一个全随机uuid，类似v4，但是版本位和变型位也随机 */
export function uuidRandom() {
  return (
    randomHex(8) +
    '-' +
    randomHex(4) +
    '-' +
    randomHex(4) +
    '-' +
    randomHex(4) +
    '-' +
    randomHex(12)
  )
}
/** 空的uuid，https://www.ietf.org/rfc/rfc4122.txt 4.1.7 */
export const uuidNil = '00000000-0000-0000-0000-000000000000'
