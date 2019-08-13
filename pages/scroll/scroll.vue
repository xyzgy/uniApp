<template>
	<view>
		<xyzScrollView
			:pullStatus="pullStatus"
			:upStatus="upStatus"
			:dataStatus="dataStatus"
			:scrollTop="scrollTop"
			:useIdxList = "arrList"
			@moveStart="moveStart"
			@moveEnd="moveEnd"
			@moveTolower="moveTolower"
			@moveToupper="moveToupper"
			@goIdx="goIdx"
		>
			<view v-for="(item, index) in arrList" :key="index" :id="'v' + index">{{ item }}</view>
		</xyzScrollView>
	</view>
</template>

<script>
import xyzScrollView from '@/components/xyz-scroll-view.vue';
export default {
	components: {
		xyzScrollView
	},
	data() {
		return {
			arrList: [
				'0浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。',
				'1忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。',
				'2千呼万唤始出来，犹抱琵琶半遮面。转轴拨弦三两声，未成曲调先有情。弦弦掩抑声声思，似诉平生不得志。',
				'3低眉信手续续弹，说尽心中无限事。轻拢慢捻抹复挑，初为《霓裳》后《六幺》。大弦嘈嘈如急雨，小弦切切如私语。',
				'4嘈嘈切切错杂弹，大珠小珠落玉盘。间关莺语花底滑，幽咽泉流冰下难。冰泉冷涩弦凝绝，凝绝不通声暂歇。',
				'5别有幽愁暗恨生，此时无声胜有声。银瓶乍破水浆迸，铁骑突出刀枪鸣。曲终收拨当心画，四弦一声如裂帛。东船西舫悄无言，唯见江心秋月白。',
				'6沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。',
				'7曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。',
				'8今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故。门前冷落鞍马稀，老大嫁作商人妇。',
				'9商人重利轻别离，前月浮梁买茶去。去来江口守空船，绕船月明江水寒。夜深忽梦少年事，梦啼妆泪红阑干。',
				'10我闻琵琶已叹息，又闻此语重唧唧。同是天涯沦落人，相逢何必曾相识！我从去年辞帝京，谪居卧病浔阳城。',
				'11浔阳地僻无音乐，终岁不闻丝竹声。住近湓江地低湿，黄芦苦竹绕宅生。其间旦暮闻何物？杜鹃啼血猿哀鸣。',
				'12春江花朝秋月夜，往往取酒还独倾。岂无山歌与村笛？呕哑嘲哳难为听。今夜闻君琵琶语，如听仙乐耳暂明。',
				'13莫辞更坐弹一曲，为君翻作《琵琶行》。感我此言良久立，却坐促弦弦转急。凄凄不似向前声，满座重闻皆掩泣。',
				'14座中泣下谁最多？江州司马青衫湿。'
			],
			scrollTop: 0,
			pullStatus: false,
			upStatus: false,
			dataStatus: true
		};
	},
	computed: {},
	methods: {
		moveStart(r) {},
		moveEnd(r) {
			let _this = this;
			setTimeout(() => {
				_this.pullStatus = !_this.pullStatus;
			}, 2000);
		},
		moveTolower(r) {
			let _this = this;
			this.upStatus = true;
			setTimeout(() => {
				_this.dataStatus = false;
			}, 2000);
		},
		moveToupper(r) {
			console.log('到达顶部');
		},
		scrollIntoView(id) {
			let _this = this;
			uni.createSelectorQuery()
				.in(this)
				.select('#' + id)
				.boundingClientRect(function(res) {
					// 随机数防止出现跳转的间距相等情况
					_this.scrollTop = res.top + Math.random(0,1);

				})
				.exec();
		},
		goIdx(idx){
			this.scrollIntoView('v'+idx)
		}
	},
	onShow() {},
	onReady() {}
};
</script>

<style></style>
