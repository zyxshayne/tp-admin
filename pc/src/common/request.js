import axios from 'axios'
import { Loading, Message } from 'element-ui'
var loading = null
const request = axios.create({
  timeout: 20000,
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
	// 请求前
	loading = Loading.service({
		background: 'rgba(0, 0, 0, 0.2)',
	})
	return config
}, (err) => {
	// 请求错误
	loading.close()
	Message.error({
		message: '请求错误！',
	})
	return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use(res => {
	// 响应数据
	loading.close()
	var { code, data, msg } = res.data
	if (code === 1) return data
	Message.error({
		message: msg,
	})
	return Promise.reject(msg)
}, (err) => {
	// 响应错误
	loading.close()
	Message.error({
		message: '请求失败！',
	})
	return Promise.reject(err)
})

export default request