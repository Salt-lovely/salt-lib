/*
 * @Author: Salt
 * @Date: 2022-09-21 21:00:06
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-23 22:52:19
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\console.ts
 */
import { DocSection } from "../document"

const consoleUtils: DocSection = {
  title: '控制台方法 “Console” Methods',
  name: 'console',
  main: [
    {
      name: '$log',
      desc: '在控制台打印内容，同时<b>不显示行号</b>（chrome、火狐测试通过）',
      args: [{ name: '...args', desc: '要在控制台输出的内容', type: 'any[]' }],
      return: 'Promise<void>',
      example: '$log(\'[salt-lib]\', 123456, true)'
    },
    {
      name: '$warn',
      desc: '在控制台打印<b>警告</b>内容，同时<b>不显示行号</b>（chrome、火狐测试通过）',
      args: [{ name: '...args', desc: '要在控制台输出的内容', type: 'any[]' }],
      return: 'Promise<void>',
      example: '$warn(\'[salt-lib]\', 123456, true)'
    },
    {
      name: '$error',
      desc: '在控制台打印<b>报错</b>内容，同时<b>不显示行号</b>（chrome、火狐测试通过）',
      args: [{ name: '...args', desc: '要在控制台输出的内容', type: 'any[]' }],
      return: 'Promise<void>',
      example: '$error(\'[salt-lib]\', 123456, true)'
    },
    {
      name: '$info',
      desc: '在控制台打印<b>消息</b>内容，同时<b>不显示行号</b>（chrome、火狐测试通过）',
      args: [{ name: '...args', desc: '要在控制台输出的内容', type: 'any[]' }],
      return: 'Promise<void>',
      example: '$info(\'[salt-lib]\', 123456, true)'
    },
    {
      name: '$debug',
      desc: '在控制台打印<b>Debug</b>内容，同时<b>不显示行号</b>（chrome、火狐测试通过）',
      args: [{ name: '...args', desc: '要在控制台输出的内容', type: 'any[]' }],
      return: 'Promise<void>',
      example: '$debug(\'[salt-lib]\', 123456, true)'
    },
  ],
}

export default consoleUtils
