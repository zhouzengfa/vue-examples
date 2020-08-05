import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../components/User'
import Students from '../components/Students'
import Home from '../components/Home'
import UserAdd from '../components/UserAdd'
import UserModify from '../components/UserModify'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/user', name: 'user', component: User },
  {
    path: '/student',
    name: 'student',
    component: Students,
    children: [
      { path: 'add', component: UserAdd },
      { path: 'modify', component: UserModify }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
