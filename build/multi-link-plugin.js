function MultiLinkPlugin(options) {
  this.options = options
}

MultiLinkPlugin.prototype.apply = function(compiler) {
  let pages = this.options ? this.options.pages : null
  let fileName = this.options ? this.options.fileName : null
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-html-processing', function(
      htmlPluginData,
      callback
    ) {
      let currentPage = htmlPluginData.plugin.childCompilationOutputName
      if (pages && fileName && currentPage === fileName) {
        let splits = htmlPluginData.html.split('{pageList}')
        let links = '<body><ul>'
        for (const key in pages) {
          links += '<li><a href=' + pages[key] + '>' + key + '</a></li>'
        }
        htmlPluginData.html = splits[0] + links + '</ul>' + splits[1]
      }
      callback(null, htmlPluginData)
    })
  })
}
module.exports = MultiLinkPlugin
