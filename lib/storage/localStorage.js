/*
 * @Author: Salt
 * @Date: 2022-01-25 23:10:30
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-02 22:23:28
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\storage\localStorage.ts
 */
// 部分内容修改自 https://gitee.com/moushu/ms-esbuild-react-scaffold/blob/master/src/utils/localStorage.ts
/** 内部JSON解析方法，封装了`JSON.parse` */
function innerParse(str) {
    if (str) {
        try {
            return JSON.parse(str);
        }
        catch (e) { }
    }
    return null;
}
/** 从localStorage读取数据，没有的话会自动写入默认值 */
export function read(key, defaultValue) {
    const storage = localStorage.getItem(key);
    if (!storage) {
        write(key, defaultValue);
        return defaultValue;
    }
    return innerParse(storage);
}
/** 往localStorage保存数据 */
export function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function unsafeRead(key) {
    // if (!localStorage) throw new Error('"localStorage" is required');
    const storage = localStorage.getItem(key);
    return innerParse(storage);
}
/**
 * 监听 localStorage 更改事件，可以用于同一网站不同页面间通信
 * @param listener 回调函数
 * @returns 返回一个方法，调用后停止监听
 */
function listen(listener, options = { passive: true }) {
    window.addEventListener('storage', listener, options);
    return () => window.removeEventListener('storage', listener, options);
}
export function readAndListen(props) {
    const { key, defaultValue, listener, callOnChange = true, options = { passive: true }, } = props;
    let v = unsafeRead(key);
    if (defaultValue !== undefined && v === null) {
        write(key, defaultValue);
        v = defaultValue;
    }
    const fn = (ev) => {
        if (ev.key !== key || ev.storageArea !== localStorage)
            return;
        const newValue = innerParse(ev.newValue);
        const oldValue = innerParse(ev.oldValue);
        if (callOnChange && newValue === oldValue)
            return;
        const encapsulatedEvent = {
            key,
            newValue,
            oldValue,
            storageArea: ev.storageArea,
            url: ev.url,
        };
        listener(encapsulatedEvent);
    };
    const off = listen(fn, options);
    return [v, off];
}
