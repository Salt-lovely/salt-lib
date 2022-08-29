var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    return new Promise((res) => setTimeout(res, time));
}
/**
 * 一直等待到`fn`返回真值
 * @param fn 会一直等待到这个方法返回真值
 * @param time 轮询时间间隔，单位毫秒(ms)，默认120毫秒
 * @param timeout 超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为6,0000毫秒
 */
export function waitTill(fn, time = 120, timeout = 6e4) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        while (!fn()) {
            if (Date.now() - startTime > timeout)
                throw new Error('waitTill: timeout');
            yield sleep(time);
        }
    });
}
