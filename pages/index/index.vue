<template>
	<view style="padding:20px 0">
		<chooseImage/>
	</view>
</template>
<script>
import chooseImage from '@/components/xyz-choose-image.vue';
import screenShot from '@/components/screen-shot.vue';
export default {
	components: {
		chooseImage,
		screenShot
	},
	data() {
		return {
			windowWidth: '',
			windowHeight: ''
		};
	},
	onLoad() {
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
		getSreenShot(r) {
			// 获取截图路径
			console.log('r', r);
		}
	}
};
</script>

<style lang="less"></style>
