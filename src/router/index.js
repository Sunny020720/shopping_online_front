import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import Store from '@/store'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList },
    // 动态传参商品id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 需要鉴权的页面
const authUrls = ['/pay', 'myorder']
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Store.getters.token
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else { // 未登录 跳转到登录页
    next('/login')
  }
})
export default router
