<template>
	<view style="position:relative;background:#fff" :style="{marginBottom:navHeight+'px'}">
		<view style="position:fixed;width:100%;z-index:999" :style="{ top: statusBarHeight + 'px' }">
			<view style="display: flex;align-items: center;" class="navbar">
				<view class="navbar_back" style="width:80upx;">
					<view v-if="isBackBtn" style="display: flex;align-items: center;" @click="goBack">
						<!--#ifndef MP-TOUTIAO-->
						<i class="iconfont " style="">&#xe6bf;</i>
						<!--#endif -->
						<!-- #ifdef MP-TOUTIAO-->
						<image src="/static/image/left_back.png" mode="widthFix" style="width:60upx;height: 60upx;display: inline-block;"></image>
						<!--#endif-->
						<!-- <view>{{ backTxt }}</view> -->
					</view>
				</view>
				<view class="navbar_title" style="width:100%;" :style="{textAlign:system?'left':'center'}">{{ navbarTitle }}</view>
				<view style="width:80upx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isBack: {
			//点击返回按钮时是否执行返回操作
			type: Boolean,
			default: true
		},
		isBackBtn: {
			//是否显示返回按钮
			type: Boolean,
			default: true
		},
		backTxt: {
			type: String,
			default: ''
		},
		navbarTitle: {
			type: String,
			default: '源未文化'
		}
	},
	data() {
		return {
			statusBarHeight: '',
			navHeight:'',
			system:true //true安卓 false ios
		};
	},
	methods: {
		goBack() {
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			if (this.isBack) {
				uni.navigateBack({
					delta: 1
				});
			}
			this.$emit('goBack');
		}
	},
	mounted() {
		let _this = this;
		uni.getSystemInfo({
			success(res) {
				if(res.system.includes('iOS')){
					_this.system = false
				}else{
					_this.system = true
				}
				_this.statusBarHeight = res.statusBarHeight;
				_this.navHeight = uni.upx2px(100) + res.statusBarHeight;
			}
		});
	}
};
</script>

<style scoped="" lang="less">
@font-face {
	font-family: 'iconfont'; /* project id 1035847 */
	src: url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.eot');
	src: url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.woff2') format('woff2'),
		url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.woff') format('woff'), url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.ttf') format('truetype'),
		url('https://at.alicdn.com/t/font_1035847_ne3azjcnkk.svg#iconfont') format('svg');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 20px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
	cursor: pointer;
}
.navbar {
	height: 100upx;
	line-height: 100upx;
	// border-bottom: 1px solid #ccc;
	.iconfont {
		font-size: 60upx;
		// font-weight:300;
	}
	.navbar_back {
		font-size: 40upx;
	}
	.navbar_title {
		font-size: 36upx;
		font-weight: bold;
	}
}
</style>
