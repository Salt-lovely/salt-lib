/*
 * @Author: Salt
 * @Date: 2022-08-30 12:31:09
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 22:27:29
 * @Description: 默认的polyfill
 * @FilePath: \salt-lib\src\polyfill\index.ts
 */
import { defer } from '../utils/async'

const defaultUrl = 'https://polyfill.io/v3/polyfill.min.js'
/** 从`url`获取polyfill代码，默认从`polyfill.io`获取 */
export function polyfillIO(url = defaultUrl) {
  const dfr = defer<void>()
  const scr = document.createElement('script')
  scr.src = url
  scr.onload = () => dfr.resolve()
  scr.onerror = (e) => dfr.reject(e)
  document.head.appendChild(scr)
  return dfr.promise
}
/** 从`polyfill.io`获取ES5的polyfill */
export function polyfillES5() {
  return polyfillIO(defaultUrl + '?features=es5')
}
/** 从`polyfill.io`获取ES6的polyfill */
export function polyfillES6() {
  return polyfillIO(defaultUrl + '?features=es6')
}
/** 从`polyfill.io`获取**ES6和ES7**的polyfill */
export function polyfillES7() {
  return polyfillIO(defaultUrl + '?features=es6%2Ces7')
}
/** 从`polyfill.io`获取**ES6、ES7和ES8**的polyfill，注意这**并·不·能**获得`async function`功能 */
export function polyfillES8() {
  return polyfillIO(defaultUrl + '?features=es6%2Ces7%2Ces2017')
}
