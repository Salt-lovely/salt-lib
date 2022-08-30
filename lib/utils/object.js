/*
 * @Author: Salt
 * @Date: 2022-08-30 12:55:25
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-30 21:55:44
 * @Description: 对象操作相关
 * @FilePath: \salt-lib\src\utils\object.ts
 */
const unsafePropNames = new Set([
    '__proto__',
    'constructor',
    'prototype',
    'toString',
    'hasOwnProperty',
    'toLocaleString',
    'valueOf',
    'isPrototypeOf',
    'propertyIsEnumerable',
]);
/** `propName`是否可用于属性名攻击 */
export function isUnsafePropName(propName) {
    return unsafePropNames.has(propName);
}
/** `propName`是否无法用于属性名攻击 */
export function isSafePropName(propName) {
    return !unsafePropNames.has(propName);
}
/** 将对象中可枚举`enumerable`的不安全属性设为`undefined` */
export function filterUnsafeProp(obj) {
    for (const p in obj) {
        // @ts-ignore
        if (isUnsafePropName(p))
            obj[p] = undefined;
    }
    return obj;
}
/** 遍历对象中可枚举`enumerable`的安全属性
 * @param obj 要遍历的对象
 * @param fn 回调函数
 * @param deleteUnsafeProp 是否顺道删除不安全属性，默认为否
 */
export function forSafePropsInObject(obj, fn, deleteUnsafeProp = false) {
    // 没有回调
    if (!fn) {
        if (deleteUnsafeProp)
            return filterUnsafeProp(obj);
        else
            return obj;
    }
    if (deleteUnsafeProp) {
        for (const p in obj)
            if (typeof obj[p] !== 'undefined') {
                if (isSafePropName(p))
                    fn(p, obj[p]);
                // 删掉不安全属性
                // @ts-ignore
                else
                    obj[p] = undefined;
            }
    }
    else {
        // 不删除不安全属性
        for (const p in obj) {
            if (typeof obj[p] !== 'undefined' && isSafePropName(p)) {
                fn(p, obj[p]);
            }
        }
    }
    return obj;
}
/** 使用`prop`拓展`obj`，可以指定属性
 * @param obj 被拓展的对象
 * @param prop 拓展用的对象
 * @param options 默认为不可枚举、可修改、可写入
 */
export function extend(obj, prop, options) {
    var _a, _b, _c;
    const enumerable = (_a = options === null || options === void 0 ? void 0 : options.enumerable) !== null && _a !== void 0 ? _a : false;
    const configurable = (_b = options === null || options === void 0 ? void 0 : options.enumerable) !== null && _b !== void 0 ? _b : true;
    const writable = (_c = options === null || options === void 0 ? void 0 : options.writable) !== null && _c !== void 0 ? _c : true;
    forSafePropsInObject(prop, (key, value) => {
        Object.defineProperty(obj, key, {
            enumerable,
            configurable,
            writable,
            value,
        });
    });
    return obj;
}
