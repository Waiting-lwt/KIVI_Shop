// 引入vue框架
import Vue from 'vue'
// 引入路由依赖
import VueRouter from 'vue-router'
// 引入页面组件
import home from '@/pages/home'
import login from '@/pages/user/login'
import register from '@/pages/user/register'
import cart from '@/pages/user/cart'
import seller from '@/pages/user/seller'
import buyer from '@/pages/user/buyer'
import goodDetail from '@/pages/good/detail'
import goodEdit from '@/pages/good/edit'
import goodAdd from '@/pages/good/add'
import goodDict from '@/pages/user/seller/goodDict'
import sellerOrderLog from '@/pages/user/seller/orderLog'
import sellerBrowseLog from '@/pages/user/seller/browseLog'
import sellReport from '@/pages/user/seller/sellReport'
import buyerOrderLog from '@/pages/user/buyer/orderLog'
import buyerBrowseLog from '@/pages/user/buyer/browseLog'
import {Toast} from '@/components/Tips/tipsUtil'

// 路由
Vue.use(VueRouter)

// 消息提示框
Vue.use(Toast)

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
      component: buyer,
      children: [
        {
          path: '/user/buyer/orderLog',
          name: 'user_buyer_orderLog',
          component: buyerOrderLog
        },
        {
          path: '/user/buyer/browseLog',
          name: 'user_buyer_browseLog',
          component: buyerBrowseLog
        }
      ]
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
          path: '/user/seller/orderLog',
          name: 'user_seller_orderLog',
          component: sellerOrderLog
        },
        {
          path: '/user/seller/browseLog',
          name: 'user_seller_browseLog',
          component: sellerBrowseLog
        },
        {
          path: '/user/seller/sellReport',
          name: 'user_seller_sellReport',
          component: sellReport
        }
      ]
    },
    {
      path: '/good/detail',
      name: 'good_detail',
      component: goodDetail
    },
    {
      path: '/good/edit',
      name: 'good_edit',
      component: goodEdit
    },
    {
      path: '/good/add',
      name: 'good_add',
      component: goodAdd
    }
  ]
})
