<template>
	<view class="modal" v-show="modalShow" @click="modalClick(false)">
		<view class="modal_content ">
			<view class="modal_show" style="" @tap.stop.prevent>
				<view style="" class="modal_top">
					<view class="modal_title  " style="height:100%">{{ title }}</view>
				</view>
				<view class=" modal_btn">
					<view  @click="modalClick(false)">{{ cancelTxt }}</view>
					<view  @click="modalClick(true)">{{ okTxt }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '是否保留编辑'
		},
		isShow: {
			type: Boolean,
			default: false
		},
		cancelTxt: {
			type: String,
			default: '删除'
		},
		okTxt: {
			type: String,
			default: '保留'
		}
	},
	watch: {
		isShow(newVal, oldVal) {
			this.modalShow = newVal;
		}
	},
	data() {
		return {
			modalShow: this.isShow
		};
	},
	methods: {
		modalClick(typ) {
			this.modalShow = false;
			this.$emit('modalClick', typ);
		}
	}
};
</script>

<style lang="less">
.modal {
	position: fixed;
	width: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.2);
	transition: all 2s;
	.modal_content {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
		.modal_show {
			width: 640upx;
			height: 343upx;
			background: #fff;
			.modal_top {
				height: 248upx;
				.modal_title {
					display: flex;
					justify-content: space-around;
					align-items: center;
					color: #202020;
					font-size: 34upx;
					font-weight: bold;
				}
			}
			.modal_btn {
				display: flex;
				> view {
					
					width: 50%;
					height: 95upx;
					line-height: 95upx;
					text-align: center;
					font-size: 30upx;
					&:first-child {
						background: #f3f3f3;
						color: #909090;
					}
					&:last-child {
						background: #202020;
						color: #ffffff;
					}
				}
			}
		}
	}
}
</style>
