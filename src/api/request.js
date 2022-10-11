import axios from 'axios'
const u1 = '10.144.206.123'
const u2 = '192.168.23.59'
const u3 = '127.0.0.1'
const u4 = '10.198.51.131'
u1, u2, u3, u4
const _request = axios.create({
  baseURL: 'http://' + u3 + ':3000/',
  timeout: 5000
})

// 请求拦截器
_request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

//响应拦截器
_request.interceptors.response.use(
  function (res) {
    return res
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default _request
