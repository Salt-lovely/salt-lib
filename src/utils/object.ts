/*
 * @Author: Salt
 * @Date: 2022-08-30 12:55:25
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 21:55:44
 * @Description: 对象操作相关
 * @FilePath: \salt-lib\src\utils\object.ts
 */
const unsafePropNames: Set<string | number> = new Set([
  '__proto__',
  'constructor',
  'prototype',
  'toString',
  'hasOwnProperty',
  'toLocaleString',
  'valueOf',
  'isPrototypeOf',
  'propertyIsEnumerable',
])
/** `propName`是否可用于属性名攻击 */
export function isUnsafePropName(propName: string | number) {
  return unsafePropNames.has(propName)
}
/** `propName`是否无法用于属性名攻击 */
export function isSafePropName(propName: string | number) {
  return !unsafePropNames.has(propName)
}
/** 将对象中可枚举`enumerable`的不安全属性设为`undefined` */
export function filterUnsafeProp<T extends object>(obj: T): T {
  for (const p in obj) {
    // @ts-ignore
    if (isUnsafePropName(p)) obj[p] = undefined
  }
  return obj
}
/** 遍历对象中可枚举`enumerable`的安全属性
 * @param obj 要遍历的对象
 * @param fn 回调函数
 * @param deleteUnsafeProp 是否顺道删除不安全属性，默认为否
 */
export function forSafePropsInObject<
  T extends object,
  P extends Extract<keyof T, string>
>(
  obj: T,
  fn?: (propName: P, value: T[P]) => void,
  deleteUnsafeProp = false
): T {
  // 没有回调
  if (!fn) {
    if (deleteUnsafeProp) return filterUnsafeProp(obj)
    else return obj
  }
  if (deleteUnsafeProp) {
    for (const p in obj)
      if (typeof obj[p] !== 'undefined') {
        if (isSafePropName(p)) fn(p as P, obj[p as P])
        // 删掉不安全属性
        // @ts-ignore
        else obj[p] = undefined
      }
  } else {
    // 不删除不安全属性
    for (const p in obj) {
      if (typeof obj[p] !== 'undefined' && isSafePropName(p)) {
        fn(p as P, obj[p as P])
      }
    }
  }
  return obj
}
/** 使用`prop`拓展`obj`，可以指定属性
 * @param obj 被拓展的对象
 * @param prop 拓展用的对象
 * @param options 默认为不可枚举、可修改、可写入
 */
export function extend<O extends object, N extends object>(
  obj: O,
  prop: N,
  options?: {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
  }
): O & N {
  const enumerable = options?.enumerable ?? false;
  const configurable = options?.enumerable ?? true;
  const writable = options?.writable ?? true;
  forSafePropsInObject(prop, (key, value) => {
    Object.defineProperty(obj, key, {
      enumerable,
      configurable,
      writable,
      value,
    });
  });
  return obj as O & N;
}