export declare function isString(u: unknown): u is string;
export declare function isNumber(u: unknown): u is number;
/** 断言参数是一个整数 */
export declare const isInteger: (u: unknown) => u is number;
export declare function isBoolean(u: unknown): u is boolean;
export declare function isSymbol(u: unknown): u is symbol;
export declare function isBigInt(u: unknown): u is bigint;
export declare function isUndefined(u: unknown): u is undefined;
export declare function isNull(u: unknown): u is null;
/** 断言参数是一个空值(`null`和`undefined`) */
export declare function isNil(u: unknown): u is null | undefined;
/** 断言参数是一个函数 */
export declare function isFunction(u: unknown): u is Function;
/** 断言参数是`object`但不是`null` */
export declare function isObject(u: unknown): u is object;
/** 断言参数是一个String的**包装对象** */
export declare function isStringObject(u: unknown): u is String;
/** 断言参数是一个Number的**包装对象** */
export declare function isNumberObject(u: unknown): u is Number;
/** 断言参数是一个Number的**包装对象** */
export declare function isBooleanObject(u: unknown): u is Boolean;
/** 断言参数是一个BigInt的**包装对象** */
export declare function isBigIntObject(u: unknown): u is BigInt;
/** 断言参数是一个Symbol的**包装对象** */
export declare function isSymbolObject(u: unknown): u is Symbol;
/** 断言参数是一个原生类型的**包装对象** */
export declare function isPrimitiveObject(u: unknown): u is String | Number | BigInt | Symbol | Boolean;
