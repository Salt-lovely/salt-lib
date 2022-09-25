/*
 * @Author: Salt
 * @Date: 2022-09-25 15:41:18
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-25 15:43:43
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\utils\url.ts
 */
/** 遵循[RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)规范的`encodeURI`，代码来自[MDN](//developer.mozilla.org) */
export function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
/** 遵循[RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)规范的`encodeURIComponent`，代码来自[MDN](//developer.mozilla.org) */
export function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
