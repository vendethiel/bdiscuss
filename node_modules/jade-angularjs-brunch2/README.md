jade-angularjs-brunch2
=====================

Automatic compiler Jade templates to AngularJS modules for Brunch.IO

Based of @GulinSS's work.

## Sample of settings:

### Add to dependencies section in package.json of your project:

`` "jade-angularjs-brunch" : "1.6" `` 

### Add to templates section in config.coffee:

      joinTo: 
        'js/dontUseMe' : /^app/ #slutty hack for Jade-auto-compiling

### Add to plugin section in config.coffee:

      plugins:
            jade:
                  pretty: yes # Adds pretty-indentation whitespaces to output (false by default)
            jade_angular:
                  modules_folder: 'templates'
                  locals: {}

* modules_folder: folder with your template
* locals: context for jade compiler

### Now you can get angular.js modules:

if your file is at `app/src/blog/templates/article/index.jade`

_public/js/templates.js:

```js
angular.module('login.templates', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/blog/article/index', [
'This is content of your jade-file',''].join("\n"));
}])
```

### Note

This plugin was created to fix two things in the original jade-angularjs-brunch :

 - multiple files for templates
 - broken naming for after-dir parts. Ie `blog/templates/article/index.jade` give `blog/templates/index.html` because it only takes the last part, which is incorrect.