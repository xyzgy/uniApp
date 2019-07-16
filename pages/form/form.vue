<template>
	<view>
		<!-- <xyzNavBar :isBackBtn="false"></xyzNavBar> -->
		
		<!-- <view @click="nextpage">下一个页面</view>
		<xyzInput @input="inputChange" placeholder="输入6位短信验证码" value="123" :limit="true" :isSaveMess="false" />
		<xyzTextarea @input="inputChange" placeholder="输入6位短信验证码" :limit="true" :isSaveMess="false" /> -->
		<!-- <xyzHandleImage/> -->
		<xyzHandleTt canRotate="false" stretch="x" lock="x" rectWidth="750upx" rectHeight="360upx" @upload="myUpload" avatarSrc="http://www.mangowed.com/uploads/allimg/150327/1-15032H24K0149.jpg" avatarStyle="width: 750upx; height: 360upx; border-radius:0"/>
	</view>
</template>
<script>
import xyzInput from '@/components/xyz-input.vue';
import xyzTextarea from '@/components/xyz-textarea.vue';
import xyzHandleImage from '@/components/xyz-handle-image.vue';
import xyzHandleTt from '@/components/xyz-img-tt.vue';
export default {
	components: {
		xyzInput,
		xyzTextarea,
		xyzHandleImage,
		xyzHandleTt
	},
	data() {
		return {};
	},
	methods: {
		nextpage() {
			uni.navigateTo({
				url: '/pages/test/test'
			});
		},
		inputChange(v){
			console.log(v)
		},
		myUpload(r){
			console.log(r)
		}
	}
};
</script>

<style lang="less"></style>
