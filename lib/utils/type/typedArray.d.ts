type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | BigUint64Array | BigInt64Array | Float32Array | Float64Array;
/** 断言参数是一个`TypedArray`(类型数组) */
export declare function isTypedArray(u: unknown): u is TypedArray;
/** 断言参数是一个`Int8Array`(Int8型的类型数组) */
export declare function isInt8Array(u: unknown): u is Int8Array;
/** 断言参数是一个`Uint8Array`(Uint8型的类型数组) */
export declare function isUint8Array(u: unknown): u is Uint8Array;
/** 断言参数是一个`Uint8ClampedArray`(Uint8Clamped型的类型数组) */
export declare function isUint8ClampedArray(u: unknown): u is Uint8ClampedArray;
/** 断言参数是一个`Int16Array`(Int16型的类型数组) */
export declare function isInt16Array(u: unknown): u is Int16Array;
/** 断言参数是一个`Uint16Array`(Uint16型的类型数组) */
export declare function isUint16Array(u: unknown): u is Uint16Array;
/** 断言参数是一个`Int32Array`(Int32型的类型数组) */
export declare function isInt32Array(u: unknown): u is Int32Array;
/** 断言参数是一个`Uint32Array`(Uint32型的类型数组) */
export declare function isUint32Array(u: unknown): u is Uint32Array;
/** 断言参数是一个`Float32Array`(Float32型的类型数组) */
export declare function isFloat32Array(u: unknown): u is Float32Array;
/** 断言参数是一个`Float64Array`(Float64型的类型数组) */
export declare function isFloat64Array(u: unknown): u is Float64Array;
/** 断言参数是一个`BigInt64Array`(BigInt64型的类型数组) */
export declare function isBigInt64Array(u: unknown): u is BigInt64Array;
/** 断言参数是一个`BigUint64Array`(BigUint64型的类型数组) */
export declare function isBigUint64Array(u: unknown): u is BigUint64Array;
export {};
