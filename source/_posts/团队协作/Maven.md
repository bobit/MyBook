---
title: Maven学习总结
tags: maven
categories: 
- Maven
toc: true
abbrlink: 17b0d7a3
date: 2014-10-13 22:17:17
typora-copy-images-to: ../../gitbooks/static/images/17b0d7a3
---

## Maven内置变量说明

```
${basedir} 项目根目录(即pom.xml文件所在目录)
${project.build.directory} 构建目录，缺省为target目录
${project.build.outputDirectory} 构建过程输出目录，缺省为target/classes
${project.build.finalName} 产出物名称，缺省为${project.artifactId}-${project.version}
${project.packaging} 打包类型，缺省为jar
${project.xxx} 当前pom文件的任意节点的内容
${env.xxx} 获取系统环境变量。例如,"env.PATH"指代了$path环境变量（在Windows上是%PATH%）。
${settings.xxx} 指代了settings.xml中对应元素的值。例如：<settings><offline>false</offline></settings>通过 ${settings.offline}获得offline的值。
Java System Properties: 所有可通过java.lang.System.getProperties()访问的属性都能在POM中使用，例如 ${JAVA_HOME}。
```

## 上传第三方jar包

### 示例

mvn deploy:deploy-file -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=12.2.0.1.0 -Dpackaging=jar -Dfile=D:\ojdbc8.jar -Durl=http://192.168.80.202:8081/nexus/content/repositories/thirdparty/ -DrepositoryId=nexus-releases

mvn deploy:deploy-file -DgroupId=postgresql -DartifactId=postgresql -Dversion=9.2-1002.jdbc4 -Dpackaging=jar -Dfile=D:\postgresql-9.2-1002.jdbc4.jar -Durl=http://1.94.58.101:8081/repository/thirdparty-releases/ -DrepositoryId=thirdparty-releases

mvn deploy:deploy-file -DgroupId=qrcode -DartifactId=qrcode -Dversion=3.0 -Dpackaging=jar -Dfile=D:\qrcode.jar -Durl=http://192.168.80.202:8081/nexus/content/repositories/thirdparty/ -DrepositoryId=nexus-releases

## 安装jar包到本地仓库

### 示例

mvn install:install-file -DgroupId=com.microsoft.sqlserver -DartifactId=sqljdbc4 -Dversion=4.0 -Dpackaging=jar -Dfile=E:\sqljdbc4.jar 

mvn install:install-file -DgroupId=QRCode -DartifactId=QRCode -Dversion=3.0 -Dpackaging=jar -Dfile=E:\QRCode.jar

### 示例解释  

-DgroupId=包名
-DartifactId=项目名
-Dversion=版本号
-Dpackaging=jar
-Dfile=*.jar

### 验证

到本地仓库查看安装是否成功
在自己项目中添加jar依赖
pom.xml文件中添加

```
<dependency>
<groupId>QRCode</groupId>
<artifactId>QRCode</artifactId>
<version>3.0</version>
</dependency>
```
查看maven中是否添加成功

