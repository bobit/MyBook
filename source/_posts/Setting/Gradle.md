---
abbrlink: '0'
---
```
title: Gradle
typora-copy-images-to: ../../gitbooks/static/images/
toc: true
mathjax: true
date: 2017-08-28 12:25:30
abbrlink:
tags:
categories:
```

# 缓存路径修改

设置方法

​      1、设置MAVEN的仓库位置，修改maven安装目录\conf\settings.xml,增加如下内容：

```
<localRepository>D:\localRepoGradle</localRepository>
```

​       2、设置gradle本地仓库位置（和MAVEN共用），打开系统环境变量，增加如下内容：         

```
变量名: GRADLE_USER_HOME变量值：D:\localRepoGradle
```

​      3、设置gradle发布到本地库的方法:

```
将maven的配置文件settings.xml移到USER_HOME/.m2目录下
```

