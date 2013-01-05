(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var chaplin, headerController, layout, mediator, routes, Application;
  chaplin = require('chaplin');
  headerController = require('controllers/header-controller');
  layout = require('views/layout');
  mediator = require('mediator');
  routes = require('routes');
  module.exports = Application = (function(superclass){
    var prototype = extend$((import$(Application, superclass).displayName = 'Application', Application), superclass).prototype, constructor = Application;
    prototype.title = 'Brunch example application';
    prototype.initialize = function(){
      superclass.prototype.initialize.call(this);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === 'function' ? Object.freeze(this) : void 8;
    };
    prototype.initLayout = function(){
      return this.layout = new layout({
        title: this.title
      });
    };
    prototype.initControllers = function(){
      return new headerController;
    };
    prototype.initMediator = function(){
      return mediator.seal();
    };
    function Application(){
      Application.superclass.apply(this, arguments);
    }
    return Application;
  }(chaplin.Application));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller;
  Chaplin = require('chaplin');
  module.exports = Controller = (function(superclass){
    var prototype = extend$((import$(Controller, superclass).displayName = 'Controller', Controller), superclass).prototype, constructor = Controller;
    function Controller(){
      Controller.superclass.apply(this, arguments);
    }
    return Controller;
  }(Chaplin.Controller));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("controllers/forums-controller", function(exports, require, module) {
  var Controller, ForumsIndexView, ForumCollection, ForumsController;
  Controller = require('controllers/base/controller');
  ForumsIndexView = require('views/forums/index-view');
  ForumCollection = require('models/forum-collection');
  module.exports = ForumsController = (function(superclass){
    var prototype = extend$((import$(ForumsController, superclass).displayName = 'ForumsController', ForumsController), superclass).prototype, constructor = ForumsController;
    prototype.historyURL = 'forums';
    prototype.title = 'Forums';
    prototype.index = function(){
      var collection;
      collection = new ForumCollection;
      collection.add({
        id: 5,
        name: 'lol'
      });
      return this.view = new ForumsIndexView({
        collection: collection
      });
    };
    function ForumsController(){
      ForumsController.superclass.apply(this, arguments);
    }
    return ForumsController;
  }(Controller));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("controllers/header-controller", function(exports, require, module) {
  var Controller, HeaderView, HeaderController;
  Controller = require('controllers/base/controller');
  HeaderView = require('views/header-view');
  module.exports = HeaderController = (function(superclass){
    var prototype = extend$((import$(HeaderController, superclass).displayName = 'HeaderController', HeaderController), superclass).prototype, constructor = HeaderController;
    prototype.initialize = function(){
      superclass.prototype.initialize.call(this);
      return this.view = new HeaderView;
    };
    function HeaderController(){
      HeaderController.superclass.apply(this, arguments);
    }
    return HeaderController;
  }(Controller));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("controllers/home-controller", function(exports, require, module) {
  var Controller, HomePageView, HomeController;
  Controller = require('controllers/base/controller');
  HomePageView = require('views/home-page-view');
  module.exports = HomeController = (function(superclass){
    var prototype = extend$((import$(HomeController, superclass).displayName = 'HomeController', HomeController), superclass).prototype, constructor = HomeController;
    prototype.historyURL = 'home';
    prototype.title = 'Home';
    prototype.index = function(){
      return this.view = new HomePageView;
    };
    function HomeController(){
      HomeController.superclass.apply(this, arguments);
    }
    return HomeController;
  }(Controller));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("index.static", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<html><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><title>bDiscuss</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="/stylesheets/app.css"/></head><body><header id="header-container" class="header-container"></header><div class="container outer-container"><div id="page-container" class="page-container"></div></div><script src="/javascripts/vendor.js"></script><script src="/javascripts/app.js"></script><script>require(\'initialize\');</script></body></html>');
  }
  return buf.join("");
  };
});
window.require.register("initialize", function(exports, require, module) {
  var Application;
  Application = require('application');
  $(function(){
    var app;
    app = new Application;
    return app.initialize();
  });
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, utils, support;
  Chaplin = require('chaplin');
  utils = require('lib/utils');
  support = utils.beget(Chaplin.support);
  module.exports = support;
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;
  Chaplin = require('chaplin');
  utils = Chaplin.utils.beget(Chaplin.utils);
  module.exports = utils;
});
window.require.register("mediator", function(exports, require, module) {
  module.exports = require('chaplin').mediator;
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Model, Collection;
  Chaplin = require('chaplin');
  Model = require('models/base/model');
  module.exports = Collection = (function(superclass){
    var prototype = extend$((import$(Collection, superclass).displayName = 'Collection', Collection), superclass).prototype, constructor = Collection;
    prototype.model = Model;
    function Collection(){
      Collection.superclass.apply(this, arguments);
    }
    return Collection;
  }(Chaplin.Collection));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model;
  Chaplin = require('chaplin');
  module.exports = Model = (function(superclass){
    var prototype = extend$((import$(Model, superclass).displayName = 'Model', Model), superclass).prototype, constructor = Model;
    function Model(){
      Model.superclass.apply(this, arguments);
    }
    return Model;
  }(Chaplin.Model));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("models/forum-collection", function(exports, require, module) {
  var Collection, model, ForumCollection;
  Collection = require('./base/collection');
  model = require('./forum');
  module.exports = ForumCollection = (function(superclass){
    var prototype = extend$((import$(ForumCollection, superclass).displayName = 'ForumCollection', ForumCollection), superclass).prototype, constructor = ForumCollection;
    prototype.model = model;
    function ForumCollection(){
      ForumCollection.superclass.apply(this, arguments);
    }
    return ForumCollection;
  }(Collection));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("models/forum", function(exports, require, module) {
  var Model, Forum;
  Model = require('models/base/model');
  module.exports = Forum = (function(superclass){
    var prototype = extend$((import$(Forum, superclass).displayName = 'Forum', Forum), superclass).prototype, constructor = Forum;
    function Forum(){
      Forum.superclass.apply(this, arguments);
    }
    return Forum;
  }(Model));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("routes", function(exports, require, module) {
  module.exports = function(m){
    m('', 'home#index', {
      name: 'home'
    });
    m('forums', 'forums#index', {
      name: 'forums'
    });
    return m('forum/:id', 'forums#show', {
      name: 'view_forum'
    });
  };
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, View, CollectionView;
  Chaplin = require('chaplin');
  View = require('views/base/view');
  module.exports = CollectionView = (function(superclass){
    var prototype = extend$((import$(CollectionView, superclass).displayName = 'CollectionView', CollectionView), superclass).prototype, constructor = CollectionView;
    prototype.getTemplateFunction = View.prototype.getTemplateFunction;
    function CollectionView(){
      CollectionView.superclass.apply(this, arguments);
    }
    return CollectionView;
  }(Chaplin.CollectionView));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/base/page-view", function(exports, require, module) {
  var View, PageView;
  View = require('views/base/view');
  module.exports = PageView = (function(superclass){
    var prototype = extend$((import$(PageView, superclass).displayName = 'PageView', PageView), superclass).prototype, constructor = PageView;
    prototype.container = '#content-container';
    prototype.renderedSubviews = false;
    prototype.initialize = function(){
      var modelOrCollection, rendered, this$ = this;
      superclass.prototype.initialize.apply(this, arguments);
      modelOrCollection = this.model || this.collection;
      if (modelOrCollection) {
        rendered = false;
        return this.listenTo(modelOrCollection, 'change', function(){
          var rendered;
          if (!rendered) {
            this$.render();
          }
          return rendered = true;
        });
      }
    };
    prototype.getNavigationData = function(){
      return {};
    };
    prototype.renderSubviews = function(){};
    prototype.render = function(){
      superclass.prototype.render.apply(this, arguments);
      if (!this.renderedSubviews) {
        this.renderSubviews();
        this.renderedSubviews = true;
      }
      return this.publishEvent('navigation:change', this.getNavigationData());
    };
    function PageView(){
      PageView.superclass.apply(this, arguments);
    }
    return PageView;
  }(View));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View;
  Chaplin = require('chaplin');
  module.exports = View = (function(superclass){
    var prototype = extend$((import$(View, superclass).displayName = 'View', View), superclass).prototype, constructor = View;
    prototype.getTemplateFunction = function(){
      return this.template;
    };
    function View(){
      View.superclass.apply(this, arguments);
    }
    return View;
  }(Chaplin.View));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/forums/index-view", function(exports, require, module) {
  var CollectionView, ForumsItemView, template, ForumsIndexView;
  CollectionView = require('views/base/collection-view');
  ForumsItemView = require('./item-view');
  template = require('./templates/index');
  module.exports = ForumsIndexView = (function(superclass){
    var prototype = extend$((import$(ForumsIndexView, superclass).displayName = 'ForumsIndexView', ForumsIndexView), superclass).prototype, constructor = ForumsIndexView;
    prototype.template = template;
    prototype.className = 'home-page';
    prototype.container = '#page-container';
    prototype.listSelector = '.forum-list';
    prototype.itemView = ForumsItemView;
    prototype.autoRender = true;
    function ForumsIndexView(){
      ForumsIndexView.superclass.apply(this, arguments);
    }
    return ForumsIndexView;
  }(CollectionView));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/forums/item-view", function(exports, require, module) {
  var View, template, ForumsItemView;
  View = require('views/base/view');
  template = require('./templates/item');
  module.exports = ForumsItemView = (function(superclass){
    var prototype = extend$((import$(ForumsItemView, superclass).displayName = 'ForumsItemView', ForumsItemView), superclass).prototype, constructor = ForumsItemView;
    prototype.template = template;
    prototype.tagname = 'li';
    prototype.autoRender = true;
    function ForumsItemView(){
      ForumsItemView.superclass.apply(this, arguments);
    }
    return ForumsItemView;
  }(View));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/forums/templates/index", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h3>Forum list</h3><ul class="forum-list"></ul>');
  }
  return buf.join("");
  };
});
window.require.register("views/forums/templates/item", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<li><a');
  buf.push(attrs({ 'href':("/forum/" + (id) + "") }, {"href":true}));
  buf.push('>');
  var __val__ = name
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('</a></li>');
  }
  return buf.join("");
  };
});
window.require.register("views/header-view", function(exports, require, module) {
  var view, header, HeaderView;
  view = require('views/base/view');
  header = require('views/templates/header');
  module.exports = HeaderView = (function(superclass){
    var prototype = extend$((import$(HeaderView, superclass).displayName = 'HeaderView', HeaderView), superclass).prototype, constructor = HeaderView;
    prototype.autoRender = true;
    prototype.className = 'header';
    prototype.container = '#header-container';
    prototype.id = 'header';
    prototype.template = header;
    function HeaderView(){
      HeaderView.superclass.apply(this, arguments);
    }
    return HeaderView;
  }(view));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var home, view, HomePageView;
  home = require('views/templates/home');
  view = require('views/base/view');
  module.exports = HomePageView = (function(superclass){
    var prototype = extend$((import$(HomePageView, superclass).displayName = 'HomePageView', HomePageView), superclass).prototype, constructor = HomePageView;
    prototype.autoRender = true;
    prototype.className = 'home-page';
    prototype.container = '#page-container';
    prototype.template = home;
    function HomePageView(){
      HomePageView.superclass.apply(this, arguments);
    }
    return HomePageView;
  }(view));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/layout", function(exports, require, module) {
  var chaplin, Layout;
  chaplin = require('chaplin');
  module.exports = Layout = (function(superclass){
    var prototype = extend$((import$(Layout, superclass).displayName = 'Layout', Layout), superclass).prototype, constructor = Layout;
    function Layout(){
      Layout.superclass.apply(this, arguments);
    }
    return Layout;
  }(chaplin.Layout));
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<ul><li><a href="/">Index</a></li><li><a href="/forums">Forums</a></li></ul>');
  }
  return buf.join("");
  };
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<p>Welcome aboard !\nB:Discuss is a kind of forum ... It\'s very cool and you\'ll love it !</p>');
  }
  return buf.join("");
  };
});
