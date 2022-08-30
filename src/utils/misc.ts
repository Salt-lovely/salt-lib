/*
 * @Author: Salt
 * @Date: 2022-08-30 22:56:39
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 22:57:01
 * @Description: 杂项
 * @FilePath: \salt-lib\src\utils\misc.ts
 */
export function assert(condition: any, message?: string): asserts condition {
  if (!condition) throw new Error(message)
}
