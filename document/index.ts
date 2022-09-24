/*
 * @Author: Salt
 * @Date: 2022-09-17 22:03:12
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-24 23:32:06
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\index.ts
 */
import * as Salt from 'salt-lib'
import { createMenu } from './createMenu'
import { createSection } from './createSection'
import { scrollToElById } from './createSectionUtils'
import asyncUtils from './data/async'
import consoleUtils from './data/console'
import randomUtils from './data/random'
import objectUtils from './data/object'
import resourceUtils from './data/resource'
import typeUtils from './data/type'
import './index.scss'
import './model.scss'
import './menu.scss'
import './code.scss'

const { $, docReady, sleep } = Salt

Object.assign(window, { Salt })

const models = [
  asyncUtils,
  consoleUtils,
  randomUtils,
  objectUtils,
  resourceUtils,
  typeUtils,
]

const menu = $('#menu')!
const main = $('#main')!

models.forEach((model) => {
  menu.appendChild(createMenu(model))
  main.appendChild(createSection(model))
})

docReady(async () => {
  await sleep(240)
  const id = location.hash.replace(/^#/, '')
  if (id) scrollToElById(id)
})
