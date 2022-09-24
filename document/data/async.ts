/*
 * @Author: Salt
 * @Date: 2022-09-17 22:09:53
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-23 22:52:23
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\async.ts
 */
import { DocSection } from "../document"

const asyncUtils: DocSection = {
  title: '异步方法 “Async” Methods',
  name: 'async',
  main: [
    {
      name: 'sleep',
      desc: '延迟一段时间',
      args: [
        {
          name: 'time',
          desc: '延迟多少时间，单位毫秒(ms)，默认120毫秒',
          type: 'number',
          default: '120',
        },
      ],
      return: 'Promise<void>',
      example: 'await sleep() // 等待120ms\nawait sleep(200) // 等待200ms',
    },
    {
      name: 'waitTill',
      desc: '一直等待到<code>fn</code>返回真值',
      args: [
        {
          name: 'fn',
          desc: '会一直等待到这个方法返回真值',
          type: '() => unknown',
        },
        {
          name: 'time',
          desc: '轮询时间间隔，单位毫秒(ms)，默认120毫秒',
          type: 'number',
          default: '120',
        },
        {
          name: 'timeout',
          desc: '超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为6,0000毫秒',
          type: 'number',
          default: '6e4',
        },
      ],
      return: 'Promise<void>',
      example:
        "await waitTill(() => document.readyState !== 'loading', 200, 60000) // 每200ms检查一次文档是否准备完毕，1分钟后超时报错",
    },
    {
      name: 'defer',
      desc: '将回调逻辑改写为异步逻辑的方法',
      return: `{ promise: Promise<T>, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }`,
      example: `async function asyncFn(args) {
  const deferFn = defer()
  const onSuccess = deferFn.resolve // 成功时调用回调
  const onError = deferFn.reject // 失败时调用回调
  callbackFn(args, onSuccess, onError) // 调用回调逻辑的函数
  return deferFn.promise // 将一个回调函数包装为异步函数
}`,
    },
    {
      name: 'docReady',
      desc: '文档准备完毕后执行回调，相当于jQuery的<code>$(function)</code>',
      args: [
        {
          name: 'fn',
          desc: '回调函数',
          type: '() => unknown',
        }
      ],
      example: 'docReady(() => console.log("docReady"))'
    },
    {
      name: 'waitDocReady',
      desc: '等待文档准备完毕',
      args: [
        {
          name: 'time',
          desc: '轮询时间间隔，单位毫秒(ms)，默认240毫秒',
          type: 'number',
          default: '240',
        },
        {
          name: 'timeout',
          desc: '超时时间，超出这个时间后会抛出错误，单位毫秒(ms)，默认为12,0000毫秒',
          type: 'number',
          default: '12e4',
        },
      ],
      return: 'Promise<void>',
      example: 'await waitDocReady(200, 60000) // 每200ms检查一次文档是否准备完毕，1分钟后超时报错'
    }
  ],
}

export default asyncUtils
