<template>
  <div id="detail">
    <div class="good-block">

      <div class="good-item">
        <div class="item-img">
          <img class="item-pic" mode="scaleToFill" :src="goodInfo.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-detail">
            <span class="item-title">{{goodInfo.goodName}}</span>
            <span class="item-payment">￥ {{goodInfo.goodPrice}}</span>
            <span class="item-num">库存： {{goodInfo.goodInventory}}</span>
            <span class="item-seller">卖家： {{goodInfo.goodSellerName}}</span>
            <div class="item-buttons">
                <button @click="buyGood">立即购买</button>
                <button @click="addToCart">加入购物车</button>
            </div>
          </div>
        </div>
      </div>

      <div class="good-detail">
        <div class="detail-title">
          <ul class="tabbar">
            <li :class="{'selected':showDetailType==0}"
             @click="showDetailType = 0">
              商品详情
            </li>
            <li :class="{'selected':showDetailType==1}"
             @click="showDetailType = 1">
              商品评价
            </li>
          </ul>
        </div>
        <div class="intro-content" :class="{'display-none':showDetailType!=0}">
          {{goodInfo.goodIntro}}
        </div>
        <div class="intro-content" :class="{'display-none':showDetailType!=1}">
          尚未开发嘤嘤嘤
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodInfo: {},
      showDetailType: 0
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
  methods: {
    selectGood (id) {
      if (id === undefined) {
        id = window.sessionStorage.getItem('goodId')
      }
      this.goodInfo.goodId = id
      let data = {
        method: 'GET',
        url: '/good/selectGood',
        params: {
          goodId: id
        }
      }
      this.$request(data).then(res => {
        this.goodInfo = res.data
        console.log(this.goodInfo)
        window.sessionStorage.setItem('goodId', this.goodInfo.goodId)
        this.addBrowsed()
      }).catch(_err => {
        console.log(_err)
      })
    },
    addBrowsed () {
      if (!window.sessionStorage.getItem('userId')) {
        return
      }
      let time = new Date().getTime().toString().substring(0, 10)
      let data = {
        method: 'POST',
        url: '/user/addUserBrowsed',
        data: {
          goodId: this.goodInfo.goodId,
          browserId: window.sessionStorage.getItem('userId'),
          browseTime: time
        }
      }
      this.$request(data).then(res => {
        console.log(res)
      }).catch(_err => {
        console.log(_err)
      })
    },
    buyGood () {
      alert('暂未开放')
    },
    addToCart () {
      if (!window.sessionStorage.getItem('userId')) {
        this.$router.push({
          name: `person_login`
        })
      } else {
        console.log(window.sessionStorage.getItem('userId'))
        let time = new Date().getTime().toString().slice(0, 10)
        let data = {
          method: 'PUT',
          url: '/user/addCart',
          data: {
            goodId: this.goodInfo.goodId,
            userId: Number(window.sessionStorage.getItem('userId')),
            goodNum: 1,
            addTime: time
          }
        }
        this.$request(data).then(res => {
          console.log(res.data)
          alert('已加购物车！')
        }).catch(_err => {
          console.log(_err)
        })
      }
    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
    // console.log(document.getElementsByTagName("li"))
  },
  // 挂载完毕
  mounted () {
    // debugger
    // 挂载： 把VUE实例生成的虚拟的DOM转成真实的DOM，放在了页面中，这就是挂载；
    // 编译出的DOM把原有的DOM替换完毕；
    // 可以获取最终的DOM元素
    this.selectGood(this.$route.params.goodId)
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
#detail{
  margin: 0rem;
  width: 100%;
}
.good-block{
  width: 1024px;
  margin: 5rem auto 5rem auto;
  padding: 0rem 5rem 0rem 5rem;
}
.good-item {
  display: flex;
  margin: 1rem 2rem 1rem 0;
  width: 50rem;
  height: 25rem;
  position: relative;
}
.item-img {
  display: block;
  width: 22rem;
  height: 22rem;
  margin-left: 0rem;
  margin-top: 0rem;
  border: 1px solid #b9bbbe;
}
.item-pic {
  display: block;
  width: 100%;
  height: 100%;
}
.item-block {
  display: block;
  height: 20rem;
}
.item-detail {
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  width: 24rem;
  height: 20rem;
}

.item-detail .item-title {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;

  /* display: block; */
  line-height: 1.7rem;
  height: 3.5rem;
  overflow: hidden;
  font-size: 1.0rem;
  padding-bottom: 0.5rem;
  color: #182941;
}
.item-detail .item-payment {
  display: block;
  line-height: 3rem;
  height: 3rem;
  overflow: hidden;
  font-size: 1.7rem;
  color: #a80024;
  font-weight: 600;
}
.item-detail .item-num {
  display: block;
  margin: 0.5rem 0 0.5rem 0;
  line-height: 1.5rem;
  overflow: hidden;
  font-size: 0.8rem;
  color: #5a677a;
}
.item-detail .item-seller {
  display: block;
  margin: 0.5rem 0 0.5rem 0;
  line-height: 1.5rem;
  overflow: hidden;
  font-size: 0.8rem;
  color: #5a677a;
}
button{
  display: inline-block;
  height: 2.5rem;
  width: 11rem;
  margin: 5rem .7rem 0rem .1rem;
  border: 1px solid rgb(204, 204, 204);
  background-color: #435a72;
  color: aliceblue;
  cursor: pointer;
}
.good-detail{
  display: block;
  border: 1px solid #93a1af;
}
.intro-title{
  line-height: 2rem;
  color: #182941;
}
.intro-content{
  font-size: 13px;
  line-height: 1.2rem;
  padding: 1.0rem;
}
.tabbar{
  width: 100%;
  position: relative;
  height: 48px;
  border: 1px solid #dfdfdf;
}
.tabbar li {
  float: left;
  height: 48px;
  line-height: 48px;
  display: block;
  cursor: pointer;
  border-right: 1px dotted #d2d2d2;
  font-size: 13.5px;
  color: #182941;
  padding: 0 20px;
}
.tabbar .selected{
  background-color: #f5f5f5;
  color: #000000;
}
.display-none{
  display: none;
}
.dvisibility-hidden{
  visibility: hidden;
}
</style>
