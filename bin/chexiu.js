#!/usr/bin/env node

const program = require('commander')
const exec = require('exec-sh').promise

program
  .version('1.0.0', '-V --version', '输出版本号')
  .usage('<command> [options]')
  .helpOption('-h --help', '显示帮助信息')
  .description('可使用的命令')
  .command('deploy [options]', '部署公司项目', {
    executableFile: '../scripts/pm-publisher.js',
  })
  .alias('D')

program
  .command('create <pwd>')
  .description('创建一个项目')
  .action((dir, command) => {
    const Create = require('../scripts/create.js')
    const create = new Create(dir, process.cwd()).create()
    create
      .then(async () => {
        console.log('创建成功')
        await exec(`cd ${dir} && yarn && yarn serve`)
      })
      .catch((err) => {
        console.log('创建项目失败', err)
      })
  })
  .alias('C')

program
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmdObj) {
    console.log('remove ' + dir + (cmdObj.recursive ? ' recursively' : ''))
  })

program.parse(process.argv)
