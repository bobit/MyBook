---
title: Gitbook使用方法详解
tags:
  - Gitbook
categories:
  - Tools
toc: true
abbrlink: 338d75c8
typora-copy-images-to: ../../../gitbooks/static/images/338d75c8
---



因为喜欢使用 Markdown 和 GitHub ，使用GitBook进行博客总结是个不错的选择 。

## 主题

目前 `gitbook` 提供三类文档: `Book` 文档,`API` 文档和 `FAQ` 文档.

其中默认default主题插件的也是最常使用的就是 `Book` 文档,适合一般的博客类网站或静态网站,`api` 主题插件适合接口文档的编写,`faq` 主题插件则适合帮助中心.

## 安装命令行工具

npm install gitbook-cli -g

## 初始化项目

gitbook init

## 生成

执行下面命令，就可以将电子书的内容制作成静态网页，并保存在 `_book` 目录中。

```
$ gitbook build
```

## 本地预览

gitbook serve

http://localhost:4000/

GitBook 将启动一个 Web 服务，监听在本地的 `4000` 端口上。（同时会新增一个 *_book* 目录），在浏览器其中访问地址就可以实时预览电子书

## 生成pdf



## 结合 GitHub Pages

GitHub Pages 是 GitHub 提供的静态网站托管服务。

GitHub 上的每个仓库都可以拥有一个 GitHub Pages，对应的 URL 如下：

```
https://<username>.github.io/<repository>/
```

GitHub Pages 的静态资源支持下面 3 个来源：

-  `master` 分支
-  `master` 分支的 `/docs` 目录
-  `gh-pages` 分支

执行下面命令，将 `_book` 目录推送到 GitHub 仓库的 `gh-pages` 分支。

```
$ git subtree push --prefix=_book origin gh-pages
```

或者在生成静态网页时，将保存的目录指定为 `./docs`

```
$ gitbook build ./ ./docs
```

然后直接推送到 GitHub 仓库的。

```
$ git push origin master
```

## 参考

[https://www.gitbook.com/](https://www.gitbook.com/)

[https://plugins.gitbook.com/](https://plugins.gitbook.com/)

[https://help.gitbook.com/](https://help.gitbook.com/)

[https://plugins.gitbook.com/plugin/search-jieba](https://plugins.gitbook.com/plugin/search-jieba)

[GitBook 使用](https://mp.weixin.qq.com/s/L3_LBst5Asz4gZE2nVmtoQ)

[用 GitHub + GitBook 发布一本新书](https://mp.weixin.qq.com/s/CnRgWDrfXVli10515LWtXw)