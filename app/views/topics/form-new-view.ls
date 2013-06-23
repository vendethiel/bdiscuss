View = require 'views/base/view'
template = require './templates/form-new'

module.exports = class TopicFormNewView extends View
  template: template
  autoRender: true