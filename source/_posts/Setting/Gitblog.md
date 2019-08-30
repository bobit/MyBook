---
title: 使用Gitblog和Markdown写博客
typora-copy-images-to: ../../gitbooks/static/images/
toc: true
mathjax: true
abbrlink: 89d9ac18
date: 2017-01-15 13:10:16
tags:
categories:
---

## 一、Introduction：

```
Gitblog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。
它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。
同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。
Gitblog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。
Gitblog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。
```

## 二、Environment：

```
Gitblog 2.2
MarkdownPad 2.5.0.27920
PHP 5.2.4+
```

## 三、Configuration：

### 安装

下载Gitblog源代码
解压上传到你的PHP网站根目录
打开浏览器，访问网站首页
上传Markdown文件到 blog 文件夹

### 目录说明

```
app: CodeIgniter主程序目录，cache和logs分别是缓存和日志目录，请确保写的权限
sys： CodeIgniter系统源码目录，一般不需要改这里面的任何东西
theme： GitBlog主题目录，所有主题模板都放在这里
posts: GitBlog存放markdown博客文件的目录，你写的博客都放这里
img： 图片目录，你的markdown中引用的图片都放到这里，使用相对路径引用
conf.yaml: GitBlog配置文件
index.php: 入口php文件
注意：2.2版本开始统一将markdown文件和图片文件放到blog目录中。
```

### 配置文件conf.yaml

你可能需要修改的配置参数：

```
url: 修改成你的域名，http://yourdomain.com，注意最后没有杠。
title： 修改成你的博客标题
subtitle： 修改成你的副标题
duoshuo： GitBlog采用多说评论框，你需要申请多说账号，并在这里填写你的多说ID
baiduAnalytics： GitBlog采用百度统计，你需要申请百度统计账号，在这里填写你的统计Key
author：修改为你个人的信息即可
如果你不需要评论和统计功能，删除duoshuo和baiduAnalytics这两荐即可。
其他信息，可根据浏览博客页面的效果进行修改调整。
```

### 主题配置

```
主题配置参数theme，可选值即为app/theme目录下主题文件夹的名称，如simple和quest，可根据自己喜好选择配置。
```

### 静态形式访问

GitBlog支持把整个博客网站导出为静态HTML文件，这样导出整个网站后，可以把它上传到网站空间，以静态形式访问，导出的后的网站结构和运行在PHP环境中一样。

你可以使用以下命令静态导出网站：

```
php /data/vhosts/jockchou.gitblog.cn/index.php Gitblog exportSite
或
php E:\demo\gitblog\index.php Gitblog exportSite
```

以上命令请换成你的网站路径。成功导出后，会在GitBlog目录下生成一个_site的文件夹，所有导出的静态资源都在这里，你可以随意复制它布署到你的环境中。

导出前可清除cache目录中的缓存，以便导出最新的资源。

### 写博客

一篇GitBlog就是一个markdown文件，GitBlog使用解析markdown文件为html展示在网页上。
所有的博客markdown文件必须放在blog文件夹里。后缀名只可以是xx.md或者xx.markdown。

注意: 2.2版本开始，所有markdown文件和图片统一放到blog文件夹中。查看gitblog目录结构说明。

### 发表一篇新博客

在posts里新建文件helloworld.md，输入以下内容：

```
<!--
author: jockchou
date: 2012-03-30
title: Hello World!
tags: GitBlog
category: GitBlog
status: publish
summary: 你好！GitBlog
-->

你好！GitBlog

GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。
```

文件里头部的注释用来定义博客的属性，这是一个规定的写法，必须放在文件的头部，每个属性独占一行。再次访问首页，就能看到这篇新发的博客了。如果没显示，请清除app/cache文件夹下的所有缓存文件试试看。

```
<!--
这里定义博客属性
-->
```

注意：markdown文件须采用utf8编码，如果出现乱码，请修改编码为utf8。

### 博客属性定义

GitBlog目前针对博客定义了以下属性：


```
author: 博客作者名称
date: 博客时间，用于页面显示，通常来说你不需要填写这个字段，默认就是创建日期
title: 博客标题
tags: 博客里的标签，多个用逗号或空格分隔
category: 博客分类，多个用逗号或空格分隔
status: 博客状态，draft表示草稿，GitBlog解析时会忽略草稿；publish表示发表状态，默认为publish
summary: 博客摘要信息
```

以上所有信息都是独占一行，暂不支持写在多行。

### 2.1版本的新特性

Gitblog的2.1版本针对博客的属性定义进行了一些优化。新增了两个可选属性

images:博客的图片集，这里可以定义博客用到的图片的地址
head: 作者的头像地址
以上两个属性是可选的，主要是针对一些主题展示用的。

自动提取title，summary，images属性。Gitblog2.1一个重要的功能，如果用户没有定义头部属性，Gitblog会自动解析博客内容，从中提取属性。提取第一个H1作为title，提取所有图片作为images，自动识别摘要信息summary。也就是说你可以不手动定义这三个字段，Gitblog会自动根据上述规则识别，不过还是推荐手动填写。

### markdown路径与URL对应关系

GitBlog中posts中的markdown文件可以放在子文件夹中。举个例子，假如你的helloword.md文件目录如下：

```
posts/hello/helloword.md
```

你在浏览器访问的对应地址应该是这样的：

```
http://jockchou.gitblog.cn/blog/hello/helloworld.html
```

GitBlog对posts中子文件夹的层级没有限制，但请尽量不要太深，一般2，3层就够了。如果你在本地编写博客，使用FTP工具上传markdown文件到posts目录，如果你熟悉使用Git，SVN类似工具，用它们来发表博客也是极好的。markdown文件的路径和文件名标识了博客的唯一性，改变路径或修改文件名将会导致博客的评论信息丢失。

### GitBlog评论，订阅，统计等功能

GitBlog支持评论，订阅，百度统计相关功能，这些功能可由conf.yaml配置开启或关闭，评论采用多说评论框，统计采用百度统计。

### 多说评论框

GitBlog目前只支持多说评论框，如果你希望你的博客有评论功能，你需要申请多说账号来管理你的评论。多说的官方地址是：http://duoshuo.com。

在多说的管理后台，工具一栏中获取代码你会看到这样一段代码：

```
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"jockchou"};
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
    </script>
<!-- 多说公共JS代码 end -->
```

GitBlog中已经引入了多说代码，你要做的事情只是在conf.yaml配置文中填上你的多说short_name即可。例如我的博客：

```
duoshuo: jockchou  //填写你的多说账号
```

多说后台提供了评论的管理功能，你可以在后台配置你的评论样式，功能，以及审核，删除评论等操作。如果你不需要评论功能，删除conf.yaml中的配置项即可。

### 百度统计

同时，对于博客的PV统计，你需要申请百度统计账号。你也不需要手动获取统计代码。只需要填写你的统计代码中的Key值就行了。例如我的百度统计代码如下：

```
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?732acc76ff6bd41343951a67cbfafe34";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

只需要将732acc76ff6bd41343951a67cbfafe34配置到conf.yaml中即可。

```
baiduAnalytics  : 732acc76ff6bd41343951a67cbfafe34  #百度统计
```

### 代码高亮

GitBlog的代码高亮功能采用highlight.js。它能自动识别代码中的语言类型。默认是开启代码高亮功能的。关闭此功能配置如下：

```
highlight: off
```

### 数学公式

GitBlog支持LaTeX数据公式，采用的是MathJax.js。此功能默认是关闭的，开启的配置如下：

```
mathjax: on
```

### RSS订阅

GitBlog支持RSS订阅，订阅的xml文件地址是：

```
http://neehow.cn/feed.xml
```

请替换为你自己的域名，即网站根目录下的feed.xml文件。

## 四、Shortcuts ：

## 五、FAQ：

### Q.

### A.

------

## 参考：

GitBlog文档: [http://gitblogdoc.sinaapp.com/](http://gitblogdoc.sinaapp.com/ "GitBlog文档")

## 附录：

### 配置文件conf.yaml

```
#GitBlog配置文件，使用4个空格代替Tab
---
url             : "http://jockchou.gitblog.cn" #网站首页url
title           : jockchou的博客               #博客标题
subtitle        : 自豪地采用GitBlog             #博客副标题
theme           : default                      #主题名称
highlight       : on                           #是否开启代码高亮支持
mathjax         : on                           #是否开启数学公式支持
duoshuo         : jockchou                     #多说评论框ID
baiduAnalytics  : 732acc76ff6bd41343951a67cbfafe34  #百度统计ID
keywords        : jockchou,markdown,blog,php,github #网站关键字
description     : GitBlog是一个简单易用的Markdown博客系统,这是我的第一个GitBlog博客. #网站描述
version         : 1.0                          #系统版本号

blog:
    recentSize      : 5                        #最近博客显示条数
    pageSize        : 10                       #每页显示博客条数
    pageBarSize     : 5                        #翻页Bar的长度
    allBlogsForPage : false                    #页面需要所有博客数据

author:
    name    : jockchou                         #你的名称
    email   : 164068300@qq.com                 #你的邮箱
    github  : jockchou                         #你的Github名称
    weibo   : 2558456121                       #你的微博ID

text:
    title: 简介                                #任一文本标题
    intro: >                                   #任一文本内容,这里可以多行
        GitBlog是一个简单易用的Markdown博客系统，
        这是我的第一个GitBlog博客
```

