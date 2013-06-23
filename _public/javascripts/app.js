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
  var chaplin, headerController, sessionController, layout, mediator, routes, Application;
  chaplin = require('chaplin');
  headerController = require('controllers/header-controller');
  sessionController = require('controllers/session-controller');
  layout = require('views/shared/layout');
  mediator = require('mediator');
  routes = require('routes');
  require('lib/jade-helpers');
  module.exports = Application = (function(superclass){
    var prototype = extend$((import$(Application, superclass).displayName = 'Application', Application), superclass).prototype, constructor = Application;
    prototype.title = 'Brunch:discuss';
    prototype.initialize = function(){
      superclass.prototype.initialize.call(this);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      this.startRouting();
      return typeof Object.freeze === 'function' ? Object.freeze(this) : void 8;
    };
    prototype.initLayout = function(){
      return this.layout = new layout({
        title: this.title
      });
    };
    prototype.initControllers = function(){
      new headerController;
      return new sessionController;
    };
    prototype.initMediator = function(){
      mediator.user = null;
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
window.require.register("controllers/forum-controller", function(exports, require, module) {
  var Controller, ForumIndexView, ForumShowView, ForumCollection, Forum, ForumController;
  Controller = require('controllers/base/controller');
  ForumIndexView = require('views/forums/index-view');
  ForumShowView = require('views/forums/show-view');
  ForumCollection = require('models/forum-collection');
  Forum = require('models/forum');
  module.exports = ForumController = (function(superclass){
    var prototype = extend$((import$(ForumController, superclass).displayName = 'ForumController', ForumController), superclass).prototype, constructor = ForumController;
    prototype.historyURL = 'forums';
    prototype.title = 'Forums';
    prototype.index = function(){
      this.collection = new ForumCollection;
      this.view = new ForumIndexView({
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
      return this.view = new ForumShowView({
        model: this.model
      });
    };
    function ForumController(){
      ForumController.superclass.apply(this, arguments);
    }
    return ForumController;
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
window.require.register("controllers/session-controller", function(exports, require, module) {
  var mediator, Controller, User, SessionController;
  mediator = require('mediator');
  Controller = require('./base/controller');
  User = require('models/user');
  module.exports = SessionController = (function(superclass){
    var prototype = extend$((import$(SessionController, superclass).displayName = 'SessionController', SessionController), superclass).prototype, constructor = SessionController;
    prototype.initialize = function(){
      superclass.prototype.initialize.apply(this, arguments);
    };
    prototype.showLoginView = function(){
      if (this.loginView) {
        return;
      }
      this.loadProviders();
      return this.loginView = new LoginView;
    };
    prototype.instantiateAccount = function(it){
      return mediator.user = new User(it);
    };
    prototype.triggerLogin = function(){};
    function SessionController(){
      SessionController.superclass.apply(this, arguments);
    }
    return SessionController;
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
window.require.register("controllers/topic-controller", function(exports, require, module) {
  var Controller, TopicShowView, Topic, TopicController;
  Controller = require('controllers/base/controller');
  TopicShowView = require('views/topics/show-view');
  Topic = require('models/topic');
  module.exports = TopicController = (function(superclass){
    var prototype = extend$((import$(TopicController, superclass).displayName = 'TopicController', TopicController), superclass).prototype, constructor = TopicController;
    prototype.historyURL = 'topics';
    prototype.title = 'topics';
    prototype.show = function(arg$){
      var id;
      id = arg$.id;
      this.model = new Topic({
        id: id
      });
      this.model.fetch();
      this.view = new TopicShowView({
        model: this.model
      });
    };
    function TopicController(){
      TopicController.superclass.apply(this, arguments);
    }
    return TopicController;
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
  buf.push('<html><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><title>bDiscuss</title><meta name="viewport" content="width=device-width"/><link rel="stylesheet" href="/stylesheets/app.css"/></head><body><div id="header-container"></div><div class="container outer-container"><div id="page-container" class="page-container"></div></div><script>window.brunch = window.brunch || {};\nwindow.brunch[\'auto-reload\'] = {enabled: true};</script><script src="/javascripts/vendor.js"></script><script src="/javascripts/app.js"></script><script>require(\'initialize\');</script></body></html>');
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
  var mediator;
  mediator = require('mediator');
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
    },
    currentUser: function(){
      return mediator.user;
    },
    isAdmin: function(){
      var ref$;
      return (ref$ = mediator.user) != null ? ref$.get('admin') : void 8;
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
    var ref$, prototype = extend$((import$(Collection, superclass).displayName = 'Collection', Collection), superclass).prototype, constructor = Collection;
    prototype.model = Model;
    ref$ = Model.prototype, prototype.forceExt = ref$.forceExt, prototype.apiRoot = ref$.apiRoot, prototype.url = ref$.url, prototype.urlRoot = ref$.urlRoot, prototype.urlParams = ref$.urlParams;
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
    prototype.apiRoot = "/api/";
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
    prototype.urlPath = function(){
      return "forums";
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
      return "forums/";
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
window.require.register("models/message", function(exports, require, module) {
  var Model, Message;
  Model = require('./base/model');
  module.exports = Message = (function(superclass){
    var prototype = extend$((import$(Message, superclass).displayName = 'Message', Message), superclass).prototype, constructor = Message;
    prototype.urlPath = function(){
      throw new Error("should not reach");
    };
    function Message(){
      Message.superclass.apply(this, arguments);
    }
    return Message;
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
    prototype.urlPath = function(){
      return "topics/";
    };
    /*
     * demo on how to have "nested models"
     * (in less that 54k lines of code /troll)
     * you need nested JSON, like that (here) :
     * {"title": "Hey mate!", "forum": {"id": 1, "name": "Mah forum"}}
    parse: ->
      # you need to return the root + other stuff
      Forum = require 'models/forum'
      forum = new Forum ^^it.forum
      it <<< {forum}
     */;
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
window.require.register("models/user", function(exports, require, module) {
  var Model, User;
  Model = require('./base/model');
  module.exports = User = (function(){
    User.displayName = 'User';
    var prototype = User.prototype, constructor = User;
    function User(){}
    return User;
  }());
});
window.require.register("routes", function(exports, require, module) {
  module.exports = function(m){
    m('', 'home#index');
    m('forums/', 'forum#index');
    m('forum/:id', 'forum#show');
    m('topic/:id', 'topic#show');
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
      if (this.model) {
        return this.stickit();
      }
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
  var CollectionView, ForumItemView, template, ForumIndexView;
  CollectionView = require('views/base/collection-view');
  ForumItemView = require('./item-view');
  template = require('./templates/index');
  module.exports = ForumIndexView = (function(superclass){
    var prototype = extend$((import$(ForumIndexView, superclass).displayName = 'ForumIndexView', ForumIndexView), superclass).prototype, constructor = ForumIndexView;
    prototype.template = template;
    prototype.className = 'home-page';
    prototype.container = '#page-container';
    prototype.listSelector = '.forum-list';
    prototype.itemView = ForumItemView;
    prototype.autoRender = true;
    function ForumIndexView(){
      ForumIndexView.superclass.apply(this, arguments);
    }
    return ForumIndexView;
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
  var View, template, ForumItemView;
  View = require('views/base/view');
  template = require('./templates/item');
  module.exports = ForumItemView = (function(superclass){
    var prototype = extend$((import$(ForumItemView, superclass).displayName = 'ForumItemView', ForumItemView), superclass).prototype, constructor = ForumItemView;
    prototype.template = template;
    prototype.tagName = 'li';
    prototype.autoRender = true;
    prototype.bindings = {
      '.name': {
        observe: 'name',
        onGet: 'formatName'
      }
    };
    prototype.formatName = jade.helpers.titleize;
    function ForumItemView(){
      ForumItemView.superclass.apply(this, arguments);
    }
    return ForumItemView;
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
  var Collection, Topic, View, TopicListView, template, TopicFormNewView, ForumShowView;
  Collection = require('models/base/collection');
  Topic = require('models/topic');
  View = require('views/base/view');
  TopicListView = require('views/topics/list-view');
  template = require('./templates/show');
  TopicFormNewView = require('views/topics/form-new-view');
  module.exports = ForumShowView = (function(superclass){
    var prototype = extend$((import$(ForumShowView, superclass).displayName = 'ForumShowView', ForumShowView), superclass).prototype, constructor = ForumShowView;
    prototype.template = template;
    prototype.container = '#page-container';
    prototype.className = 'container';
    prototype.autoRender = true;
    prototype.bindings = {
      '#name': {
        observe: 'name',
        onGet: 'formatName'
      }
    };
    prototype.events = {
      'click .new-topic': 'showTopicForm'
    };
    prototype.formatName = jade.helpers.titleize;
    prototype.render = function(){
      superclass.prototype.render.apply(this, arguments);
      this.topics = new Collection(null, {
        model: Topic,
        url: this.model.url('/topics')
      });
      this.topics.fetch();
      this.subview('topics', new TopicListView({
        collection: this.topics,
        container: this.$('#topics')
      }));
      return this.createNewTopicView();
    };
    prototype.createNewTopicView = function(){
      var topic, x$, formView;
      topic = new Topic({
        forum: this.model
      });
      x$ = this.$('.new-topic-form-container');
      x$.hide();
      formView = new TopicFormNewView({
        model: topic,
        container: x$
      });
      this.subview('new-topic-form', formView);
    };
    prototype.showTopicForm = function(){
      this.$('.new-topic-form-container').show();
      this.$('.new-topic').hide();
    };
    function ForumShowView(){
      ForumShowView.superclass.apply(this, arguments);
    }
    return ForumShowView;
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
  buf.push('<h2 id="name"></h2><div class="new-topic-form-container"></div><a href="#" class="new-topic">New Topic</a><div id="topics"></div>');
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
window.require.register("views/messages/item-view", function(exports, require, module) {
  var View, template, ForumItemView;
  View = require('views/base/view');
  template = require('./templates/item');
  module.exports = ForumItemView = (function(superclass){
    var prototype = extend$((import$(ForumItemView, superclass).displayName = 'ForumItemView', ForumItemView), superclass).prototype, constructor = ForumItemView;
    prototype.template = template;
    prototype.tagName = 'div';
    prototype.autoRender = 'true';
    prototype.bindings = {
      '.author-link': {
        observe: 'author',
        updateMethod: 'html',
        onGet: function(arg$){
          var id, name;
          id = arg$.id, name = arg$.name;
          return "<a href='/user/" + id + "'>" + name + "</a>";
        }
      },
      '.content': 'content'
    };
    function ForumItemView(){
      ForumItemView.superclass.apply(this, arguments);
    }
    return ForumItemView;
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
window.require.register("views/messages/list-view", function(exports, require, module) {
  var CollectionView, itemView, template, MessageListView;
  CollectionView = require('views/base/collection-view');
  itemView = require('./item-view');
  template = require('./templates/list');
  module.exports = MessageListView = (function(superclass){
    var prototype = extend$((import$(MessageListView, superclass).displayName = 'MessageListView', MessageListView), superclass).prototype, constructor = MessageListView;
    prototype.template = template;
    prototype.itemView = itemView;
    prototype.listSelector = '.message-list';
    function MessageListView(){
      MessageListView.superclass.apply(this, arguments);
    }
    return MessageListView;
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
window.require.register("views/messages/templates/item", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div class="legend"><span class="author-link"></span></div><div class="outer"><p class="fieldset content"></p></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/messages/templates/list", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h4>Messages</h4><div class="message-list"></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/shared/header-view", function(exports, require, module) {
  var view, header, userNavView, HeaderView;
  view = require('views/base/view');
  header = require('./templates/header');
  userNavView = require('./user-nav-view');
  module.exports = HeaderView = (function(superclass){
    var prototype = extend$((import$(HeaderView, superclass).displayName = 'HeaderView', HeaderView), superclass).prototype, constructor = HeaderView;
    prototype.autoRender = true;
    prototype.className = 'header';
    prototype.container = '#header-container';
    prototype.id = 'header';
    prototype.tagName = 'header';
    prototype.template = header;
    prototype.render = function(){
      superclass.prototype.render.call(this);
      return this.subview('user-nav', new userNavView({
        container: this.$('#user-nav-container')
      }));
    };
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
window.require.register("views/shared/templates/header", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="user-nav-container"></div><ul><li><a href="/">Index</a></li><li><a href="/forums/">Forums</a></li></ul>');
  }
  return buf.join("");
  };
});
window.require.register("views/shared/templates/user-nav", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  if ( currentUser())
  {
  buf.push('<p>You\'re logged in as ' + escape((interp = currentUser().username) == null ? '' : interp) + '. </p>');
  if ( isAdmin())
  {
  buf.push('<span>You\'re an admin.</span>');
  }
  }
  else
  {
  buf.push('<p>You\'re logged off. <a href="/login">Login in</a>');
  var __val__ = " or "
  buf.push(escape(null == __val__ ? "" : __val__));
  buf.push('<a href="/register">Register</a>.</p>');
  }
  }
  return buf.join("");
  };
});
window.require.register("views/shared/user-nav-view", function(exports, require, module) {
  var view, userNav, UserNav;
  view = require('views/base/view');
  userNav = require('./templates/user-nav');
  module.exports = UserNav = (function(superclass){
    var prototype = extend$((import$(UserNav, superclass).displayName = 'UserNav', UserNav), superclass).prototype, constructor = UserNav;
    prototype.autoRender = true;
    prototype.className = 'user-nav';
    prototype.id = 'user-nav';
    prototype.template = userNav;
    function UserNav(){
      UserNav.superclass.apply(this, arguments);
    }
    return UserNav;
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
window.require.register("views/topics/form-new-view", function(exports, require, module) {
  var View, template, TopicFormNewView;
  View = require('views/base/view');
  template = require('./templates/form-new');
  module.exports = TopicFormNewView = (function(superclass){
    var prototype = extend$((import$(TopicFormNewView, superclass).displayName = 'TopicFormNewView', TopicFormNewView), superclass).prototype, constructor = TopicFormNewView;
    prototype.template = template;
    prototype.autoRender = true;
    function TopicFormNewView(){
      TopicFormNewView.superclass.apply(this, arguments);
    }
    return TopicFormNewView;
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
window.require.register("views/topics/item-view", function(exports, require, module) {
  var View, template, TopicItemView;
  View = require('views/base/view');
  template = require('./templates/item');
  module.exports = TopicItemView = (function(superclass){
    var prototype = extend$((import$(TopicItemView, superclass).displayName = 'TopicItemView', TopicItemView), superclass).prototype, constructor = TopicItemView;
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
      var toggler;
      this.savedTitle = (toggler = this.$('.toggle-edit-title')).is(':visible') ? this.model.get('title') : void 8;
      toggler.toggle();
      this.$('a.title').toggle();
      this.$('.edit-title').toggle();
      return false;
    };
    prototype.keyupEditTitle = function(arg$){
      var keyCode, ref$;
      keyCode = arg$.keyCode;
      switch (keyCode) {
      case 27:
        if (!this.savedTitle) {
          return;
        }
        this.model.set('title', (ref$ = this.savedTitle, delete this.savedTitle, ref$));
        // fallthrough
      case 13:
        this.toggleEditTitle();
      }
    };
    function TopicItemView(){
      TopicItemView.superclass.apply(this, arguments);
    }
    return TopicItemView;
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
  var CollectionView, itemView, template, TopicListView;
  CollectionView = require('views/base/collection-view');
  itemView = require('./item-view');
  template = require('./templates/list');
  module.exports = TopicListView = (function(superclass){
    var prototype = extend$((import$(TopicListView, superclass).displayName = 'TopicListView', TopicListView), superclass).prototype, constructor = TopicListView;
    prototype.template = template;
    prototype.itemView = itemView;
    prototype.listSelector = '.topic-list';
    function TopicListView(){
      TopicListView.superclass.apply(this, arguments);
    }
    return TopicListView;
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
window.require.register("views/topics/show-view", function(exports, require, module) {
  var Collection, Message, View, template, MessageListView, TopicShowView;
  Collection = require('models/base/collection');
  Message = require('models/message');
  View = require('views/base/view');
  template = require('./templates/show');
  MessageListView = require('views/messages/list-view');
  module.exports = TopicShowView = (function(superclass){
    var prototype = extend$((import$(TopicShowView, superclass).displayName = 'TopicShowView', TopicShowView), superclass).prototype, constructor = TopicShowView;
    prototype.template = template;
    prototype.container = '#page-container';
    prototype.className = 'container';
    prototype.autoRender = true;
    prototype.bindings = {
      '#title': 'title'
    };
    prototype.render = function(){
      superclass.prototype.render.apply(this, arguments);
      this.messages = new Collection(null, {
        model: Message,
        url: this.model.url('/messages')
      });
      this.messages.fetch();
      this.subview('messages', new MessageListView({
        collection: this.messages,
        container: this.$('#messages')
      }));
    };
    function TopicShowView(){
      TopicShowView.superclass.apply(this, arguments);
    }
    return TopicShowView;
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
window.require.register("views/topics/templates/form-new", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<form><fieldset><legend>New Topic</legend><label for="title">Title</label><br/><input name="title"/><br/><br/><label for="content">Content</label><br/><textarea name="content">Blah blah</textarea><br/><br/><input type="submit"/></fieldset></form>');
  }
  return buf.join("");
  };
});
window.require.register("views/topics/templates/item", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<li><a');
  buf.push(attrs({ 'href':("/topic/" + (id) + ""), "class": ('title') }, {"href":true}));
  buf.push('></a>');
  if ( isAdmin())
  {
  buf.push('<input class="eip edit-title"/><span class="toggle-edit-title">✔</span><span class="lock-state">&nbsp;(locked)</span>&nbsp;&bull; <input type="checkbox" title="lock" class="lock-toggle"/>');
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
window.require.register("views/topics/templates/show", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h1 id="title"></h1><div id="messages"></div>');
  }
  return buf.join("");
  };
});
