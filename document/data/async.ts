/*
 * @Author: Salt
 * @Date: 2022-09-17 22:09:53
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-18 15:03:00
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\document\data\async.ts
 */
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
      example: 'await sleep(); // 等待120ms\nawait sleep(200); // 等待200ms',
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
          desc: '延迟多少时间，单位毫秒(ms)，默认120毫秒',
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
        "await waitTill(() => document.readyState !== 'loading', 200, 60000); // 每200ms检查一次文档是否准备完毕，1分钟后超时报错",
    },
  ],
}

export default asyncUtils
