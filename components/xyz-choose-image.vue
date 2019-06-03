<template>
	<view class=" chooseImage " style="display: flex;flex-wrap: wrap;">
		<view style="position: relative;" v-for="(item, index) in imgList" :key="index" :style="{ width: size + 'rpx', height: size + 'rpx' }">
			<image :src="imgList[index]" :style="{ width: size + 'rpx', height: size + 'rpx' }" @click="viewImg(imgList[index])"></image>
			<view class="icon_close " style="position: absolute;" @click="delImg(index)"><i class="iconfont " style="">&#xe635;</i></view>
		</view>
		<view v-if="imgList.length < num" class="text_center" @click="chooseImage">
			<image src="https://www.xyzgy.xyz/image/upload.png" mode="widthFix" :style="{ width: size + 'rpx' }"></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		size: {
			//图片的尺寸
			type: Number,
			default: 200
		},
		num: {
			//上传图片数量
			type: Number,
			default: 9
		},
		isSave: {
			//是否记录用户的选择记录
			type: Boolean,
			default: true
		},
		saveStr: {
			//记录用户的缓存字段
			type: String,
			default: 'chooseImage'
		},
		isBase64: { //是否转base64 受数据传输长度限制，不建议在组件中使用，如果一定要使用，在返回结果中自己转换
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			imgList: [],
			base64: ''
		};
	},
	methods: {
		chooseImage: async function() {
			let _this = this;
			await _this.getImage();
			this.$emit('chooseImage', _this.imgList);
		},
		getImage() {
			let _this = this;
			let _count = _this.num - _this.imgList.length;
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: _count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						if (_this.isBase64) {
							//#ifdef MP-WEIXIN
							uni.getFileSystemManager().readFile({
								filePath: res.tempFilePaths[0], //选择图片返回的相对路径
								encoding: 'base64', //编码格式
								success: function(ress) {
									//成功的回调
									console.log(ress)
									let base64 = 'data:image/jpeg;base64,' + ress.data;
									if (_this.imgList.length != 0) {
										_this.imgList = _this.imgList.concat(base64);
									} else {
										_this.imgList = [base64];
									}
								},
								fail:function(err){
									console.log(err)
								}
							});
							//#endif
							//#ifndef MP-WEIXIN
							if (_this.imgList.length != 0) {
								_this.imgList = _this.imgList.concat(res.tempFilePaths);
							} else {
								_this.imgList = res.tempFilePaths;
							}
							// 暂时没有基于chooseImaged解决方法
							// 							let r = new Blob(res.tempFilePaths, {
							// 								type: 'image/jpeg'
							// 							});
							// 							console.log(res.tempFilePaths)
							// 							console.log(r)
							// 							let reader = new FileReader();
							// 							reader.readAsDataURL(r);
							// 							reader.onload = function(e) {
							// 								console.info(reader.result);
							// 								let base64 = reader.result;

							// 								//
							// 							};
							//#endif
						} else {
							if (_this.imgList.length != 0) {
								_this.imgList = _this.imgList.concat(res.tempFilePaths);
							} else {
								_this.imgList = res.tempFilePaths;
							}
						}

						if (_this.isSave) {
							uni.setStorageSync(_this.saveStr, _this.imgList.join(','));
						}
						resolve(_this.imgList);
					}
				});
			});
		},
		delImg(idx) {
			this.imgList.splice(idx, 1);
			this.imgList = this.imgList;
			if (this.isSave) {
				uni.setStorageSync(this.saveStr, this.imgList.join(','));
			}
			this.$emit('delImg', this.imgList);
		},
		viewImg(path) {
			uni.previewImage({
				urls: this.imgList,
				current: path
			});
		}
	},
	onLoad() {
		if (this.isSave) {
			let str = uni.getStorageSync(this.saveStr);
			if (str != '') {
				str = str.split(',');
				if (str.length > this.num) {
					str = str.slice(0, this.num);
				}
				this.imgList = str;
			}
		} else {
			uni.removeStorageSync(this.saveStr);
		}
	}
};
</script>

<style lang="less" scoped="">
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
.chooseImage {
	> view {
		margin: 0 20px 20px 0;
	}
	.icon_close {
		width: 20px;
		height: 20px;
		right: -10px;
		top: -10px;
		.iconfont {
			background: #ccc;
			border-radius: 50%;
			padding: 4px;
			font-size: 10px;
		}
	}
}
</style>
