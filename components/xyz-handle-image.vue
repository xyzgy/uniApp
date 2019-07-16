<template>
	<view>
		<view class="cutShade">
			<view class="shadeTop" style="position: relative;" :style="{ height: shadowTH + 'rpx' }">
				<view class="" style="position: absolute;">
					<view class="topList" style="display: flex;justify-content: space-around;align-items: center;">
						<view v-for="(item, index) in tabList" :key="index" :class="tadIdx == index ? 'tabActive' : ''" @click="tabClick(index)">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<view class="shadeCenter " style="position: relative;" :style="{ height: cutCH + 'rpx' }">
				<view class="t_l"></view>
				<view class="t_r"></view>
				<view class="b_l"></view>
				<view class="b_r"></view>
			</view>
			<view class="shadeBottom " style="position: relative;" :style="{ height: cutBH + 'px' }">
				<view style="position: absolute;">
					<view class=" " style="position: relative;height: 100%;">
						<view style="position: absolute;width:100%;bottom: 42upx;">
							<view style="display: flex;justify-content: space-around;align-items: center;">
								<view
									class="text_center"
									style="width:180upx;height:64upx;line-height: 64upx;color:#fff;font-size: 26upx;font-weight: 400;border:1upx solid #fff;margin-top:24px"
									@click="chooseImage"
								>
									+ 更换封面
								</view>
								<view style="position: relative;"><button class="margin_auto btn_style" @click="cutImage">确定</button></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="position:fixed;bottom: 0;visibility: hidden;" :style="{ width: -cutImgW + 'rpx' }">
			<canvas canvas-id="cutImage" :style="{ width: cutImgW + 'rpx', height: cutCH + 'rpx' }"></canvas>
		</view>
		<view style="position:absolute;width:100%;top:0px;z-index: 9;">
			<movable-area style="width:750upx;" :style="{ height: movableAreaH + 'px' }">
				<movable-view x="0" scale scale-min="1" scale-max="3" direction="all" @scale="onScale" @change="onChange" :style="{ width: w + 'px', height: h + 'px' }">
					<image :src="imgSrc" :style="{ width: w + 'px', height: h + 'px' }"></image>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
import chooseImage from '@/components/xyz-choose-image.vue';
export default {
	components: {
		chooseImage
	},
	props: {
		imgType: {
			//图片保存格式
			type: String,
			default: 'jpg' //仅支持png/jpg
		}
	},
	data() {
		return {
			imgSrc: 'https://arthorize.com/img/dafault-bg.png',
			imgOldSrc: 'https://arthorize.com/img/dafault-bg.png',
			tabList: [{ title: '9:4', id: 0 }, { title: '9:9', id: 1 }, { title: '9:10', id: 2 }],
			tadIdx: 0,
			screenH: '',
			screenW: '',
			upx2px: '',
			dpr: '',
			cutBH: '',
			cutCH: 360,
			hasChooseImg: [],
			w: '',
			h: '',
			movableX: 0,
			movableY: 0,
			movableAreaH: '',
			movableScale: 1, //手动缩放图片比例
			movableType: true, //true 移动 false 缩放
			movOverH: 0, //包括超出部分可移动的高度
			shadowTH: 140, //阴影部分上方高度

			cutImgW: 750, //裁剪图片的宽度
			imgInfo: '', //原图信息
			initImgScale: 1, //图片显示在屏幕时的缩放比例
			imgScale: 1 //图片缩放比例
		};
	},
	methods: {
		chooseImage() {
			let _this = this;
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: function(res) {
					_this.imgSrc = res.tempFilePaths[0];
					_this.hasChooseImg = res.tempFilePaths;
					_this.imageInfo();
				}
			});
		},
		tabClick(idx) {
			this.tadIdx = idx;
			if (idx === 0) {
				this.cutCH = 360;
			} else if (idx === 1) {
				this.cutCH = 750;
			} else if (idx === 2) {
				this.cutCH = 850;
			}
			this.computerHeight();
		},
		async imageInfo() {
			let imgInfo = await this.getImageInfo(this.imgSrc);
			console.log(imgInfo)

			if (imgInfo) {
				this.w = uni.upx2px(this.cutImgW);
				this.h = uni.upx2px(this.cutImgW * (imgInfo.height / imgInfo.width));
				this.initImgScale = uni.upx2px(this.cutImgW) / imgInfo.width; //计算图片在页面750显示时候的缩放比值
				this.imgInfo = imgInfo;

				this.movOverH = this.h + this.h - uni.upx2px(this.cutCH);
			} else {
				this.w = uni.upx2px(this.cutImgW);
				this.h = uni.upx2px(this.cutCH);
			}

			
		},
		computerHeight() {
			let h = this.screenH - uni.upx2px(this.shadowTH) - uni.upx2px(this.cutCH);
			this.cutBH = h;
			this.movableAreaH = this.h + uni.upx2px(this.shadowTH);

		},
		cutImage() {
			let imgInfo = this.imgInfo;
			let path = imgInfo.path;
			let _this = this;
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			const ctx = uni.createCanvasContext('cutImage',_this);
			if (this.movableScale > 1) {
				// 放大
				// console.log(this.movableY);
				this.movableX = Math.abs(this.movableX) / this.movableScale;

				let rt = Math.abs(this.movableY) / this.movableScale;
				if (rt < uni.upx2px(this.shadowTH)) {
					this.movableY = Math.abs(this.movableY - uni.upx2px(this.shadowTH)) / this.movableScale;
				} else {
					this.movableY = 0;
				}
			} else if (this.movableScale < 1) {
				// 缩小
				// 禁止用户缩小  cutW与cutH值缩小对应的放大倍数
			} else {
				if (this.movableY < uni.upx2px(this.shadowTH)) {
					this.movableY = uni.upx2px(this.shadowTH) - this.movableY;
				} else {
					this.movableY = 0;
				}
			}

			let cutX = this.movableX / this.initImgScale, //在图片中裁剪开始坐标
				cutY = this.movableY / this.initImgScale,
				cutW = imgInfo.width / this.movableScale, //从开始坐标计算要裁剪图片的宽度 (不让用户缩小图片，因此就一种情况)
				cutH = uni.upx2px(this.cutCH) / this.initImgScale / this.movableScale,
				cutShowW = uni.upx2px(this.cutImgW), //在页面中显示图片的宽度
				cutShowH = uni.upx2px(this.cutCH);
			ctx.drawImage(path, cutX, cutY, cutW, cutH, 0, 0, cutShowW, cutShowH);

			ctx.draw(false, () => {
				uni.canvasToTempFilePath({
					canvasId: 'cutImage',
					fileType: _this.imgType,
					success: function(res) {
						console.log(res);
						prevPage.$vm.coverImage = res.tempFilePath;
						prevPage.$vm.isCoverEdit = true;
						uni.navigateBack();
					},
					fail(err) {
						uni.showToast({
							title: '截取失败',
							icon: 'none'
						});
					}
				});
			});
		},
		onChange: function(e) {
			// console.log(e)

			this.movableType = true;
			this.movableX = e.detail.x;
			this.movableY = e.detail.y;
		},
		onScale(e) {
			// console.log(e);
			this.movableType = false;
			this.movableX = e.detail.x;
			this.movableY = e.detail.y;
			this.movableScale = e.detail.scale;
		},
		async initPath(path, typ) {
			this.imgOldSrc = path;
			if (typ === 'true') {
				this.imgSrc = this.$const.imgPath + (await this.$store.dispatch('proxyImgPath', { path: path, w: 750, q: 80 }));
			} else {
				this.imgSrc = path;
			}
			await this.imageInfo();
			
			this.computerHeight();
		},
		async getImageInfo(path) {
			return  new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: path,
					success: function(info) {
						resolve(info)
					},
					fail(err) {
		
						reject(err)
					}
				});
			})
		},
	},
	mounted() {
		let _this = this;
		uni.getSystemInfo({
			success(res) {
				_this.statusBarHeight = res.statusBarHeight;
				console.log(res);
				_this.screenH= res.windowHeight;
				_this.screenW= res.windowWidth;
				_this.upx2px= res.windowWidth / 750;
				_this.dpr=res.pixelRatio;
				
				_this.initPath('http://www.mangowed.com/uploads/allimg/150327/1-15032H24K0149.jpg', false);

			}
		});
		
	}
};
</script>

<style lang="less" scoped="">
.cutShade {
	> view {
		width: 750upx;
	}
	.shadeTop > .absolute,
	.shadeBottom > .absolute {
		width: 100%;
		height: 100%;
		z-index: 10;
		background: rgba(32, 32, 32, 0.8);
	}
	.shadeTop {
		> .absolute {
			border-bottom: 1upx solid #fff;
		}

		.topList {
			
			height: 100%;
			view {
				width: 110upx;
				height: 56upx;
				line-height: 56upx;
				text-align: center;
				color: #818181;
				font-size: 32upx;
				font-weight: 500;
				border: 1px solid #818181;
				&.tabActive {
					color: #fff;
					border: 1px solid #fff;
				}
			}
		}
	}
	.shadeCenter {
		> view {
			width: 29upx;
			height: 29upx;
			position: absolute;
			z-index: 99;
			&.t_l {
				top: -1upx;
				left: 0upx;
				border-top: 4upx solid #fff;
				border-left: 4upx solid #fff;
			}
			&.t_r {
				top: -1upx;
				right: 0px;
				border-top: 4upx solid #fff;
				border-right: 4upx solid #fff;
			}
			&.b_l {
				bottom: -1upx;
				left: 0upx;
				border-bottom: 4upx solid #fff;
				border-left: 4upx solid #fff;
			}
			&.b_r {
				bottom: -1upx;
				right: 0px;
				border-bottom: 4upx solid #fff;
				border-right: 4upx solid #fff;
			}
		}
	}
	.shadeBottom {
		> .absolute {
			border-top: 1upx solid #fff;
		}
	}
}
</style>
