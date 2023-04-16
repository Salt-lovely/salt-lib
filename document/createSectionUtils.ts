/*
 * @Author: Salt
 * @Date: 2022-09-18 12:01:23
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 21:00:55
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\createSectionUtils.ts
 */
import { $, offset } from 'salt-lib'
import { DocArgs, DocFunction } from './document'

export function createArgsTitle(doc: DocArgs) {
  const { name, default: d, require } = doc
  if (d) return `[${name}=${d}]`
  if (require === false) return `[${name}]`
  return name
}

export function createFuncTitle(doc: DocFunction) {
  const { name, args = [], return: r = 'void', gene } = doc
  const argList = args.map(createArgsTitle)
  return `${name} : ${gene ? `<${gene}>` : ''}(${argList.join(', ')}) => ${r}`
}

export function appendSubSection(props: {
  title: string
  content: string
  titleClassName: string
  contentClassName: string
  container: Element
  id?: string
  heading?: 'h2' | 'h3' | 'h4'
}) {
  const {
    title,
    content,
    titleClassName,
    contentClassName,
    container,
    id,
    heading = 'h4',
  } = props
  // 小节标题
  if (title) {
    const headLine = document.createElement(heading)
    headLine.className = titleClassName
    headLine.textContent = title
    if (id) headLine.id = id
    container.appendChild(headLine)
  }
  // 小节内容
  if (content) {
    const desc = document.createElement('p')
    desc.className = contentClassName
    desc.innerHTML = content
    container.appendChild(desc)
  }
}

export function html2Escape(str: string) {
  return str.replace(/[<>&"]/g, (c: string) => {
    // console.log(c)
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] || ''
  })
}

export function scrollToElById(id: string) {
  const target = $(`#${id}`)
  if (target) {
    location.hash = id
    scrollTo({ top: Math.max(0, offset(target).top - 64) })
    return true
  }
  return false
}

export function idFix(id: string) {
  return id.replace(/\$/g, '__S')
}
