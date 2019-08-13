<template>
	<view style="position:relative">
		<scroll-view
			class="scroll_view"
			:style="{ height: scrollHeight + 'px' }"
			:scroll-x="scrollX"
			:scroll-y="scrollY"
			:upper-threshold="upperT"
			:lower-threshold="lowerT"
			:scroll-top="scrollT"
			:scroll-left="scrollL"
			:scroll-with-animation="scrollWA"
			:enable-back-to-top="enableBTT"
			@scroll="scroll"
			@scrolltolower="scrolltolower"
			@scrolltoupper="scrolltoupper"
			@touchstart="touchstart"
			@touchmove="touchmove"
			@touchend="touchend"
			@touchcancel="touchend"
		>
			<view class="pull_refresh" :style="{ height: pullHeight + 'px', transform: 'rotate(' + downRotate + 'deg)' }" v-if="isPull">
				<view class="progress_animation rotate_animation"></view>
				<view class="pull_up_txt">下拉刷新</view>
			</view>
			<slot></slot>
			<view class="up_load" v-if="isUp">
				<view class="up_load_loading" v-if="isMore">
					<view class="progress_animation rotate_animation"></view>
					<view class="pull_up_txt">加载中</view>
				</view>
				<view v-else class="up_nodata pull_up_txt">没有更多了</view>
			</view>
		</scroll-view>
		<view v-if="isUseIdx" class="use_idx">
			<view>
				<view v-for="(item, index) in useIdxList" :key="index" @click="goIdx(index)">{{ index }}</view>
			</view>
		</view>
		<view v-if="goTopShow" @click="goTop" class="go_top"><view>返回顶部</view></view>
	</view>
</template>

<script>
// https://uniapp.dcloud.io/use?id=vue-%E7%BB%84%E4%BB%B6  组件里使用 slot 嵌套的其他组件时不支持 v-for
export default {
	props: {
		scrollX: {
			//允许横向滚动
			type: Boolean,
			default: false
		},
		scrollY: {
			//允许纵向滚动
			type: Boolean,
			default: true
		},
		upperT: {
			//距顶部/左边多远时（单位px），触发 scrolltoupper 事件
			type: Number,
			default: 50
		},
		lowerT: {
			//距底部/右边多远时（单位px），触发 scrolltolower 事件
			type: Number,
			default: 50
		},
		scrollTop: {
			//设置竖向滚动条位置 同时实现原有scroll-into-view功能
			type: Number,
			default: 0
		},
		scrollL: {
			//设置横向滚动条位置
			type: Number,
			default: null
		},
		scrollWA: {
			//在设置滚动条位置时使用动画过渡
			type: Boolean,
			default: false
		},
		enableBTT: {
			//iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
			type: Boolean,
			default: false
		},
		pullStatus: {
			//监听状态变化  true 显示下拉加载区域
			type: Boolean,
			default: false
		},
		upStatus: {
			//监听状态变化 true 显示上拉加载区域
			type: Boolean,
			default: false
		},
		dataStatus: {
			//监听数据状态变化  true有更多数据
			type: Boolean,
			default: false
		},
		isGoTop: {
			//是否显示返回顶部按钮
			type: Boolean,
			default: true
		},
		goTopVal: {
			// 滚动距离后显示按钮
			type: Number,
			default: 50
		},
		isUseIdx: {
			//是否使用索引
			type: Boolean,
			default: true
		},
		useIdxList: {
			//索引列表
			type: Array,
			default: []
		}
	},
	watch: {
		scrollTop(a, b) {
			// 辅助实现scroll-into-view功能
			this.scrollT = (a+this.oldScrollT);
		},
		// 监听数据变化,隐藏对应的显示区域
		pullStatus(a, b) {
			this.pullHeight = 0;
		},
		upStatus(a, b) {
			this.isUp = a;
		},
		dataStatus(a, b) {
			this.isMore = a;
		}
	},
	data() {
		return {
			scrollHeight: '',
			scrollT: this.scrollTop,
			oldScrollT: this.scrollTop,
			goTopShow: false, //返回顶部按钮显示
			touchstartObj: {},
			touchmoveObj: {},
			touchendObj: {},
			isPull: false, //是否显示下拉刷新区域
			pullHeight: 0, //下拉文字展示区域高度
			isUp: false, //是否显示上拉加载区域
			isMore: true ,//是否有更多数据
			idxActive:0 //当前索引
		};
	},
	methods: {
		scroll(e) {
			if (e.detail.scrollTop > this.goTopVal && this.isGoTop) {
				this.goTopShow = true;
			} else {
				this.goTopShow = false;
			}
			this.oldScrollT = e.detail.scrollTop;
			this.$emit('moveScroll', e);
		},
		scrolltolower(e) {
			this.$emit('moveTolower', e);
		},
		scrolltoupper(e) {
			this.$emit('moveToupper', e);
		},
		touchstart(e) {
			this.touchstartObj = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			};
			this.$emit('moveStart', this.touchstartObj);
		},
		touchmove(e) {
			let _this = this,
				moveX = e.changedTouches[0].clientX - this.touchstartObj.x,
				moveY = e.changedTouches[0].clientY - this.touchstartObj.y;
			if (moveY < 10) {
				return;
			} else {
				moveY = moveY > 50 ? 50 : moveY;
			}
			this.touchmoveObj = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			};
			uni.createSelectorQuery()
				.in(this)
				.select('.scroll_view')
				.fields(
					{
						scrollOffset: true,
						size: true
					},
					function(res) {
						if (res.scrollTop === 0) {
							_this.isPull = true;
							_this.pullHeight = moveY;
						}
					}
				)
				.exec();
		},
		touchend(e) {
			let _this = this,
				moveX = e.changedTouches[0].clientX - this.touchstartObj.x,
				moveY = e.changedTouches[0].clientY - this.touchstartObj.y;
			this.touchendObj = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			};
			_this.$emit('moveEnd', this.touchendObj);
		},
		goTop() {
			this.scrollT = this.oldScrollT;
			this.$nextTick(function() {
				this.scrollT = 0;
			});
		},
		goIdx(idx){
			if(this.idxActive === idx){
				return;
			}
			this.idxActive = idx;
			this.$emit("goIdx",idx)
		}
	},
	mounted() {
		let _this = this;
		uni.getSystemInfo({
			success(res) {
				// console.log(res);
				_this.scrollHeight = res.windowHeight;
			}
		});
	}
};
</script>

<style lang="less" scoped="">
.pull_refresh {
	position: relative;
	width: 100%;
	overflow: hidden;
	text-align: center;
	-webkit-transition: height 300ms;
	transition: height 300ms;
	font-size: 28upx;
	color: gray;
}
.up_load {
	position: relative;
	width: 100%;
	font-size: 28upx;
	color: gray;
	text-align: center;
	min-height: 60upx;
	.up_load_loading {
	}
	.up_nodata {
	}
}
// 下拉刷新/上拉加载文案显示
.pull_up_txt {
	height: 60upx;
	line-height: 60upx;
}
// 加载样式
.progress_animation {
	display: inline-block;
	width: 32upx;
	height: 32upx;
	border-radius: 50%;
	border: 2upx solid gray;
	border-bottom-color: transparent;
	vertical-align: middle;
}
// 旋转动画
.rotate_animation {
	-webkit-animation: rotateAnimation 0.6s linear infinite;
	animation: rotateAnimation 0.6s linear infinite;
}

@-webkit-keyframes rotateAnimation {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes rotateAnimation {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
.use_idx {
	position: relative;
	> view {
		position: fixed;
		background: #ccc;
		top: 20upx;
		right: 0upx;
		view {
			font-size: 30upx;
			width: 60upx;
			height: 60upx;
			text-align: center;
			line-height: 60upx;
			margin-bottom: 10upx;
		}
	}
}
.go_top {
	position: relative;
	> view {
		position: fixed;
		width: 80upx;
		background: #ccc;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 10upx;
		font-size: 30upx;
		bottom: 100upx;
		right: 20upx;
	}
}
</style>
