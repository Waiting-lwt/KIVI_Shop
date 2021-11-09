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
      method: 'post',
      dataType: 'POST' || option.dataType,
      headers: option.header || {
        'Content-Type': option.contentType || 'application/json'
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
