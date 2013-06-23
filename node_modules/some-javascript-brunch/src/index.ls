module.exports = class SomeJavaScriptCompiler
  brunchPlugin: yes
  type: 'javascript'
  extension: 'js'

  (config) -> @files = config.plugins.javascripts

  compile: !(data, path, callback) ->
    try
      path.=replace /\\/g '/' #'
      callback null, if path in @files
        data
      else null
    catch
      callback e