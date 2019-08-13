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
			:vertical="vertical"
			@change="dotsChange"
			:style="{height: height + 'rpx'}"
		>
			<swiper-item v-for="(item, index) in arrList" :key="index" @click="goNavigateTo(item.url, item.id)">
				<view style="display: flex;justify-content: space-around;background:#F3F3F3"><image :src="item.pic" style="width:750upx;" :style="{height: height + 'rpx'}" lazy-load></image></view>
			</swiper-item>
		</swiper>
		<view v-if="isDiyDots" style="position:absolute;width:100%;bottom:20upx;">
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
			// 是否显示小圆点
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
		vertical:{
			type: Boolean,
			default: false
		},
		isDiyDots: {
			// 是否自定义小圆点样式
			type: Boolean,
			default: true
		},
		arrList: {
			type: Array,
			default: []
		},
		height:{
			type: Number,
			default: 375
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
		goNavigateTo(url, id) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style scoped="" lang="less">
// 自定义小圆点样式
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
