<template>
	<view>
		<xyzNavBar :isBack="false" :isBackBtn="false"  @goBack="goBack"></xyzNavBar>
		<view style="position:relative"><myTab :tabList="tabList" @tabSelect="tabSelect" :tabActiveIdx="tabActiveIdx" /></view>
		<view style="margin-top:80upx;">
			<view v-if="tabActiveIdx === 0">
				<!-- <open-data type="userAvatarUrl"></open-data> -->
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号</button> -->	
				<view @click="testRequest"><button type="primary" class="btn_style">测试</button></view>
				<userAuth/>
				<view style="padding:10upx 20upx;background:#fff"><myInput /></view>
				<mySwiper :arrList="masonryList" />
			</view>
			<view v-else-if="tabActiveIdx === 1">
				<chooseImage :num="6" :size="150" @chooseImage="chooseImage" @delImg="chooseImage" :isSave="true" saveStr="chooseImage" :isClear="hasChooseImg" />
			</view>
			<view v-else-if="tabActiveIdx === 2"><masonry :masonryList="masonryList" :isSize="false" :borderRadius="10" /></view>
			<view v-else="tabActiveIdx === 3">
				<myShare
					shareImg="https://www.xyzgy.xyz/image/xyz.jpg"
					title="canvas卡片生成"
					author="xyz"
					imgScan="https://www.xyzgy.xyz/image/xyz.jpg"
					:bottomType="0"
					:isWhiteSpace="false"
					:borderRadius="20"
					:shareImgW="574"
					:shareImgH="548"
					:padding="0"
					:bottomPadding="[40, 20]"
					@savePhoto="savePhoto"
				/>
			</view>
		</view>
	</view>
</template>
<script>
import chooseImage from '@/components/xyz-choose-image.vue';
import masonry from '@/components/xyz-masonry.vue';
import myShare from '@/components/xyz-share.vue';
import myTab from '@/components/xyz-tab.vue';
import mySwiper from '@/components/xyz-swiper.vue';
import myInput from '@/components/xyz-input.vue';
import userAuth from '@/components/xyz-user-auth.vue';
export default {
	components: {
		chooseImage,
		masonry,
		myShare,
		myTab,
		mySwiper,
		myInput,
		userAuth
	},
	data() {
		return {
			tabList: [
				{
					id: 0,
					label: '表单'
				},
				{
					id: 1,
					label: '选择图片'
				},
				{
					id: 2,
					label: '瀑布流'
				},
				{
					id: 3,
					label: '卡片分享'
				}
			],
			tabActiveIdx: 0,
			hasChooseImg: '',
			masonryList: [
				{
					id: 0,
					src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=184692748,713617392&fm=26&gp=0.jpg',
					size: [600, 200]
				},
				{
					id: 1,
					src: 'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg',
					size: [800, 600]
				},
				{
					id: 2,
					src: 'http://pic31.nipic.com/20130719/9885883_095141604000_2.jpg',
					size: [1200, 800]
				},
				{
					id: 3,
					src: 'http://img4.cache.netease.com/photo/0001/2006-07-14/2M0RCN0D00J60001.jpg',
					size: [400, 300]
				},
				{
					id: 4,
					src: 'http://img4.imgtn.bdimg.com/it/u=3811906947,4112515517&fm=26&gp=0.jpg',
					size: [500, 400]
				},
				{
					id: 6,
					src: 'http://img1.imgtn.bdimg.com/it/u=2436132757,841731780&fm=26&gp=0.jpg',
					size: [400, 800]
				},
				{
					id: 0,
					src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=184692748,713617392&fm=26&gp=0.jpg',
					size: [600, 200]
				},
				{
					id: 1,
					src: 'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg',
					size: [800, 600]
				},
				{
					id: 2,
					src: 'http://pic31.nipic.com/20130719/9885883_095141604000_2.jpg',
					size: [1200, 800]
				},
				{
					id: 3,
					src: 'http://img4.cache.netease.com/photo/0001/2006-07-14/2M0RCN0D00J60001.jpg',
					size: [400, 300]
				}
			]
		};
	},
	onLoad() {
		// uni.getSystemInfo({
		// 	success(res) {
		// 		// console.log(res);
		// 	}
		// });
		// this.$utils.navigator()
		// this.$utils.Toast()
	},
	methods: {
		async chooseImage(imgArr) {
			console.log(imgArr);
			let arr = [];
			for(let i=0;i<imgArr.length;i++){
				arr.push(await this.toBase64(imgArr[i]))
			}
			console.log(arr)		
		},
		toBase64(path){
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
		savePhoto(path) {},
		tabSelect(idx) {
			this.tabActiveIdx = idx;
		},
		async testRequest(){
			const config = {
				url: 'public_index',
				params: '',
				method: 'get',
				loading: false
			};
			
			
			let getResult = await this.$http(config);
			// console.log(this.$config.banner({}))
		},
		getPhoneNumber(e){
			console.log(e)
		}
	},
	onReachBottom() {
		this.masonryList = this.masonryList.concat(this.masonryList);
	}
};
</script>

<style lang="less">
page {
	background: #eee;
}
.tab {
	background: #fff;
}
</style>
