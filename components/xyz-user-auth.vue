<template>
	<view>
		<view class="user_top" style="display: flex; ">
			<view class="user_top_left">
				<image :src="userAvatarUrl ? userAvatarUrl :''" mode="widthFix" style="border-radius: 50%;height: auto;" lazy-load></image>
			</view>
			<view class="user_top_right">
				<view v-if="!userAvatarUrl">
					<button open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
				<view v-else>欢迎 {{userNickName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userNickName: '',
				userAvatarUrl: '',
			};
		},
		methods: {
			// 获取用户信息
			getUserInfo(e) {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.login({
						success(res) {
							console.log('login', res)
							if (res.code) {
								_this.checkSession().then(function() {
									uni.getUserInfo({
										provider: 'weixin',
										success: (res) => {
											_this.userNickName = res.userInfo.nickName;
											_this.userAvatarUrl = res.userInfo.avatarUrl;
											resolve(res)
										},
										fail: (err) => {
											console.log('权限异常')
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
								})
							} else {
								uni.showToast({
									title: '登录失败！' + res.errMsg,
									icon: 'none'
								})
							}

						},
						fail() {

						},
						complete() {
							uni.hideLoading()
						}
					})

				})
			},
			// 登录状态
			async authStatus() {
				let _this = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 授权
							if (_this.$store.state.token) {
								_this.$emit('initAuth', _this.$store.state.token)
							} else {
								uni.showLoading({
									title: '正在登录中'
								});
								_this.getUserInfo();
							}
						} else {
							// 未授权
							// _this.getUserInfo().then(function(res) {
							// 	console.log(res)
							// });
							uni.showToast({
								title: '请点击登录',
								icon: 'none'
							})
						}

					}
				})
			},
			// 登录session是否过期
			checkSession() {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.checkSession({
						success() {
							// session_key 未过期，并且在本生命周期一直有效
							resolve(true)
						},
						fail() {
							// session_key 已经失效，需要重新执行登录流程
							uni.showToast({
								title: '登录过期，重新登录',
								icon: 'none'
							})
							_this.authStatus();
							reject(false)
						}
					})
				})
			},

		},
		mounted() {
			this.authStatus();

		}
	};
</script>

<style lang="less" scoped="">
	.user_top {
		padding: 83upx 0 89upx 0;

		.user_top_left {
			width: 116upx;
			height: 116upx;
			background: #ccc;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%x;
				border-radius: 50%;
			}
		}

		.user_top_right {
			margin-left: 30upx;

			view {
				&:first-child {
					font-size: 34upx;
					font-weight: bold;
					color: #31303b;

					image {
						width: 28upx;
						height: 28upx;
						margin-left: 13upx;
					}
				}

				&:last-child {
					color: #a6a6a6;
					font-size: 24upx;
					margin-top: 22upx;
				}
			}

			button {
				background: none;
				color: #31303b;
				font-weight: bold;
				font-size: 34upx;
			}
		}
	}
</style>
