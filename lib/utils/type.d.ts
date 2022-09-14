export declare function isString(u: unknown): u is string;
export declare function isNumber(u: unknown): u is number;
export declare function isBoolean(u: unknown): u is boolean;
export declare function isSymbol(u: unknown): u is symbol;
export declare function isBigInt(u: unknown): u is bigint;
export declare function isUndefined(u: unknown): u is undefined;
export declare function isNull(u: unknown): u is null;
/** 断言参数是一个空值(`null`和`undefined`) */
export declare function isNil(u: unknown): u is null | undefined;
export declare function isFunction(u: unknown): u is Function;
/** 断言参数是`object`但不是`null` */
export declare function isObject(u: unknown): u is object;
/** 断言参数是一个整数 */
export declare const isInteger: (u: unknown) => u is number;
/** 断言参数是一个合规的`obj.length` */
export declare function isValidLength(len: unknown): len is number;
export declare const isArray: (arg: any) => arg is any[];
/** 断言参数是一个类数组 */
export declare function isArrayLike(u: unknown): u is ArrayLike<any>;
/** 断言参数是一个类数组**对象** */
export declare function isArrayLikeObject(u: unknown): u is ArrayLike<any> & object;
export declare function isStringObject(u: unknown): u is String;
export declare function isNumberObject(u: unknown): u is Number;
export declare function isBooleanObject(u: unknown): u is Boolean;
export declare function isBigIntObject(u: unknown): u is BigInt;
export declare function isSymbolObject(u: unknown): u is Symbol;
export declare function isPrimitiveObject(u: unknown): u is String | Number | BigInt | Symbol | Boolean;
export declare function isDate(u: unknown): u is Date;
export declare function isRegExp(u: unknown): u is RegExp;
/** 断言参数是一个`Set`，使用之前建议`polyfillES6` */
export declare function isSet(u: unknown): u is Set<any>;
/** 断言参数是一个`Map`，使用之前建议`polyfillES6` */
export declare function isMap(u: unknown): u is Map<any, any>;
/** 断言参数是一个`WeakSet`，使用之前建议`polyfillES6` */
export declare function isWeakSet(u: unknown): u is WeakSet<any>;
/** 断言参数是一个`WeakMap`，使用之前建议`polyfillES6` */
export declare function isWeakMap(u: unknown): u is WeakMap<any, any>;
