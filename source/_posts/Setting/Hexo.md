---
title: 静态博客选型之hexo
tags:
  - Hexo
categories:
  - Tools
toc: true
abbrlink: 9406e9db
date: 2015-11-13 11:13:35
---

## 背景

给自己的学习和生活做个记录，在github上创建自己的开源博客，也希望自己能坚持写文^_^。从最开始的wordpress，到现在的hexo，网站变得越来越简单，越来越轻量级。

## 选型
hexo

## 参考

hexo官方文档：https://hexo.io/zh-cn/docs/

## hexo介绍

主页： https://hexo.io/zh-cn/
主页中有非常详细的介绍，这里主要说说主页中没有详细说明内容。

- hexo 可以理解为是基于node.js制作的一个博客工具，不是我们理解的一个开源的博客系统。其中的差别，有点意思。

- hexo 正常来说，不需要部署到我们的服务器上，我们的服务器上保存的，其实是基于在hexo通过markdown编写的文章，然后hexo帮我们生成静态的html页面，然后，将生成的html上传到我们的服务器。简而言之：hexo是个静态页面生成、上传的工具。

## 源码结构

| 文件/文件夹 | 说明                                                  |
| ----------- | ----------------------------------------------------- |
| _config.yml | 配置文件                                              |
| public      | 生成的静态文件，这个目录最终会发布到服务器            |
| scaffolds   | 一些通用的markdown模板                                |
| source      | 编写的markdown文件，_drafts草稿文件，_posts发布的文章 |
| themes      | 博客的模板                                            |

## 常用命令
初始化 $ hexo init
生成静态页面 $ hexo generate 或者hexo g
本地启动 $ hexo server 或者hexo s
本地启动服务，在浏览器中输入http://localhost:4000/查看生成的页面效果。
恭喜你，到此你成功了！

## 更换主题

hexo自己默认的主题landscape，个人推荐主题yilia
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

修改配置文件
修改Blog/_config.yml文件：
theme: yilia    //默认为landscape


## 部署到github
部署之前先修改Blog/_config.yml文件。

deploy:
​    type: git
​    repository: https://github.com/bobit/bobit.github.io  //bobit替换为你自己的用户名
​    branch: master

然后使用以下命令进行部署。

```
hexo clean
hexo generate 或者 hexo g
hexo deploy
```

备注：如果执行上述命令报错，你可以试试下面这个命令再试。
$ npm install hexo-deployer-git --save

## Q2A

### Hexo中使用MathJax公式

安装插件

```
npm install hexo-math --save
```

配置

```
math:
  engine: 'mathjax' # or 'katex'
  mathjax:
    src: # "//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
    config:
      # MathJax config
  katex:
    css: #custom_css_source
    js: #custom_js_source # not used
    config:
      # KaTeX config
```

由于有默认配置，所以src和config的内容为空。

文章中需要打开公式，文章的Front-matter里打开mathjax开关后成功激活：

```
---
title: Hexo中使用MathJax公式
date: 2016-12-25 13:38:47
tags: [Hexo,MathJax]
categories: [Tools,Hexo]
mathjax: true
---
```

存在问题
由于markdown中的下划线 _ 是表示斜体，MathJax中 _ 是表示下标，存在冲突|
解决这个问题：

```
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

### 文章链接唯一化

也许你会数次更改文章题目或者变更文章发布时间，在默认设置下，文章链接都会改变，不利于搜索引擎收录，也不利于分享。唯一永久链接才是更好的选择。

安装

```
npm install hexo-abbrlink --save
```

在`站点配置文件`中查找代码`permalink`，将其更改为（“posts/” 与“.html”可自行更换）:

```
permalink: posts/:abbrlink.html
```

这里有个知识点：

> 百度蜘蛛抓取网页的规则: 对于蜘蛛说网页权重越高、信用度越高抓取越频繁，例如网站的首页和内页。蜘蛛先抓取网站的首页，因为首页权重更高，并且大部分的链接都是指向首页。然后通过首页抓取网站的内页，并不是所有内页蜘蛛都会去抓取。

搜索引擎认为对于一般的中小型站点，3层足够承受所有的内容了，所以蜘蛛经常抓取的内容是前三层，而超过三层的内容蜘蛛认为那些内容并不重要，所以不经常爬取。出于这个原因所以permalink后面跟着的最好不要超过2个斜杠。

然后在`站点配置文件`中添加如下代码:

```
# abbrlink config
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
```



可选择模式：

- crc16 & hex
- crc16 & dec
- crc32 & hex
- crc32 & dec

使用hexo generate命令，所有之前写的md会自动生成 abbrlink: 9406e9db 属性。

### hexo+github上传图片到博客

1. 查看_config.yml文件 查找 post_asset_folder 字段确定post_asset_folder 设置为true。当设置参数后，在建立文件时，Hexo 会自动建立一个与文章同名的文件夹，您可以把与该文章相关的所有资源都放到此文件夹内，这样就可以更方便的使用资源。
2. 到博客的根目录下执行 npm install https://github.com/CodeFalling/hexo-asset-image --save 命令来进行插件的安装。
3. 然后创建一文章 hexo new "test" 然后查看博客的 ../source/_posts 目录下的文件，会看到存在一个test 文件夹 和 test.md 文件
4. 如果使用Typora，偏好设置需要把图片插入设置为复制到指定路径：./${filename}
5. 如果使用了abbrlink，图片路径需要相应修改为abbrlink生成的值。

### 添加评论

使用gitalk

## 附录

### 命令

```
hexo new [layout] <title>
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #将.deploy目录部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本
```

