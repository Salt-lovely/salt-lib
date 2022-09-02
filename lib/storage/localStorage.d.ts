/** 从localStorage读取数据，没有的话会自动写入默认值 */
export declare function read<T>(key: string, defaultValue: T): T;
/** 往localStorage保存数据 */
export declare function write<T>(key: string, value: T): void;
export declare function unsafeRead<T>(key: string): T | null;
/** 封装过的`StorageEvent` */
interface EncapsulatedStorageEvent<T> {
    /** 键名 */
    readonly key: string;
    /** 新值 */
    readonly newValue: T | null;
    /** 旧值 */
    readonly oldValue: T | null;
    /** 受影响的 Storage 对象 */
    readonly storageArea: Storage | null;
    /** 修改储存的页面的 URL */
    readonly url: string;
}
/**
 * 读取某个键值并监听
 * @param props 储存键和监听器必填，默认值不必填
 * - `key` 储存数据的键
 * - `defaultValue` 默认值（不必填）
 * - `listener` 回调函数
 * - `callOnChange` 仅在新旧值不同的时候执行回调
 * @returns 返回一个元组`[value, off]`
 * - `value` 读取的值
 * - `off` 调用后停止监听
 */
export declare function readAndListen<T>(props: {
    key: string;
    defaultValue: T;
    listener: (ev: EncapsulatedStorageEvent<T>) => unknown;
    callOnChange?: boolean | undefined;
    options?: AddEventListenerOptions | boolean | undefined;
}): [T, () => void];
export declare function readAndListen<T>(props: {
    key: string;
    defaultValue?: undefined;
    listener: (ev: EncapsulatedStorageEvent<T>) => unknown;
    callOnChange?: boolean | undefined;
    options?: AddEventListenerOptions | boolean | undefined;
}): [T | null, () => void];
export {};
