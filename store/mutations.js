// 修改state值 及 同步事件方法
const mutations = {
	// 用户基本信息
	setUserBaseInfo(state, {
		nickName,
		avatarUrl
	}) {
		state.nickName = nickName;
		state.avatarUrl = avatarUrl;
		this.commit('setStorage', {
			str: 'nickName',
			val: nickName
		})
		this.commit('setStorage', {
			str: 'avatarUrl',
			val: avatarUrl
		})
	},
	// 用户 encryptedData、iv、signature
	setUserOtherInfo(state, {
		encryptedData,
		iv,
		signature
	}) {
		state.encryptedData = encryptedData;
		state.iv = iv;
		state.signature = signature;
		this.commit('setStorage', {
			str: "encryptedData",
			val: encryptedData
		});
		this.commit('setStorage', {
			str: "iv",
			val: iv
		});
		this.commit('setStorage', {
			str: "signature",
			val: signature
		})
	},
	// 登录 token、expired
	setToken(state, {
		token,
		expired
	}) {
		state.token = token;
		state.token = expired;
		this.commit('setStorage', {
			str: "token",
			val: token
		});
		this.commit('setStorage', {
			str: "expired",
			val: expired
		});
	},
	// 供应商
	setProvider(state, {
		service,
		provider
	}) {
		let str = service + 'Provider';
		state[str] = provider;
		this.commit('setStorage', {
			str: str,
			val: provider
		})

	},
	// 缓存信息
	setStorage(state, {
		str,
		val
	}) {
		if (process.env.NODE_ENV === 'development') {
			str = 'dev' + str;
		} else {
			str = 'prd' + str;
		}
		try {
			uni.setStorageSync(str, val)
		} catch (e) {
			console.log(str, '缓存设置失败')
		}
	},
	// 获取设备信息
	getSystemInfo(state) {
		uni.getSystemInfo({
			success(res) {
				state.systemInfo = res;
			}
		});
	},
	//初始化 store仓库
	initStore(state) {
		let str = '';
		if (process.env.NODE_ENV === 'development') {
			str = 'dev'
		} else {
			str = 'prd'
		}
		state.oauthProvider = uni.getStorageSync(str + 'oauthProvider');
		state.oauthCode = uni.getStorageSync(str + 'oauthCode');

		state.shareProvider = uni.getStorageSync(str + 'shareProvider');
		state.payProvider = uni.getStorageSync(str + 'payProvider');
		state.pushProvider = uni.getStorageSync(str + 'pushProvider');

		state.token = uni.getStorageSync(str + 'token');
		state.nickName = uni.getStorageSync(str + 'nickName');
		state.avatarUrl = uni.getStorageSync(str + 'avatarUrl');
		state.encryptedData = uni.getStorageSync(str + 'encryptedData');
		state.iv = uni.getStorageSync(str + 'iv');
		state.signature = uni.getStorageSync(str + 'signature');
		state.expired = uni.getStorageSync(str + 'expired');

		this.commit('getSystemInfo')
	},
	isGetUserInfo(state, {
		val
	}) {
		state.hasUserInfo = val;
	},
}
export default mutations
