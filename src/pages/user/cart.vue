<template>
  <div id="cart">

    <div class="title">
      <div class="title-goodInfo">商品信息</div>
      <div class="title-goodPrice">单价</div>
      <div class="title-goodNum">数量</div>
      <div class="title-cartPrice">金额</div>
      <div class="title-cartOp">操作</div>
    </div>

    <div class="cart-list">
      <div class="cart-item" v-for="(item, index) in cartsList" :key="index">
        <div class="item-selected" @click="select(index)">
          {{(selectedOrNot(index)>=0)?'√':''}}
        </div>
        <div class="item-img" @click="toGoodDetail(item.goodId)">
          <img class="item-pic" mode="scaleToFill" :src="item.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-name">{{item.goodName}}</div>
          <div class="item-price">￥ {{item.goodPrice}}</div>
          <div class="item-num">
            <div class="item-num-update" v-if="item.goodNum>1" @click="subToCart(item.goodId,index)">-</div>
            <div class="item-num-update" v-else>{{''}}</div>
            {{item.goodNum}}
            <div class="item-num-update" @click="addToCart(item.goodId,index)">+</div>
          </div>
          <div class="item-prices">￥ {{item.goodPrice*item.goodNum}}</div>
          <div class="item-op" @click="deleteCart(item.goodId)">
            <div>删除</div>
          </div>
        </div>
      </div>

      <div class="buttom-block">
      <div class="buttom-block-left">
        <span style="cursor: pointer;" @click="selectAll()">
          全选</span>
      </div>
      <div class="buttom-block-empty">
      </div>
      <div class="buttom-block-right">
          <span>已选商品</span>
          <span style="color: #a80024;font-size:600;">
            {{selectedIndex.length}}
          </span>
          <span>件</span>
      </div>
      <div class="buttom-block-right">
          <span>合计</span>
          <span style="color: #a80024;font-size:600;">
            {{totalPrice}}
          </span>
          <span>元</span>
      </div>
      <div class="buttom-block-pay" @click="showPayModal()">
        结算
      </div>
      </div>
    </div>

    <div class="modal-mask" v-show="showPay" @click="hidePayModal()"></div>
    <div class="modal-block" :style="{bottom: num + 'px'}">
        <div>打钱！</div>
        <div>打钱后发订单邮件到你的邮箱嗷！</div>
        <button @click="confirmPay">打钱啦</button>
        <button @click="deletePay">取消</button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      cartsList: [],
      selectedIndex: [],
      showPay: false,
      num: -200
    }
  },
  // 1. 在这个钩子函数执行之前初始化事件以及生命周期
  beforeCreate () {
    // 1. 在这个钩子函数中，不能获取data中的数据
    // console.log(this.msg);
    // 2. 这个函数不能操作DOM；
    // console.log(document.getElementsByTagName("li"))
  },
  // 给Vue的实例注入数据，进行数据监听
  created () {
    // 在created发送请求
    // 1. 可以获取到data中的数据
    // 2. 不能操作DOM的
    // console.log(this.msg);
    // console.log(document.getElementsByTagName("li"))
  },
  computed: {
    totalPrice () {
      var totalPrice = 0
      var self = this
      this.selectedIndex.forEach(function (item) {
        totalPrice += self.cartsList[item].goodPrice * self.cartsList[item].goodNum
      })
      return totalPrice
    }
  },
  methods: {
    getCart () {
      let data = {
        method: 'GET',
        url: '/user/getCart'
      }
      this.$request(data).then(res => {
        this.cartsList = res.data
        console.log(this.cartsList)
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
    addToCart (id, index) {
      let time = new Date().getTime().toString().slice(0, 10)
      let data = {
        method: 'PUT',
        url: '/user/addCart',
        data: {
          goodId: id,
          goodNum: 1,
          addTime: time
        }
      }
      this.$request(data).then(res => {
        console.log(res.data)
        this.cartsList[index].goodNum += 1
      }).catch(_err => {
        console.log(_err)
      })
    },
    subToCart (id, index) {
      let time = new Date().getTime().toString().slice(0, 10)
      let data = {
        method: 'PUT',
        url: '/user/subCart',
        data: {
          goodId: id,
          goodNum: 1,
          addTime: time
        }
      }
      this.$request(data).then(res => {
        if (res.data === -1) {
          alert('该商品已经下架！')
        } else if (res.data === 0) {
          alert('数据库错误！')
        }
        console.log(res.data)
        this.cartsList[index].goodNum -= 1
      }).catch(_err => {
        console.log(_err)
      })
    },
    select (index) {
      var indexs = this.selectedIndex.indexOf(index)
      if (indexs >= 0) {
        this.selectedIndex.splice(indexs, 1)
      } else {
        this.selectedIndex.push(index)
      }
    },
    selectAll () {
      this.cartsList.forEach((item, index) => {
        let indexs = this.selectedIndex.indexOf(index)
        if (indexs >= 0) {
          this.selectedIndex.splice(indexs, 1)
        } else {
          this.selectedIndex.push(index)
        }
      })
    },
    selectedOrNot (index) {
      return this.selectedIndex.indexOf(index)
    },
    confirmPay () {
      var selectCarts = []
      var self = this
      this.selectedIndex.forEach(function (item, index) {
        selectCarts.push(self.cartsList[item])
      })
      console.log(selectCarts)
      let time = new Date().getTime().toString().substring(0, 10)
      var data = {
        method: 'POST',
        dataType: 'json',
        url: '/user/addOrder',
        params: {
          orderTime: time
        },
        data: selectCarts
      }
      const toastGetting = this.$showToast('生成订单中', 100000)
      this.$request(data).then(res => {
        console.log(res)
        toastGetting.toastOpacity = 0
        this.$showToast('订单生成欧克啦')
        self.getCart()
        this.selectedIndex = []
      }).catch(_err => {
        console.log(_err)
      })
      this.hidePayModal()
    },
    deletePay () {
      this.hidePayModal()
    },
    deleteCart (goodId) {
      var self = this
      let data = {
        method: 'PUT',
        url: '/user/deleteCart',
        data: {
          goodId: goodId
        }
      }
      this.$request(data).then(res => {
        console.log(res)
        self.getCart()
      }).catch(_err => {
        console.log(_err)
      })
    },
    showPayModal () {
      this.showPay = true
      this.num = 200
    },
    hidePayModal () {
      this.num = -200
      setTimeout(_ => {
        this.showPay = false
      }, 500)
    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
  },
  // 挂载完毕
  mounted () {
    // debugger
    // 挂载： 把VUE实例生成的虚拟的DOM转成真实的DOM，放在了页面中，这就是挂载；
    // 编译出的DOM把原有的DOM替换完毕；
    // 可以获取最终的DOM元素
    if (!window.sessionStorage.getItem('userName')) {
      this.$router.push({
        name: `user_login`
      })
    }
    this.getCart()
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
#cart{
  margin: 0rem;
  height: 100%;
  width: 100%;
}
.title{
  display: flex;
  width: 70rem;
  height: 3rem;
  line-height: 3rem;
  margin: 2rem auto .5rem auto;
  border-bottom: 2px solid #6c8299;
  text-align: center;
}
.title-goodInfo{
  width: 28rem;
}
.title-goodPrice{
  width: 10rem;
}
.title-goodNum{
  width: 10rem;
}
.title-cartPrice{
  width: 10rem;
}
.title-cartOp{
  width: 10rem;
}

.cart-list{
  width: 70rem;
  margin: .5rem auto 0rem auto;
}
.cart-item {
  display: flex;
  margin: 1rem 0rem 1rem 0;
  padding: 1rem 1rem 1rem 1rem;
  width: 68rem;
  height: 6rem;
  position: relative;
  border: 1px solid #b9bbbe;
}
.item-selected{
  display: block;
  margin: 0rem 1rem 0rem 0rem;
  width: .7rem;
  height: .7rem;
  border: 1px solid #6c8299;
  color: #a80024;
  font-size: .8rem;
  font-weight: 900;
  cursor: pointer;
}
.item-img {
  display: block;
  width: 6rem;
  height: 6rem;
  border: 1px solid #b9bbbe;
  cursor: pointer;
}
.item-pic {
  display: block;
  width: 100%;
  height: 100%;
}
.item-block {
  display: flex;
  height: 20rem;
  padding: 0rem 0rem 0rem 1.5rem;
  font-size: .5rem;
  line-height: 1.2rem;
  text-align: center;
}
.item-name{
  width: 17.5rem;
  height: 2.5rem;
  text-align: left;
  cursor: pointer;
}
.item-price{
  width: 10rem;
  font-size: .8rem;
  font-weight: 600;
}
.item-num{
  width: 10rem;
}
.item-num-update{
  display: inline-block;
  font-size: .9rem;
  width: 1rem;
  cursor: pointer;
}
.item-prices{
  width: 10rem;
  font-size: .8rem;
  font-weight: 600;
  color: #a80024;
}
.item-op{
  width: 10rem;
  height: 1rem;
  cursor: pointer;
}
.buttom-block{
  position: fixed;
  display: flex;
  bottom: 0;
  height: 3rem;
  line-height: 3rem;
  width: 70rem;
  background-color: #98aabd;
  border: 1px solid #b9bbbe;
  color: #ffffff;
}
.buttom-block-left{
  width: 10rem;
  text-align: center;
}
.buttom-block-empty{
  width: 30rem;
}
.buttom-block-right{
  width: 9rem;
  text-align: right;
  padding-right: 1rem;
}
.buttom-block-pay{
  cursor: pointer;
  width: 10rem;
  text-align: center;
  height: 3rem;
  background-color: #ad495f;
}
/*弹出框*/
.modal-mask{
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.2;
  z-index: 20;
  overflow: hidden;
}
.modal-block{
  position: fixed;
  width: calc(100% - 600px);
  height: 200px;
  background-color: #ffffff;
  z-index: 30;
  left: 300px;
  /* overflow: hidden; */
  transition: bottom .5s ease-out;
}
</style>
