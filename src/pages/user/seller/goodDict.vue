<template>
  <div id="goodDict">
    <div class="goods-list">
      <div class="good-item" v-for="(item, index) in goodsList" :key="index">
        <div class="item-img" @click="toGoodDetail(item.goodId)">
          <img class="item-pic" mode="scaleToFill" :src="item.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-detail">
            <span class="item-payment">￥ {{item.goodPrice}}</span>
            <span class="item-title" @click="toGoodDetail(item.goodId)">{{item.goodName}}</span>
          </div>
          <div class="item-buttons">
            <button @click="editGood(item.goodId)">修改</button>
            <button @click="deleteGood(item.goodId)">删除</button>
          </div>
        </div>
      </div>

      <div class="good-item" style="vertical-align:bottom">
        <div class="item-img" style="cursor:default">
          <img class="item-pic" mode="scaleToFill" alt=""/>
        </div>
        <div class="item-block" @click="toGoodAdd()"
        style="line-height:5rem;text-align:center;cursor:pointer">
          新增商品
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      goodsList: []
    }
  },
  // 1. 在这个钩子函数执行之前初始化事件以及生命周期
  beforeCreate () {},
  // 给Vue的实例注入数据，进行数据监听
  created () {},
  methods: {
    getSellerGoods () {
      let data = {
        method: 'GET',
        url: '/user/getSellerGood'
      }
      this.$request(data).then(res => {
        this.goodsList = res.data
        console.log(this.goodsList)
      }).catch(_err => {
        console.log(_err)
      })
    },
    toGoodDetail (id) {
      this.$router.push({
        name: 'good_detail',
        params: {
          goodId: id
        }
      })
    },
    editGood (id) {
      this.$router.push({
        name: 'good_edit',
        params: {
          goodId: id
        }
      })
    },
    deleteGood (id) {
      var data = {
        method: 'POST',
        dataType: 'json',
        url: '/good/deleteGood',
        data: {
          goodId: id
        }
      }
      this.$request(data).then(res => {
        alert('删除成功')
        console.log(res)
        this.getSellerGoods()
      }).catch(_err => {
        console.log(_err)
      })
    },
    toGoodAdd () {
      this.$router.push({
        name: 'good_add'
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
    this.getSellerGoods()
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
#goodDict{
  z-index: 15;
  margin: 2rem 0 0 15rem;
  width: 1080px
}
.goods-list {
  margin: 0rem 2rem 2rem 5rem;
  width: 100%;
  height: 100%;
  display: inline-block;
}
.good-item {
  display: inline-block;
  margin: 1rem 2rem 1rem 0;
  width: 13rem;
  height: 20rem;
  border: 1px solid #b9bbbe;
  position: relative;
}
.item-img {
  display: block;
  width: 13rem;
  height: 13rem;
  margin-left: 0rem;
  margin-top: 0rem;
  cursor: pointer;
}
.item-pic {
  display: block;
  width: 100%;
  height: 100%;
  /* box-shadow: 0rem .1rem .5rem #000; */
}
.item-block {
  display: block;
  padding: 0.5rem;
  /* height: 3rem; */
}
.item-detail {
  display: block;
  /* height: 3rem; */
}
.item-detail .item-payment {
  display: block;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
  font-size: 1rem;
  color: #a80024;
  font-weight: 600;
}
.item-detail .item-title {
  /* 显示两行, 多出部分以"..."代替 */
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  cursor: pointer;

  /* display: block; */
  line-height: 1.2rem;
  height: 2.5rem;
  overflow: hidden;
  font-size: 0.8rem;
  padding-top: 0.5rem;
  color: #182941;
}
.item-detail .item-title:hover{
  color: #a75667;
  text-decoration:underline;
}
.item-buttons{
  display: flex;
  justify-content: space-around;
}
.item-buttons button{
  display: inline-block;
  height: 1.5rem;
  width: 5.0rem;
  margin: .25rem .25rem .25rem .25rem;
  border: 1px solid rgb(204, 204, 204);
  background-color: #435a72;
  color: aliceblue;
  cursor: pointer;
}
</style>
