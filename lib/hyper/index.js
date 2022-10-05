/*
 * @Author: Salt
 * @Date: 2022-10-03 10:10:26
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:26:54
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\index.ts
 */
import { HEvent } from './event';
import { HAttrs, HProps } from './prop';
import { forSafePropsInObject } from '../utils/object';
import { isUndefined } from '../utils/type';
export function h(tagName, option, ...children) {
    const el = document.createElement(tagName);
    if (option) {
        const [p, e, a] = splitOption(option);
        HProps(el, p);
        HEvent(el, e);
        HAttrs(el, a);
    }
    return el;
}
export function splitOption(option) {
    const events = {};
    const props = {};
    const attrs = {};
    forSafePropsInObject(option, (p, v) => {
        if (isUndefined(v))
            return;
        // @ts-ignore
        if (p.startsWith('on'))
            events[p] = v;
        // @ts-ignore
        else if (p === 'style' || p === 'dataSet')
            attrs[p] = v;
        // @ts-ignore
        else
            props[p] = v;
    });
    return [props, events, attrs];
}
