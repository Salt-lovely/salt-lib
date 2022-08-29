/*
 * @Author: Salt
 * @Date: 2022-08-29 22:07:08
 * @LastEditors: Salt
 * @LastEditTime: 2022-08-29 23:10:03
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\src\utils\console.ts
 */
/** 在控制台打印内容，同时不显示行号（chrome、火狐测试通过） */
export function $log(...args: unknown[]) {
  if (!args.length)
    return new Promise((res) => res('')).then(console.log.bind(console))

  return new Promise((res) => res(args[args.length - 1])).then(
    console.log.bind(console, ...args.slice(0, args.length - 1))
  )
}
/** 在控制台打印**警告**内容，同时不显示行号（chrome、火狐测试通过） */
export function $warn(...args: unknown[]) {
  if (!args.length)
    return new Promise((res) => res('')).then(console.warn.bind(console))

  return new Promise((res) => res(args[args.length - 1])).then(
    console.warn.bind(console, ...args.slice(0, args.length - 1))
  )
}
/** 在控制台打印**报错**内容，同时不显示行号（chrome、火狐测试通过） */
export function $error(...args: unknown[]) {
  if (!args.length)
    return new Promise((res) => res('')).then(console.error.bind(console))

  return new Promise((res) => res(args[args.length - 1])).then(
    console.error.bind(console, ...args.slice(0, args.length - 1))
  )
}
/** 在控制台打印消息内容，同时不显示行号（chrome、火狐测试通过） */
export function $info(...args: unknown[]) {
  if (!args.length)
    return new Promise((res) => res('')).then(console.info.bind(console))

  return new Promise((res) => res(args[args.length - 1])).then(
    console.info.bind(console, ...args.slice(0, args.length - 1))
  )
}
/** 在控制台打印Debug内容，同时不显示行号（chrome、火狐测试通过） */
export function $debug(...args: unknown[]) {
  if (!args.length)
    return new Promise((res) => res('')).then(console.debug.bind(console))

  return new Promise((res) => res(args[args.length - 1])).then(
    console.debug.bind(console, ...args.slice(0, args.length - 1))
  )
}
