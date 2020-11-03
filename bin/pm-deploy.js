#!/usr/bin/env node
const deploy = require('../build/deploy')
const program = require('commander')

program
  .option('-i --init', '初始化项目')
  .option('-t --target <WorkDir>', '指定目录')
  .option('-s --send', '发布钉钉消息')
  .option('-b --build', '是否重新打包', true)
  .parse(process.argv)

if (program.dir) {
  process.chdir(program.dir)
}

if (program.deploy) {
  const { target, send, build } = program

  deploy({ target, send, build })
}
