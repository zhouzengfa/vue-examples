import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import { Aside, Button, Container, Form, FormItem, Header, Input, Main, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Message)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$axios = axios
Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
