<template>
	<view style="position:relative;background:#fff;" :style="{height: (navHeight+statusBarHeight) + 'px'}">
		<view style="position:fixed;width:100%;z-index:999;top:0" :style="{height: navHeight + 'px', paddingTop: statusBarHeight + 'px',background:bgColor }">
			<view style="display: flex;align-items: center;" class="navbar">
				<view class="navbar_left" style="min-width:140upx;">
					<view v-if="isBackBtn" style="display: flex;align-items: center;" @click="goBack">
						<image src="/static/icon_left.png" mode="widthFix" style="width:60upx;height: 60upx;display: inline-block;"></image>
						<view v-if="backTxt">{{ backTxt }}</view>
					</view>
					<slot name="left"></slot>
				</view>
				<view class="navbar_center" style="width:100%;flex: 1; ">
					<slot name="center">{{ navbarTitle }}</slot>
				</view>
				<view style="min-width:140upx;"><slot name="right"></slot></view>
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
		},
		height:{
			type:Number,
			default:100
		},
		bgColor:{
			type: String,
			default: '#fff'
		}
	},
	data() {
		return {
			statusBarHeight: '',
			navHeight: uni.upx2px(this.height)	
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
				_this.statusBarHeight = res.statusBarHeight;
			}
		});
	}
};
</script>

<style scoped="" lang="less">
.navbar {
	height: 100upx;
	border-bottom: 1px solid #ccc;
	> view {
		display: flex;
		justify-content: center;
	}
	.navbar_left {
	}
	.navbar_center {
	}
}
</style>
