const { extend } = require('lodash')
const Generator = require('yeoman-generator')
const copyTemplate = require('./copyTemplate')

extend(Generator.prototype, {
  copyTemplate
})
