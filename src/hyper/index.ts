/*
 * @Author: Salt
 * @Date: 2022-10-03 10:10:26
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:40:56
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\index.ts
 */
import { HChild } from './children'
import { HEvent } from './event'
import { HAttrs, HProps } from './prop'
import {
  CEChildren,
  ElementAttrs,
  ElementDataSet,
  ElementEvents,
  ElementStyle,
  GetHTMLElementByTag,
  GetHTMLElementOptions,
} from './hyper'
import { forSafePropsInObject } from '../utils/object'
import { isUndefined } from '../utils/type/index'
/**
 * **需要DOM环境**\
 * 生成一个HTML元素并赋予初始数据
 * @param tagName 元素的标签名，如`div`、`a`或`p`
 * @param option 元素初始化属性，如`className`或者`href`，也可以用`onClick`属性来绑定事件
 */
export function h<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  option?: GetHTMLElementOptions<K> | null,
  ...children: CEChildren[]
): HTMLElementTagNameMap[K]
export function h<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: K,
  option?: GetHTMLElementOptions<K> | null,
  ...children: CEChildren[]
): HTMLElementDeprecatedTagNameMap[K]
export function h<K extends string>(
  tagName: K,
  option?: GetHTMLElementOptions<K> | null,
  ...children: CEChildren[]
): HTMLElement
export function h<K extends string>(
  tagName: K,
  option?: GetHTMLElementOptions<K> | null,
  ...children: CEChildren[]
): GetHTMLElementByTag<K> {
  const el = document.createElement(tagName) as GetHTMLElementByTag<K>

  if (option) {
    const [p, e, a] = splitOption(option)

    HProps(el, p)
    HEvent(el, e)
    HAttrs(el, a)
  }

  HChild(el, children)

  return el
}

export function splitOption<K extends string>(
  option: GetHTMLElementOptions<K>
): [
  Partial<ElementAttrs<K>>,
  Partial<ElementEvents<K>>,
  Partial<ElementStyle & ElementDataSet>
] {
  const events = {} as Partial<ElementEvents<K>>
  const props = {} as Partial<ElementAttrs<K>>
  const attrs = {} as Partial<ElementStyle & ElementDataSet>
  forSafePropsInObject(option, (p, v: any) => {
    if (isUndefined(v)) return
    // @ts-ignore
    if (p.startsWith('on')) events[p] = v
    // @ts-ignore
    else if (p === 'style' || p === 'dataSet') attrs[p] = v
    // @ts-ignore
    else props[p] = v
  })
  return [props, events, attrs]
}
