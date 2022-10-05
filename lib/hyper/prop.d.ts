import { ElementAttrs, ElementDataSet, ElementStyle, GetHTMLElementByTag } from './hyper';
export declare function HProps<K extends string>(el: GetHTMLElementByTag<K>, option: Partial<ElementAttrs<K>>): void;
export declare function HAttrs<K extends string>(el: GetHTMLElementByTag<K>, option: Partial<ElementStyle & ElementDataSet>): void;
