<template>
  <div id="register">
    <div class="title">账户注册</div>
    <div class="input-item">
      <span class="input-text">账号</span>
      <input type="text" v-model="name" class="input-block">
    </div>
    <div class="input-item">
      <span class="input-text">邮箱</span>
      <input type="text" v-model="email" class="input-block" v-on:input="emailCheck()">
      <div class="warning-email" v-if="!emailTrue">
        输入邮箱格式不正确
      </div>
    </div>
    <div class="input-item">
      <span class="input-text">密码</span>
      <input type="password" v-model="password" class="input-block">
    </div>
    <div class="input-item">
      <span class="input-text">确认密码</span>
      <input type="password" v-model="password2" class="input-block">
    </div>
    <button @click="register">注册</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      emailCheck: this.emailCheckFD(),
      emailTrue: true
    }
  },
  computed: {
  },
  methods: {
    emailCheckFD () {
      var regEmail = /^(\w+)+(\.\w+)*@(\w)+(\.\w+)/
      var timer = null
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log(this.email, regEmail.test(this.email))
          this.emailTrue = regEmail.test(this.email)
        }, 1000)
      }
    },
    register () {
      if (this.name === '') {
        alert('请输入账号名')
        return 0
      }
      if (this.password === '') {
        alert('请输入密码')
        return 0
      }
      if (this.email === '') {
        alert('请输入邮箱')
        return 0
      }
      if (this.password === '') {
        alert('请确认密码')
        return 0
      }
      if (this.password !== this.password2) {
        alert('密码不一致')
        this.password2 = ''
        return 0
      }

      let dataJson = {
        userName: this.name,
        userEmail: this.email,
        userPassword: this.$Base64.encode(this.password)
      }
      var data = {
        method: 'POST',
        dataType: 'json',
        url: '/user/addUser',
        data: dataJson
      }
      this.$request(data).then(res => {
        console.log(res)
        if (res.data === -1) {
          alert('该用户名已存在！')
          this.name = ''
          this.password = ''
          this.password2 = ''
        } else if (res.data.userId === 0) {
          alert('数据库错误！')
          this.name = ''
          this.password = ''
          this.password2 = ''
        } else {
          alert('成功注册！')
          this.name = ''
          this.email = ''
          this.password = ''
          this.password2 = ''

          var strcookie = document.cookie // 获取cookie字符串
          var arrcookie = strcookie.split('; ') // 分割
          // 遍历匹配
          for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split('=')
            window.sessionStorage.setItem(arr[0], arr[1])
          }
          this.$router.replace({
            path: '/'
          })
        }
      }).catch(_err => {
        console.log(_err)
      })
    }
  }
}
</script>

<style scoped>
#register{
  margin: 4rem ;
}
.title {
  margin: 0 auto 4rem auto;
  text-align: center;
  font-size: 1.3rem;
}
.input-item {
  width: 21rem;
  margin: 2rem auto;
  text-align: center;
  position: relative;
}
.input-text {
  padding-right: 0.5rem;
}
input {
  right: 0;
  margin: 0 auto;
  height: 2rem;
  width: 15rem;
  border: 1px solid rgb(204, 204, 204);
  padding-left: 0.2rem;
}
button {
  display: block;
  height: 2.5rem;
  width: 18rem;
  margin: 5rem auto;
  border: 1px solid rgb(204, 204, 204);
  background-color: #435a72;
  color: aliceblue;
  padding-left: 0.2rem;
}
.warning-email{
  position: absolute;
  top: 2.4rem;
  left: 4.2rem;
  text-align: center;
  color: rgb(255, 91, 91);
  font-size: 0.5rem;
  border: 1px solid rgb(255, 76, 76);
  background-color: rgb(255, 232, 232);
  padding: 0.1rem;
}
</style>
