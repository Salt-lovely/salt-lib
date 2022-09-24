/*
 * @Author: Salt
 * @Date: 2022-09-18 22:28:35
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-24 16:25:21
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\createMenu.ts
 */
import { $, offset } from 'salt-lib'
import { idFix, scrollToElById } from './createSectionUtils'
import { DocFunction, DocSection } from './document'

function createLinks(doc: DocFunction, modelTitle: string): HTMLElement {
  const { name } = doc
  const li = document.createElement('li')
  li.className = 'menu-function'
  li.setAttribute('name', name)
  const a = document.createElement('a')
  const id = idFix(`${modelTitle}-model-${name}-function`)
  a.href = `#${id}`
  a.innerHTML = `<div>${name}</div>`
  a.onclick = (ev) => {
    if (scrollToElById(id)) ev.preventDefault()
  }
  li.appendChild(a)
  return li
}

export function createMenu(doc: DocSection): HTMLElement {
  const { title, name, main } = doc
  const sec = document.createElement('section')
  sec.className = 'menu-model'
  sec.setAttribute('name', title)
  // 标题栏
  const head = document.createElement('div')
  head.className = 'menu-model-title'
  const a = document.createElement('a')
  const id = idFix(`${name}-model`)
  a.href = `#${id}`
  a.innerHTML = `<div>${title}</div>`
  a.onclick = (ev) => {
    if (scrollToElById(id)) ev.preventDefault()
  }
  head.appendChild(a)
  sec.appendChild(head)
  // 函数列表
  const funcList = document.createElement('ul')
  funcList.className = 'menu-function-list'
  main.forEach((funcDoc) => funcList.appendChild(createLinks(funcDoc, name)))
  sec.appendChild(funcList)

  return sec
}
