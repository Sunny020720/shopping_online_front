import axios from 'axios'
// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})
// 自定义配置
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 请求错误处理
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // 对响应数据处理 (默认axios会多包装一层data)
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default request
