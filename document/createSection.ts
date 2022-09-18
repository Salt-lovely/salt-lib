/*
 * @Author: Salt
 * @Date: 2022-09-17 23:41:47
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-18 14:45:09
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\createSection.ts
 */
import { $log } from 'salt-lib'
import {
  appendSubSection,
  createArgsTitle,
  createFuncTitle,
  html2Escape,
} from './createSectionUtils'

function createArgs(doc: DocArgs): string {
  const { desc, type } = doc
  return `<li>
  <code>${createArgsTitle(doc)}</code>: <code>${type}</code> ${desc}
</li>`
}

function createFuncDoc(doc: DocFunction, modelTitle: string): HTMLElement {
  const { name, desc, args = [], return: r = 'void', example = '' } = doc
  const div = document.createElement('article')
  div.className = 'article function'
  appendSubSection({
    heading: 'h3',
    id: `${modelTitle}-model-${name}-function`,
    title: createFuncTitle(doc),
    titleClassName: 'function-title',
    content: desc,
    contentClassName: 'function-desc',
    container: div,
  })
  // 参数
  if (args.length) {
    const argsList: string[] = []
    args.forEach((argDoc) => {
      argsList.push(createArgs(argDoc))
    })
    appendSubSection({
      title: '参数',
      titleClassName: 'function-args-title',
      content: `<ul>${argsList.join('')}</ul>`,
      contentClassName: 'function-args',
      container: div,
    })
  }
  // 返回
  appendSubSection({
    title: '返回',
    titleClassName: 'function-return-title',
    content:
      r.includes('</') && r.includes('>')
        ? r
        : `<code>${html2Escape(r)}</code>`,
    contentClassName: 'function-return',
    container: div,
  })
  // 示例
  if (example) {
    appendSubSection({
      title: '示例',
      titleClassName: 'function-example-title',
      content: `<pre class="function-example-code function-example-pre">
import { ${name} } from 'salt-lib'

${html2Escape(example)}
</pre>`,
      contentClassName: 'function-example',
      container: div,
    })
  }
  return div
}

export function createSection(doc: DocSection): HTMLElement {
  const { title, name, main } = doc
  $log(title)
  const sec = document.createElement('section')
  sec.className = 'section model'
  sec.setAttribute('name', title)
  const secH3 = document.createElement('h2')
  secH3.className = 'model-title'
  secH3.textContent = title
  secH3.id = `${name}-model`
  sec.appendChild(secH3)
  main.forEach((funcDoc) => {
    sec.appendChild(createFuncDoc(funcDoc, name))
  })
  return sec
}
