module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-pro.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'vue-quill-editor': 'VueQuillEditor',
        echarts: 'echarts'
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'vue-quill-editor': 'VueQuillEditor',
        echarts: 'echarts'
      })
    })
  }
}
