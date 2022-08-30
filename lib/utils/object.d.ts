/** `propName`是否可用于属性名攻击 */
export declare function isUnsafePropName(propName: string | number): boolean;
/** `propName`是否无法用于属性名攻击 */
export declare function isSafePropName(propName: string | number): boolean;
/** 将对象中可枚举`enumerable`的不安全属性设为`undefined` */
export declare function filterUnsafeProp<T extends object>(obj: T): T;
/** 遍历对象中可枚举`enumerable`的安全属性
 * @param obj 要遍历的对象
 * @param fn 回调函数
 * @param deleteUnsafeProp 是否顺道删除不安全属性，默认为否
 */
export declare function forSafePropsInObject<T extends object, P extends Extract<keyof T, string>>(obj: T, fn?: (propName: P, value: T[P]) => void, deleteUnsafeProp?: boolean): T;
/** 使用`prop`拓展`obj`，可以指定属性
 * @param obj 被拓展的对象
 * @param prop 拓展用的对象
 * @param options 默认为不可枚举、可修改、可写入
 */
export declare function extend<O extends object, N extends object>(obj: O, prop: N, options?: {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
}): O & N;
