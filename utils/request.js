import { getCurrentDateTime } from '@/utils/getCurrentDateTime.js'

// const baseUrl = "https://wechat.idejian.com"

const BaseHost = "/api"
const params = {
	showapi_appid:'1571575',
	showapi_timestamp:getCurrentDateTime(),
	showapi_sign:'6f14ba74eb8f4554b171ae40b98ce6d0',
}


// /api/getlunbo  --->  此时 proxy生效了,也就是说在h5中请求路径不需要加baseUrl
// baseUrl + url  --->  http://192.168.24.52:8080//api/getlunbo  此时配置的代理没有生效

// 请求后台
export function paramsGet(url, data) {
	const requestData = Object.assign({} , params, data)
	// var requesturl = baseUrl+url;
	// // #ifdef H5
	// var requesturl = url;
	// // #endif
	return new Promise((resolve, reject) => {
		uni.request({
			url: BaseHost + url,
			method: "GET",
			data: requestData,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}


export function myRequestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}
