<template>
	<view
		><screenShot @getSreenShot="getSreenShot">
			<image
				src="../../static/my.jpg"
				mode=""
				:style="{
					height: windowHeight + 'px',
					width: windowWidth + 'px'
				}"
			></image
		></screenShot>
	</view>
</template>
<script>
import screenShot from '@/components/screen-shot.vue';
export default {
	components: {
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
