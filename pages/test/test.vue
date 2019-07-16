<template>
	<view>
		<xyzNavBar :isBack="false" @goBack="goBack"></xyzNavBar>
		<xyzModal :isShow="modalShow" @modalClick="modalClick" cancelTxt="否" okTxt="是"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow:false
			}
		},
		methods: {
			goBack(){
				this.modalShow = true;				
			},
			modalClick(typ){
				console.log(typ)
				if(typ){
					
				}
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
