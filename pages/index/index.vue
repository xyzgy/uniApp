<template>
	<view><uploadImage @click='uploadImage' count="2"  :isLimit="true" :isBase64="true" :isBasePrefix="true"/> </view>
</template>
<script>
import uploadImage from '@/components/upload-image.vue';
export default {
	components: {
		uploadImage
	},
	data() {
		return{
			
		}
	},
	methods:{
		uploadImage(r){
			console.log('rs',r)
		}
	}
};
</script>

<style lang="less"></style>
