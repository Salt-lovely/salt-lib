/*
 * @Author: Salt
 * @Date: 2022-08-30 22:35:17
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 19:39:17
 * @Description: DOM操作相关
 * @FilePath: \salt-lib\src\utils\dom.ts
 */

import { isArrayLikeObject } from './type/index'

/**
 * 封装`querySelector`
 * @param selectors 选择器
 * @param parentElement 可选，父元素
 */
export function $<K extends keyof HTMLElementTagNameMap>(
  selectors: K
): HTMLElementTagNameMap[K] | null
export function $<K extends keyof SVGElementTagNameMap>(
  selectors: K
): SVGElementTagNameMap[K] | null
export function $<E extends Element = Element>(selectors: string): E | null
export function $<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  parentElement: Element
): HTMLElementTagNameMap[K] | null
export function $<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  parentElement: Element
): SVGElementTagNameMap[K] | null
export function $<E extends Element = Element>(
  selectors: string,
  parentElement: Element
): E | null
export function $(selectors: string, parentElement?: Element) {
  if (parentElement) return parentElement.querySelector(selectors)
  return document.querySelector(selectors)
}
/**
 * 封装`querySelectorAll`
 * @param selectors 选择器
 * @param parentElement 可选，父元素
 */
export function $$<K extends keyof HTMLElementTagNameMap>(
  selectors: K
): Array<HTMLElementTagNameMap[K]>
export function $$<K extends keyof SVGElementTagNameMap>(
  selectors: K
): Array<SVGElementTagNameMap[K]>
export function $$<E extends Element = Element>(selectors: string): Array<E>
export function $$<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  parentElement: Element
): Array<HTMLElementTagNameMap[K]>
export function $$<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  parentElement: Element
): Array<SVGElementTagNameMap[K]>
export function $$<E extends Element = Element>(
  selectors: string,
  parentElement: Element
): Array<E>
export function $$(selectors: string, parentElement?: Element) {
  if (parentElement)
    return Array.from(parentElement.querySelectorAll(selectors))
  return Array.from(document.querySelectorAll(selectors))
}
/**
 * 检查元素是否在容器外面
 * @param childElement 要检测的元素
 * @param container 要检测的容器，不填则默认为`body`元素
 */
export function isOutside(
  childElement: Element,
  container: Element = document.body
) {
  if (!childElement || childElement === container) return false
  let obj = childElement.parentElement
  while (obj && obj !== container) obj = obj.parentElement
  return obj !== container
}
/** 监听鼠标是否点到某个元素外面去了 */
export function clickOutside(
  el: Element,
  fn: (ev: MouseEvent) => unknown
): () => void {
  const cb = (ev: MouseEvent) => {
    const { target } = ev
    if (target instanceof Element && isOutside(target, el)) fn(ev)
  }
  window.addEventListener('click', cb, true)
  return () => window.removeEventListener('click', cb)
}
/** 获取元素相对文档左上的位置(`top`和`left`) */
export function offset(el: Element) {
  // 如果元素不存在或隐藏，默认返回0值
  if (!el || !el.getClientRects().length) return { top: 0, left: 0 }
  var rect = el.getBoundingClientRect() // 元素的大小及其相对于视窗的位置
  var win = el.ownerDocument.defaultView! // 文档的默认窗口对象（只读）
  return { top: rect.top + win.pageYOffset, left: rect.left + win.pageXOffset }
}
/** 批量挂载节点到元素上，返回传入的元素 */
export function appendChildren(
  el: Element,
  ...children: Array<Node | ArrayLike<Node>>
) {
  _appendChildren(el, children)
  return el
}
function _appendChildren(
  el: Element,
  children: ArrayLike<Node | ArrayLike<Node>>
) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (isArrayLikeObject(child)) _appendChildren(el, child)
    else if (child instanceof Node) el.appendChild(child)
  }
}
