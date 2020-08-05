import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login }
  // {
  //   path: '/student',
  //   name: 'student',
  //   component: Students,
  //   children: [
  //     { path: 'add', component: UserAdd },
  //     { path: 'modify', component: UserModify }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router