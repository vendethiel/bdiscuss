module.exports = class SomeStylesheetCompiler
  brunchPlugin: yes
  type: 'stylesheet'
  extension: 'css'

  (config) -> @files = config.plugins.stylesheets

  compile: (data, path, callback) ->
    try
      path.=replace /\\/g '/' #'
      callback null, if path in @files
        data
      else null
    catch
      callback e