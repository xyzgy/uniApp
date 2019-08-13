<template>
	<view>
		<chooseImage :num="6" :size="150" @chooseImage="chooseImage" @delImg="chooseImage" :isSave="true" saveStr="chooseImage"
		 :isClear="hasChooseImg" />
		 <button type="primary" @click="submit">提交</button>
	</view>
</template>

<script>
	import chooseImage from '@/components/xyz-choose-image.vue';
	export default {
		components: {
			chooseImage
		},
		data() {
			return {
				hasChooseImg: '',
			}
		},
		methods: {
			async chooseImage(imgArr) {
				console.log(imgArr)
				this.hasChooseImg = imgArr;
				let arr = [];
				// 转base64  
				for (let i = 0; i < imgArr.length; i++) {
					arr.push(await this.toBase64(imgArr[i]))
				}
				
				this.submitImg = arr;
			},
			toBase64(path) {
				return new Promise((resolve, reject) => {
					uni.getFileSystemManager().readFile({
						filePath: path, //选择图片返回的相对路径
						encoding: 'base64', //编码格式
						success: function(ress) {
							//成功的回调
							let base64 = 'data:image/jpeg;base64,' + ress.data;
							resolve(base64)

						},
						fail: function(err) {
							reject(err);
						}
					});
				})
			},
			submit(){
				// 小程序setData 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。因此使用未声明变量
				console.log('图片信息 提交submitImg')
				console.log(this.submitImg)
			}
		}
	}
</script>

<style>

</style>
