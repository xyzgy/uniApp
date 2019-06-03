<template>
	<view  style="">
		<view style="display: flex;" class="masonry ">
			<view >
				<image
					v-for="(item, index) in imgLeft"
					:key="index"
					:src="item.src"
					:mode="mode"
					:style="{ width: imgWidth + 'rpx' ,borderRadius:borderRadius+'rpx'}"
					lazy-load
				></image>
			</view>
			<view>
				<image
					v-for="(item, index) in imgRight"
					:key="index"
					:src="item.src"
					:mode="mode"
					:style="{ width: imgWidth + 'rpx',borderRadius:borderRadius+'rpx' }"
					lazy-load
				></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			default: 'widthFix' //若给定图片宽高，设置scaleToFill
		},
		imgWidth: {
			type: Number,
			default: 340 //若给定图片宽高，设置scaleToFill
		},
		masonryList: {
			type: Array,
			default: []
		},
		isSize:{ //图片是否有图片宽高信息
			type:Boolean,
			default:true
		},
		borderRadius:{ //图片圆角
			type: Number,
			default: 0
		}			
	},
	data() {
		return {
			imgLeft: [], //左侧图片列表
			imgRight: [], //右侧图片列表
			leftHeight: 0, //左侧高度
			rightHeight: 0 //右侧高度
		};
	},
	watch: {
		masonryList(newVal, oldVal) {
			this.handleData(newVal);
		}
	},
	methods: {
		handleData(arr) {
			arr.forEach(async (v, k) => {
				let imgHeight;
				if(this.isSize){
					imgHeight = parseInt((this.imgWidth * Number(v.size[1])) / Number(v.size[0]));
				}else{
					let info = await this.getImageInfo(v.src);
					imgHeight = parseInt((this.imgWidth * Number(info[1])) / Number(info[0]));
				}
				let obj = {
					id: v.id,
					src: v.src
				};
				//左侧>右侧高度
				if (this.leftHeight > this.rightHeight) {
					this.imgRight.push(obj);
					this.rightHeight = this.rightHeight + imgHeight;
				} else {
					this.imgLeft.push(obj);
					this.leftHeight = this.leftHeight + imgHeight;
				}
			});
		},
		async getImageInfo(path) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: path,
					success: function(info) {
						// console.log(image)
						resolve([info.width,info.height])
					},
					fail(err) {

						reject(err)
					}
				});
			})
		},
	},
	onLoad() {
		this.handleData(this.masonryList)
	}
};
</script>

<style lang="less">
.masonry {
	
		> view {
			width: 350px;
			text-align: center;
			image {
				margin-bottom: 8px;
				will-change: transform;
			}
		}
	
}
</style>
