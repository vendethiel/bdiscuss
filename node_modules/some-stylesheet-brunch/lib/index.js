(function(){
  var SomeStylesheetCompiler;
  module.exports = SomeStylesheetCompiler = (function(){
    SomeStylesheetCompiler.displayName = 'SomeStylesheetCompiler';
    var prototype = SomeStylesheetCompiler.prototype, constructor = SomeStylesheetCompiler;
    prototype.brunchPlugin = true;
    prototype.type = 'stylesheet';
    prototype.extension = 'css';
    function SomeStylesheetCompiler(config){
      this.files = config.plugins.stylesheets;
    }
    prototype.compile = function(data, path, callback){
      var e;
      try {
        path = path.replace(/\\/g, '/');
        return callback(null, in$(path, this.files) ? data : null);
      } catch (e$) {
        e = e$;
        return callback(e);
      }
    };
    return SomeStylesheetCompiler;
  }());
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
}).call(this);
