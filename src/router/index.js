import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
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
