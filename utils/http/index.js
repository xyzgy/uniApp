import apis from './apis'
import interceptors from './interceptors'
let http = async function({
	url,
	params = {}, //参数
	header = {}, //请求头
	method = 'POST', //请求方式
	loading = true, //请求加载中
	warn = true //是否异常弹窗提示
}) {
	if(!url && warn){
		return uni.showModal({
			content: '未填写请求地址',
			showCancel: false
		})
	}
	url = apis.base + apis.path[url];
	if (interceptors.isUse) {
		if (interceptors.request) {
			let obj = interceptors.request(params, header);
			params = obj.params;
			header = obj.header;
		}
	}
	return new Promise((resolve, reject) => {
		if (loading) {
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
		}
		uni.request({
			url: url,
			method: method,
			data: params,
			header: header,
			success: res => {},
			fail: (error) => {},
			complete: (res) => {
				console.log(res)
				if (loading) {
					uni.hideLoading();
				}
				// 响应拦截
				if (interceptors.isUse) {
					if (interceptors.response) {
						console.log('有响应')
					}
				}
				if (res.statusCode) {
					// success
					if (res.statusCode === 200) {
						resolve(res.data)
					} else {
						if (warn) {
							responseError({
								code: res.statusCode
							})
						}
					}
				} else {
					// fail
					if (res.errMsg && warn) {
						uni.showModal({
							content: url + '-' + res.errMsg,
							showCancel: false
						})
					}
					reject(res)
				}

			}
		});
	})
}
let responseError = function({
	code
}) {
	let content = '';
	switch (code) {
		case 400:
			content = '请求参数错误';
			break
		case 401:
			content: '未授权,请重新登录-401';
			break
		case 403:
			content: '没有访问权限-403';
			break
		case 404:
			content: '请求错误,未找到该资源-404';
			break
		case 405:
			content: '请求方式错误-405';
			break
		case 408:
			content = '请求超时';
			break
		case 500:
			content: '服务器异常-500';
			break
		case 501:
			content = '服务未实现';
			break
		case 502:
			content = '网关错误';
			break
		case 503:
			content = '服务不可用';
			break
		case 504:
			content = '网关超时';
			break
		case 505:
			content = 'HTTP版本不受支持';
			break
		default:
			content: '请求异常-' + code;
			break
	}
	uni.showModal({
		content: content,
		showCancel: false
	})
}
export default http
