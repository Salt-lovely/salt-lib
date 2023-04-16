/** `propName`是否可用于属性名攻击 */
export declare function isUnsafePropName(propName: string | number): boolean;
/** `propName`是否无法用于属性名攻击 */
export declare function isSafePropName(propName: string | number): boolean;
/** **这个方法不能正确处理复杂对象**\
 * 其中不包含`obj`中可枚举`enumerable`的不安全属性\
 * 返回浅拷贝得到的新对象，类型与`obj`基本一致 */
export declare function filterUnsafeProp<T extends object>(obj: T): T;
/** 遍历对象中可枚举`enumerable`的安全属性\
 * 若没有设置`deleteUnsafeProp`，返回输入的`obj`\
 * 若此参数设为`true`，返回浅拷贝得到的删除了不安全属性的新对象
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
/**
 * 深度克隆（全复制）一个简单对象`{}`或数组`[]`，**无法**正确处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 如果要处理这些特殊的对象，请尝试`deepClonePlus`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export declare function deepClone<T>(obj: T): T;
/**
 * 深度克隆（全复制）一个对象`{}`或数组`[]`，可以处理`String`、`Number`、`Date`、`Set`之类的特殊对象
 *
 * 但是性能不如`deepClone`
 *
 * @param obj 需要全复制的对象，可以是简单对象或数组
 */
export declare function deepClonePlus<T>(obj: T): T;
