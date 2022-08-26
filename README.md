<!--
 * @Author: Salt
 * @Date: 2022-07-10 00:22:02
 * @LastEditors: Salt
 * @LastEditTime: 2022-07-25 23:04:26
 * @Description: 说明文档
 * @FilePath: \mcbbs-wiki-widget-repo\README.md
-->
# mcbbs-wiki-widget-repo

MCBBS微件统一仓库。

## 开发需要

1. 一台性能尚可的电脑，安装了nodejs、git、npm，最好安装了yarn
2. 推荐使用vscode之类的编程软件，如果是vscode，盐推荐安装以下插件：
    1. ESLint - 代码质量检查
    2. Prettier - 代码格式化工具
    3. koroFileHeader - 非必须，文件头信息生成插件
    4. Code Spell Checker - 非必须，拼写错误校验
    5. markdownlint - 非必须，但可以减少markdown语法错误
3. 控制台输入`yarn`拉取依赖——这一步很重要

## 修改微件

1. 在`widget`下找到对应的微件文件夹，里面有至少两个文件`index.tsx`和`widget.ts`
2. `index.tsx`是微件测试用的，`widget.ts`是微件本身的代码
3. 修改`widget.ts`，并在`index.tsx`中编写测试用的DOM
4. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作
5. 控制台输入`yarn build:微件名字`指令，编译微件代码，并在`dist`文件夹中找到编译后的代码
6. 在wiki的“Widget”命名空间找到对应页面，修改微件

## 开发新微件

1. 控制台输入`yarn widget <微件名>`指令，比如新微件名为“SaltWidget”，那么指令就是`yarn widget SaltWidget`
2. 在`widget/<微件名>`文件夹里出线`index.tsx`和`widget.ts`文件，前者为测试用的页面，后者为代码文件
3. 在`widget/index.tsx`中引入新微件的测试页面，格式大概这样：

```tsx
// 引入新微件的测试页面
import SaltWidget from './SaltWidget'
import 微件名 from './微件名'

export default [
  { title: 'SaltWidget', Component: SaltWidget },
  { title: '微件名', Component: 微件名 },
]
```

4. 控制台输入`yarn serve`指令打开测试页面，看看你的微件是否正常工作，与其他微件是否存在冲突
5. 开发完成后，使用指令`yarn build:<微件名>`（如`yarn build:SaltWidget`）打包代码，并在`dist`文件夹中找到编译后的代码
6. 在wiki的“Widget”命名空间新建页面，写入微件

```wikitext
<noinclude>简单说明</noinclude><includeonly><script>
// 编译后的代码
</script>
```

## 待办事项

1. 寻找一种更加简便的微件编译方式，而不是输入一长串指令（`yarn build:SaltWidget`）。
2. 引入eslint，检验代码质量

## 借物表

- 部分脚手架代码来源于其他[开源脚手架](https://gitee.com/moushu/ms-esbuild-react-scaffold)，以木兰宽松许可证引入；也感谢Moushudyx搭建脚手架方面的支持。
- 部分工具函数来源于盐以前的个人作品。

## 已有微件

- SaltOutsideMusicLoader，嵌入网易云音乐
- SaltFirework，点击页面放烟花
- getMCBBSCredit，绘制MCBBS用户积分饼图
