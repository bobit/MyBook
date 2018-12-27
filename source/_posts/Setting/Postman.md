---
title: Postman使用方法详解
tags:
  - Postman
categories:
  - Tools
toc: true
abbrlink: 7bfeb391
date: 2015-11-13 11:16:35
---

## 下载

摘要 : Postman是一款功能强大的网页调试与发送网页HTTP请求的Chrome插件。

插件大小：5.88MiB插件版本：4.1.3支持语言：English
下载完应该得到的是扩展名为crx的文件。
比如： Postman-REST-Client_v0.8.4.14.crx
## 安装
打开chrome浏览器，点击右上角“自定义及控制”按钮 -》 （更多）“工具” -》“扩展程序”。
直接把下载好的XXXXX.crx插件拖到chrome的扩展管理界面中，然后中间会出现“拖动以安装”的插件按钮，然后就安装。

如果出现提示说这个插件必须要在应用商店里面装
重命名crx文件，把后缀改成zip或者rar，比如：Postman-REST-Client_v0.8.4.14.zip。
然后解压，解压到的文件夹为： Postman-REST-Client_v0.8.4.14

接着回来刚才的扩展程序管理界面
先勾选右上角的“开发者模式”，这个时候左上角会出现下图所示的东西：
然后，点击左上角的“加载正在开发的扩展程序...”，打开刚才解压好的文件夹，就可以安装了。

如提示“_metadata”有问题之类的话，那就打开刚才解压好的文件夹（Postman-REST-Client_v0.8.4.14）
将里面的“_metadata”文件夹重命名为“metadata”，其实就是把前面的下划线去掉。
再重复操作，应该就可以了。

## 使用
Postman可以发送几乎所有类型的HTTP请求！。
用户的大部分数据都需要通过HTTP请求来与服务器进行交互。
Postman插件就充当着这种交互方式的“桥梁”，它可以利用Chrome插件的形式把各种模拟用户HTTP请求的数据发送到服务器，以便开发人员能够及时地作出正确的响应。
在Chrome中安装了Postman插件以后，发送HTTP数据的时候只需要编写相关测试数据的时候加入一定量的参数信息即可。

### Get请求

在地址栏里输入请求url：http://localhost:9998/api/user
选择“GET”方式，
点击"Url params",添加url params key:id , value:1
点击“send”得到json数据如下：

### Post请求

在地址栏里输入请求url：http://localhost:9998/api/user/1
选择“POST”方式，
点击"application/x-www-form-urlencoded",
添加key:name , value:baidu-lulee007
添加key:sex , value:man

## 注意
### 请求支不支持post请求是由服务端决定
如果服务端需要请求类型为json，需要在“headers”添加
key:Content-Type   , value:application/json
选择“raw”,并添加：
{
"id": 1,
"data": {
"name": "baidu-lulee007",
"sex": "man"
}
}

1. form-data:
就是http请求中的multipart/form-data,它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。当上传的字段是文件时，会有Content-Type来表名文件类型；content-disposition，用来说明字段的一些信息；
由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。
2. x-www-form-urlencoded：
就是application/x-www-from-urlencoded,会将表单内的数据转换为键值对，比如,name=java&age = 23
3. raw
可以上传任意格式的文本，可以上传text、json、xml、html等
4. binary
相当于Content-Type:application/octet-stream,从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。

### multipart/form-data与x-www-form-urlencoded区别
multipart/form-data：既可以上传文件等二进制数据，也可以上传表单键值对，只是最后会转化为一条信息；
x-www-form-urlencoded：只能上传键值对，并且键值对都是间隔分开的。