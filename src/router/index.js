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
import goodDetail from '@/components/good/detail'
import goodEdit from '@/components/good/edit'
import goodAdd from '@/components/good/add'
import goodDict from '@/components/user/seller/goodDict'
import sellerOrderLog from '@/components/user/seller/orderLog'
import sellerBrowseLog from '@/components/user/seller/browseLog'
import sellReport from '@/components/user/seller/sellReport'
import buyerOrderLog from '@/components/user/buyer/orderLog'
import buyerBrowseLog from '@/components/user/buyer/browseLog'

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
