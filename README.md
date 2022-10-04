<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-10-03 10:12:10
 * @Description: 说明文档
 * @FilePath: \salt-lib\README.md
-->
# salt-lib

盐的自用库，写了一些通用方法，[文档见Github](//salt-lovely.github.io/salt-lib/)。

没有任何依赖，非常干净.jpg；整个打包后仅有7KiB，Gzip后仅3KiB。

## 使用

```batch
yarn add salt-lib
```

```typescript
import { deepClonePlus } from 'salt-lib'

const loopSet = { set: new Set() }
loopSet.set.add(loopSet) // 使用Set引用自身

const loopSetClone = deepClonePlus(loopSet)
loopSetClone.set.has(loopSetClone) // true
```

因为入口文件使用了`export { ... } from '...'`的写法，因此可以放心地导入任意方法而不用担心摇树优化(tree-shake)之类的问题。

[更多方法详见文档](//salt-lovely.github.io/salt-lib/)。

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

### polyfill与特殊方法

- 使用`polyfill.io`的polyfill功能：`polyfillIO`、`polyfillES5`、`polyfillES8`。

## 打包发布

```batch
tsc
npm publish
```
