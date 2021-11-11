<template>
  <div id="sellState">
    <div class="title">
      <div class="title-goodInfo">商品信息</div>
      <div class="title-userInfo">买家</div>
      <div class="title-orderTime">交易时间</div>
      <div class="title-orderPrice">单价</div>
      <div class="title-orderNum">数量</div>
      <div class="title-orderPrice">金额</div>
    </div>

    <div class="cart-list">
      <div class="cart-item" v-for="(item, index) in ordersList" :key="index">
        <div class="item-img" @click="toGoodDetail(item.userOrder.goodId)">
          <img class="item-pic" mode="scaleToFill" :src="item.userOrder.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-name" @click="toGoodDetail(item.userOrder.goodId)">{{item.userOrder.goodName}}</div>
          <div class="item-userInfo" @click="toBuyer(item.buyerId)">{{item.buyerName}}</div>
          <div class="item-orderTime">{{$formatDate(item.orderTime)}}</div>
          <div class="item-price">￥ {{item.userOrder.goodPrice}}</div>
          <div class="item-orderNum">{{item.userOrder.goodNum}}</div>
          <div class="item-prices">￥ {{item.userOrder.goodPrice*item.userOrder.goodNum}}</div>
        </div>
      </div>

      <div class="buttom-block">
      <div class="buttom-block-empty">
      </div>
      <div class="buttom-block-right">
          <span>商品</span>
          <span style="color: #a80024;font-size:600;">
            {{ordersList.length}}
          </span>
          <span>件</span>
      </div>
      <div class="buttom-block-right">
          <span>合计</span>
          <span style="color: #a80024;font-size:600;">
            {{totalPrice()}}
          </span>
          <span>元</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: 0,
      ordersList: []
    }
  },
  // 1. 在这个钩子函数执行之前初始化事件以及生命周期
  beforeCreate () {
  },
  // 给Vue的实例注入数据，进行数据监听
  created () {
  },
  methods: {
    getSellerOrder () {
      let data = {
        method: 'GET',
        url: '/user/getSellerOrder',
        params: {
          sellerId: this.userId
        }
      }
      this.$request(data).then(res => {
        this.ordersList = res.data
        console.log(this.ordersList)
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
    toBuyer (buyerId) {
      this.$router.push({
        name: `user_buyer`,
        params: {
          goodId: buyerId
        }
      })
    },
    totalPrice () {
      var totalPrice = 0
      this.ordersList.forEach(function (item) {
        totalPrice += item.userOrder.goodPrice * item.userOrder.goodNum
      })
      return totalPrice
    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
  },
  // 挂载完毕
  mounted () {
    if (!window.sessionStorage.getItem('userId')) {
      this.$router.push({
        name: `user_login`
      })
    } else {
      this.userId = window.sessionStorage.getItem('userId')
      console.log(this.userId)
    }
    this.getSellerOrder()
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

<style>
#sellState{
  z-index: 15;
  margin: 2rem 0 0 15rem;
  width: 1080px
}
.title{
  display: flex;
  width: 60rem;
  height: 3rem;
  line-height: 3rem;
  margin: 2rem auto .5rem auto;
  border-bottom: 2px solid #6c8299;
  text-align: center;
}
.title-goodInfo{
  width: 20rem;
}
.title-userInfo{
  width: 8rem;
}
.title-orderTime{
  width: 8rem;
}
.title-orderNum{
  width: 5rem;
}
.title-orderPrice{
  width: 8rem;
}

.cart-list{
  width: 60rem;
  margin: .5rem auto 0rem auto;
}
.cart-item {
  display: flex;
  margin: 1rem 0rem 1rem 0;
  padding: 1rem 1rem 1rem 1rem;
  width: 58rem;
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
  width: 12.0rem;
  text-align: left;
  cursor: pointer;
}
.item-userInfo{
  width: 8.0rem;
  font-size: .8rem;
  text-align: center;
  cursor: pointer;
}
.item-price{
  width: 8rem;
  font-size: .8rem;
  font-weight: 600;
}
.item-orderNum{
  width: 5rem;
}
.item-orderTime{
  width: 8rem;
}
.item-prices{
  width: 8rem;
  font-size: .8rem;
  font-weight: 600;
  color: #a80024;
}
.buttom-block{
  position: fixed;
  display: flex;
  bottom: 0;
  height: 3rem;
  line-height: 3rem;
  width: 60rem;
  background-color: #98aabd;
  border: 1px solid #b9bbbe;
  color: #ffffff;
}
.buttom-block-left{
  width: 10rem;
  text-align: center;
}
.buttom-block-empty{
  width: 35rem;
}
.buttom-block-right{
  width: 9rem;
  text-align: right;
  padding-right: 1rem;
}
.buttom-block-pay{
  width: 10rem;
  text-align: center;
  height: 3rem;
  background-color: #ad495f;
}
</style>
