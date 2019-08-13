<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.$store.commit('initStore');
		const nowTime = Date.parse(new Date()),
			oldTime = this.$store.state.expired;
		this.$store.dispatch('isGetUserInfo').then((res)=> {
			if (res) {
				if(this.$store.state.token){
					if (oldTime < nowTime) {
						// token失效
						console.log('用户授权，token失效');
						this.$store.dispatch('getToken', { iv: this.$store.state.iv, encryptedData: this.$store.state.encryptedData,code:'' });
					} else {
						console.log('用户授权，token可用');
					}
				}else{
					console.log('用户授权，token不存在');
					uni.clearStorage();
					uni.clearStorageSync();
				}			
			} else {			
				console.log('用户未授权');
				uni.clearStorage();
				uni.clearStorageSync();
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
/*每个页面公共css */
@import './common/less/base.less';
@import './common/less/common.less';
</style>
