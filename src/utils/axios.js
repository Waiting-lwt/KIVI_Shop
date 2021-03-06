/* 1.引入文件 */
import axios from 'axios' // 引入 axios库
import router from '../router'
// import qs from 'qs' // 引入 node中自带的qs模块（数据格式转换）

/* 2.全局默认配置 */
let baseURL
// 判断开发环境（一般用于本地代理）
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseURL = '/api' // 你设置的本地代理请求（跨域代理）
} else {
  // 编译环境
  if (process.env.type === 'test') {
    // 测试环境
    baseURL = '/api'
    // baseURL = 'http://localhost:8080'
  } else { // production
    // 正式环境
    baseURL = '/api'
    // baseURL = 'http://localhost:8080'
  }
}
// 配置axios的属性
axios.defaults.timeout = 6000 // 请求超时时间1分钟
axios.defaults.baseURL = baseURL // 你的接口地址
axios.defaults.responseType = 'json'
axios.defaults.withCredentials = true // 是否允许带cookie这些

/* 你也可以创建一个实例，然后在实例中配置相关属性，此方法和上面的方法一样，写法不同，怎么用随个人
 *喜好，我比较喜欢用这种方法，如下：
 */
const Axios = axios.create({
  baseURL: baseURL, // 后台服务地址
  timeout: 60000, // 请求超时时间1分钟
  responseType: 'json',
  withCredentials: false // 是否允许带cookie这些
})

/* 3.设置拦截器 */
/* 如果不是用创建实例的方式配置，那么下面的Axios都要换成axios,也就是文件开头你用import引入axios
时定义的变量 */
// http request 拦截器
Axios.interceptors.request.use(
  config => {
    // 发送请求前进行拦截
    // 可在此处配置请求头信息
    return config
  },
  error => {
    // console.log("错误的传参", 'fail');
    return Promise.reject(error)
  }
)

// http response 拦截器
Axios.interceptors.response.use(
  res => {
    console.log(res)
    // 请求响应后拦截
    if (res.status === 200) {
      // 对响应数据做些事
      console.log(res.code)
      if (res.data.code === 10010 || res.data.code === 10011) {
        router.replace({
          path: '/user/login' // 到登录页重新获取token
        })
      } else if (res.data.token) {
        // 判断token是否存在，如果存在说明需要更新token
      }
    }
    if (res.status === 200) {
      // 对响应数据做些事
      // alert("提交成功")
      return Promise.resolve(res)
    }
    return res
  },
  error => {
    console.log(error.code)
    // alert("网络异常!") 404等问题可以在这里处理
    return Promise.reject(error)
  }
)
export default Axios
