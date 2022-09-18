/*
 * @Author: Salt
 * @Date: 2022-09-17 22:12:45
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-18 15:11:16
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\document.d.ts
 */
interface DocSection {
  title: string
  name: string
  main: DocFunction[]
}

interface DocFunction {
  name: string
  desc: string
  version?: string
  args?: DocArgs[]
  return?: string
  example?: string
}

interface DocArgs {
  name: string
  desc: string
  type: string
  default?: string
  require?: boolean
}
