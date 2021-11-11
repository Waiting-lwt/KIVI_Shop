// 引入vue框架
import Vue from 'vue'
// 引入路由依赖
import VueRouter from 'vue-router'
// 引入页面组件
import home from '@/components/home'
import login from '@/components/user/login'
import register from '@/components/user/register'
import cart from '@/components/user/cart'
import seller from '@/components/user/seller'
import buyer from '@/components/user/buyer'
import detail from '@/components/good/detail'
import goodDict from '@/components/user/seller/goodDict'
import goodEdit from '@/components/user/seller/goodEdit'
import orderLog from '@/components/user/seller/orderLog'
import browseLog from '@/components/user/seller/browseLog'
import sellState from '@/components/user/seller/sellState'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/user/login',
      name: 'user_login',
      component: login
    },
    {
      path: '/user/register',
      name: 'user_register',
      component: register
    },
    {
      path: '/user/cart',
      name: 'user_cart',
      component: cart
    },
    {
      path: '/user/buyer',
      name: 'user_buyer',
      component: buyer
    },
    {
      path: '/user/seller',
      name: 'user_seller',
      component: seller,
      children: [
        {
          path: '/user/seller/goodDict',
          name: 'user_seller_goodDict',
          component: goodDict
        },
        {
          path: '/user/seller/goodEdit',
          name: 'user_seller_goodEdit',
          component: goodEdit
        },
        {
          path: '/user/seller/orderLog',
          name: 'user_seller_orderLog',
          component: orderLog
        },
        {
          path: '/user/seller/browseLog',
          name: 'user_seller_browseLog',
          component: browseLog
        },
        {
          path: '/user/seller/sellState',
          name: 'user_seller_sellState',
          component: sellState
        }
      ]
    },
    {
      path: '/good/detail',
      name: 'good_detail',
      component: detail
    }
  ]
})
