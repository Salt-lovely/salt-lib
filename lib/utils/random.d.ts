/**
 * 返回一个`[start, end)`区域内的整数
 * @param start 区间最小值，默认为`0`
 * @param end 区间最大值，结果中**不包括**此数，默认为`100`
 */
export declare function randomInt(start?: number, end?: number): number;
/**
 * 返回一个`(start, end]`区域内的整数
 * @param start 区间最小值，结果中**不包括**此数，默认为`0`
 * @param end 区间最大值，默认为`100`
 */
export declare function randomIntCeil(start?: number, end?: number): number;
/**
 * 返回一个`[start, end]`区域内的整数
 * @param start 区间最小值，默认为`0`
 * @param end 区间最大值，默认为`100`
 */
export declare function randomIntBoth(start?: number, end?: number): number;
/**
 * 从数组或类数组中随机抽取一个元素
 * @param arr 数组或类数组
 */
export declare function randomChoice<T>(arr: ArrayLike<T>): T;
/** 快速生成十六进制字符串`0 1 ... e f`，`len`不能大于`13` */
export declare function randomHex(len: number): string;
/** 生成一个v4版uuid，https://www.ietf.org/rfc/rfc4122.txt */
export declare function uuidV4(): string;
/** 生成一个全随机uuid，类似v4，但是版本位和变型位也随机 */
export declare function uuidRandom(): string;
/** 空的uuid，https://www.ietf.org/rfc/rfc4122.txt 4.1.7 */
export declare const uuidNil = "00000000-0000-0000-0000-000000000000";
