import { isArrayLikeObject, isNumber, isString } from '../utils/type/index';
export function HChild(el, children) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isArrayLikeObject(child))
            HChild(el, child);
        else if (child instanceof Node)
            el.appendChild(child);
        else if (isString(child) || isNumber(child))
            el.appendChild(document.createTextNode(`${child}`));
        // else console.error('未知的子元素', child)
    }
}
