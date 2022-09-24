/*
 * @Author: Salt
 * @Date: 2022-09-17 22:12:45
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-24 22:44:59
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\document.d.ts
 */
export interface DocSection {
  /** 模块说明 */
  title: string
  /** 模块名 */
  name: string
  main: DocFunction[]
}

export interface DocFunction {
  /** 函数名 */
  name: string
  /** 描述 */
  desc: string
  /** 出现版本 */
  version?: string
  /** 破坏性更新版本 */
  breakVersion?: string
  /** 泛型 */
  gene?: string
  /** 入参 */
  args?: DocArgs[]
  /** 返回 */
  return?: string
  /** 示例，不用补上`import`部分 */
  example?: string
}

export interface DocArgs {
  /** 参数名 */
  name: string
  /** 参数描述 */
  desc: string
  /** 参数类型 */
  type: string
  /** 默认值 */
  default?: string
  /** 是否必填 */
  require?: boolean
}
