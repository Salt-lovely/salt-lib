/*
 * @Author: Salt
 * @Date: 2023-04-16 21:51:54
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 21:55:19
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\utils\type\utils.ts
 */
/** 获取对象的`Symbol.toStringTag` */
export function getTag(u) {
    return Object.prototype.toString.call(u).slice(8, -1);
}
