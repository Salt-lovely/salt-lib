import { CEChildren, ElementAttrs, ElementDataSet, ElementEvents, ElementStyle, GetHTMLElementOptions } from './hyper';
/**
 * 生成一个HTML元素并赋予初始数据
 * @param tagName 元素的标签名，如`div`、`a`或`p`
 * @param option 元素初始化属性，如`className`或者`href`，也可以用`onClick`属性来绑定事件
 */
export declare function h<K extends keyof HTMLElementTagNameMap>(tagName: K, option?: GetHTMLElementOptions<K> | null, ...children: CEChildren[]): HTMLElementTagNameMap[K];
export declare function h<K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, option?: GetHTMLElementOptions<K> | null, ...children: CEChildren[]): HTMLElementDeprecatedTagNameMap[K];
export declare function h<K extends string>(tagName: K, option?: GetHTMLElementOptions<K> | null, ...children: CEChildren[]): HTMLElement;
export declare function splitOption<K extends string>(option: GetHTMLElementOptions<K>): [
    Partial<ElementAttrs<K>>,
    Partial<ElementEvents<K>>,
    Partial<ElementStyle & ElementDataSet>
];
