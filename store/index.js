import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		systemInfo:{},//设备信息
		hasUserInfo:false,
		
		oauthProvider: "",
		shareProvider: "",
		payProvider: "",
		pushProvider: "",
		
		token:'',//登录token
		expired:'',//登录有效期
		
		//userinfo开始  支持 微信/头条小程序 	
		nickName:"",
		avatarUrl:"",
		encryptedData:"",
		iv:"",
		signature:"",
		//userInfo结束  ---------------
	},
	mutations,
	getters,
	actions
})

export default store
