/*
 * @Author: Salt
 * @Date: 2022-08-29 22:05:13
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-29 23:24:08
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
