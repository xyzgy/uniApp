<template>
	<view>
		<view class="absolute" id="capture" style="border:1px solid red"><slot></slot></view>
		<view
			class="fixed canvasImg"
			:style="{
				height: windowHeight + 'px',
				width: windowWidth + 'px'
			}"
			v-if="canvasImg.isDis"
		>
			<view class="relative">
				<view class="absolute icon_close" @click="closeSreenShot"><image src="/static/clear.png" mode=""></image></view>
				<view class="absolute">
					<image
						:src="canvasImg.imgSrc"
						mode=""
						:style="{
							height: windowHeight - 40 + 'px',
							width: windowWidth - 40 + 'px'
						}"
					></image>
				</view>
			</view>
		</view>
		<view class="absolute icon_download" @click="getSreenShot" :style="{ display: iconDisplay }"><image src="/static/download.png" mode=""></image></view>
	</view>
</template>
<script>
// 引入html2canvas截图插件
// 不支持iframe
// 不支持跨域图片
// 不能在浏览器插件中使用
// 部分浏览器上不支持SVG图片
// 不支持Flash
import html2canvas from '@/common/html2canvas.js';
export default {
	data() {
		return {
			windowHeight: '',
			windowWidth: '',
			canvasImg: {
				imgSrc: '',
				isDis: false
			},
			iconDisplay: 'block'
		};
	},
	created() {
		let _this = this;
		uni.getSystemInfo({
			success: function(res) {
				_this.windowHeight = res.windowHeight;
				_this.windowWidth = res.windowWidth;
			},
			fail: function(err) {
				console.log(err);
			}
		});
	},
	methods: {
		getSreenShot() {
			let _this = this;
			let canvasImgConfig = {
				width: _this.windowWidth, //canvas窗口宽度
				height: _this.windowHeight, //canvas窗口高度

			};
			// _this.iconDisplay = 'none';
			// uni.createSelectorQuery() //创建节点查询器
			// uni.createSelectorQuery().select('#capture') //选择第一个匹配节点
			// uni.createSelectorQuery().selectAll('#capture') //选择匹配所有节点
			
			// uni.createSelectorQuery().select('#capture').boundingClientRect(function(){}) //获取节点信息
			// uni.createSelectorQuery().exec(function(){}) //执行所有请求,以数组格式返回

			uni.createSelectorQuery().select('#capture').boundingClientRect(function(rect){
				console.log(rect)
			}).exec(function(res){
				console.log(res)
			})
// 			html2canvas(uni.createSelectorQuery().select('#capture'), canvasImgConfig).then(canvas => {
// 				let imgSrc = canvas.toDataURL('image/jpeg');
// 				_this.iconDisplay = 'none';
// 				_this.canvasImg.isDis = true;
// 				_this.canvasImg.imgSrc = imgSrc;
// 				uni.showToast({
// 					title: '长按图片保存至本地',
// 					icon: 'none',
// 					duration: 2000
// 				});
// 
// 				_this.$emit('getSreenShot', imgSrc);
// 			});
		},
		closeSreenShot() {
			this.canvasImg.isDis = false;
			this.iconDisplay = 'block';
		}
	}
};
</script>

<style lang="less">
.fixed {
	position: fixed;
}
.absolute {
	position: absolute;
}
.canvasImg {
	background: rgba(102, 102, 102, 0.6);
	z-index: 99;
	image {
		margin: 40upx 40upx 0 40upx;
	}
}
.icon_close {
	z-index: 999;
	right: -20upx;
	top: -20upx;
	image {
		width: 40upx;
		height: 40upx;
	}
}
.icon_download {
	width: 60upx;
	height: 60upx;
	z-index: 999;
	bottom: 100upx;
	right: 40upx;
	image {
		width: 60upx;
		height: 60upx;
	}
}
</style>
