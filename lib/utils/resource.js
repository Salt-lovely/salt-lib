/*
 * @Author: Salt
 * @Date: 2022-08-29 21:54:24
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-29 22:04:35
 * @Description: 加载资源
 * @FilePath: \salt-lib\src\utils\resource.ts
 */
/** 根据URL添加脚本，可以根据`id`防止重复添加 */
export function addScript(url, asynchronous = false, id) {
    if (id && document.getElementById(id))
        return;
    const scr = document.createElement('script');
    scr.src = url;
    scr.async = asynchronous;
    if (id)
        scr.id = id;
    document.head.appendChild(scr);
}
/** 根据URL添加临时脚本，执行后立即卸载`script`节点 */
export function addTempScript(url, asynchronous = false) {
    const scr = document.createElement('script');
    scr.src = url;
    scr.async = asynchronous;
    scr.onload = scr.onerror = () => scr.remove();
    document.head.appendChild(scr);
}
/** 添加样式表 */
export function addStyle(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
/** 根据`id`添加或更新样式表 */
export function setStyle(css, id) {
    let style = document.getElementById(id);
    if (!style || style.tagName !== 'STYLE') {
        style = document.createElement('style');
        style.id = id;
    }
    style.textContent = css;
    document.head.appendChild(style);
}
/** 添加来自URL的样式表 */
export function addStyleUrl(url) {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
}
/** 根据`id`添加或更新来自URL的样式表 */
export function setStyleUrl(url, id) {
    let link = document.getElementById(id);
    if (!link || link.tagName !== 'LINK') {
        link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
    }
    link.href = url;
    document.head.appendChild(link);
}
