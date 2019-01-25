<template>
	<view class="uploadImage">
		<view class="flex flex_wrap showImage" v-if="showImage">
			<view v-for="(item, index) in showImageSrc" :key="index" class="image_view">
				<view class="relative">
					<!-- #ifdef MP-WEIXIN -->
					<icon
						class="absolute icon"
						type="clear"
						@click="clearSelectImage(index)"
					></icon>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<image
						src="../../static/clear.png"
						class="absolute icon"
						@click="clearSelectImage(index)"
						style="width: 40upx;height: 40upx;"
					></image>
					<!-- #endif -->
					<image class="absolute" :src="item" mode="" @click="selectImage"></image>
				</view>
			</view>
		</view>

		<view v-else class="chooseImage" style="" @click="selectImage">
			<view class="flex">
				<view class="border_right border_bottom"></view><view class="border_bottom"></view>
			</view>
			<view class="flex"> <view class="border_right"></view> <view class=""></view> </view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 图片裁剪,缩放模式
		mode: {
			type: String,
			default: 'scaleToFill'
		},
		// 是否将图片路径转为base64
		isBase64: {
			type: [Boolean, String],
			default: true
		},
		// 最后返回的base64位字符串是否添加前缀 'data:image/jpeg;base64,''
		isBasePrefix: {
			type: [Boolean, String],
			default: true
		},
		// 上传图片数量
		count: {
			type: [Number, String],
			default: 1
		},
		//是否限制图片数量，微信限制最多9张图片，true 最多可选取指定数量，false可多次选择，每次都可选择指定数量
		isLimit: {
			type: [Boolean, String],
			default: true
		}
	},
	data() {
		return {
			showImage: false,
			showImageSrc: []
		};
	},
	watch: {
		showImageSrc() {
			if (this.showImageSrc.length < 1) {
				this.showImage = false;
				return;
			}
		}
	},
	onLoad() {},
	methods: {
		selectImage: async function() {
			let _this = this,
				imageLength = _this.showImageSrc.length;
			if (imageLength >= _this.count) {
				uni.showToast({
					title: `最多选取${_this.count}张图片`,
					icon: 'none',
					duration: 1500
				});
				return;
			} else {
				let getR = await this.getImage();
				if (_this.isBase64) {
					getR = await _this.getBase64(getR);
				}
				this.$emit('click', getR);
			}
		},
		clearSelectImage: async function(idx) {
			this.showImageSrc.splice(idx, 1);
			let getR = await this.getBase64(this.showImageSrc);
			this.$emit('click', getR);
		},
		getImage() {
			let _this = this,
				imageLength = _this.showImageSrc.length;
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: _this.isLimit ? _this.count - imageLength : _this.count,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						_this.showImage = true;
						_this.showImageSrc = _this.showImageSrc.concat(res.tempFilePaths);
						resolve(_this.showImageSrc);
					}
				});
			});
		},
		toBase64(r) {
			let _this = this;
			return new Promise((resolve, reject) => {
				//#ifndef MP-WEIXIN
				r = new Blob([r], {
					type: 'image/jpeg'
				});
				let reader = new FileReader();
				reader.readAsDataURL(r);
				reader.onload = function(e) {
					console.info(reader.result);
					let base64 = reader.result;
					base64 = _this.isBasePrefix
						? base64
						: base64.replace('data:image/jpeg;base64,', '');
					resolve(reader.result);
				};

				//#endif
				//#ifdef MP-WEIXIN
				uni.getFileSystemManager().readFile({
					filePath: r, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => {
						console.log('isBasePrefix', this.isBasePrefix);
						let base64 = _this.isBasePrefix
							? 'data:image/jpeg;base64,' + res.data
							: res.data;
						resolve(base64);
					}
				});
				//#endif
			});
		},
		getBase64: async function(imageArr) {
			let _this = this,
				getImageSrc = _this.showImageSrc,
				arr = [];
			for (let k in imageArr) {
				let getR = await _this.toBase64(imageArr[k]);
				arr.push(getR);
			}
			return arr;
		}
	}
};
</script>

<style lang="less">
@borderWidth: 2upx;
@borderColor: #ccc;
@textColor: #ccc;
@textColor1: #fff;
@bgColor: #ccc;
.flex {
	display: flex;
	&.flex_wrap {
		flex-wrap: wrap;
	}
}
.relative {
	position: relative;
}
.absolute {
	position: absolute;
}
.uploadImage {
	.border_left {
		border-left: @borderWidth solid @borderColor;
	}
	.border_right {
		border-right: @borderWidth solid @borderColor;
	}
	.border_top {
		border-top: @borderWidth solid @borderColor;
	}
	.border_bottom {
		border-bottom: @borderWidth solid @borderColor;
	}
	.showImage {
		// border: @borderWidth solid @borderColor;
		// 		width: 200upx;
		// 		height: 200upx;
		.image_view {
			padding: 20upx 0 0 20upx;
			max-width: 33%;
			height: 200upx;
			view.relative {
				width: 200upx;
				image {
					width: 200upx;
					height: 200upx;
				}
				/* #ifdef MP-WEIXIN */
				.icon {
					z-index: 99;
					top: -12upx;
					right: -12upx;
				}
				/* #endif */
				/* #ifndef MP-WEIXIN */
				.icon {
					top: -20upx;
					right: -20upx;
					z-index: 99;
				}
				/* #endif */
			}
		}
	}
	.chooseImage {
		border: @borderWidth solid @borderColor;
		width: 120upx;
		height: 120upx;
		padding: 40upx;
		.flex {
			view {
				width: 60upx;
				height: 60upx;
			}
		}
	}
}
</style>
