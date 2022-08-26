<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-27 00:03:36
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

## 打包发布

```batch
tsc
npm publish
```
