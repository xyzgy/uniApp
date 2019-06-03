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

