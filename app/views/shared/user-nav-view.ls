require! <[views/base/view ./templates/user-nav]>

module.exports = class UserNav extends view
  autoRender: yes
  className: 'user-nav'
  id: 'user-nav'
  template: user-nav