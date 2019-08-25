'use strict'
const Generator = require('yeoman-generator')
// const chalk = require('chalk')
// const yosay = require('yosay')
const {
  camelCase,
  kebabCase,
  upperFirst
} = require('lodash')

module.exports = class extends Generator {

  prompting() {
    // this.log(
    //   yosay(`Welcome to my ${chalk.red('React Component')} generator!`)
    // )

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your component name',
        default: 'ReactComponent'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Your component directory',
        default: 'components'
      }
    ]

    return this.prompt(prompts)
      .then(answers => {
        this.props = answers
        this.props.dir = this.props.dir.trim()
        this.props.nameKebab = kebabCase(this.props.name).trim()
        this.props.name = upperFirst(camelCase(this.props.name)).trim()
        // this.props.namePascal = upperFirst(camelCase(this.props.name))
      })
  }

  writing() {
    const { dir, name } = this.props
    this._copyFiles('index.js', `${dir}/${name}/index.js`)
    this._copyFiles('name.js', `${dir}/${name}/${name}.js`)
    this._copyFiles('name.test.js', `${dir}/${name}/${name}.test.js`)
    this._copyFiles('name.scss', `${dir}/${name}/${name}.scss`)
  }

  _copyFiles(from, to) {
    this.fs.copyTpl(
      this.templatePath(from),
      this.destinationPath(to),
      this.props
    )
  }

  // install() {
  //   this.installDependencies()
  // }
}
