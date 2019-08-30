---
title: Github使用方法详解
tags:
  - Github
categories:
  - Tools
toc: true
abbrlink: d18dc8d0
typora-copy-images-to: ../../../gitbooks/static/images/d18dc8d0

---

可以托管自己的项目源码外，还可以Watch（关注）、Star（加星）、Fork（复制一份）、Pull Request（提交问题或申请功能）其他开发者的项目。 



## 第三方登录

登录方式的流程：

1. A 网站跳转到 Github 的授权页面。
2. Github 授权页面询问用户：“是否允许A网站获取下列权限”，用户点击“允许”，取得授权码。
3. Github 授权页面重定向回 A 网站，同时在URL 上带上授权码。
4. A 网站通过 URL 上的授权码往 Github 取回 Token。
5. A 网站使用这个 Token 去调用 Github API。

#### Token



## 项目管理模式——Projects

### Issues

Github 中传统的项目管理是使用 issue 和 pull request 进行的，这部分内容不是本文重点，不再赘述。 但有一些功能需要提及：

- `Tag`： 每个 issue 可以添加不同的 tag，可以用于标记 issue 的种类和 issue 的处理进度；
- `MileStone`：每个 issue 只属于一个 milestone，用于显示 issue 的处理进度。

### Projects

Projects 提供了真正的管理 issue 的能力；而传统的 tag 方式只能以手工的方式管理分类（如 Q&A，bug，duplicate，feature 这些标签🏷），或者以手工的方式管理 issue 进度（need test, in progress, wait approval 等这些标签）。

### 看板（Kanban）

所谓看板，就是把一块木板上分成几列，然后在每一列上贴上不同内容的卡片。 木板上的这几列一般是有顺序的，卡片可以在不同的列之间移动来表明所处的状态。



## 部署到Github 使用免费的站点

和 GitBook 生成的文档一样，我们可以直接把文档网站部署到 GitHub Pages 或者 VPS 上

### GitHub Pages

GitHub Pages 支持从三个地方读取文件

- docs/ 目录
- master 分支
- gh-pages 分支

上传文件至Github仓库  官方推荐直接将文档放在 docs/ 目录下，在设置页面开启 GitHub Pages 功能并选择 master branch /docs folder 选项。

## 自定义域名

**域名绑定是需要“双方配置”的。**

### Github配置

（1）在`github`的`github pages`的仓库根目录里加上`CNAME`文件，里面写上个人域名即可。我的是：

```
zhangbo.fun
```

（2）或者直接在`github.io`仓库的`Settings`的`GitHub Pages`项直接设置`Custom domain`,`github`会自动添加`CNAME`文件。

### 域名解析配置

首先找到域名管理，选择域名解析功能。
`记录类型`**仅仅添加两个CNAME类型即可，不需要管A类型，或者IP**
CNAME类型：
主机记录www和@是为了 www.example.com 和 example.com 都能访问到你的页面



## private的仓库改成public





## Github打造个人文档-GitHub Pages





## Github打造个人文档-docsify

### 工具

docsify 推荐安装 docsify-cli 工具，可以方便创建及本地预览文档网站。

### 安装

npm i docsify-cli -g

### 初始化项目

docsify init ./docs
初始化成功后，可以看到 ./docs 目录下创建的几个文件

```
index.html 入口文件
README.md 会做为主页内容渲染
.nojekyll 用于阻止 GitHub Pages 会忽略掉下划线开头的文件
```

### 预览

docsify serve docs
http://localhost:3000

## WIKI

*Wiki 是一种在网络上开放且可供多人协同创作的超文本系统*

### 本地预览

我们在本地手动编辑编辑完成后，只能通过 push 到 GitHub 的方式进行预览，非常不方便，这个时候，就需要借助一个叫 [gollum](https://github.com/gollum/gollum) 的工具了。

Gollum 是 GitHub 上用到的 Wiki 引擎，使用它可以在本地上搭建一个类似的GitHub Wiki 的网站，对本地的 Wiki 页面进行快速预览。执行以下命令即可安装：

```
sudo gem install gollum
Ruby25-x64安装失败
F:\Projects\demo-rabbitmq\rabbitmq.wiki>gem install gollum
Temporarily enhancing PATH for MSYS/MINGW...
Building native extensions. This could take a while...
ERROR:  Error installing gollum:
        ERROR: Failed to build gem native extension.

    current directory: D:/Ruby25-x64/lib/ruby/gems/2.5.0/gems/charlock_holmes-0.7.6/ext/charlock_holmes
D:/Ruby25-x64/bin/ruby.exe -r ./siteconf20190828-19448-1rx7ayt.rb extconf.rb
which: no make in (/d/Ruby25-x64/bin:/mingw64/bin:/usr/bin:/d/Ruby25-x64/bin:/d/Program Files/VanDyke Software/Clients:/c/ProgramData/DockerDesktop/version-bin:/c/Program Files/Docker/Docker/Resources/bin:/c/Windows/system32:/c/Windows:/c/Windows/System32/Wbem:/c/Windows/System32/WindowsPowerShell/v1.0:/c/Windows/System32/OpenSSH:/d/Program Files/TortoiseGit/bin:/d/DevTools/apache-maven-3.6.1/bin:/d/Program Files/Java/jdk1.8.0_144/bin:/d/Program Files/Java/jdk1.8.0_144/jre/bin:/d/Program Files/Git/bin:/d/DevTools/mysql/bin:/d/DevTools/rabbitmq_server-3.7.17/sbin:/d/Program Files/nodejs:/d/chocolatey/bin:/d/HashiCorp/Vagrant/bin:/d/ProgramData/Anaconda3:/d/ProgramData/Anaconda3/Scripts:/d/ProgramData/Anaconda3/Library/bin:/d/DevTools/mongodb-win32-x86_64-2012plus-4.2.0/bin:/d/Program Files/Mercurial:/d/Program Files/nodejs/node_global:/f/Projects/demo-golang/bin:/d/Go/bin:/f/Projects/demo-golang/bin:/d/Program Files/erl10.4/bin:/d/Program Files/Git LFS:/c/Users/zhangb/AppData/Local/Microsoft/WindowsApps:/c/Users/zhangb/AppData/Roaming/npm:/c/Users/zhangb/AppData/Local/Programs/Microsoft VS Code/bin:/c/Users/zhangb/AppData/Local/GitHubDesktop/bin)


***************************************************************************************
*************** make required (apt-get install make build-essential) =( ***************
***************************************************************************************
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=D:/Ruby25-x64/bin/$(RUBY_BASE_NAME)

extconf failed, exit code 1

Gem files will remain installed in D:/Ruby25-x64/lib/ruby/gems/2.5.0/gems/charlock_holmes-0.7.6 for inspection.
Results logged to D:/Ruby25-x64/lib/ruby/gems/2.5.0/extensions/x64-mingw32/2.5.0/charlock_holmes-0.7.6/gem_make.out
```

安装完成后，将路径切换到 Wiki 的 Git 仓库下然后执行 `gollum` 命令，然后访问 http://127.0.0.1:4567/ 即可进行预览。

## 图床



## 参考

https://docsify.js.org/#/zh-cn/quickstart

http://www.imooc.com/article/291424