import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cat from '../components/goods/Cat'
import Params from '../components/goods/Params'
import List from '../components/goods/List'
import Add from '../components/goods/Add'
import Orders from '../components/goods/Oreders'
import Report from '../components/goods/Report'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/add', component: Add },
      { path: '/categories', component: Cat },
      { path: '/reports', component: Report },
      { path: '/orders', component: Orders }
    ]
  }
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

// 路由守卫规则
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { return next() }

  const token = window.sessionStorage.getItem('token')
  if (!token) { return next('/login') }

  next()
})

export default router
