<template>
  <div id="login">
    <div class="title">账户登录</div>
    <div class="input-item">
      <span class="input-text">账号</span>
      <input type="text" v-model="name" class="input-block">
    </div>
    <div class="input-item">
      <span class="input-text">密码</span>
      <input type="password" v-model="password" class="input-block">
    </div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.name === '') {
        alert('请输入账号名')
        return 0
      }
      if (this.password === '') {
        alert('请输入密码')
        return 0
      }
      let data = {
        params: {
          userName: this.name,
          userPassword: this.password
        },
        method: 'GET',
        url: '/user/getUser'
      }
      this.$request(data).then(res => {
        console.log(res)
        if (!res.data) {
          alert('该用户不存在！')
          this.name = ''
          return
        } else if (res.data.userId === -1) {
          alert('密码错误！')
          this.password = ''
          return
        }
        alert('成功登录！')
        this.name = ''
        this.password = ''
        window.sessionStorage.setItem('userId', Number(res.data.userId))
        window.sessionStorage.setItem('userType', Number(res.data.userType))
        this.$router.push({
          name: `home`
        })
      }).catch(_err => {
        console.log(_err)
      })
    }
  }
}
</script>

<style scoped>
#login{
  margin: 4rem ;
}
.title {
  margin: 0 auto 4rem auto;
  text-align: center;
  font-size: 1.3rem;
}
.input-item {
  width: 20rem;
  margin: 2rem auto;
  text-align: center;
}
.input-text {
  padding-right: 0.5rem;
}
input {
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
</style>
