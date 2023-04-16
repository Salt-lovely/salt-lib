/*
 * @Author: Salt
 * @Date: 2022-09-17 23:41:47
 * @LastEditors: Salt
 * @LastEditTime: 2023-04-16 21:22:33
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\createSection.ts
 */
import { $log } from 'salt-lib'
import {
  appendSubSection,
  createArgsTitle,
  createFuncTitle,
  html2Escape,
  idFix,
} from './createSectionUtils'
import { DocArgs, DocFunction, DocSection } from './document'

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
  div.setAttribute('name', `${modelTitle}-${name}`)
  appendSubSection({
    heading: 'h3',
    id: idFix(`${modelTitle}-model-${name}-function`),
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
  if (example.trim()) {
    appendSubSection({
      title: '示例',
      titleClassName: 'function-example-title',
      content: `<pre
  class="function-example-code function-example-pre tooltip tooltip-pre"
  data-tooltip="你可以在浏览器控制台尝试一下 ${name} "
  ><code class="lang-js">import { ${name} } from 'salt-lib'

${html2Escape(example.trim())}</code></pre>`,
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
  sec.setAttribute('name', name)
  const secH3 = document.createElement('h2')
  secH3.className = 'model-title'
  secH3.textContent = title
  secH3.id = idFix(`${name}-model`)
  sec.appendChild(secH3)
  main.forEach((funcDoc) => {
    sec.appendChild(createFuncDoc(funcDoc, name))
  })
  return sec
}
