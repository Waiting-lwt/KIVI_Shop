<template>
  <div id="buyer">
    <div class="nav-left">
      <a class="nav-left-item" href="/user/buyer/browseLog">
        浏览日志
      </a>
      <a class="nav-left-item" href="/user/buyer/orderLog">
        购买日志
      </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  // 1. 在这个钩子函数执行之前初始化事件以及生命周期
  beforeCreate () {},
  // 给Vue的实例注入数据，进行数据监听
  created () {},
  methods: {
    getSellerGoods () {

    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
  },
  // 挂载完毕
  mounted () {
  },
  // 当数据更新时，会调用beforeUpdate 和updated钩子函数；上面四个不再运行
  beforeUpdate () {
    // 更新数据之前执行
    if (window.sessionStorage.getItem('userType') === '1') {
      this.$router.push({
        name: `user_buyer_browseLog`
      })
    } else {
      alert(window.sessionStorage.getItem('userType'), '出错啦！')
    }
  },
  updated () {
    // 数据更新，虚拟的DOM更新，然后更新真实的DOM；最后触发这个函数
  },
  beforeDestroy () {
    // 销毁之前
    // 清除定时器
  },
  destroyed () {
    // 销毁子组件，销毁观察者，事件监听者
    // 元素的事件还在，但是更改数据不会再让视图进行更新了；
  }
}
</script>

<style scoped>
#buyer{
  width: 100%;
}
.nav-left{
  position: fixed;
  z-index: 20;
  left: 0;
  top: 6rem;
  margin: 0rem 3rem 3rem 3rem;
  padding: 0 1rem 1rem 1rem;
  width: 10rem;
  height: 35rem;
  border: 1px solid #5c6a77;
  border-radius: .2rem;
  color: #2c3e50;
  background-color: white;
  opacity: 0.9;
}
.nav-left-item{
  position: relative;
  display: block;
  height: 4rem;
  width: 100%;
  line-height: 5rem;
  text-align: center;
  border-bottom: 2px solid #5c6a77;
  cursor: pointer;
  color: #2c3e50;
  text-decoration: none;
}
</style>
