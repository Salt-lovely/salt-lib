/*
 * @Author: Salt
 * @Date: 2022-08-30 22:35:17
 * @LastEditors: Salt
 * @LastEditTime: 2022-11-02 20:54:04
 * @Description: DOM操作相关
 * @FilePath: \salt-lib\src\utils\dom.ts
 */
import { isArrayLikeObject } from './type';
export function $(selectors, parentElement) {
    if (parentElement)
        return parentElement.querySelector(selectors);
    return document.querySelector(selectors);
}
export function $$(selectors, parentElement) {
    if (parentElement)
        return Array.from(parentElement.querySelectorAll(selectors));
    return Array.from(document.querySelectorAll(selectors));
}
/**
 * 检查元素是否在容器外面
 * @param childElement 要检测的元素
 * @param container 要检测的容器，不填则默认为`body`元素
 */
export function isOutside(childElement, container = document.body) {
    if (!childElement || childElement === container)
        return false;
    let obj = childElement.parentElement;
    while (obj && obj !== container)
        obj = obj.parentElement;
    return obj !== container;
}
/** 监听鼠标是否点到某个元素外面去了 */
export function clickOutside(el, fn) {
    const cb = (ev) => {
        const { target } = ev;
        if (target instanceof Element && isOutside(target, el))
            fn(ev);
    };
    window.addEventListener('click', cb, true);
    return () => window.removeEventListener('click', cb);
}
/** 获取元素相对文档左上的位置(`top`和`left`) */
export function offset(el) {
    // 如果元素不存在或隐藏，默认返回0值
    if (!el || !el.getClientRects().length)
        return { top: 0, left: 0 };
    var rect = el.getBoundingClientRect(); // 元素的大小及其相对于视窗的位置
    var win = el.ownerDocument.defaultView; // 文档的默认窗口对象（只读）
    return { top: rect.top + win.pageYOffset, left: rect.left + win.pageXOffset };
}
/** 批量挂载节点到元素上，返回传入的元素 */
export function appendChildren(el, ...children) {
    _appendChildren(el, children);
    return el;
}
function _appendChildren(el, children) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isArrayLikeObject(child))
            _appendChildren(el, child);
        else if (child instanceof Node)
            el.appendChild(child);
    }
}
