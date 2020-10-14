'use strict'
const Generator = require('yeoman-generator')

module.exports = class extends Generator {

    constructor(args, opts) {
      super(args, opts)

      this.argument('name', { type: String, required: false })
      this.option('next')
      this.option('separateHandler')
    }

    async prompting() {
        const prompts = []
        if (!this.options.name)
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'Your route name',
                default: 'helloworld'
            })

        if (!this.options.next)
            prompts.push({
                type: 'confirm',
                name: 'next',
                message: 'Is this a next.js API route?',
                default: false
            })

        if (!this.options.separateHandler)
            prompts.push({
                type: 'confirm',
                name: 'separateHandler',
                message: 'Separate handlers?',
                default: false
            })

        let answers = {}
        if (prompts.length) answers = await this.prompt(prompts)

        const { dir } = await this.prompt([
            {
                type: 'input',
                name: 'dir',
                message: 'Your route directory',
                default: (this.options.next || answers.next) ? 'pages/api' : 'api'
            }
        ])

        let handlerDir
        if (this.options.separateHandler || answers.separateHandler)
            ({ handlerDir } = await this.prompt([
                {
                    type: 'input',
                    name: 'handlerDir',
                    message: 'Your handler directory',
                    default: 'helpers/apiHandlers'
                }
            ]))

        this.props = {
            ...answers,
            dir,
            handlerDir,
            separateHandler: this.options.separateHandler || answers.separateHandler
        }
        console.log('props', this.props)
        this.props.dir = this.props.dir.trim()
        this.props.handlerDir = this.props.handlerDir ? this.props.handlerDir.trim() : undefined
        this.props.next = this.props.next || this.options.next
        this.props.name = this.props.name || this.options.name
    }

    writing() {
        const { dir, handlerDir, name, separateHandler } = this.props
        if (separateHandler) {
            this._copyFiles('index.handlerDir.ts', `${dir}/${name}.ts`)
            this._copyFiles('index.ts', `${handlerDir}/${name}/index.ts`)
            this._copyFiles('nameHandler.ts', `${handlerDir}/${name}/${name}Handler.ts`)
            this._copyFiles('nameHandler.test.ts', `${handlerDir}/${name}/${name}Handler.test.ts`)
        }
        else {
            this._copyFiles('index.ts', `${dir}/${name}/index.ts`)
            this._copyFiles('nameHandler.ts', `${dir}/${name}/${name}Handler.ts`)
            this._copyFiles('nameHandler.test.ts', `${dir}/${name}/${name}Handler.test.ts`)
        }
    }

    _copyFiles(from, to) {
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            this.props
        )
    }
}
