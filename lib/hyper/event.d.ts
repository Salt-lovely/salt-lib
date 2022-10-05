import { ElementEvents, GetHTMLElementByTag } from './hyper';
export declare function HEvent<K extends string>(el: GetHTMLElementByTag<K>, option?: Partial<ElementEvents<K>> | null): void;
