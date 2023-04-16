/*
 * @Author: Salt
 * @Date: 2022-10-03 15:58:56
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 13:04:47
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\event.ts
 */
import { isFunction, isObject } from '../utils/type/index'
import { ElementEvents, GetHTMLElementByTag } from './hyper'

export function HEvent<K extends string>(
  el: GetHTMLElementByTag<K>,
  option?: Partial<ElementEvents<K>> | null
) {
  if (isObject(option)) {
    for (const key in option) {
      if (
        key.startsWith('on') &&
        isFunction(option[key as Extract<keyof ElementEvents<K>, string>])
      ) {
        // @ts-ignore 魔法：`{ onClick: function }` => `addEventListener('click', function)`
        el.addEventListener(key.slice(2).toLowerCase(), option[key])
      }
    }
  }
}
