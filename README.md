## xyz-tab 顶部导航

* 未超出屏幕将平均分配距离，超出屏幕将会滚动

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| tabList		| 导航栏数据												|
| tabActiveIdx		| 激活导航栏												|
| ------	| ------												|
| tabSelect()	| 点击事件，并且emit绑定	|

#### 监听函数是为了监听其它操作，可选择是否使用（比如，根据滑动屏幕来切换导航）

## xyz-choose-image 选择图片

| 字段/方法名		|  字段/方法名说明												|
| ------	| ------												|
| size		| 图片尺寸												|
| num		| 图片数量												|
| isSave	| 是否记录用户已选择图片								|
| saveStr	| 缓存记录时字段										|
| isBase64	| 结果是否转base64 仅支持小程序且图片不能过大不建议使用	|
| ------	| ------												|
| chooseImage()	| 调用getImage，并且emit绑定	|
| getImage()	| 调用uni.chooseImage选择本地相册图片或者拍照	|
| delImg()	| 删除图片	|
| viewImg()	| 调用uni.previewImage预览图片	|

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
| ------		| ------																	|
| drawImage()	| canvas绘图，对图片进行缩放处理，及卡片排版								|
| savePhoto()	| 调用uni.canvasToTempFilePath绘制图片，uni.saveImageToPhotosAlbum保存图片	|
| drawRoundRect	| 绘制卡片圆角																|
| getImageInfo()| 调用uni.getImageInfo获取图片信息											|
