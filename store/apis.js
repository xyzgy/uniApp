const apis = {
	base:process.env.NODE_ENV === 'development'? 'https://testapi.arthorize.com':'https://api.arthorize.com',
	path:{
		authorizations: '/wechat/authorizations', //token expired
		graphicList: '/wechat/hot/graphic-list', //热门图文
		workList: '/wechat/hot/works-list', //首页图像作品
	}
}
export default apis