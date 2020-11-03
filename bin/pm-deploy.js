#!/usr/bin/env node
const { deploy } = require('../build/deploy')
const program = require('commander')

program
  .option('-i --init', '初始化项目')
  .option('-t --target <WorkDir>', '指定目录')
  .option('-s --send', '发布钉钉消息')
  .option('--branch <Branch>', '指定上传的branch，默认为build', 'build')
  .parse(process.argv)

if (program.dir) {
  process.chdir(program.dir)
}

const { target, send, branch } = program

deploy({ target, send, branch })
