<template>
	<view>
		<view v-if="textarea">
			<textarea
				v-model="textareaModal"			
				placeholder-style="color:#A6A6A6"
				:placeholder="placeholder"
				@input="input(textareaModal)"
				:maxlength="maxlength"
			/>
			<view style="text-align: right;color: #A6A6A6;"  v-if="limit">{{ count }}/{{ maxlength }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		placeholder: {
			//顶部placeholder
			type: String,
			default: '输入作品名称...'
		},
		maxlength: {
			//顶部字数限制
			type: Number,
			default: 150
		},
		limit: {
			//是否显示统计字数
			type: Boolean,
			default: true
		},
		isSaveMess: {
			//是否保留用户信息
			type: Boolean,
			default: true
		},
		saveMessStr: {
			//缓存字段
			type: String,
			default: 'textarea'
		},
		value: {
			type: String, //limit值为true时，必须传该值
			default: ''
		},
		textarea:{
			//ios中必须条件判断一下，否则input事件不出发，不知道为啥
			type: Boolean,
			default: true
		}
	},
	watch: {
		value(newVal, oldVal) {
			this.textareaModal = newVal;
			this.count = newVal.length;

		}
	},
	data() {
		return {
			count: 0,
			textareaModal: this.value
		};
	},
	methods: {
		input(val) {
			let len = val.length,
				maxlength = Number(this.maxlength);
			if (this.limit) {
				if (len === maxlength) {
					this.count = maxlength;
					uni.showToast({
						icon: 'none',
						title: '超出字数限制'
					});
				}
			}
			this.textareaModal = val;
			this.count = len;
			if (this.isSaveMess) {
				uni.setStorageSync(this.saveMessStr, val);
			}
			this.$emit('input', val);
		},
		initStroge() {
			let getStroge = uni.getStorageSync(this.saveMessStr);
			if (getStroge !== '') {
				this.input(getStroge);
			}
		}
	},
	mounted() {
		if (this.isSaveMess) {
			this.initStroge();
		}
	}
};
</script>

<style></style>
