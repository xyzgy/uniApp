<template>
	<view style="position:relative">
		<swiper
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor"
			:indicator-active-color="indicatorActiveColor"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			:circular="circular"
			@change="dotsChange"
			style="height: 477upx;"
		>
			<swiper-item v-for="(item, index) in arrList" :key="index" @click="goWebView(item.link, item.type)">
				<view style="display: flex;justify-content: space-around;background:#F3F3F3">
					<image :src="item.src" style="width:750upx;height: 477upx;" lazy-load></image>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="isDiyDots" style="position:absolute;width:100%;bottom:10upx;">
			<view style="display: flex;justify-content: space-around;">
				<view style="display: flex;" class="swiper_dots"><view v-for="(item, index) in arrList" :key="index" :class="dotIdx == index ? 'dot_active' : ''"></view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		indicatorDots: {
			type: Boolean,
			default: false
		},
		indicatorColor: {
			type: String,
			default: '#C7C7C7'
		},
		indicatorActiveColor: {
			type: String,
			default: '#31303B'
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 4000
		},
		duration: {
			type: Number,
			default: 500
		},
		circular: {
			type: Boolean,
			default: true
		},
		isDiyDots:{
			// 是否自定义小圆点样式
			type: Boolean,
			default: true
		},
		arrList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			dotIdx: 0
		};
	},
	methods: {
		dotsChange(e) {
			this.dotIdx = e.detail.current;
		},
		goWebView(link, type) {
			if (type === 0) {
				uni.navigateTo({
					url: '/pages/webView/webView?link=' + link
				});
			} else if (type === 1) {
				uni.navigateTo({
					url: link
				});
			}
		}
	}
};
</script>

<style scoped="" lang="less">
.swiper_dots {
	> view {
		width: 16upx;
		height: 4upx;
		background: rgba(49, 48, 59, 1);
		&.dot_active {
			background: rgba(199, 199, 199, 1);
		}
	}
}
</style>
