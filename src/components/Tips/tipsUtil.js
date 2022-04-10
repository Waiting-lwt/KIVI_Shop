import ToastComponent from './Toast.vue'
export const Toast = {}
Toast.install = function (Vue) {
  // 生成一个Vue的子类
  const ToastConstructor = Vue.extend(ToastComponent)
  // 生成一个该子类的实例
  const instance = new ToastConstructor()
  // 将这个实例挂载在创建的div上，并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  // 通过Vue的原型注册方法
  Vue.prototype.$showToast = (msg, duration = 1500) => {
    instance.message = msg
    instance.toastOpacity = 1
    setTimeout(() => {
      instance.toastOpacity = 0
    }, duration)
    return instance
  }
}
