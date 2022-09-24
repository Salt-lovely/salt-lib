/*
 * @Author: Salt
 * @Date: 2022-09-17 22:03:12
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-24 16:16:40
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\index.ts
 */
import { $, $$, docReady, sleep } from 'salt-lib'
import { createMenu } from './createMenu'
import { createSection } from './createSection'
import { scrollToElById } from './createSectionUtils'
import asyncUtils from './data/async'
import consoleUtils from './data/console'
import randomUtils from './data/random'
import objectUtils from './data/object'
import './index.scss'
import './model.scss'
import './menu.scss'

const models = [asyncUtils, consoleUtils, randomUtils, objectUtils]

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
