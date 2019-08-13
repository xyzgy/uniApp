// 异步操作事件 若修改state必须通过mutations中方法修改
import apis from './apis'
import interceptors from './interceptors'
const actions = {
	async apiRequest({
		commit,
		dispatch,
		state
	}, {
		url,
		params = {}, //参数
		header = {}, //请求头
		method = 'POST', //请求方式
		loading = true, //请求加载中
		modal = true //请求异常弹窗提示
	}) {
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
							if (modal) {
								dispatch('responseError', {
									code: res.statusCode
								})
							}
						}
					} else {
						// fail
						if (res.errMsg && modal) {
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
	},
	responseError({}, {
		code
	}) {
		switch (code) {
			case 401:
				uni.showModal({
					content: '未授权,请重新登录-401',
					showCancel: false
				})
				break
			case 403:
				uni.showModal({
					content: '没有访问权限-403',
					showCancel: false
				})
				break
			case 404:
				uni.showModal({
					content: '请求错误,未找到该资源-404',
					showCancel: false
				})
				break
			case 405:
				uni.showModal({
					content: '请求方式错误-405',
					showCancel: false
				})
				break
			case 500:
				uni.showModal({
					content: '服务器异常-500',
					showCancel: false
				})
				break
			default:
				uni.showModal({
					content: '请求异常-' + code,
					showCancel: false
				})
				break
		}
	},
	// 获取用户信息
	async getUserinfo({
		commit,
		dispatch,
		state
	}) {
		let provider = await dispatch('getProvider', {
			service: 'oauth'
		});
		return new Promise((resolve, reject) => {
			uni.login({
				provider: provider,
				success: (login) => {
					const code = login.code;
					// 获取用户信息
					uni.getUserInfo({
						provider: provider,
						success: (res) => {
							console.log(res)
							commit('setUserBaseInfo', {
								nickName: res.userInfo.nickName,
								avatarUrl: res.userInfo.avatarUrl
							})
							commit('setUserOtherInfo', {
								encryptedData: res.encryptedData,
								iv: res.iv,
								signature: res.signature,
							});

							dispatch('getToken', {
								iv: res.iv,
								encryptedData: res.encryptedData,
								code: code
							}).then(function() {
								commit('isGetUserInfo', {
									val: true
								})
								commit('initStore');
								resolve(res);
							})
						},
						fail: (err) => {
							console.log('uni.getUserInfo ', err)
							if (err.errMsg === 'getUserInfo:fail auth deny') {
								uni.showToast({
									title: '请允许获取权限',
									icon: 'none',
									duration: 2000
								});
							}
							reject(err);
						}
					})
				},
				fail: (err) => {
					console.log('uni.login ', err)
					reject(err)
				}
			});
		})

	},
	// 用户是否已授权获取信息
	async isGetUserInfo({
		commit,
		dispatch,
		state
	}) {
		let typ = await dispatch('getUserSetting', {
			scopeType: 'scope.userInfo'
		});
		typ = typ && state.token; //用户已允许并且本地缓存存在
		if (typ) {
			commit('isGetUserInfo', {
				val: true
			})
			return true
		} else {
			commit('isGetUserInfo', {
				val: false
			})
			return false
		}

	},
	// 验证是否获取用户某项授权设置
	getUserSetting: async function({
		commit,
		state
	}, {
		scopeType
	}) {
		return new Promise((resolve, reject) => {
			uni.getSetting({
				success(res) {
					// console.log(res)
					resolve(res.authSetting[scopeType])
				},
				fail(err) {
					reject(false)
				}
			})
		})
	},
	// 用户授权申请  除userinfo外可提前发出请求
	userAuthorize: async function({
		commit,
		dispatch,
		state
	}, {
		scopeType
	}) {
		return await new Promise((resolve, reject) => {
			uni.authorize({
				scope: scopeType,
				success(res) {
					resolve(true)
				},
				fail: (err) => {
					console.log('uni.authorize ', err)
					reject(false)
				}
			})
		})
	},
	// 获取服务供应商  oauth 授权登录 /share  分享/ payment 支付/push 推送
	async getProvider({
		commit,
		state
	}, {
		service = "oauth"
	}) {
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: service,
				success: function(res) {
					commit('setProvider', {
						service: service,
						provider: res.provider[0]
					})
					resolve(res.provider)
				},
				fail: (error) => {
					console.log(error)
					reject(error)
				},
			});

		})

	},
	// 获取图片信息
	async getImageInfo(state, {
		src
	}) {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: src,
				success: function(image) {
					// console.log(image)
					resolve(image)
				},
				fail(err) {
					reject(err)
				}
			});
		})
	},
	async getToken({
		commit,
		dispatch,
		state
	}, {
		iv,
		encryptedData,
		code
	}) {
		code = code ? code : await dispatch('getLoginCode', {
			service: 'oauth'
		});

		const config = {
			url: 'authorizations',
			params: {
				code,
				iv,
				encryptedData
			},
			methods: 'post',
			loading: false,
			modal: false
		};
		// console.log(requestConfig)
		let s = await dispatch('apiRequest', config);
		commit('setToken', {
			token: s.token,
			expired: s.expired
		});

	},
	async getLoginCode({
		commit,
		dispatch,
		state
	}, {
		service = 'oauth'
	}) {
		// loginCode没必要存储,只能使用一次
		return new Promise(async (resolve, reject) => {
			const getProvider = state.oauthProvider || await dispatch('getProvider', {
				service: service
			})
			uni.login({
				provider: getProvider,
				success: function(res) {

					resolve(res.code)
				},
				fail: (err) => {
					console.log('uni.login ', err)
					reject(err)
				}
			});

		})
	}
}
export default actions
