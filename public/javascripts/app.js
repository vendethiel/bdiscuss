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
  layout = require('views/shared/layout');
  mediator = require('mediator');
  routes = require('routes');
  require('lib/jade-helpers');
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
  var Controller, ForumsIndexView, ForumsShowView, ForumCollection, Forum, ForumsController;
  Controller = require('controllers/base/controller');
  ForumsIndexView = require('views/forums/index-view');
  ForumsShowView = require('views/forums/show-view');
  ForumCollection = require('models/forum-collection');
  Forum = require('models/forum');
  module.exports = ForumsController = (function(superclass){
    var prototype = extend$((import$(ForumsController, superclass).displayName = 'ForumsController', ForumsController), superclass).prototype, constructor = ForumsController;
    prototype.historyURL = 'forums';
    prototype.title = 'Forums';
    prototype.index = function(){
      this.collection = new ForumCollection;
      this.view = new ForumsIndexView({
        collection: this.collection
      });
      return this.collection.fetch();
    };
    prototype.show = function(arg$){
      var id;
      id = arg$.id;
      this.model = new Forum({
        id: id
      });
      this.model.fetch();
      return this.view = new ForumsShowView({
        model: this.model
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
  HeaderView = require('views/shared/header-view');
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
  HomePageView = require('views/home/page-view');
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
window.require.register("controllers/topics-controller", function(exports, require, module) {
  var Controller, TopicsShowView, ForumCollection, Forum, TopicsController;
  Controller = require('controllers/base/controller');
  TopicsShowView = require('views/topics/show-view');
  ForumCollection = require('models/forum-collection');
  Forum = require('models/forum');
  module.exports = TopicsController = (function(superclass){
    var prototype = extend$((import$(TopicsController, superclass).displayName = 'TopicsController', TopicsController), superclass).prototype, constructor = TopicsController;
    prototype.historyURL = 'topics';
    prototype.title = 'topics';
    prototype.show = function(arg$){
      var id;
      id = arg$.id;
      this.model = new Topic({
        id: id
      });
      this.model.fetch();
      return this.view = new TopicsShowView({
        model: this.model
      });
    };
    function TopicsController(){
      TopicsController.superclass.apply(this, arguments);
    }
    return TopicsController;
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
  buf.push('<html><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><title>bDiscuss</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="/stylesheets/app.css"/></head><body><header id="header-container" class="header-container"></header><div class="container outer-container"><div id="page-container" class="page-container"></div></div><script>window.brunch = window.brunch || {};\nwindow.brunch[\'auto-reload\'] = {enabled: true};</script><script src="/javascripts/vendor.js"></script><script src="/javascripts/app.js"></script><script>require(\'initialize\');</script></body></html>');
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
window.require.register("lib/jade-helpers", function(exports, require, module) {
  jade.helpers = {
    titleize: function(it){
      if (!it) {
        return "";
      }
      it = it[0].toUpperCase() + it.slice(1);
      it = it.replace("_", " ");
      return it.replace(/\s([a-z])/, function(it){
        return " " + it[1].toUpperCase();
      });
    }
  };
});
window.require.register("lib/support", function(exports, require, module) {
  var chaplin, utils, support;
  chaplin = require('chaplin');
  utils = require('lib/utils');
  support = utils.beget(chaplin.support);
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
    prototype.initialize = function(arg$, options){
      var that;
      superclass.prototype.initialize.apply(this, arguments);
      if ((that = options != null ? options.url : void 8) != null) {
        return this.url = that;
      }
    };
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
    prototype.forceExt = true;
    prototype.apiRoot = '';
    prototype.urlKey = 'id';
    prototype.urlPath = function(){
      return '';
    };
    prototype.urlParams = function(){
      return {};
    };
    prototype.urlRoot = function(){
      var urlPath;
      urlPath = this.urlPath();
      if (urlPath) {
        return this.apiRoot + urlPath;
      } else if (this.collection) {
        return this.collection.url();
      } else {
        throw new Error('Model must redefine url-path');
      }
    };
    prototype.url = function(data){
      var base, full, that, sep, params, payload, k, v;
      data == null && (data = '');
      base = this.urlRoot();
      full = (that = this.get(this.urlKey)) != null
        ? base + encodeURIComponent(that) + data
        : base + data;
      sep = full.indexOf('?') >= 0 ? '&' : '?';
      params = this.urlParams();
      payload = (function(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = params).length; i$ < len$; ++i$) {
          k = i$;
          v = ref$[i$];
          if (v != null) {
            results$.push(k + "=" + v);
          }
        }
        return results$;
      }()).join('&');
      if (this.forceExt) {
        full += ".json";
      }
      if (payload) {
        return full + sep + payload;
      } else {
        return full;
      }
    };
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
    prototype.url = function(){
      return "/forums.json";
    };
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
  Model = require('./base/model');
  module.exports = Forum = (function(superclass){
    var prototype = extend$((import$(Forum, superclass).displayName = 'Forum', Forum), superclass).prototype, constructor = Forum;
    prototype.urlPath = function(){
      return "/forums/";
    };
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
window.require.register("models/topic", function(exports, require, module) {
  var Model, Topic;
  Model = require('./base/model');
  module.exports = Topic = (function(superclass){
    var prototype = extend$((import$(Topic, superclass).displayName = 'Topic', Topic), superclass).prototype, constructor = Topic;
    function Topic(){
      Topic.superclass.apply(this, arguments);
    }
    return Topic;
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
    m('forums/', 'forums#index', {
      name: 'forums'
    });
    m('forum/:id', 'forums#show', {
      name: 'view_forum'
    });
    m('topic/:id', 'topics#show', {
      name: 'view_topic'
    });
  };
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, View, CollectionView;
  Chaplin = require('chaplin');
  View = require('views/base/view');
  module.exports = CollectionView = (function(superclass){
    var ref$, prototype = extend$((import$(CollectionView, superclass).displayName = 'CollectionView', CollectionView), superclass).prototype, constructor = CollectionView;
    ref$ = View.prototype, prototype.getTemplateFunction = ref$.getTemplateFunction, prototype.getTemplateData = ref$.getTemplateData;
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
    prototype.container = '#page-container';
    prototype.className = 'home-page';
    prototype.autoRender = true;
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
    prototype.getTemplateData = function(){
      return _.extend({}, jade.helpers, superclass.prototype.getTemplateData.apply(this, arguments));
    };
    prototype.render = function(){
      superclass.prototype.render.apply(this, arguments);
      return this.stickit();
    };
    function View(){
      View.superclass.apply(this, arguments);
    }
    return View;
  }(Chaplin.View));
  /*
    initialize: ->
      super ...
      modelOrCollection = @model or @collection
      if modelOrCollection
        rendered = no
        @listenTo modelOrCollection, 'change', ~>
          @render! unless rendered
          rendered = yes
  */
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
    prototype.bindings = {
      '.name': {
        observe: 'name',
        onGet: 'formatName'
      }
    };
    prototype.formatName = function(it){
      return jade.helpers.titleize(it);
    };
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
window.require.register("views/forums/show-view", function(exports, require, module) {
  var Collection, Topic, View, TopicsListView, template, itemView, ForumsShowView;
  Collection = require('models/base/collection');
  Topic = require('models/topic');
  View = require('views/base/view');
  TopicsListView = require('views/topics/list-view');
  template = require('./templates/show');
  itemView = require('views/topics/item-view');
  module.exports = ForumsShowView = (function(superclass){
    var prototype = extend$((import$(ForumsShowView, superclass).displayName = 'ForumsShowView', ForumsShowView), superclass).prototype, constructor = ForumsShowView;
    prototype.template = template;
    prototype.container = '#page-container';
    prototype.className = 'forums-show';
    prototype.autoRender = true;
    prototype.bindings = {
      '#name': {
        observe: 'name',
        onGet: 'formatName'
      }
    };
    prototype.formatName = function(it){
      return jade.helpers.titleize(it);
    };
    prototype.afterRender = function(){
      superclass.prototype.afterRender.apply(this, arguments);
      this.topics = new Collection(null, {
        model: Topic,
        url: this.model.url('/topics')
      });
      this.topics.fetch();
      return this.subview('topics', new TopicsListView({
        collection: this.topics,
        container: this.$('#topics')
      }));
    };
    function ForumsShowView(){
      ForumsShowView.superclass.apply(this, arguments);
    }
    return ForumsShowView;
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
  buf.push(attrs({ 'href':("/forum/" + (id) + ""), "class": ('name') }, {"href":true}));
  buf.push('></a></li>');
  }
  return buf.join("");
  };
});
window.require.register("views/forums/templates/show", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h2 id="name"></h2><div id="topics"></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/home/page-view", function(exports, require, module) {
  var home, view, HomePageView;
  home = require('./templates/home');
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
window.require.register("views/home/templates/home", function(exports, require, module) {
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
window.require.register("views/shared/header-view", function(exports, require, module) {
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
window.require.register("views/shared/layout", function(exports, require, module) {
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
window.require.register("views/topics/item-view", function(exports, require, module) {
  var View, template, TopicsItemView;
  View = require('views/base/view');
  template = require('./templates/item');
  module.exports = TopicsItemView = (function(superclass){
    var prototype = extend$((import$(TopicsItemView, superclass).displayName = 'TopicsItemView', TopicsItemView), superclass).prototype, constructor = TopicsItemView;
    prototype.template = template;
    prototype.tagname = 'li';
    prototype.autoRender = true;
    prototype.events = {
      'click .toggle-edit-title': 'toggleEditTitle',
      'blur .edit-title': 'toggleEditTitle',
      'keyup .edit-title': 'keyupEditTitle'
    };
    prototype.bindings = {
      '.title': 'title',
      '.lock-state': {
        observe: 'locked',
        visible: false
      },
      '.lock-toggle': {
        observe: 'locked'
      },
      '.edit-title': {
        observe: 'title'
      }
    };
    prototype.toggleEditTitle = function(){
      this.savedTitle = this.$('.toggle-edit-title').is(':visible') ? this.model.get('title') : void 8;
      this.$('.toggle-edit-title').toggle();
      this.$('a.title').toggle();
      this.$('.edit-title').toggle();
      return false;
    };
    prototype.keyupEditTitle = function(arg$){
      var keyCode;
      keyCode = arg$.keyCode;
      switch (keyCode) {
      case 27:
        this.model.set('title', this.savedTitle);
        // fallthrough
      case 13:
        this.toggleEditTitle();
      }
    };
    function TopicsItemView(){
      TopicsItemView.superclass.apply(this, arguments);
    }
    return TopicsItemView;
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
window.require.register("views/topics/list-view", function(exports, require, module) {
  var CollectionView, itemView, template, TopicsListView;
  CollectionView = require('views/base/collection-view');
  itemView = require('./item-view');
  template = require('./templates/list');
  module.exports = TopicsListView = (function(superclass){
    var prototype = extend$((import$(TopicsListView, superclass).displayName = 'TopicsListView', TopicsListView), superclass).prototype, constructor = TopicsListView;
    prototype.template = template;
    prototype.itemView = itemView;
    prototype.listSelector = '.topic-list';
    function TopicsListView(){
      TopicsListView.superclass.apply(this, arguments);
    }
    return TopicsListView;
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
window.require.register("views/topics/templates/item", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<li><a');
  buf.push(attrs({ 'href':("/topic/" + (id) + ""), "class": ('title') }, {"href":true}));
  buf.push('></a><input class="eip edit-title"/><span class="toggle-edit-title">✔</span><span class="lock-state">&nbsp;(locked)</span>');
  if ( (true))
  {
  buf.push('&nbsp;&bull; <input type="checkbox" title="lock" class="lock-toggle"/>');
  }
  buf.push('</li>');
  }
  return buf.join("");
  };
});
window.require.register("views/topics/templates/list", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h4>Topics</h4><ul class="topic-list"></ul>');
  }
  return buf.join("");
  };
});
