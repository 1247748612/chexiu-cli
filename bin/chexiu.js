#!/usr/bin/env node

const program = require('commander')

program
  .version('1.0.0', '-V --version', '输出版本号')
  .usage('<command> [options]')
  .helpOption('-h --help', '显示帮助信息')
  .description('可使用的命令')
  .command('deploy [options]', '部署公司项目', {
    executableFile: './pm-deploy.js',
  })
  .parse(process.argv)

if (program.dir) {
  process.chdir(program.dir)
}

console.log('WorkDir:', process.cwd())

// if (program.deploy) {
//   const { target, dist } = program

//   deploy({})
// }
