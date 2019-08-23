// 异步操作事件 若修改state必须通过mutations中方法修改
const actions = {
	// 获取token请求
	async getToken({
		commit,
		dispatch,
		state
	}, {
		iv,
		encryptedData,
		code
	}) {
		
		commit('setToken', {
			token: s.token,
			expired: s.expired
		});

	},
	
}
export default actions
