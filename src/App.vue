<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-link">
        <router-link class="home-link" to="/">KIVI</router-link>
        <!-- <a class="home-link" href="/">KIVI</a> -->
        <div class="nav-links">
          <template v-if="!hasLogin()">
            <div class="nav-item">
              <router-link class="nav-link" to="/user/login">你好，请登录</router-link>
              <!-- <a class="nav-link" href="/user/login">你好，请登录</a> -->
            </div>
            <div class="nav-item">
              <router-link class="nav-link" to="/user/register">前往注册</router-link>
              <!-- <a class="nav-link" href="/user/register">前往注册</a> -->
            </div>
          </template>
          <template v-if="hasLogin()==1">
            <div class="nav-item">
              <router-link class="nav-link" to="/user/buyer">用户中心</router-link>
              <!-- <a class="nav-link" href="/user/buyer">用户中心</a> -->
            </div>
            <div class="nav-item"
             :class="{'hover_userFloatShow': userFloatSeen}"
              @mouseleave="hideUserFloat">
              <a class="nav-link-user"
               @mouseenter="showUserFloat"
              >{{userName}}</a>
              <div class="hover_userFloat">
                <div class="nav-link" @click="deleteUser()">注销用户</div>
              </div>
            </div>
          </template>
          <template v-if="hasLogin()==2">
            <div class="nav-item">
              <router-link class="nav-link" to="/user/seller">商户中心</router-link>
              <!-- <a class="nav-link" href="/user/seller/">商户中心</a> -->
            </div>
            <div class="nav-item"
             :class="{'hover_userFloatShow': userFloatSeen}"
              @mouseleave="hideUserFloat">
              <a class="nav-link-user"
               @mouseenter="showUserFloat"
              >{{userName}}</a>
              <div class="hover_userFloat">
                <div class="nav-link" @click="deleteUser()">注销用户</div>
              </div>
            </div>
          </template>
          <div class="nav-item">
            <router-link class="nav-link" to="/user/cart">购物车</router-link>
            <!-- <a class="nav-link" href="/user/cart">购物车</a> -->
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script scoped>
import seller from '@/components/user/seller'
export default {
  name: 'App',
  components: {
    'seller': seller
  },
  data () {
    return {
      userFloatSeen: false
    }
  },
  computed: {
    userName () {
      return window.sessionStorage.getItem('userName')
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
    },
    showUserFloat () {
      this.userFloatSeen = true
    },
    hideUserFloat () {
      this.userFloatSeen = false
    },
    deleteUser () {
      window.sessionStorage.clear()
      this.$router.push({
        path: '/'
      })
      this.userFloatSeen = false
    }
  },
  filters: {
  },
  mounted () {
    console.log(window.sessionStorage.getItem('userName'))
  }
}
</script>

<style scoped>
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
  width: 100%;
  z-index: 10;
  right: 0;
  height: 3.6rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
}
.navbar .navbar-link{
  width: 1280px;
  margin: 0 auto;
}
.navbar .navbar-link .home-link {
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
.navbar .navbar-link .nav-links .nav-item .nav-link{
  color: #2c3e50;
  text-decoration: none;
  cursor: pointer;
}
.navbar .navbar-link .nav-links .nav-item .nav-link-user{
  color: #2c3e50;
  padding: 0.6rem;
  text-decoration: none;
  cursor: pointer;
}
.navbar .navbar-link .nav-links{
  float: right;
  position: relative;
  font-size: .9rem;
  line-height: 3.5rem;
  text-align: center;
}
.navbar .navbar-link .nav-links .nav-item{
  float: left;
  width: 6rem;
  color: #2c3e50;
  text-decoration: none;
  text-align: center;
}
.navbar .navbar-link .nav-links .nav-item .hover_userFloat{
  position: absolute;
  display: none;
  margin-top: -15px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  height: 3.5rem;
  width: 5rem;
}
.navbar .navbar-link .nav-links .hover_userFloatShow .hover_userFloat{
  display: block;
}
</style>
