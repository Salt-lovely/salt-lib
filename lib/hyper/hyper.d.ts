/*
 * @Author: Salt
 * @Date: 2022-10-03 10:10:48
 * @LastEditors: Salt
 * @LastEditTime: 2022-11-02 20:51:43
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\hyper.d.ts
 */

export type GetHTMLElementOptions<K extends string> = Partial<
  ElementAttrs<K> & ElementEvents<K> & ElementStyle & ElementDataSet
>

// ==============================================================================================
// 一些通用类型
// ==============================================================================================

/** 判断输入的`X`、`Y`是否完全一致，一致则返回`A`、否则返回`B` */
type IsEqual<X, Y, A = true, B = false> = (<T>() => T extends X
  ? 1
  : 0) extends <T>() => T extends Y ? 1 : 0
  ? A
  : B

/** 清除所有类型为函数的属性、只读属性 */
type GetElementAttrs<E> = {
  [P in keyof E as E[P] extends Function
    ? never
    : IsEqual<{ [O in P]: E[P] }, { -readonly [O in P]: E[P] }, P, never>]: E[P]
}

/** 通过标签名得知元素类型 */
export type GetHTMLElementByTag<K extends string> =
  K extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[K]
    : K extends keyof HTMLElementDeprecatedTagNameMap
    ? HTMLElementDeprecatedTagNameMap[K]
    : HTMLElement

// ==============================================================================================
// `createElement`接受的子元素类型
// ==============================================================================================

export type CEChildren =
  | Element
  | DocumentFragment
  | string
  | number
  | null
  | undefined
  | boolean
  | ArrayLike<CEChildren>

// ==============================================================================================
// `createElement`时需要清除所有类型为函数的属性
// ==============================================================================================

export type ElementAttrs<K extends string> = GetElementAttrs<
  GetHTMLElementByTag<K>
>

/*
type test_eq1 = IsEqual<{ a: 'div' }, { a: 'div' }> // true
type test_eq2 = IsEqual<{ a: 'div' }, { readonly a: 'div' }> // false

type test_o = ElementAttrs<'div'>['style'] // error
type test_p = ElementAttrs<'div'>['title'] // string

// */

// ==============================================================================================
// `createElement`时需要转换事件名，比如把`click`转换为`onClick`
// ==============================================================================================

/** 把`click`等事件名转换为`onClick` */
type EventName<EN extends string> = EN extends `${infer L}${infer R}`
  ? `on${Uppercase<L>}${R}`
  : `on${EN}`

/** 通过标元素类型得知元素可用的方法 */
type GetEventMap<E extends HTMLElement> = E extends HTMLVideoElement
  ? HTMLVideoElementEventMap
  : E extends HTMLMediaElement
  ? HTMLMediaElementEventMap
  : HTMLElementEventMap

type ConvertEventMap<M extends HTMLElementEventMap, E extends HTMLElement> = {
  [P in keyof M as P extends string ? EventName<P> : never]: (
    this: E,
    ev: M[P]
  ) => any
}

export type ElementEvents<K extends string> = ConvertEventMap<
  GetEventMap<GetHTMLElementByTag<K>>,
  GetHTMLElementByTag<K>
>

export type OmitElementEvents<T> = {
  [P in keyof T as P extends `on${infer K}` ? never : P]: T[P]
}

/*
type test_names = EventName<'click' | 'mouseup'>

type test_a = GetEventMap<GetHTMLElementByTag<'video'>> // HTMLVideoElementEventMap
type test_b = GetEventMap<GetHTMLElementByTag<'audio'>> // HTMLMediaElementEventMap
type test_c = GetEventMap<GetHTMLElementByTag<'div'>> // HTMLElementEventMap

// { onWheel: (this: HTMLDivElement, ev: WheelEvent) => any; }
type test_e1 = ConvertEventMap<
  GetEventMap<GetHTMLElementByTag<'div'>>,
  GetHTMLElementByTag<'div'>
>
// { onEncrypted: (this: HTMLVideoElement, ev: MediaEncryptedEvent) => any; }
type test_e2 = ConvertEventMap<
  GetEventMap<GetHTMLElementByTag<'video'>>,
  GetHTMLElementByTag<'video'>
>
// { onEncrypted: (this: HTMLVideoElement, ev: MediaEncryptedEvent) => any; }
type test_e3 = ElementEvents<'video'>
// */

// ==============================================================================================
// `createElement`需要处理的`style`和`dataSet`
// ==============================================================================================

export type ElementStyle = {
  /** 添加行内样式，更推荐使用Tailwind、SCSS等工具 */
  style: Partial<GetElementAttrs<CSSStyleDeclaration>>
}

export type ElementDataSet = {
  /** 会以`data-*`的格式添加到元素上，如果值为`undefined`则不会添加 */
  dataSet: { [key: string]: string | number | undefined }
}

// ==============================================================================================
