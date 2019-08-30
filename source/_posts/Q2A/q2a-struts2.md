---
title: Struts2 相关问题
typora-copy-images-to: ../../gitbooks/static/images/979a26f7
abbrlink: 979a26f7
date: 2017-11-06 22:18:17
tags:
  - Struts2
categories:
  - Q2A
---




### The Struts dispatcher cannot be found
#### 问题描述
org.apache.jasper.JasperException: The Struts dispatcher cannot be found，具体的异常如下：
[java] view plain copy
<span style="font-family:'Times New Roman';font-size:18px;">he Struts dispatcher cannot be found.  This is usually caused by using Struts tags without the associated filter. Struts tags are only usable when the request has passed through its servlet filter, which initializes the Struts dispatcher needed for this tag. - [unknown location]
    at org.apache.struts2.views.jsp.TagUtils.getStack(TagUtils.java:60)
    at org.apache.struts2.views.jsp.StrutsBodyTagSupport.getStack(StrutsBodyTagSupport.java:44)
    at org.apache.struts2.views.jsp.ComponentTagSupport.doStartTag(ComponentTagSupport.java:48)
    at org.apache.jsp.chapter3test.register_jsp._jspx_meth_s_005fform_005f0(register_jsp.java:109)
    at org.apache.jsp.chapter3test.register_jsp._jspService(register_jsp.java:79)
    at org.apache.jasper.runtime.HttpJspBase.service(HttpJspBase.java:70)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:803)
    at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:384)
    at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:320)
    at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:266)
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:803)
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:290)
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)
    at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:228)
    at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:175)
    at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:128)
    at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:104)
    at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109)
    at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:216)
    at org.apache.coyote.http11.Http11Processor.process(Http11Processor.java:844)
    at org.apache.coyote.http11.Http11Protocol$Http11ConnectionHandler.process(Http11Protocol.java:634)
    at org.apache.tomcat.util.net.JIoEndpoint$Worker.run(JIoEndpoint.java:445)
    at java.lang.Thread.run(Thread.java:595)
</span>

#### 解决方案
这个异常。根据异常的提示是指Struts的过滤器不能被找到，解决该异常的方法是：
在web.xml文件中添加一个过滤设置：
 <filter-mapping>
    <filter-name>struts2</filter-name>
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
即可



### com.opensymphony.xwork2.inject.DependencyException
#### 问题描述

com.opensymphony.xwork2.inject.DependencyException: com.opensymphony.xwork2.inject.ContainerImpl$MissingDependencyException: No mapping found for dependency [type=com.opensymphony.xwork2.ObjectFactory, name='default'] in public void com.opensymphony.xwork2.config.providers.XmlConfigurationProvider.setObjectFactory(com.opensymphony.xwork2.ObjectFactory).
at com.opensymphony.xwork2.inject.ContainerImpl.addInjectorsForMembers(ContainerImpl.java:157)
#### 解决方案

<!-- resources 目录下 -->
		<init-param>
			<param-name>config</param-name>
			<param-value>/configs/struts2/struts.xml</param-value>
		</init-param>

修改为：
<!-- resources 目录下 -->
		<init-param>
			<param-name>config</param-name>
			<param-value>struts-default.xml,struts-plugin.xml,/configs/struts2/struts.xml</param-value>
		</init-param>

### struts2 修改配置文件的默认位置报异常的解决方法

#### 异常:
com.opensymphony.xwork2.inject.ContainerImpl$MissingDependencyException: No mapping found for dependency [type=com.opensymphony.xwork2.ObjectFactory, name='default'] in public void com.opensymphony.xwork2.config.providers.XmlConfigurationProvider.setObjectFactory(com.opensymphony.xwork2.ObjectFactory). - Class: com.opensymphony.xwork2.inject.ContainerImpl File: ContainerImpl.java
#### 解决方法:
  <filter-name>struts2</filter-name>
  <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
      <init-param>
        <param-name>config</param-name>
        <param-value>struts-default.xml,struts-plugin.xml,struts2/struts-*.xml</param-value>
    </init-param>
 </filter>
即,必须添加struts-default.xml(必须),struts-plugin.xml(可选)二个额外的配置文件.
原因:
struts-default.xml是默认配置文件,一些必须的框架参数都默认设置在此.


### The Struts dispatcher cannot be found
#### 描述
利用Struts2进行开发，当访问某个jsp页面时我们可能会遇到：
org.apache.jasper.JasperException: The Struts dispatcher cannot be found，具体的异常如下：
[java] view plain copy 
<span style="font-family:'Times New Roman';font-size:18px;">he Struts dispatcher cannot be found.  This is usually caused by using Struts tags without the associated filter. Struts tags are only usable when the request has passed through its servlet filter, which initializes the Struts dispatcher needed for this tag. - [unknown location]  
    at org.apache.struts2.views.jsp.TagUtils.getStack(TagUtils.java:60)  
    at org.apache.struts2.views.jsp.StrutsBodyTagSupport.getStack(StrutsBodyTagSupport.java:44)  
    at org.apache.struts2.views.jsp.ComponentTagSupport.doStartTag(ComponentTagSupport.java:48)  
    at org.apache.jsp.chapter3test.register_jsp._jspx_meth_s_005fform_005f0(register_jsp.java:109)  
    at org.apache.jsp.chapter3test.register_jsp._jspService(register_jsp.java:79)  
    at org.apache.jasper.runtime.HttpJspBase.service(HttpJspBase.java:70)  
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:803)  
    at org.apache.jasper.servlet.JspServletWrapper.service(JspServletWrapper.java:384)  
    at org.apache.jasper.servlet.JspServlet.serviceJspFile(JspServlet.java:320)  
    at org.apache.jasper.servlet.JspServlet.service(JspServlet.java:266)  
    at javax.servlet.http.HttpServlet.service(HttpServlet.java:803)  
    at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:290)  
    at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206)  
    at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:228)  
    at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:175)  
    at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:128)  
    at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:104)  
    at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109)  
    at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:216)  
    at org.apache.coyote.http11.Http11Processor.process(Http11Processor.java:844)  
    at org.apache.coyote.http11.Http11Protocol$Http11ConnectionHandler.process(Http11Protocol.java:634)  
    at org.apache.tomcat.util.net.JIoEndpoint$Worker.run(JIoEndpoint.java:445)  
    at java.lang.Thread.run(Thread.java:595)  
</span>  

#### 解决

这个异常。根据异常的提示是指Struts的过滤器不能被找到，解决该异常的方法是：
在web.xml文件中添加一个过滤设置：
 <filter-mapping>  
    <filter-name>struts2</filter-name>  
    <url-pattern>*.jsp</url-pattern>  
</filter-mapping> 
即可