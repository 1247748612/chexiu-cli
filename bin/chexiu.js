#!/usr/bin/env node

const program = require('commander')

program
  .version('1.0.0', '-V --version', '输出版本号')
  .usage('<command> [options]')
  .helpOption('-h --help', '显示帮助信息')
  .description('可使用的命令')
  .command('deploy [options]', '部署公司项目', {
    executableFile: '../scripts/pm-publisher.js',
  })
  .command('create [projectName]', '创建项目', {
    executableFile: '../scripts/pm-create.js',
  })
  .alias('D')
  .command('create [projectName]', '创建项目')
  .alias('C')
  .parse(process.argv)

if (program.dir) {
  process.chdir(program.dir)
}