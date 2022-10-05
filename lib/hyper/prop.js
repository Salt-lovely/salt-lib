/*
 * @Author: Salt
 * @Date: 2022-10-04 09:27:54
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-05 10:26:52
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\hyper\prop.ts
 */
import { isNil } from '../utils/type';
export function HProps(el, option) {
    Object.assign(el, option);
}
export function HAttrs(el, option) {
    if (option.style) {
        const { style } = option;
        Object.assign(el.style, style);
    }
    if (option.dataSet) {
        const { dataSet } = option;
        for (const key in dataSet) {
            if (!isNil(dataSet[key]))
                el.setAttribute(`data-${key}`, `${dataSet[key]}`);
        }
    }
}
