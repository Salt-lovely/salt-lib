/*
 * @Author: Salt
 * @Date: 2022-09-17 22:03:12
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-19 00:34:50
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\index.ts
 */
import { $, $$, docReady, sleep } from 'salt-lib'
import { createMenu } from './createMenu'
import { createSection } from './createSection'
import asyncUtils from './data/async'
import './index.scss'
import './model.scss'
import './menu.scss'
import { scrollToElById } from './createSectionUtils'

const models = [asyncUtils]

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
