/*
 * @Author: Salt
 * @Date: 2022-08-30 22:56:39
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 23:04:00
 * @Description: 杂项
 * @FilePath: \salt-lib\src\utils\misc.ts
 */
/**
 * 简易的断言方法
 * @param condition 要断言的内容
 * @param message 内容为假时抛出错误的内容
 */
export function assert(condition: any, message?: string): asserts condition {
  if (!condition) throw new Error(message)
}
