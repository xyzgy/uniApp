<template>
	<view>
		<view v-if="hasUerInfo">
			<view style="display: flex; " class="user_top">
				<view class="user_top_left"><image :src="userAvatarUrl" mode="widthFix" style="border-radius: 50%;height: auto;" lazy-load></image></view>
				<view class="user_top_right">
					<view style="display: flex; align-items: center;" >
						<view>{{ userNickName }}</view>
						<image src="https://www.xyzgy.xyz/image/xyz.jpg" mode="widthFix" style="width: 28upx;height: auto;" lazy-load></image>
					</view>

					<view v-if="des">{{ des }}</view>
					<view v-else>你好,{{ userNickName }}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view style="display: flex; align-items: center;" class="user_top">
				<view class="user_top_left"><image src="https://arthorize.com/img/dafault-bg.png" mode="widthFix" lazy-load></image></view>
				<view class="user_top_right"><button open-type="getUserInfo" @getuserinfo="getUserInfo">游客</button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			hasUerInfo: false,
			userNickName: '',
			userAvatarUrl: '',
			des: ''
		};
	},
	methods: {
		async goNavigate(path) {
			uni.navigateTo({
				url: path,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		// 			// 获取用户信息
		async getUserInfo(e) {	
			// 只支持微信、头条小程序
			let getResult = await this.$store.dispatch('getUserinfo');
			if(getResult){
				this.showUserBaseInfo();
			}			
		},
		// 展示用户信息
		async showUserBaseInfo() {
			if(await this.$store.dispatch('isGetUserInfo')){
				this.hasUerInfo = this.$store.state.hasUserInfo;
				this.userNickName = this.$store.state.nickName;
				this.userAvatarUrl = this.$store.state.avatarUrl;
			}			
		}
	},
	mounted() {
		this.showUserBaseInfo();
	}
};
</script>

<style lang="less" scoped="">
.user_top {
	padding: 83upx 0 89upx 0;
	.user_top_left {
		image {
			width: 116upx;
			max-height: 116upx;
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
