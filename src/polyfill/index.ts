/*
 * @Author: Salt
 * @Date: 2022-08-30 12:31:09
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 21:59:34
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\polyfill\index.ts
 */
import { defer } from '../utils/async'
/** 默认从`polyfill.io`获取polyfill */
export function polyfillIO(url = 'https://polyfill.io/v3/polyfill.min.js') {
  const dfr = defer<void>()
  const scr = document.createElement('script')
  scr.src = url
  scr.onload = () => dfr.resolve()
  scr.onerror = (e) => dfr.reject(e)
  document.head.appendChild(scr)
  return dfr.promise
}
