/** 延迟一段时间
 * @param time 延迟多少时间，单位毫秒(ms)，默认120毫秒
 */
export declare function sleep(time?: number): Promise<void>;
/**
 * 一直等待到`fn`返回真值
 * @param fn 会一直等待到这个方法返回真值
 * @param time 轮询时间间隔，单位毫秒(ms)，默认120毫秒
 * @param timeout 超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为6,0000毫秒
 */
export declare function waitTill(fn: () => unknown, time?: number, timeout?: number): Promise<void>;
