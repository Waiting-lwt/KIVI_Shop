<template>
  <div id="home">
    <div class="title">
      <span class="title-icon">KIVI</span>
      <div class="search-block">
        <input type="text"  @keyup.enter="search()" v-model="search_content" maxlength="40"/>
        <div class="search-icon" @click="search()">搜索</div>
      </div>
    </div>
    <div class="goods-list">
      <div class="good-item" v-for="(item, index) in goodsList" :key="index"
      @click="toGoodDetail(item.goodId)">
        <div class="item-img">
          <img class="item-pic" mode="scaleToFill" :src="item.goodImg"/>
        </div>
        <div class="item-block">
          <div class="item-detail">
            <span class="item-payment">￥ {{item.goodPrice}}</span>
            <span class="item-title">{{item.goodName}}</span>
          </div>
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
      goodsList: [],
      search_content: ''
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
    getGoods () {
      let data = {
        method: 'GET',
        url: '/good/getGood'
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
        name: `good_detail`,
        params: {
          goodId: id
        }
      })
    },
    search () {
      if (this.search_content === '') {
        this.getGoods()
        return
      }
      console.log(this.search_content)
      let data = {
        method: 'GET',
        url: '/good/searchGood',
        params: {
          content: this.search_content
        }
      }
      this.$request(data).then(res => {
        this.goodsList = res.data
        console.log(this.goodsList)
      }).catch(_err => {
        console.log(_err)
      })
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
    this.getGoods()
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
#home {
  width: 1280px
}
.title {
  margin: 2rem 5rem 2rem 5rem;
  display: block;
  overflow: hidden;
  height: 4rem;
  width: 100%;
}
.title-icon {
  display: inline-block;
  font-size: 2rem;
  line-height: 4rem;
  text-align: center;
  margin: 0rem 3rem 0rem 1rem;
  vertical-align: 25%;
}
.search-block {
  overflow: hidden;
  display: inline-block;
  height: 3rem;
  width: 38rem;
  padding-left: 1.5rem;
  font-size: 1rem;
  line-height: 3rem;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 1.5rem;
}
input {
  height: 100%;
  width: 85%;
  font-size: 1rem;
  display: hidden;
  border: none;
  outline: none;
}
.search-icon {
  display: inline-block;
  text-align: center;
  width: 4rem;
  height: 3rem;
  cursor: pointer;
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
  height: 18rem;
  border: 1px solid #b9bbbe;
  position: relative;
}
.item-img {
  display: block;
  width: 13rem;
  height: 13rem;
  margin-left: 0rem;
  margin-top: 0rem;
}
.item-pic {
  display: block;
  width: 100%;
  height: 100%;
  /* box-shadow: 0rem .1rem .5rem #000; */
}
.item-block {
  display: block;
  height: 3rem;
}
.item-detail {
  padding: 0.5rem;
  height: 3rem;
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
</style>
