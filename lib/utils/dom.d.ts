/**
 * 封装`querySelector`
 * @param selectors 选择器
 * @param parentElement 可选，父元素
 */
export declare function $<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
export declare function $<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
export declare function $<E extends Element = Element>(selectors: string): E | null;
export declare function $<K extends keyof HTMLElementTagNameMap>(selectors: K, parentElement: Element): HTMLElementTagNameMap[K] | null;
export declare function $<K extends keyof SVGElementTagNameMap>(selectors: K, parentElement: Element): SVGElementTagNameMap[K] | null;
export declare function $<E extends Element = Element>(selectors: string, parentElement: Element): E | null;
/**
 * 封装`querySelectorAll`
 * @param selectors 选择器
 * @param parentElement 可选，父元素
 */
export declare function $$<K extends keyof HTMLElementTagNameMap>(selectors: K): Array<HTMLElementTagNameMap[K]>;
export declare function $$<K extends keyof SVGElementTagNameMap>(selectors: K): Array<SVGElementTagNameMap[K]>;
export declare function $$<E extends Element = Element>(selectors: string): Array<E>;
export declare function $$<K extends keyof HTMLElementTagNameMap>(selectors: K, parentElement: Element): Array<HTMLElementTagNameMap[K]>;
export declare function $$<K extends keyof SVGElementTagNameMap>(selectors: K, parentElement: Element): Array<SVGElementTagNameMap[K]>;
export declare function $$<E extends Element = Element>(selectors: string, parentElement: Element): Array<E>;
/**
 * 检查元素是否在容器外面
 * @param childElement 要检测的元素
 * @param container 要检测的容器，不填则默认为`body`元素
 */
export declare function isOutside(childElement: Element, container?: Element): boolean;
/** 监听鼠标是否点到某个元素外面去了 */
export declare function clickOutside(el: Element, fn: (ev: MouseEvent) => unknown): () => void;
/** 获取元素相对文档左上的位置(`top`和`left`) */
export declare function offset(el: Element): {
    top: number;
    left: number;
};
/** 批量挂载节点到元素上，返回传入的元素 */
export declare function appendChildren(el: Element, ...children: Array<Node | ArrayLike<Node>>): Element;
