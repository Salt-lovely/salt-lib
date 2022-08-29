/** 根据URL添加脚本，可以根据`id`防止重复添加 */
export declare function addScript(url: string, asynchronous?: boolean, id?: string): void;
/** 根据URL添加临时脚本，执行后立即卸载`script`节点 */
export declare function addTempScript(url: string, asynchronous?: boolean): void;
/** 添加样式表 */
export declare function addStyle(css: string): void;
/** 根据`id`添加或更新样式表 */
export declare function setStyle(css: string, id: string): void;
/** 添加来自URL的样式表 */
export declare function addStyleUrl(url: string): void;
/** 根据`id`添加或更新来自URL的样式表 */
export declare function setStyleUrl(url: string, id: string): void;
