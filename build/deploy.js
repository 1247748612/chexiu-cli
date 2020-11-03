const axios = require('axios')
const crypto = require('crypto')
const cp = require('child_process')
const inquirer = require('inquirer')
const ghpages = require('gh-pages')
const path = require('path')
const execShPromise = require('exec-sh').promise

// 钉钉机器人文档地址 https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq

// 钉钉webhook机器人 token
const ACCESS_TOKEN =
  '8b5cef7f230c1d0f84eeae45a8ca0e77486762ee13013788355277353c13bb07'

// 钉钉webhook机器人 加签密钥
const ACCESS_SECRET =
  'SECf547a00fa4aa1ba1eda94958ea18d8cbdf33ead240b352da2044cb821283f5ab'

// 需要at的人
const AT_PHONE = '+86-15815549880'
// 需要at的列表
const AT_PHONE_LIST = ['15917033340', '15815549880']

// 钉钉api 封装
class DingTalk {
  _axios = null

  static getGitName() {
    return cp.spawnSync('git', ['config', 'user.name']).stdout.toString()
  }

  constructor(accessToken, secret) {
    let queryParams = {
      access_token: accessToken,
    }
    if (secret) {
      const signData = this._getSign(secret)
      queryParams = { ...queryParams, ...signData }
    }
    this._init(queryParams)
  }

  _init(params) {
    console.log(params)
    this._axios = axios.create({
      baseURL: 'https://oapi.dingtalk.com/robot/send',
      timeout: 5000,
      params,
    })
  }

  _getSign(secret) {
    const time = new Date().getTime()
    const hmac = crypto.createHmac('sha256', secret)
    secret = `${time}\n${secret}`
    hmac.update(secret)
    return {
      timestamp: time,
      sign: encodeURIComponent(hmac.digest('base64')),
    }
  }

  // 对应markdown消息
  async markdown(title, text, args) {
    if (title === undefined || text === undefined) {
      return Promise.reject(new Error('标题或内容不能为空'))
    }
    const data = {
      msgtype: 'markdown',
      markdown: {
        title,
        text,
      },
      at: {},
    }
    if (args instanceof Array) {
      data.at['atMobiles'] = args
    } else if (args instanceof Boolean) {
      data.at['isAtAll'] = args
    }
    console.log(data)
    return this._axios.post('/', data)
  }
}

const envConfig = ['demo', 'dev', 'test', 'prod']

function flog(...args) {
  args.unshift('\n--->')
  args.push('\n')
  console.log(...args)
}

const tagHandle = {
  demo(env) {
    flog(`${env}环境默认tag格式为", "年月日_时分_环境`)
    return dateFormat(`YYYYmmdd_HHMM_${env}`)
  },
  dev(env) {
    flog(`${env}环境默认tag格式为", "年月日_时分_环境`)
    return dateFormat(`YYYYmmdd_HHMM_${env}`)
  },
  test(env) {
    flog(`${env}环境默认tag格式为", "年月日_时分_环境`)
    return dateFormat(`YYYYmmdd_HHMM_${env}`)
  },
  async prod() {
    let { tag } = await inquirer.prompt([
      {
        name: 'tag',
        message:
          '线上版本请输入tag name (tip：必须包含项目名缩写及版本号，如cst_v1.0.0)',
        type: 'input',
        validate: (value) => {
          if (!/v\d+\.\d+\.\d+/g.test(value) || !value.includes('_')) {
            return false
          }
          return true
        },
      },
    ])
    return tag
  },
}

function dateFormat(fmt, date) {
  date = date || new Date()
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

async function deploy() {
  const { env } = await inquirer.prompt([
    {
      name: 'env',
      message: '部署什么环境?',
      type: 'list',
      default: 'test',
      choices: envConfig,
    },
  ])

  const { build } = await inquirer.prompt([
    {
      name: 'build',
      type: 'confirm',
      message: `是否需要重新build 运行npm run build-${env}命令?`,
    },
  ])

  let { message } = await inquirer.prompt([
    {
      name: 'message',
      message: '请输入commit message，默认为版本更新：',
      type: 'input',
    },
  ])

  const tag = await tagHandle[env](env)

  message = message === '' ? '版本更新' : message

  if (build) {
    try {
      await execShPromise(`npm run build-${env}`)
      flog('打包完成')
    } catch (err) {
      flog('build err', err)
      return
    }
  }

  await publish({
    message,
    tag,
  })
    .then(async (res) => {
      flog('推送成功')

      await execShPromise('git fetch')
      flog('tag：', tag)
      sendDingTalk(env, tag, message)
      // await execShPromise(`echo ${tag} | clip`)
    })
    .catch((err) => {
      flog(err, '推送失败')
      return
    })
}

async function publish(options) {
  return new Promise((resolve, reject) => {
    const publishOptions = {
      branch: 'build',
      ...options,
    }
    ghpages.publish('production', publishOptions, (err) => {
      if (err === undefined) {
        resolve()
      }
      reject(err)
    })
  })
}

/**
 *
 * @param {String} env 环境
 * @param {String} tag tag标签
 * @param {String} commit commit消息
 */
function sendDingTalk(env, tag, commit) {
  const dt = new DingTalk(ACCESS_TOKEN, ACCESS_SECRET)

  const dir = path.dirname(__dirname)
  const basename = path.basename(dir)

  dt.markdown(
    `tag发布: ${tag}`,
    `### 🚀${basename}发布 \n > ---------- \n - 👹commit：${commit} \n - ⚡环境：${env} \n - ☝tag：${tag} \n - 😁提交人：${DingTalk.getGitName()} > ---------- \n ###### 💗麻烦发布：@${AT_PHONE}`,
    AT_PHONE_LIST ? AT_PHONE_LIST : []
  )
    .then((res) => {
      console.log(res.data, 'success')
    })
    .catch((err) => {
      console.log(err, 'err')
    })
}

// deploy()
// sendDingTalk("test", "20201009_1642_test", "测试钉钉发送消息");

module.exports = {
  deploy,
  DingTalk,
  sendDingTalk,
}
