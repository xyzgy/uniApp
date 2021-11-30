### [基于uni-app的授权登录，包含微信授权，公众号授权，手机号登录](https://github.com/xyzgy/x-authorize.git)

* 组件是基于本人实际开发场景，不一定适用于所有人，可借鉴思路
* github代码更新一定比uniapp插件市场更新及时，全面(本人比较懒,懒得去单独拆分，单独写文档)
* github代码为所有组件使用示例集合
* 下载的小伙伴们，点个小星星可好(#^.^#)
---

### 组件列表 所有组件都仅测试微信小程序 若测试其它会有说明
* xyz-tab 顶部导航(长度5以下将平均分配距离，超出屏幕将会滚动)
* xyz-choose-image  图片选择 (兼容头条)
* xyz-swiper 轮播图 可自己定义圆点样式 (兼容头条)
* xyz-masonry 瀑布流 (css方式实现的在数据改变的情况下会造成布局闪动)
* xyz-share 生成卡片 朋友圈海报 
* xyz-input 支持数字统计 手机号/邮箱校验(可自己添加其它规则) (兼容头条)
* xyz-textarea 支持数字统计 (兼容头条)
* xyz-modal 自定义提示框 可自定义按钮文字 (兼容头条)
* xyz-navbar 自定义导航栏样式 支持自定义返回按钮功能 添加返回文字 (兼容头条)
* xyz-scroll-view 下拉刷新/上拉加载 可修改加载文字及图标 返回顶部 跳转指定位置 右侧索引列表
* xyz-user-auth 用户授权 与 store 联用
* xyz-handle-image 图片裁剪
* xyz-img-tt  图片裁剪 
* uParse 富文本编辑（来自插件市场）

## 2019-08-22 
* 新增utils文件夹，将store中 部分方法提至utils文件，项目目录更加清晰
* xyz-swiper 更新 新增previousMargin、nextMargin属性
* 增加富文本解析组件（来自插件市场）

## 2019-08-13 
* 新增组件 xyz-navbar / xyz-scroll-view / xyz-swiper / xyz-user-auth

## 2019-07-16
* 新增组件 xyz-choose-image / xyz-handle-image / xyz-tab / xyz-input / xyz-textarea / xyz-modal / xyz-masonry  / xyz-share

## 2019-06-13
* screen-shot(h5 当前页面截图)/
---

## utils 常用工具类方法
* http 封装请求方法 可配置拦截器 
* util 封装公共方法 提示框(showToast) 界面跳转
* common 项目中频繁调用的接口

## 状态管理 store 
* index store主目录
* actions  异步操作函数，可以调用mutations(commit) 也可调用action(dispatch)
* mutations 必须为同步函数 commit提交更改state(唯一更改state方法)
* getters  类似computed属性

~~ apis api接口统一目录  (08-22 移至  utils/util) ~~
~~ interceptors 拦截器设置  若启用拦截器 isUse为true即可 (08-22 移至  utils/util) ~~
 
##  store 说明
* actions

| 字段/方法名								|  字段/方法名说明																|
| ---登录流程涉及---						| ------																		|
| ~~apiRequest()(08-22 移至  utils/util)~~		| 统一请求方法入口可以设置拦截器												|
| ~~responseError()(08-22 移至  utils/util)~~	| 对apiRequest()响应成功之后错误数据的处理										|
| ~~getUserinfo()~~								| 获取用户信息方法中默认用户授权之后直接getToken()获取token getProvider('oauth')|
| getToken()								| 与后台交互获取token															|
| ~~getLoginCode()~~							| 获取code值，code只能使用一次，未设置state										|
| ~~getProvider()	~~							| 获取服务供应商																|
| ~~isGetUserInfo()	~~						| 用户是否已授权获取信息 getUserSetting('scope.userInfo')						|
| ~~getUserSetting()~~							| 验证是否获取用户某项授权设置													|
| ------									| ------																		|
| ~~userAuthorize()	~~						| 用户授权申请  除userinfo外可提前发出请求										|
| ~~getImageInfo()(08-22 移至  utils/util)~~	| 获取图片信息																	|

## xyz-tab 顶部导航

* 长度5一下将平均分配距离，超出屏幕将会滚动

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| tabList		| 导航栏数据												|
| tabActiveIdx		| 激活导航栏												|
| ------	| ------												|
| tabSelect()	| 点击事件，并且emit绑定	|

#### 监听函数是为了监听其它操作，可选择是否使用（比如，根据滑动屏幕来切换导航）

## xyz-choose-image 选择图片

* V1.0.1 编译模式修改 增加头条小程序

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| size		| 图片尺寸												|
| num		| 图片数量												|
| isSave	| 是否记录用户已选择图片								|
| saveStr	| 缓存记录时字段										|
| isBase64	| 结果是否转base64 (V1.0.2移除)|
| ------	| ------												|
| chooseImage()	| 调用getImage，并且emit绑定	|
| getImage()	| 调用uni.chooseImage选择本地相册图片或者拍照	|
| delImg()	| 删除图片	|
| viewImg()	| 调用uni.previewImage预览图片	|

* V1.0.2 编译模式修改 增加头条小程序 (只支持小程序)

组件中 isBase64 字段移除（页面间传值数据有大小限制，有转base64需求的在$emit事件中转化即可 show.vue界面具体示例）

## xyz-swiper 自定义轮播图

| 字段/方法名												|  字段/方法名说明|
| ------													| ------|
| indicatorDots												| 是否显示面板指示点(原生)|
| indicatorColor											| 指示点颜色|
| indicatorActiveColor										| 当前选中的指示点颜色|
| autoplay													| 是否自动切换|
| interval													| 自动切换时间间隔|
| duration													| 滑动动画时长|
| circular													| 是否采用衔接滑动|
| isDiyDots													| 是否自定义小圆点样式  true时 indicatorDots必须设为false|
| arrList													| 数据|
|previousMargin			|前边距														|	|
|nextMargin				|后边距														|	|
|dotBottom				|自定义指示点距离底部距离														|	|
|height				|轮播图高度														|	|
| ------													| ------|
| dotsChange()												| 小圆点变换|
| goWebView()												| 轮播图页面跳转|


## xyz-masonry 瀑布流

| 字段			|  字段说明							|
| ------		| ------							|
| mode			| 图片尺寸							|
| imgWidth		| 图片宽度							|
| masonryList	| 数据集合	[{src:图片路径，size:[宽，高]}]						|
| isSize		| 数据集合是否包含有图片的宽高信息，false时，将自动读取宽高	|
| borderRadius	| 图片圆角 默认0无圆角				|
| ------	| ------												|
| handleData()	| 处理并分组数据	|
| getImageInfo()	| 调用uni.getImageInfo获取图片信息	|
| watch	| 通过监听数据变化实现触底加载更多	|

## xyz-share 卡片分享

| 字段			|  字段说明																	|
| ------		| ------																	|
| isWhiteSpace	| 是否留白																	|
| padding		| 四周留白距离																|
| borderRadius	| 卡片圆角																	|
| shareImg		| 卡片主图																	|
| shareImgW		| 卡片主图宽																|
| shareImgH		| 卡片主图高																|
| imgScan		| 卡片右下角图																|
| imgScanW		| 卡片右下角图宽															|
| imgType		| 保存图片类型 仅支持png/jpg												|
| title			| 底部标题																	|
| author		| 底部作者																	|
| bottomType	| 底部作者区域显示类型														|
| bottomH		| 底部高度																	|
| bottomPadding	| 底部四周留白																|
| bgColor		| 背景颜色																	|
| textColor		| 字体颜色																	|
| ------		| ------																	|
| drawImage()	| canvas绘图，对图片进行缩放处理，及卡片排版								|
| savePhoto()	| 调用uni.canvasToTempFilePath绘制图片，uni.saveImageToPhotosAlbum保存图片	|
| drawRoundRect	| 绘制卡片圆角																|
| getImageInfo()| 调用uni.getImageInfo获取图片信息											|

## xyz-input 输入框

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| inputType		| type类型												|
| placeholder		| 未输入提示												|
| maxlength		| 最大字数限制												|
| limit		| 右下角字数统计												|
| isSaveMess		| 是否本地缓存用户信息												|
| saveMessStr		| 本地缓存用户信息字段												|
| value		| limit为true时必须传入该字段 统计字数												|
| isValidate		| 是否校验输入内容												|
| validateType		| 校验值类型 phone/email												|
| ------	| ------												|
| input()	| input事件	|
| initStroge()	| 初始化本地已有缓存信息	|

## xyz-textarea 文本域

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| textarea		| ios中input事件不生效，加if判断生效，原因不明												|
| placeholder		| 未输入提示												|
| maxlength		| 最大字数限制												|
| limit		| 右下角字数统计												|
| isSaveMess		| 是否本地缓存用户信息												|
| saveMessStr		| 本地缓存用户信息字段												|
| value		| limit为true时必须传入该字段 统计字数												|
| ------	| ------												|
| input()	| input事件	|
| initStroge()	| 初始化本地已有缓存信息	|

## xyz-modal 提示框

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| title		| 提示框文字												|
| isShow		| modal提示框的显示与隐藏											|
| cancelTxt		| 取消按钮文字												|
| okTxt		| 确认按钮文字											|
| ------	| ------												|
| modalClick()	| 取消/确定事件	|
## xyz-navbar 导航栏

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| isBack		| 是否直接返回上一级	true直接返回 false其它操作									|
| isBackBtn		| 是否显示返回按钮（一级页面无返回，其它页面）											|
| backTxt		| 返回按钮文字												|
| navbarTitle		| 导航栏标题											|
| height		| 标题栏高度（不包含状态栏 默认100）											|
| bgColor		| 导航栏颜色										|
| ------	| ------												|
| goBack()		| 	返回事件									|

## xyz-scroll-view 自定义下拉刷新/上拉加载

* 横向涉及的相关代码逻辑未判断

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| scrollX		| 是否直接返回上一级	true直接返回 false其它操作									|
| scrollY		| 是否显示返回按钮（一级页面无返回，其它页面）											|
| upperT		| 距顶部/左边多远时（单位px），触发 scrolltoupper 事件												|
| lowerT		| 距底部/右边多远时（单位px），触发 scrolltolower 事件											|
| scrollTop		| 设置竖向滚动条位置 同时实现原有scroll-into-view功能											|
| scrollL		| 设置横向滚动条位置											|
| scrollWA		| 在设置滚动条位置时使用动画过渡											|
| enableBTT		| iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向											|
| pullStatus		| 监听状态变化  true 显示下拉加载区域											|
| upStatus		| 监听状态变化 true 显示上拉加载区域											|
| dataStatus		| 监听数据状态变化  true有更多数据											|
| isGoTop		| 是否显示返回顶部按钮											|
| goTopVal		| 滚动距离后显示按钮											|
| isUseIdx		| 是否使用右侧索引											|
| useIdxList		| 索引数据列表										|
| ------	| ------												|
| scroll()		| 	滚动事件									|
| scrolltolower()		| 	滚动至底部								|
| scrolltoupper()		| 	滚动至顶部									|
| touchstart()		| 	触摸移动开始									|
| touchmove()		| 	触摸移动中									|
| touchend()		| 	触摸移动结束									|
| goTop()		| 	返回顶部									|
| goIdx()		| 	索引跳转		 调用scrollIntoView()方法							|
| scrollIntoView()		| 	scroll-into-view 方法实现 该方法需要在父组件中实现	通过组件watch 监听scrollTop值变化实现							|

```
scrollIntoView(id) {
	let _this = this;
	uni.createSelectorQuery()
		.in(this)
		.select('#' + id)
		.boundingClientRect(function(res) {
			_this.scrollTop = res.top;
		})
		.exec();
}
```

## xyz-handle-image 自定义图片移动裁剪

* 仅实现图片放大 纵向图片裁剪功能

## xyz-img-tt 基于他人组件实现当前所需要图片裁剪功能

* [借鉴](https://ext.dcloud.net.cn/plugin?id=404)
