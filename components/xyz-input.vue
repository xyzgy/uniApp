<template>
	<view>
		<input
			v-model="inputModel"
			:type="inputType"
			placeholder-style="color:#A6A6A6"
			:placeholder="placeholder"
			@blur="blur(inputModel)"
			@input="input(inputModel)"
			:maxlength="maxlength"
		/>
		<view style="display: flex;justify-content: space-between;font-size: 28upx;">
			<view style="color:red;font-weight: bold;">{{ validateTxt }}</view>
			<view style="text-align: right;color: #A6A6A6;" v-if="limit">{{ count }}/{{ maxlength }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		inputType: {
			type: String,
			default: 'text'
		},
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
			default: 'input'
		},
		value: {
			type: String, //limit值为true时，必须传该值
			default: ''
		},
		isValidate: {
			//是否校验输入内容是否正确
			type: Boolean,
			default: true
		},
		validateType: {
			type: String, //校验值类型
			default: ''
		}
	},
	watch: {
		value(newVal, oldVal) {
			this.inputModel = newVal;
			this.count = newVal.length;
		}
	},
	data() {
		return {
			count: 0,
			inputModel: this.value,
			validateTxt: ''
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
			this.inputModel = val;
			this.count = len;
			if (this.isSaveMess) {
				uni.setStorageSync(this.saveMessStr, val);
			}
			this.$emit('input', val);
		},
		blur(val) {
			if (this.isValidate) {
				if (this.validateType === 'phone') {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
					if (reg.test(val)) {
						this.validateTxt = '';
					} else {
						this.validateTxt = '请输入正确手机号码';
					}
					return;
				}
				if (this.validateType === 'email') {
					const reg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
					if (reg.test(val)) {
						this.validateTxt = '';
					} else {
						this.validateTxt = '请输入正确邮箱';
					}
					return;
				}
			}
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
