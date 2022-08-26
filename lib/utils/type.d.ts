export declare function isString(u: unknown): u is string;
export declare function isNumber(u: unknown): u is number;
export declare function isBoolean(u: unknown): u is boolean;
export declare function isSymbol(u: unknown): u is symbol;
export declare function isBigint(u: unknown): u is bigint;
export declare function isUndefined(u: unknown): u is undefined;
export declare function isNull(u: unknown): u is null;
export declare function isNil(u: unknown): u is null | undefined;
export declare function isFunction(u: unknown): u is Function;
/** 断言参数是`object`但不是`null` */
export declare function isObject(u: unknown): u is object;
