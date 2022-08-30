/** 从`url`获取polyfill代码，默认从`polyfill.io`获取 */
export declare function polyfillIO(url?: string): Promise<void>;
/** 从`polyfill.io`获取ES5的polyfill */
export declare function polyfillES5(): Promise<void>;
/** 从`polyfill.io`获取ES6的polyfill */
export declare function polyfillES6(): Promise<void>;
/** 从`polyfill.io`获取**ES6和ES7**的polyfill */
export declare function polyfillES7(): Promise<void>;
/** 从`polyfill.io`获取**ES6、ES7和ES8**的polyfill，注意这**并·不·能**获得`async function`功能 */
export declare function polyfillES8(): Promise<void>;
