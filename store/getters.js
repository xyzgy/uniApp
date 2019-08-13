// 计算属性 可用来全局监听某个属性值变化
const getters = {
	nickName: state => {
		return state.nickName
	},
	myToken: state => {
		return state.token
	}
}
export default getters
