---
title: Gradle使用方法详解
toc: true
abbrlink: '21924951'
date: 2015-11-13 11:11:35
typora-copy-images-to: ../../gitbooks/static/images/21924951
tags:
  - Gradle
categories:
  - DevOps
---

## Gradle 

Gradle 是基于 Groovy 语言的，Groovy 大家应该很熟悉吧，是基于 Java Virtual Machine 的敏捷开发语言，它结合了 Python、Ruby 和 Smalltalk 的许多强大的特性。

## 前言

构建，软件生命周期中重要的一环，在现代软件开发过程中，起着越来越重要的作用。过去在Java或类Java的世界里，Ant、Maven再熟悉不过了，Maven凭借其强大的依赖配置战胜Ant，基本上成为了Java构建的标准。而在现代，系统日益复杂，构建的灵活性要求越来越高，比如：构建过程中需要打包上传到服务器，Maven无法很好地支持这种复杂的系统构建，所以，我选择了Gradle，一个基于Groovy，更灵活更强大的构建系统，能帮助我们构建更复杂的项目。

## 历程

一开始的时候，我们只有一个工程，所有要用到的jar包都放到工程目录下面，时间长了，工程越来越大，使用到的jar包也越来越多，难以理解jar之间的依赖关系。再后来我们把旧的工程拆分到不同的工程里，靠ide来管理工程之间的依赖关系，各工程下的jar包依赖是杂乱的。一段时间后，我们发现用ide来管理项程很不方便，比如不方便脱离ide自动构建，于是我们写自己的ant脚本。再后来，维护ant脚本变得痛苦，管理jar包更加痛苦。svn能管理源码的版本，却不能管理构建出的部署部件的版本。于是我们决定用maven，然而pom.xml的配置实在太繁了！

## 为什么选择Gradle

### 从使用方面来看：

1. groovy 比 xml好用
   Gradle用groovy来做为build脚本，比xml要易读易用得多。用过ant的人都知道，要在ant里面表达一个if分支功能有多么的麻烦，不直观。由于gradle的build脚本就是groovy程序，所以做分支循环等非常方便自然。

2. Convention over Configuration 比写大量ant基础脚本方便
   用ant的时候，要得定义哪里放源码，哪里放jar包，哪里放编译出的class文件等等，每个项目都要这样做，非常麻烦。gradle和maven一样，都定义了一个默认的目录结构，只要按要这个默认的规则来做，就不需要多写一行代码。而且gradle的目录的结构规范和maven是一样的。

3. 支付定义task，比maven灵活
   maven可以帮助管理依赖关系，但是要在maven里实现一个简单的自定义功能，就很麻烦，要得写maven插件，而在gradle里，task是一等公民，可以轻易的添加自己的功能。

4. 灵活的依赖管理
   ant没有依赖管理的功能，都要自己手动做，maven的依赖管理很死板，只能依赖于标准的maven artifact，不能依赖本地的某个jar文件或者其它的源码。而gradle则可以混合地同时支持这些依赖方法，这样可以让旧项目的迁移容易得多。

5. 默认就具有丰富的功能
   只要安装好gradle，默认就支持java项目,war项目，ear项目，做单元测试，生成jar包，上传jar包到maven服务器，等等功能。一般的项目都已经够用了。

### 从框架方向来看：

Gradle是很成熟的技术，可以处理大规模构建
Gradle对多语言、多平台有更natural的支持
Gradle关注在构建效率上
Gradle发布很频繁，重要feature开发计划透明化
Gradle社区很活跃，并且增加迅速

### 从语言特性来看：

代码很精简
Gradle基于Groovy，能完成复杂系统的构建任务
DSL比XML更简洁高效

## 配置

### 安装

安装JDK java -version
下载Gradle, https://gradle.org 完全版

### 设置环境变量

- 用户变量 GRADLE_HOME
- 环境变量 path 中增加 %GRADLE_HOME%\bin;
- gradle -version

### Jar包目录

E:\\localRepoGradle\\caches\\modules-2\\files-2.1

### 修改本地库的位置

如果不想使用缺省目录，则可以设置环境变量GRADLE_USER_HOME的路径，就可改变gradle的缓存目录。
使用Gradle去构建项目，但是没有办法像Maven一样配置Setting文件来修改本地库的位置。后来纠结很久，修改系统的环境变量即可。注意：修改完成后一定要重启计算机才可以。



### 集成到IDE中（STS）

1、  打开eclipse，Help-->Install new software,输入
在线安装地址
http://dist.springsource.com/release/TOOLS/update/e4.4或者
http://dist.springsource.com/release/TOOLS/gradle
（貌似不翻墙也是可以下载，但是访问特别慢，建议翻墙下载。）

2、  选择Core / Eclipse Integration for Gradle -> Gradle IDE

3、  设置下jar下载保存的地址,不然默认保存在C盘, "window->preferences->gradle" (可以不设置,我个人不喜欢在C盘)
使用以下配置文件对Gradle的构建进行配置：

Gradle构建脚本（build.gradle）指定了一个项目和它的任务。
Gradle属性文件（gradle.properties）用来配置构建属性。
Gradle设置文件（gradle.settings）对于只有一个项目的构建而言是可选的，如果我们的构建中包含多于一个项目，那么它就是必须的，因为它描述了哪一个项目参与构建。每一个多项目的构建都必须在项目结构的根目录中加入一个设置文件。

### STS设置gradle下jar包的保存地址

"window->preferences->gradle"

### 使用Maven本地缓存库

从Maven切换到Gradle，原有的几G的本地缓存库当然想继续使用。在用户手册中找到了答案。在50.6.3章节。大概意思是说使用mavenLocal()配置maven的本地仓库后，gradle默认会按以下顺序去查找本地的仓库：USER_HOME/.m2/settings.xml >> M2_HOME/conf/settings.xml >> USER_HOME/.m2/repository。
如果想使用Maven本地缓存，需要定义：

repositories {
//本地库，local repository(${user.home}/.m2/repository)
mavenLocal()
//Maven中心库(http://repo1.maven.org/maven2)
//mavenCentral()
}
注意：

1. 在USER_HOME/.m2下的settings.xml文件必须存在（不存在，Gradle会无法使用。）。

2. M2_HOME/conf下的settings.xml文件配置后未起作用。

### Gradle中下载慢的问题

一个简单的办法，修改项目根目录下的build.gradle，mavenCentral()替换掉即可：
repositories {
//如果maven本地缓存库没有，则下载到Gradle目录
mavenLocal()
maven{ url 'http://maven.oschina.net/content/groups/public/'}
}

## 创建项目

1、  创建一个gradle项目，File -> New -> Project -> Gradle -> Gradle Project -> Next，输入项目的名称，选择Sample project Java Quickstart,点击完成即可
2、  添加一个jar包依赖，编辑文件build.gradle,找到dependencies,在里面添加一条jar的信息,例如：
dependencies {
compile group: 'commons-collections', name: 'commons-collections', version: '3.2'
//添加一个spring 依赖
compile 'org.springframework:spring-core:4.1.2.RELEASE'
testCompile group: 'junit', name: 'junit', version: '4.\+'
}
3、  刷新项目，使得eclipse自动下载jar包，右击项目->Gradle->Refresh Dependencies
4、  打包项目，右击项目->Run As -> Gradle Build... -> 在命令行里面输入build,点击运行即可

## Gradle和Maven比较

Gradle和Maven在依赖管理上几乎差不多，核心的概念是一样的，只不过Gradle语法更精简，并且多了一些更灵活的自定义配置。我们先看一个例子，Maven的pom.xml：
<dependencies>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-core</artifactId>
</dependency>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-beans</artifactId>
</dependency>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-context</artifactId>
</dependency>
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
</dependency>
</dependencies>
更换成Gradle脚本，结果是这样：
dependencies {
compile('org.springframework:spring-core:3.2.4.RELEASE')
compile('org.springframework:spring-beans:3.2.4.RELEASE')
compile('org.springframework:spring-context:3.2.4.RELEASE')
testCompile('junit:junit:4.7')
}
代码块少了很多。试想，生产环境下的中、大型应用如果用都用Gradle替换Maven，那势必会大大减少配置文件代码块，并有更强的可读性，也就意味着系统更加稳健。
1，Gradle在依赖配置上面，和Maven一样，支持传递性依赖，然后和Maven不同的是，它还支持排除传递性依赖以及关闭传递性依赖。
2，Gradle的依赖scope，也基本和Maven一样，不过它是通过配置来定义，plugin来支撑和加强的，所以除了基本的compile、runtime等scope外，Gradle还可以自定义出很多配置，针对不同的配置写不同的task来完成更复杂更灵活的构建任务。
依赖相关的仓库配置很灵活，支持多种repository，

### gradle项目与maven项目相互转化

gradle这几年发展迅猛，github越来越多的项目都开始采用gradle来构建了，但是并不是所有人都对gradle很熟悉，下面的方法可以把gradle转成maven项目，前提gradle项目目录结构保持跟maven一样的约定，即/src/main/java这一套。

1. gradle --> maven

在build.gradle中增加以下内容(group,version可自行修改，artifactId默认为目录名称)

apply plugin: 'java'
apply plugin: 'maven'

group = 'com.demo'
version = '0.1-dev'
sourceCompatibility = 1.6

然后./gradlew build ，成功后将在build\\poms目录下生成pom-default.xml文件，把它复制到根目录下，改名成pom.xml即可

当然，通过修改build.gradle 也可以直接在根目录下生成pom.xml

task writeNewPom << {
pom {
project {
inceptionYear '2008'
licenses {
license {
name 'The Apache Software License, Version 2.0'
url 'http://www.apache.org/licenses/LICENSE-2.0.txt'
distribution 'repo'
}
}
}
}.writeTo("$buildDir/pom.xml")
}

1. maven --> gradle

先保证本机安装了gradle 2.0以上的版本
然后在maven根目录下运行
gradle init --type pom

## Gradle 的仓库(Repositories)

    首先，Repository 是什么？Repository 是文件的集合，这些文件，通过group、name和version组织起来。
    在使用上，主要体现为jar 和 xml文件,Gradle 通过这些Repository 找到外部依赖(external dependencies.)
    Gradle 并不默认指定任何仓库。它支持很多中仓库，如maven、ivy，通过文件访问或者通过HTTP 访问。下面举例说明：

### 1.使用本地maven 仓库：

    repositories {
      mavenLocal()()
    }

### 2.使用远程maven 仓库：

    repositories {
    
        maven {
            url "http://repo.mycompany.com/maven2"
        }
    
        //带认证的库
        maven {
            credentials {
                username 'user'
                password 'password'
            }
            url "http://repo.mycompany.com/maven2"
        }
    
    }

### 3.使用本地的ivy 仓库：

    repositories {
        ivy {
            // URL can refer to a local directory
            url "../local-repo"
        }
    }

### 4.使用远程的ivy 仓库：

    repositories {
       ivy {
            url "http://repo.mycompany.com/repo"
        }
    }

## 使用 Maven 库

    经实践，发现直接使用 mavenLocal() 时，gradle 会查找 Maven 配置文件 ${user.home}/.m2/settings.xml 来定位本地 Maven 库的路径，
    如果没有找到该文件，则默认本地库路径为 ${user.home}/.m2/repository。

## gradle项目与maven项目相互转化

* gradle --> maven
* maven --> gradle

* 先保证本机安装了gradle 2.0以上的版本
  然后在maven根目录下运行
  gradle init --type pom

## Java项目结构

默认的项目结构如下：

    src/main/java目录包含了项目的源代码。
    src/main/resources目录包含了项目的资源（如属性文件）。
    src/test/java目录包含了测试类。
    src/test/resources目录包含了测试资源。所有我们构建生成的文件都会在build目录下被创建，
    这个目录涵盖了以下的子目录，这些子目录我们会在这篇教程中提到，另外还有一些子目录我们会放在以后讲解。
    classes目录包含编译过的.class文件。
    libs目录包含构建生成的jar或war文件。

## Java工程中的任务

    assemble任务会编译程序中的源代码，并打包生成Jar文件，这个任务不执行单元测试。
    build任务会执行一个完整的项目构建。
    clean任务会删除构建目录。
    compileJava任务会编译程序中的源代码。

## FAQ

解决遇到的问题

### Q.
一个工程可以使用多个仓库。怎么寻找dependency呢？
### A.
    Gradle是这么做的：按照你在文件中(build.gradle)仓库的顺序寻找所需依赖(如jar文件)，
    如果在某个仓库中找到了，那么将不再其它仓库中寻找。

### Q.
解决Gradle编译时出现： 编码GBK的不可映射字符
### A.

    在build.gradle文件中加入如下内容：
    [compileJava, compileTestJava]*.options*.encoding = 'UTF-8'

---

## 参考：

https://dongchuan.gitbooks.io/gradle-user-guide-/content/
https://docs.gradle.org/current/userguide/userguide.html

## 小结

1. Gradle非常简洁，项目本身的配置代码非常少。
2. Gradle在外部project构建也支持很好，整体构建简单，并且通过公用外部构建脚本，让配置内容尽量没有冗余。
3. Gradle很灵活，可以方面的增加和修改构建过程。而Maven却需要开发插件来支持。
4. Gradle是基于Groovy的，也就是说配置中可以编写自定义代码，能适应更复杂的场景，能完成更强大的功能，比如说：自动上传、分发、部署等等。

随着公司业务的发展，软件系统变得日益复杂和庞大，这就要求有更灵活、更高效的构建系统来支撑。现代构建系统Gradle提供了强大的功能、简洁的语法、灵活的配置，能适应各种复杂的构建环境。利用多project构建，让整个系统模块化，管理更高效。

## 附录

### gradle主配置文件
