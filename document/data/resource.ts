/*
 * @Author: Salt
 * @Date: 2022-09-23 22:54:57
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-25 13:43:30
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\resource.ts
 */

import { DocSection } from '../document'

const resourceUtils: DocSection = {
  title: '加载资源 “Resource” Methods',
  name: 'resource',
  main: [
    {
      name: 'addScript',
      desc: '根据URL添加脚本，可以根据<code>id</code>防止重复添加',
      args: [
        {
          name: 'url',
          type: 'string',
          desc: '脚本的URL',
        },
        {
          name: 'asynchronous',
          type: 'boolean',
          desc: '是否异步添加脚本内容',
          default: 'false',
        },
        {
          name: 'id',
          type: 'string',
          desc: '用于区分脚本功能防止重复添加',
          require: false,
        },
      ],
      example: 'addScript("https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js")',
    },
    {
      name: 'addTempScript',
      desc: '根据URL添加临时脚本，执行后立即卸载<code>script</code>节点',
      args: [
        {
          name: 'url',
          type: 'string',
          desc: '脚本的URL',
        },
        {
          name: 'asynchronous',
          type: 'boolean',
          desc: '是否异步添加脚本内容',
          default: 'false',
        },
      ],
      example: 'addTempScript("https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js")',
    },
    {
      name: 'addStyle',
      desc: '添加样式表',
      args: [
        {
          name: 'css',
          type: 'string',
          desc: 'CSS样式表',
        },
      ],
      example: 'addStyle("code{color: #023304;}")',
    },
    {
      name: 'setStyle',
      desc: '根据<code>id</code>添加或更新样式表',
      args: [
        {
          name: 'css',
          type: 'string',
          desc: 'CSS样式表',
        },
        {
          name: 'id',
          type: 'string',
          desc: '用于区分脚本功能防止重复添加',
        },
      ],
      example: 'setStyle("code{color: #023304;}", "code-style")',
    },
    {
      name: 'addStyleUrl',
      desc: '添加来自URL的样式表',
      args: [
        {
          name: 'url',
          type: 'string',
          desc: '脚本的URL',
        },
      ],
      example: 'addStyleUrl("https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.css")',
    },
    {
      name: 'setStyleUrl',
      desc: '根据<code>id</code>添加或更新来自URL的样式表',
      args: [
        {
          name: 'url',
          type: 'string',
          desc: '脚本的URL',
        },
        {
          name: 'id',
          type: 'string',
          desc: '用于区分脚本功能防止重复添加',
        },
      ],
      example: 'setStyleUrl("https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.css", "prism-css")',
    },
  ],
}

export default resourceUtils
