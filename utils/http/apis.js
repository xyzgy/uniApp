// api列表文件
const apis = {
	base:process.env.NODE_ENV === 'development'? 'https://crmeb-demo.arthorize.com':'https://crmeb-demo.arthorize.com',
	path:{
		public_index: '/ebapi/public_api/index.html', //token expired
	}
}
export default apis