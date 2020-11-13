const fs = require('fs-extra')
const path = require('path')

module.exports = class Create {
  name = 'webpack-vue'
  src = __dirname
  templateName = 'vue'
  constructor(name, options) {
    const { templateName, src } = options
    this.name = name || this.name
    if (!src) {
      throw new Error('dest path is undefine')
    }
    this.src = src
    this.templateName = templateName
    this.projectPath = path.resolve(this.src, this.name)
  }

  _createProjectFolder() {
    if (fs.pathExists(this.projectPath)) {
      return
    }
    fs.mkdirSync(this.projectPath)
  }

  create() {
    return new Promise((resolve, reject) => {
      try {
        this._createProjectFolder()
      } catch (err) {
        reject(err)
      }

      fs.copy(path.resolve(__dirname, `../templates/${this.templateName}`), this.projectPath)
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
