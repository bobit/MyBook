---
title: Spring 相关问题
typora-copy-images-to: ../../gitbooks/static/images/3fb98eae
abbrlink: 3fb98eae
date: 2017-11-05 22:18:17
tags:
  - Spring
categories:
  - Q2A
---
### WebApplicationContext: initialization started
#### 问题描述
2016-03-23 16:57:53,549 INFO  [org.springframework.web.context.ContextLoader] - Root WebApplicationContext: initialization started
2016-03-23 16:57:53,662 INFO  [springframework.web.context.support.XmlWebApplicationContext] - Refreshing Root WebApplicationContext: startup date [Wed Mar 23 16:57:53 CST 2016]; root of context hierarchy
2016-03-23 16:57:53,715 INFO  [springframework.beans.factory.xml.XmlBeanDefinitionReader] - Loading XML bean definitions from class path resource [applicationContext.xml]
2016-03-23 16:57:53,814 INFO  [springframework.beans.factory.xml.XmlBeanDefinitionReader] - Loading XML bean definitions from class path resource [configs/service-context.xml]
2016-03-23 16:57:53,957 INFO  [springframework.beans.factory.config.PropertyPlaceholderConfigurer] - Loading properties file from class path resource [configs/properties/database.properties]
2016-03-23 16:57:54,288 INFO  [com.alibaba.druid.pool.DruidDataSource] - {dataSource-1} inited
2016-03-23 16:57:54,289 WARN  [springframework.web.context.support.XmlWebApplicationContext] - Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'druidDataSource' defined in class path resource [applicationContext.xml]: Invocation of init method failed; nested exception is java.lang.IllegalArgumentException: illegal maxActive 3
2016-03-23 16:57:54,292 ERROR [org.springframework.web.context.ContextLoader] - Context initialization failed
org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'druidDataSource' defined in class path resource [applicationContext.xml]: Invocation of init method failed; nested exception is java.lang.IllegalArgumentException: illegal maxActive 3
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1578)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:545)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:482)
	at org.springframework.beans.factory.support.AbstractBeanFactory$1.getObject(AbstractBeanFactory.java:306)
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:230)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:302)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:197)
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:772)
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:838)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:537)
	at org.springframework.web.context.ContextLoader.configureAndRefreshWebApplicationContext(ContextLoader.java:446)
	at org.springframework.web.context.ContextLoader.initWebApplicationContext(ContextLoader.java:328)
	at org.springframework.web.context.ContextLoaderListener.contextInitialized(ContextLoaderListener.java:107)
	at org.apache.catalina.core.StandardContext.listenerStart(StandardContext.java:4939)
	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5434)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:150)
	at org.apache.catalina.core.StandardContext.reload(StandardContext.java:3954)
	at org.apache.catalina.loader.WebappLoader.backgroundProcess(WebappLoader.java:426)
	at org.apache.catalina.core.ContainerBase.backgroundProcess(ContainerBase.java:1345)
	at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1530)
	at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1540)
	at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1540)
	at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.run(ContainerBase.java:1519)
	at java.lang.Thread.run(Thread.java:724)
Caused by: java.lang.IllegalArgumentException: illegal maxActive 3
	at com.alibaba.druid.pool.DruidDataSource.init(DruidDataSource.java:532)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:57)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:606)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeCustomInitMethod(AbstractAutowireCapableBeanFactory.java:1706)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1645)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1574)
	... 23 more
#### 解决方案
maxActive 设置3，太小

其中三个重要个几个属性是：
MaxActive: 可用连接实例的最大数目，为负值时没有限制。
MaxIdle: 空闲连接实例的最大数目，为负值时没有限制。Idle的实例在使用前，通常会通过org.apache.commons.pool.BasePoolableObjectFactory<T>的activateObject()方法使其变得可用。
MaxWait: 等待可用连接的最大数目，单位毫秒（million seconds）。
     （注:pool.getResource()方法实际调用的GenericObjectPool类borrowObject()方法，该方法会根据MaxWait变量值在没有可用连接（idle/active)时阻塞等待知道超时，具体含义参看api。）

也就是说当连接池中没有active/idle的连接时，会等待maxWait时间，如果等待超时还没有可用连接，则抛出Could not get a resource from the pool异常。所以为避免这样的错误，

我们应该根据程序实际情况合理设置这三个参数的值，同时在我们获取一个连接的程序方法中也应该合理的处理这个异常，当没有连接可用时，等待一段时间再获取也许是个比较好的选择。