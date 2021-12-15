<template>
  <div id="app">
    <div class="navbar">
      <div class="navbar-link">
        <router-link class="home-link" to="/">KIVI</router-link>
        <!-- <a class="home-link" href="/">KIVI</a> -->
        <div class="nav-links">
          <template v-if="(!userName||!userType)">
            <div class="nav-item">
              <router-link class="nav-link" to="/user/login">你好，请登录</router-link>
              <!-- <a class="nav-link" href="/user/login">你好，请登录</a> -->
            </div>
            <div class="nav-item">
              <router-link class="nav-link" to="/user/register">前往注册</router-link>
              <!-- <a class="nav-link" href="/user/register">前往注册</a> -->
            </div>
          </template>
          <template v-if="userType==1">
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
          <template v-if="userType==2">
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
      userFloatSeen: false,
      userName: window.sessionStorage.getItem('userName'),
      userType: window.sessionStorage.getItem('userType')
    }
  },
  computed: {
    // userName () {
    //   console.log(window.sessionStorage.getItem('userName'))
    //   return window.sessionStorage.getItem('userName')
    // },
    // userType () {
    //   console.log(window.sessionStorage.getItem('userType'))
    //   return Number(window.sessionStorage.getItem('userType'))
    // }
  },
  methods: {
    showUserFloat () {
      this.userFloatSeen = true
    },
    hideUserFloat () {
      this.userFloatSeen = false
    },
    deleteUser () {
      window.sessionStorage.clear()
      var strCookie = document.cookie
      var arrCookie = strCookie.split('; ') // 将多cookie切割为多个名/值对
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (arr.length > 0) {
          // DelCookie(arr[0])
          var d = new Date()
          d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000))
          var expires = 'expires=' + d.toUTCString()
          document.cookie = arr[0] + '=' + '' + '; ' + expires
        }
      }
      this.userFloatSeen = false
    }
  },
  filters: {
  },
  beforeCreate () {
    var strcookie = document.cookie // 获取cookie字符串
    var arrcookie = strcookie.split('; ') // 分割
    // 遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split('=')
      if (arr[0]) {
        window.sessionStorage.setItem(arr[0], arr[1])
      }
    }
  },
  create () {
  },
  mounted () {
  },
  // 当数据更新时，会调用beforeUpdate 和updated钩子函数；上面四个不再运行
  beforeUpdate () {
    // 更新数据之前执行
  },
  updated () {
    this.userName = window.sessionStorage.getItem('userName')
    this.userType = window.sessionStorage.getItem('userType')
    console.log(this.userName)
    // 数据更新，虚拟的DOM更新，然后更新真实的DOM；最后触发这个函数
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
