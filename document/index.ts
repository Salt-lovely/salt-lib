/*
 * @Author: Salt
 * @Date: 2022-09-17 22:03:12
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-18 15:14:29
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\index.ts
 */
import { $, $$ } from 'salt-lib'
import { createSection } from './createSection'
import asyncUtils from './data/async'
import './index.scss'
import './model.scss'

const models = [asyncUtils]

const menu = $('#menu')!
const main = $('#main')!

models.forEach((model) => {
  main.appendChild(createSection(model))
})
