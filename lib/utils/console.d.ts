/** 在控制台打印内容，同时不显示行号（chrome、火狐测试通过） */
export declare function $log(...args: unknown[]): Promise<void>;
/** 在控制台打印**警告**内容，同时不显示行号（chrome、火狐测试通过） */
export declare function $warn(...args: unknown[]): Promise<void>;
/** 在控制台打印**报错**内容，同时不显示行号（chrome、火狐测试通过） */
export declare function $error(...args: unknown[]): Promise<void>;
/** 在控制台打印消息内容，同时不显示行号（chrome、火狐测试通过） */
export declare function $info(...args: unknown[]): Promise<void>;
/** 在控制台打印Debug内容，同时不显示行号（chrome、火狐测试通过） */
export declare function $debug(...args: unknown[]): Promise<void>;
