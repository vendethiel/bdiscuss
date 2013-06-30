View = require 'views/base/view'
template = require './templates/site'

module.exports = class SiteView extends View
  template: template
  auto-render: false
  container: 'body'
  id: 'site-container'
  regions:
    '#header-container': 'header'
    '#navigation-container': 'navigation'
    '#content-container': 'content'