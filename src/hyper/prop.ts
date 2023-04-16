/*
 * @Author: Salt
 * @Date: 2022-10-04 09:27:54
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:26:52
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\prop.ts
 */
import { isNil } from '../utils/type/index'
import {
  ElementAttrs,
  ElementDataSet,
  ElementStyle,
  GetHTMLElementByTag,
} from './hyper'

export function HProps<K extends string>(
  el: GetHTMLElementByTag<K>,
  option: Partial<ElementAttrs<K>>
) {
  Object.assign(el, option)
}

export function HAttrs<K extends string>(
  el: GetHTMLElementByTag<K>,
  option: Partial<ElementStyle & ElementDataSet>
) {
  if (option.style) {
    const { style } = option
    Object.assign(el.style, style)
  }
  if (option.dataSet) {
    const { dataSet } = option
    for (const key in dataSet) {
      if (!isNil(dataSet[key]))
        el.setAttribute(`data-${key}`, `${dataSet[key]}`)
    }
  }
}
