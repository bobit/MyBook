---
title: Java 相关问题
typora-copy-images-to: ../../gitbooks/static/images/1689de73
abbrlink: 1689de73
tags:
  - Java
categories:
  - Q2A
date: 2017-11-02 22:18:17
---

### javax.servlet.http.HttpServletRequest.isAsyncStarted()
#### 问题描述
jetty 9 嵌入式开发时，启动正常，但是页面一浏览就报错如下：
java.lang.NoSuchMethodError: javax.servlet.http.HttpServletRequest.isAsyncStarted()Z
原因：jetty 9 依赖的servlet-api是3.X版本，如果项目中还有其它第3方开源库隐式依赖了2.x版本的servlet-api，就会报这个错。
解决办法：gradle项目中，gradle dependencies 分析所有的依赖项，找出依赖低版本servlet-api的项目，将其移除即可。

#### 解决方案

错误原因：jetty 的版本和servlet—api版本不同，加载时的顺序不同，先加载servlet-api，而造成的错误。
解决方案：
1、如果是使用的是maven的话，在pom文件中，将jetty的jar包的依赖放在servlet-api的依赖前面
2、如果没有使用maven的话，可以在java build bath->order and export 将jetty的包上移

完整报错日志：

2014-09-15 01:49:15.572:WARN:oejs.ServletHandler:qtp968838231-22: Error for /myapp/index.jsp
java.lang.NoSuchMethodError: javax.servlet.ServletContext.getJspConfigDescriptor()Ljavax/servlet/descriptor/JspConfigDescriptor;
 at org.apache.jasper.compiler.JspConfig.processWebDotXml(JspConfig.java:106)
 at org.apache.jasper.compiler.JspConfig.init(JspConfig.java:196)
 at org.apache.jasper.compiler.JspConfig.findJspProperty(JspConfig.java:259)
 at org.apache.jasper.compiler.Compiler.generateJava(Compiler.java:166)
 at org.apache.jasper.compiler.Compiler.compile(Compiler.java:451)
 at org.apache.jasper.JspCompilationContext.compile(JspCompilationContext.java:625)
 at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:375)
 at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:473)
 at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:377)
 at javax.servlet.http.HttpServlet.service(HttpServlet.java:820)
 at org.eclipse.jetty.servlet.ServletHolder.handle(ServletHolder.java:738)
 at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:551)
 at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:143)
 at org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:568)
 at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:221)
 at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1111)
 at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:478)
 at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:183)
 at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1045)
 at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:141)
 at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:97)
 at org.eclipse.jetty.server.Server.handle(Server.java:462)
 at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:279)
 at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:232)
 at org.eclipse.jetty.io.AbstractConnection$2.run(AbstractConnection.java:534)
 at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:607)
 at org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:536)
 at java.lang.Thread.run(Thread.java:744)
2014-09-15 01:49:15.574:WARN:oejut.QueuedThreadPool:qtp968838231-22:
java.lang.NoSuchMethodError: javax.servlet.http.HttpServletRequest.isAsyncStarted()Z
 at org.eclipse.jetty.servlet.ServletHandler.doHandle(ServletHandler.java:648)
 at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:143)
 at org.eclipse.jetty.security.SecurityHandler.handle(SecurityHandler.java:568)
 at org.eclipse.jetty.server.session.SessionHandler.doHandle(SessionHandler.java:221)
 at org.eclipse.jetty.server.handler.ContextHandler.doHandle(ContextHandler.java:1111)
 at org.eclipse.jetty.servlet.ServletHandler.doScope(ServletHandler.java:478)
 at org.eclipse.jetty.server.session.SessionHandler.doScope(SessionHandler.java:183)
 at org.eclipse.jetty.server.handler.ContextHandler.doScope(ContextHandler.java:1045)
 at org.eclipse.jetty.server.handler.ScopedHandler.handle(ScopedHandler.java:141)
 at org.eclipse.jetty.server.handler.HandlerWrapper.handle(HandlerWrapper.java:97)
 at org.eclipse.jetty.server.Server.handle(Server.java:462)
 at org.eclipse.jetty.server.HttpChannel.handle(HttpChannel.java:279)
 at org.eclipse.jetty.server.HttpConnection.onFillable(HttpConnection.java:232)
 at org.eclipse.jetty.io.AbstractConnection$2.run(AbstractConnection.java:534)
 at org.eclipse.jetty.util.thread.QueuedThreadPool.runJob(QueuedThreadPool.java:607)
 at org.eclipse.jetty.util.thread.QueuedThreadPool$3.run(QueuedThreadPool.java:536)
 at java.lang.Thread.run(Thread.java:744)



### Syntax error on token "enum", delete this token
#### 问题描述
我定义了一个Enumeration类型的变量enum，
Enumeration enum = …………
但是eclipse报错：
Multiple markers at this line

- Enumeration cannot be resolved
- Syntax error on token "enum", delete this token
  我的jdk和jre都是1.5.0_11
#### 解决方案
在jdk中不可以用enum作为变量名，因为它在1.5以后是一个关键字


### Remove @Override annotation
#### 问题描述

Remove @Override annotation错误

#### 解决方案
第一种解决方案：

@Override是JDK5 就已经有了，但有个小小的Bug，就是不支持对接口的实现，认为这不是Override
而JDK6 修正了这个Bug，无论是对父类的方法覆盖还是对接口的实现都可以加上@Override

修改你的eclipse指定的编译器版本
在选项里的java compiler中指定版本至少在5.0以上

在myEclipse中改变编译器的方法：Project->Properties->Java Compiler->Configure Workspace Setting，在弹出的页面中可以进行设置。

这个来自于：http://blog.csdn.net/CodeJoker/archive/2009/07/02/4317361.aspx



第二种解决方案：（我使用这种方法，没有问题）

在JAVA 1.5和1.6中@override的用法是有些区别的，虽然改变了JRE但eclipse还是会报错。

解决办法：Windows->Preferences-->java->Compiler-->compiler compliance level设置成6.0就OK了.

注意：

但是在导入一个工程时，编译并打包到Tomcat后，发现出现java.lang.UnsupportedClassVersionError: Bad version number in .class file异常，检查了一下我的myEclipse，我发现我的eclipse的compiler的jdk版本，tomcat所用的jdk版本不一致，后来设置成一致就可以了。看来果然是这个问题引起。
    那次在Linux上部署工程时也出现过因为版本不同引起的问题，那时我们用的IDE的编译器是JDK5.0，而那台Linux装的是JDK6.0，部署后发现很多功能都出错，看来有些东西还是注意一下啊。
    附，在myEclipse中改变编译器的方法：Project->Proper的ties->Java Compiler->Configure Workspace Setting，在弹出的页面中可以进行设置



其实这种方式与第二种差不多，殊途同归。第一种方式重点是设置这一个项目。而第二种重点设置所以项目。不过都可以用。