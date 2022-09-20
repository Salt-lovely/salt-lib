/*
 * @Author: Salt
 * @Date: 2022-09-04 23:18:21
 * @LastEditors: Salt
 * @LastEditTime: 2022-09-19 22:25:15
 * @Description: 这个文件的功能
 * @FilePath: \salt-lib\jest.config.js
 */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
