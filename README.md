<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-03 00:29:00
 * @Description: 说明文档
 * @FilePath: \salt-lib\README.md
-->
# salt-lib

盐的自用库

## 使用

```batch
yarn add salt-lib
```

```typescript
import { isString } from 'salt-lib'

console.log(isString('123'))
console.log(isString(123))
```

## 主要功能

### 常见utils

- 异步方法，如`sleep`、`defer`。
- 控制台方法，打印内容的同时隐藏行号。
- DOM操作，如`isOutside`、`$$`。
- 杂项方法，如`assert`。
- 对象操作方法，如`isUnsafePropName`、`extend`。
- 随机数方法，如`randomChoice`、`uuidV4`。
- 资源加载方法，如`addTempScript`、`setStyle`。
- 类型守卫，如`isArrayLikeObject`、`isUndefined`。
- localStorage封装，如`write`、`readAndListen`。

### polyfill与猴子类型

- 使用`polyfill.io`的polyfill功能：`polyfillIO`、`polyfillES5`、`polyfillES8`。

### 特殊方法

## 打包发布

```batch
tsc
npm publish
```
