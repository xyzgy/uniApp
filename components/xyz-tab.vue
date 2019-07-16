<template>
	<view class="tab">
		<scroll-view scroll-x style="white-space:nowrap;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="tab_main" :class="tabLen ? 'flex_around' : ''">
				<view style="display: inline-block;" :class="index == tabIdx ? 'tab_active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)">
					{{ item.label }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			default: []
		},
		tabActiveIdx: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabIdx: 0,
			scrollLeft: 0
		};
	},
	computed: {
		tabLen() {
			return this.tabList.length > 5 ? false : true;
		}
	},
	watch: {
		tabActiveIdx(newValue, oldValue) {
			this.tabSelect(newValue);
		}
	},
	methods: {
		tabSelect(idx) {
			this.tabIdx = idx;
			this.scrollLeft = idx * 30;
			this.$emit('tabSelect', idx);
		}
	}
};
</script>
<style lang="less" scoped>
.flex_around {
	display: flex;
	justify-content: space-around;
}
.tab {
	.tab_main {
		font-size: 34upx;
		> view {
			padding: 0 20upx;
			height: 80upx;
			line-height: 80upx;
			&.tab_active {
				font-size: 36upx;
				font-weight: bold;
				color: red;
				border-bottom: 2upx solid red;
			}
		}
	}
}
</style>
