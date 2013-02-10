View = require 'views/base/view'
template = require './templates/form-new'

module.exports = class TopicsFormNewView extends View
  template: template
  autoRender: true