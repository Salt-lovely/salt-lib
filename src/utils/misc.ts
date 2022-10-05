/*
 * @Author: Salt
 * @Date: 2022-08-30 22:56:39
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:43:29
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

export function getGlobal(): typeof globalThis {
  if (typeof self === 'object') return self
  if (typeof window === 'object') return window
  if (typeof global === 'object') return global
  return globalThis
}
