const Toast = function({
	title ='请输入提示内容',
	icon = 'none',
	duration = 2000
}={}) {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration
	})
}
const navigator = function({
	type = 1,
	url,
	time = 0
}={}) {
	if(!url){
		return uni.showModal({
			content: '未填写跳转地址',
			showCancel: false
		})
	}
	switch (type) {
		case 1:
			//跳转至非tabBar页面
			setTimeout(function() {
				uni.navigateTo({
					url: url
				});
			}, time)
			break;
		case 2:
			// 关闭当前页面，跳转到应用内的某个页面。
			setTimeout(function() {
				uni.redirectTo({
					url: url
				});
			}, time)
			break;
		case 3:
			// 关闭所有页面，打开到应用内的某个页面。
			setTimeout(function() {
				uni.reLaunch({
					url: url
				});
			}, time)
			break;
		case 4:
			// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			setTimeout(function() {
				uni.switchTab({
					url: url
				});
			}, time)
			break;
		case 5:
			// 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
			setTimeout(function() {
				uni.navigateBack({
					delta: parseInt(url)
				});
			}, time)
			break;

	}
}
// 获取图片信息
const getImageInfo = async function({
	src
}={}) {
	if(!src){
		return uni.showModal({
			content: '未填写图图片地址',
			showCancel: false
		})
	}
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: src,
			success: function(image) {
				resolve(image)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}
module.exports = {
	Toast,
	navigator,
	getImageInfo
}
