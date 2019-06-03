<template>
	<view class="canvas" :style="{ width: w + 'px', margin: '0 auto' }">
		<canvas canvas-id="testCanvas" :style="{ width: w + 'px', height: h + 'px' }"></canvas>
		<view v-if="isBtn"  class="savePhoto " @click="savePhoto" :style="{ width: w + 'px' }">保存到相册</view>
	</view>
</template>

<script>
export default {
	props: {
		isWhiteSpace: {
			//是否留白处理
			type: Boolean,
			default: true
		},
		padding: {
			//四周留白距离
			type: Number,
			default: 65
		},
		borderRadius: {
			//圆角度数 0表示没有 >0表示圆角度数
			type: Number,
			default: 0
		},
		shareImg: {
			//分享图片地址
			type: String,
			default: ''
		},
		shareImgW: {
			//分享图片宽
			type: Number,
			default: 370
		},
		shareImgH: {
			//分享图片高
			type: Number,
			default: 410
		},
		imgScan: {
			//生成卡片右下角二维码
			type: String,
			default: '../../static/image/xcx.png'
		},
		imgScanW: {
			//二维码大小
			type: Number,
			default: 140
		},
		imgType: {
			//图片保存格式
			type: String,
			default: 'png' //仅支持png/jpg
		},
		title: {
			type: String,
			default: '源未文化'
		},
		author: {
			type: String,
			default: '源未'
		},
		bottomH: {
			type: Number, //底部文字区域总高度
			default: 220
		},
		bottomPadding: {
			//底部内容区域四周留白 准确来说是上和左，底部留白是由bottomH决定
			type: Array,
			default: [40, 20]
		},
		bottomType: {
			//底部作者区域显示类型 0 作者|名字 1 ·作者
			type: Number,
			default: 0
		}
	},

	data() {
		return {
			isShow: false,
			isScreen: false,
			srcImg: '',
			w: '',
			h: '',
			isBtn: false
		};
	},
	methods: {
		showScreen() {
			let _this = this;
			if (this.shareImg != '') {
				_this.isScreen = true;
				_this.isShow = true;

				uni.showLoading({
					title: '正在努力生成中'
				});
				this.drawImage();
			} else {
				uni.showToast({
					icon: 'none',
					title: '图片路径无效'
				});
			}
		},
		savePhoto() {
			let _this = this;
			uni.showLoading({
				title: '正在保存中'
			});
			uni.canvasToTempFilePath({
				canvasId: 'testCanvas',
				fileType: _this.imgType,
				success: function(res) {
					// console.log(res)
					uni.hideLoading();
					_this.srcImg = res.tempFilePath;
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res1) {
							_this.$emit('savePhoto', res.tempFilePath);
							uni.showToast({
								title: '保存成功'
							});
						},
						fail(err) {
							uni.showToast({
								icon: 'none',
								title: '保存失败'
							});
							uni.hideLoading();
						},
						complete() {
							
						}
					});
				},
				fail(err) {
					uni.hideLoading();
					console.log(err);
				}
			});
		},
		drawRoundRect(ctx, x, y, w, h, r, lineWidth, color) {
			ctx.beginPath();
			// ctx.fillStyle = 'transparent';
			// 左上角
			ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

			// 右上角
			ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

			// 	// 右下角
			ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

			// 左下角
			ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
			ctx.closePath();
			// ctx.lineWidth = lineWidth;
			// if (color !== '') {
			ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
			ctx.fillStyle = color;
			// }
			ctx.stroke();
			ctx.fill();
			ctx.clip();
		},
		async drawImage() {
			let _this = this;
			let imgInfo = await _this.getImageInfo(_this.shareImg);
			let imgScanInfo = await _this.getImageInfo( _this.imgScan );
			let r = [imgInfo.width, imgInfo.height];
			let path = imgInfo.path,
				imgScanPath = imgScanInfo.path;

			let canvas_x_position = _this.padding,
				canvas_y_position = _this.padding; //开始绘制区域左上角顶点坐标


			if (_this.isWhiteSpace) {
				if (r[0] < _this.shareImgW) {
					canvas_x_position = _this.padding + Math.floor((_this.shareImgW - r[0]) / 2); // 横向需要补的留白区域  有空白区域时，绘制图片的左侧间距需要重新计算
				} else if (r[0] > _this.shareImgW) {
					r[1] = _this.shareImgW / (r[0] / r[1]); //以宽为基准，等比缩小
					r[0] = _this.shareImgW;
				} else {
					r[0] = _this.shareImgW;
				}

				if (r[1] < _this.shareImgH) {
					canvas_y_position = canvas_y_position + Math.floor((_this.shareImgH - r[1]) / 2);
					_this.bottomPadding[0] = canvas_y_position; //高度较小时，底部高度重新定义
					canvasH = _this.shareImgH;
				} else if (r[1] > _this.shareImgH) {
					//以高为基准，等比缩小
					r[0] = _this.shareImgH * (r[0] / r[1]);
					r[1] = _this.shareImgH;
					canvas_x_position = _this.padding + Math.floor((_this.shareImgW - r[0]) / 2); // 高度发生改变，绘制图片的左侧间距需要重新计算
				} else {
					canvasH = _this.shareImgH;
				}
			} else {
				if (r[0] !== _this.shareImgW) {
					r[1] = (_this.shareImgW * Number(r[1])) / Number(r[0]);
					r[0] = _this.shareImgW;
				}
				if (r[1] > _this.shareImgH) {
					r[1] = _this.shareImgH;
				} else {
					r[1] = _this.shareImgH;
				}
			}
			//canvas宽度和高度
			let canvasW = canvas_x_position + r[0] + canvas_x_position, //计算canvas宽 左右空白
				canvasH = canvas_y_position + r[1] + canvas_y_position + _this.bottomH; //计算canvas高 上 + 下部分文本区域

			_this.w = uni.upx2px(canvasW);
			_this.h = uni.upx2px(canvasH);

			let scanPositionX = canvasW - _this.imgScanW - _this.bottomPadding[1]; //计算二维码距离左侧位置
			let bottomPositionY = canvas_y_position + r[1] + _this.bottomPadding[0]; //下半部分距离图片高度


			const ctx = uni.createCanvasContext('testCanvas');

			ctx.setFillStyle('rgba(255, 255, 255, 0)');

			ctx.fillRect(0, 0, uni.upx2px(canvasW), uni.upx2px(canvasH));
			// 绘制圆角

			_this.drawRoundRect(ctx, 0, 0, uni.upx2px(canvasW), uni.upx2px(canvasH), uni.upx2px(_this.borderRadius), 2, 'white');

			//绘制第一张图片

			ctx.drawImage(path, uni.upx2px(canvas_x_position), uni.upx2px(canvas_y_position), uni.upx2px(r[0]), uni.upx2px(r[1]));

			// 绘制下半部分
			// 设置图片描述/图片标题
			ctx.setFontSize(uni.upx2px(32));
			ctx.setFillStyle('#31303B');
			ctx.fillText(_this.title, uni.upx2px(_this.bottomPadding[1]), uni.upx2px(bottomPositionY + 32)); //32为字体大小
			// 绘制作者名称
			ctx.setFontSize(uni.upx2px(28));
			ctx.setFillStyle('#A6A6A6');
			if (_this.bottomType === 0) {
				ctx.fillText('作者 | ' + _this.author, uni.upx2px(_this.bottomPadding[1]), uni.upx2px(bottomPositionY + 28 + 100), uni.upx2px(scanPositionX));
			} else {
				ctx.fillText('· ' + _this.author, uni.upx2px(_this.bottomPadding[1]), uni.upx2px(bottomPositionY + 28 + 100), uni.upx2px(scanPositionX));
			}
			ctx.drawImage(imgScanPath, uni.upx2px(scanPositionX), uni.upx2px(bottomPositionY), uni.upx2px(_this.imgScanW), uni.upx2px(_this.imgScanW));

			setTimeout(function() {
				ctx.draw();
				_this.isBtn = true;
				uni.hideLoading();
			}, 2000);
		},
		async getImageInfo(path) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: path,
					success: function(info) {
						// console.log(image)
						resolve(info)
					},
					fail(err) {
		
						reject(err)
					}
				});
			})
		},
	},
	onLoad() {
		this.showScreen()
	}
};
</script>

<style lang="less" scoped="">
.canvas {
	.savePhoto {
		margin-top: 20upx;
		height: 90upx;
		line-height: 90upx;
		color: #000;
		background: #fff;
		font-weight: bold;
		font-size: 36upx;
		border-radius: 20upx;
		text-align: center;
	}
}
</style>
