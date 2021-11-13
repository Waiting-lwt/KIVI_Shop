import Axios from './axios' // 导入配置好的axios文件
// 封装axios请求函数，并用export导出
export function request (option) {
  if (option.method === 'GET') {
    console.log(option.params)
    return Axios({
      url: option.url,
      method: 'GET',
      params: option.params || {} // GET - params
    })
  } else if (option.method === 'POST') {
    console.log(option.data)
    return Axios({
      url: option.url,
      method: 'POST',
      headers: option.header || {
        'Content-Type': 'application/json'
      },
      params: option.params || {},
      data: option.data // POST - data
    })
  } else if (option.method === 'PUT') {
    console.log(option.data)
    return Axios({
      url: option.url,
      method: 'PUT',
      headers: option.header || {
        'Content-Type': 'application/json'
      },
      params: option.params || {},
      data: option.data || {} // PUT - data
    })
  } else if (option.method === 'DELETE') {
    console.log(option.params)
    return Axios({
      url: option.url,
      method: 'DELETE',
      headers: option.header || {
        'Content-Type': 'application/json'
      },
      params: option.params // DELETE - data
    })
  }
}

// 时间戳转文本
export function formatDate (date) {
  // 格式化日期
  let d = new Date(date * 1000)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()
  let hour = d.getHours()
  let minute = d.getMinutes()
  // let second = d.getSeconds()
  if (parseInt(minute) < 10) minute = '0' + minute
  return year + '/' + month + '/' + day + ' ' + hour + ':' + minute
}
