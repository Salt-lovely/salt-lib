/** 断言参数是一个合规的`obj.length` */
export declare function isValidLength(len: unknown): len is number;
export declare const isArray: (arg: any) => arg is any[];
/** 断言参数是一个类数组，如数组、类型数组、字符串 */
export declare function isArrayLike(u: unknown): u is ArrayLike<any>;
/** 断言参数是一个类数组**对象**，如数组、类型数组 */
export declare function isArrayLikeObject(u: unknown): u is ArrayLike<any> & object;
/** 断言参数是一个`Date` */
export declare function isDate(u: unknown): u is Date;
/** 断言参数是一个`RegExp` */
export declare function isRegExp(u: unknown): u is RegExp;
/** 断言参数是一个`Set` */
export declare function isSet(u: unknown): u is Set<any>;
/** 断言参数是一个`Map` */
export declare function isMap(u: unknown): u is Map<any, any>;
/** 断言参数是一个`WeakSet` */
export declare function isWeakSet(u: unknown): u is WeakSet<any>;
/** 断言参数是一个`WeakMap` */
export declare function isWeakMap(u: unknown): u is WeakMap<any, any>;
/** 断言参数是一个**类**`Promise`对象，即`PromiseLike` */
export declare function isPromiseLike(u: unknown): u is PromiseLike<any>;
/** 断言参数是一个`Promise` */
export declare function isPromise(u: unknown): u is Promise<any>;
