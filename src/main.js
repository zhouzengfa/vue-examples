import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import {
  Aside,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Dialog,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Pagination,
  Row,
  Submenu,
  Switch,
  Table,
  TableColumn,
  Tooltip,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps, Step, Checkbox, CheckboxGroup, Upload, Timeline, TimelineItem
} from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { Message, MessageBox } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Message)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(VueQuillEditor)
Vue.use(Timeline)
Vue.use(TimelineItem)

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 开始进度条
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  // 结束进度条
  NProgress.done()
  return config
})

Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.filter('dateFormat', function (date) {
  const dt = new Date(date * 1000)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
