<template>
  <div id="toast">
    <div class="toast-block" :style="{opacity: toastOpacity}">
      <div>
        <span>{{message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      toastOpacity: 0
    }
  },
  methods: {
    showCommModal () {
      this.toastOpacity = 1
      setTimeout(_ => {
        this.toastOpacity = 0
      }, 1500)
    }
  }
}
</script>

<style scoped>
/*弹出框*/
.toast-mask{
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
.toast-block{
  position: fixed;
  width: 200px;
  height: 80px;
  background-color: #474747;
  z-index: 30;
  left: calc(50% - 100px);
  overflow: hidden;
  top: 200px;
  transition: opacity .5s ease-out;

  display: flex;
  justify-content: center;
}
.toast-block span{
  color: aliceblue;
  line-height: 80px;
}
</style>
