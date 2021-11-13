<template>
  <div id="goodEdit">
    <div class="good-block">

      <div class="good-item">
        <div class="item-img-block">
          <div class="item-img-item">
            <img class="item-pic" mode="scaleToFill" :src="goodImg" alt="请选择上传图片"/>
          </div>
          <div class="item-pic-buttons">
            <input type="file" accept="image/*"
            @change="addImg" class="item-pic-buttons-input"/>
            <button @click="uploadImg">提交</button>
          </div>
          <canvas ref="imgPreview"
            height="0"
            width="0">
          </canvas>
        </div>
        <div class="item-block">
          <div class="item-detail">
            <div class="item-title">
              <span>名称</span>
              <textarea cols="50" rows="2" type="text"
               v-model="goodName" maxlength="50"></textarea>
            </div>
            <div class="item-payment">
              价格 ￥
              <input type="number" v-model="goodPrice">
            </div>
            <div class="item-num">
              库存
              <input type="number" v-model="goodInventory">
            </div>
            <div class="item-buttons">
                <button @click="confirmAdd">确定</button>
                <button @click="deleteAdd">取消</button>
            </div>
          </div>
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
      goodInfo: {},
      goodName: '',
      goodPrice: '',
      goodInventory: '',
      goodImg: '',
      base64: '',
      imgPreview: ''
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
    addImg (event) {
      let file = event.target.files[0]
      let reader = new FileReader()
      let img = new Image()
      // 读取图片
      reader.readAsDataURL(file)
      // 读取完毕后的操作
      reader.onloadend = (e) => {
        img.src = e.target.result
        // 这里的e.target就是reader
        // console.log(reader.result)
        // reader.result就是图片的base64字符串
        this.base64 = reader.result
      }
      // 预览图片
      let canvas = this.$refs['imgPreview']
      let context = canvas.getContext('2d')
      img.onload = () => {
        img.width = 100
        img.height = 100
        // 设置canvas大小
        canvas.width = 100
        canvas.height = 100
        // 清空canvas
        context.clearRect(0, 0, 100, 100)
        // 画图
        context.drawImage(img, 0, 0, 100, 100)
      }
    },
    uploadImg () {
      console.log(this.base64)
      let data = {
        method: 'POST',
        url: '/upload/goodImg',
        data: {
          img: this.base64
        }
      }
      this.$request(data).then(res => {
        alert('提交成功!')
        console.log(res.data)
        this.goodImg = res.data.data
        console.log(this.goodImg)
      }).catch(_err => {
      })
    },
    confirmAdd () {
      if (this.goodName === '' ||
       this.goodPrice === '' ||
       this.goodImg === '' ||
       this.goodInventory === '') {
        alert('请完成信息的填写!')
        return
      }
      let self = this
      let data = {
        method: 'POST',
        url: '/good/addGood',
        data: {
          goodSeller: this.userId,
          goodName: this.goodName,
          goodPrice: this.goodPrice,
          goodImg: this.goodImg,
          goodInventory: this.goodInventory
        }
      }
      this.$request(data).then(res => {
        console.log(res)
        alert('添加成功!')
        this.goodInfo.goodName = this.goodName
        this.goodInfo.goodPrice = this.goodPrice
        this.goodInfo.goodInventory = this.goodInventory
        self.$router.push({
          name: 'user_seller_goodDict'
        })
      }).catch(_err => {
        console.log(_err)
      })
    },
    deleteAdd () {
      this.goodImg = ''
      this.goodName = ''
      this.goodPrice = ''
      this.goodInventory = ''
    }
  },
  // 执行之前，判断是否有el,template;编译
  beforeMount () {
    // console.log(document.getElementsByTagName("li"))
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
#goodEdit{
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
.item-img-block {
  display: block;
  width: 22rem;
}
.item-img-item {
  display: block;
  width: 22rem;
  height: 22rem;
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
  display: flex;
  flex-direction: row;
  /* -webkit-line-clamp: 2; */
  /* -webkit-box-orient: horizontal; */
  /* display: -webkit-box; */
  height: 3.5rem;
}
.item-detail .item-title span{
  display: inline-block;
  overflow: hidden;
  font-size: 1.0rem;
  width: 3rem;
  padding-bottom: 0.5rem;
  color: #182941;
}
.item-detail .item-title textarea{
  display: block;
  line-height: 1.0rem;
  height: 2rem;
  /* width: 15rem; */
  overflow: hidden;
  font-size: 1.0rem;
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
  color: #182941;
  text-align: left;
  border: 1px solid #182941;
  resize: none;
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
.item-detail .item-payment input{
  line-height: 3rem;
  height: 2.5rem;
  width: 7rem;
  overflow: hidden;
  font-size: 1.7rem;
  color: #a80024;
  font-weight: 600;
  text-align: center;
  border: 1px solid #182941;
}
.item-detail .item-num {
  display: block;
  line-height: 3rem;
  height: 3rem;
  overflow: hidden;
  font-size: 1.0rem;
  padding-bottom: 0.5rem;
  color: #5a677a;
}
.item-detail .item-num input{
  line-height: 1rem;
  height: 1rem;
  width: 10rem;
  overflow: hidden;
  font-size: 1.0rem;
  padding: 0.25rem;
  color: #5a677a;
  text-align: center;
  border: 1px solid #182941;
}
.item-pic-buttons {
  display: flex;
  justify-content: space-around;
}
.item-pic-buttons button{
  display: inline-block;
  height: 2.5rem;
  width: 10rem;
  margin: .5rem 0rem 0rem 0rem;
  border: 1px solid rgb(204, 204, 204);
  background-color: #435a72;
  color: aliceblue;
}
.item-pic-buttons-input{
  display: inline-block;
  width: 10rem;
  margin: .5rem 0rem 0rem 0rem;
  padding: .5rem .5rem .3rem 1.0rem;
  /* border: 1px solid rgb(204, 204, 204); */
  /* background-color: #435a72; */
  /* color: aliceblue; */
}
.item-detail button{
  display: inline-block;
  height: 2.5rem;
  width: 11rem;
  margin: 5rem .7rem 0rem .1rem;
  border: 1px solid rgb(204, 204, 204);
  background-color: #435a72;
  color: aliceblue;
}
</style>
