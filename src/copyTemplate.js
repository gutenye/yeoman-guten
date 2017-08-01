const globby = require('globby')
const path = require('path')

module.exports = function copyTemplate(props = {}) {
  const paths = globby.sync([`${this.templatePath()}/**/*`], { dot: true, nodir: true })
  paths.forEach(p => {
    // TEMPLATE_PATH/da/_package.json
    if (path.basename(p).startsWith('_')) {
      // TEMPLATE_PATH/da/package.json
      let file = path.join(path.dirname(p), path.basename(p).replace(/^_/, ''))
      // da/package.json
      file = path.relative(this.templatePath(), file)

      if (path.extname(p) === '.json')
        this.fs.extendJSON(this.destinationPath(file), this.fs.readJSON(p))
      else
        this.fs.append(this.destinationPath(file), this.fs.read(p))
    } else {
      const file = path.relative(this.templatePath(), p)
      this.fs.copyTpl(p, this.destinationPath(file), props)
    }
  })
}
