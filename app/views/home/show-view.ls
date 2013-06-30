PageView = require 'views/base/page-view'
template = require './templates/show'

module.exports = class HomeShowView extends PageView
  template: template
  region: 'content'
  class-name: 'home-page'