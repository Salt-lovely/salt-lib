/*
 * @Author: Salt
 * @Date: 2022-08-29 22:05:13
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 23:04:57
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\utils\async.ts
 */
/** 延迟一段时间
 * @param time 延迟多少时间，单位毫秒(ms)，默认120毫秒
 */
export function sleep(time = 120) {
  return new Promise<void>((res) => setTimeout(res, time))
}
/**
 * 一直等待到`fn`返回真值
 * @param fn 会一直等待到这个方法返回真值
 * @param time 轮询时间间隔，单位毫秒(ms)，默认120毫秒
 * @param timeout 超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为6,0000毫秒
 */
export async function waitTill(fn: () => unknown, time = 120, timeout = 6e4) {
  const startTime = Date.now()
  while (!fn()) {
    if (Date.now() - startTime > timeout) throw new Error('waitTill: timeout')
    await sleep(time)
  }
}
type Defer<T> = {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}
/**
 * 将回调逻辑改写为异步逻辑的方法
 * @returns 一个`Defer`对象，其上有三个属性，`promise`、`resolve`和`reject`
 */
export function defer<T>() {
  const dfr = {} as Defer<T>
  dfr.promise = new Promise<T>((res, rej) => {
    dfr.resolve = res
    dfr.reject = rej
  })
  return dfr
}
/** 文档准备完毕后执行回调，相当于jQuery的`$(()=>{})` */
export function docReady(fn: () => unknown) {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', fn)
  } else {
    fn()
  }
}
/** 等待文档准备完毕
 * @param time 轮询时间间隔，单位毫秒(ms)，默认240毫秒
 * @param timeout 超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为12,0000毫秒
 */
export function waitDocReady(time = 240, timeout = 12e4) {
  return waitTill(() => document.readyState !== 'loading', time, timeout)
}
