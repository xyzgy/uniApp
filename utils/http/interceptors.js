// 拦截器配置文件
const interceptor = {
	isUse:false,//是否启用请求拦截器
	request: function(params,header) {
		// 在发送请求之前对数据做一些处理
		let obj = {
			params,
			header
		}
		return obj
	},
	response: null
}
export default interceptor