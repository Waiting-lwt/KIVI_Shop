<template>
  <div id="app">
    <div class="navbar">
      <a class="home-link" href="/">KIVI</a>
      <div class="nav-links">
        <div class="nav-item" v-if="!hasLogin()">
          <a class="nav-link" href="/user/login/">你好，请登录</a>
          <a class="nav-link" href="/user/register">前往注册</a>
        </div>
        <div class="nav-item" v-if="hasLogin()==1">
          <a class="nav-link" href="/user/buyer/">用户中心</a>
          <a class="nav-link" href="/user/login/">切换用户</a>
        </div>
        <div class="nav-item" v-if="hasLogin()==2">
          <a class="nav-link" href="/user/seller/">商户中心</a>
          <a class="nav-link" href="/user/login/">切换用户</a>
        </div>
        <div class="nav-item">
          <a class="nav-link" href="/user/cart">购物车</a>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import seller from '@/components/user/seller'
export default {
  name: 'App',
  components: {
    'seller': seller
  },
  data () {
    return {
    }
  },
  methods: {
    hasLogin () {
      if (window.sessionStorage.getItem('userId')) {
        if (window.sessionStorage.getItem('userType')) {
          return window.sessionStorage.getItem('userType')
        }
        return 0
      }
      return 0
    }
  },
  filters: {
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  letter-spacing: 0.04rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue";
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
}
.navbar{
  z-index: 10;
  right: 0;
  height: 3.6rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
}
.home-link {
  display: inline-block;
  position: relative;
  padding: 0.6rem;
  top: 0.6rem;
  left: 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 1.5rem;
  color: #2c3e50;
  text-decoration: none;
}
.nav-link{
  color: #2c3e50;
  padding: 0.6rem;
  text-decoration: none;
}
.nav-links{
  display: inline-block;
  position: absolute;
  padding: 0.6rem;
  top: 0.6rem;
  right: 3rem;
  /* left: 20rem; */
  height: 1rem;
  font-size: .9rem;
  line-height: 1rem;
  text-align: center;
}
.nav-item{
  display: inline-block;
  color: #2c3e50;
  text-decoration: none;
}
</style>
