<template>
  <div id="browseLog">
    <div class="title">
      <div class="title-goodInfo">商品信息</div>
      <div class="title-userInfo">买家</div>
      <div class="title-browseTime">浏览时间</div>
    </div>

    <div class="cart-list">
      <div class="cart-item" v-for="(item, index) in browsesList" :key="index">
        <div class="item-img" @click="toGoodDetail(item.goodId)">
          <img class="item-pic" mode="scaleToFill" :src="item.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-name" @click="toGoodDetail(item.goodId)">{{item.goodName}}</div>
          <div class="item-userInfo" @click="toBrowser(item.browserId)">{{item.browserName}}</div>
          <div class="item-orderTime">{{$formatDate(item.browseTime)}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      browsesList: []
    }
  },
  // 1. 在这个钩子函数执行之前初始化事件以及生命周期
  beforeCreate () {
  },
  // 给Vue的实例注入数据，进行数据监听
  created () {
  },
  methods: {
    getSellerBrowse () {
      let data = {
        method: 'GET',
        url: '/user/getUserBrowsed'
      }
      this.$request(data).then(res => {
        this.browsesList = res.data
        console.log(this.browsesList)
      }).catch(_err => {
        console.log(_err)
      })
    },
    toGoodDetail (id) {
      this.$router.push({
        name: `good_detail`,
        params: {
          goodId: id
        }
      })
    },
    toBrowser (browserId) {
      this.$router.push({
        name: `user_buyer`,
        params: {
          goodId: browserId
        }
      })
    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
  },
  // 挂载完毕
  mounted () {
    if (!window.sessionStorage.getItem('userName')) {
      this.$router.push({
        name: `user_login`
      })
    } else {
      console.log(this.userName)
    }
    this.getSellerBrowse()
  },
  // 当数据更新时，会调用beforeUpdate 和updated钩子函数；上面四个不再运行
  beforeUpdate () {
    // 更新数据之前执行
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
#browseLog{
  z-index: 15;
  margin: 2rem 0 0 15rem;
  width: 1080px
}
.title{
  display: flex;
  width: 40rem;
  height: 3rem;
  line-height: 3rem;
  margin: 2rem 3rem .5rem 4rem;
  border-bottom: 2px solid #6c8299;
  text-align: center;
}
.title-goodInfo{
  width: 20rem;
}
.title-userInfo{
  width: 8rem;
}
.title-browseTime{
  width: 8rem;
}

.cart-list{
  width: 40rem;
  margin: .5rem 3rem 0rem 4rem;
}
.cart-item {
  display: flex;
  margin: 1rem 0rem 1rem 0;
  padding: 1rem 1rem 1rem 1rem;
  width: 38rem;
  height: 5rem;
  position: relative;
  border: 1px solid #b9bbbe;
}
.item-img {
  display: block;
  width: 5rem;
  height: 5rem;
  border: 1px solid #b9bbbe;
  cursor: pointer;
}
.item-pic {
  display: block;
  width: 100%;
  height: 100%;
}
.item-block{
  display: flex;
  height: 5rem;
  padding: 0rem 0rem 0rem 1.5rem;
  font-size: .5rem;
  line-height: 1.2rem;
  text-align: center;
}
.item-name{
  width: 12.5rem;
  text-align: left;
  cursor: pointer;
}
.item-userInfo{
  width: 8.0rem;
  font-size: .8rem;
  text-align: center;
  cursor: pointer;
}
.item-browseTime{
  width: 8rem;
  font-size: .8rem;
  text-align: center;
}

</style>
