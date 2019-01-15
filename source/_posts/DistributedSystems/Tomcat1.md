---
title: Tomcat数据库连接池
typora-copy-images-to: ../../gitbooks/static/images/
toc: true
mathjax: true
abbrlink: 959cee99
date: 2019-01-15 14:55:12
tags:
  - Tomcat
categories:
  - DistributedSystems
---

## 连接池配置
第一步，在tomcat服务器目录下面的conf中找到一个叫Context.xml的配置文件，在其中加入以下代码
```
<Resource name="jdbc/books"
auth="Container"type="javax.sql.DataSource" maxActive="100"
maxIdle="30" maxWait="10000" username="sa" password="123456"
driverClassName="com.microsoft.sqlserver.jdbc.SQLServerDriver"
url="jdbc:sqlserver://localhost:1433;DatabaseName=news"/>
```

参数含义：
JNDI (java naming and directory interface): Java 命名和目录接口
maxActive:
maxActive="100"
表示并发情况下最大可从连接池中获取的连接数。如果数据库不是单独，供一个应用使用，通过设置maxActive参数可以避免某个应用无限制的获取连接对其他应用造成影响，如果一个数据库只是用来支持一个应用那么maxActive理论上可以设置成该数据库可以支撑的最大连接数。maxActive只是表示通过连接池可以并发的获取的最大连接数。连接的获取与释放是双向，当应用程序并发请求连接池时，连接池就需要从数据库获取连接，那么但应用程序使用完连接并将连接归还给连接池时，连接池是否也同时将连接归还给数据库呢？很显然答案是否定的，如果那样的话连接池就变得多此一举，不但不能提高性能，反而会降低性能，那么但应用成归还连接后，连接池如何处理呢？
maxIdle
maxIdle="30"
如果在并发时达到了maxActive=100，那么连接池就必须从数据库中获取100个连接来供应用程序使用，当应用程序关闭连接后，由于maxIdle=30,因此并不是所有的连接都会归还给数据库，将会有30个连接保持在连接池种中，状态为空闲。
minIdle
minIdle=”2”
最小默认情况下并不生效，它的含义是当连接池中的连接少有minIdle，系统监控线程将启动补充功能，一般情况下我们并不启动补充线程。
## 问题：
### 如何设置maxActive和maxIdle？
理论上讲maxActive应该设置成应用的最大并发数，这样一来即便是在最大并发的情况下，应用依然能够从连接池中获取连接，但是困难时的是我们很难准确估计到最大并发数，设置成最大并发数是一种最优的服务质量保证，事实上，如果某个用户登录提示系统繁忙，那么在他再次登录时，可能系统资源已经充足，对于拜特资金管理系统我们建议将maxActive设置为系统注册人数的十分之一到二十分之一之间。例如系统的注册人数为1000，那么设置成50-100靠近100的数字，例如85或90。
 maxIdle对应的连接，实际上是连接池保持的长连接，这也是连接池发挥优势的部分，理论上讲保持较多的长连接，在应用请求时可以更快的响应，但是过多的连接保持，反而会消耗数据库大量的资源，因此maxIdle也并不是越大越好，同上例我们建议将 maxIdle设置成
50-100中靠近50的数字，例如55。这样就能在兼顾最大并发同时，保持较少的数据库连接，而且在绝大多情况，能够为应用程序提供最快的相应速度。
 removeAbandoned="true"
removeAbandonedTimeout="60"
logAbandoned="true"
有时粗心的程序编写者在从连接池中获取连接使用后忘记了连接的关闭，这样连池的连接就会逐渐达到maxActive直至连接池无法提供服务。现代连接池一般提供一种“智能”的检查，但设置了removeAbandoned="true"时，当连接池连接数到达(getNumIdle() < 2) and (getNumActive() > getMaxActive() - 3)时便会启动连接回收，那种活动时间超过removeAbandonedTimeout="60"的连接将会被回收，同时如果logAbandoned="true"设置为true,程序在回收连接的同时会打印日志。
removeAbandoned是连接池的高级功能，理论上这中配置不应该出现在实际的生产环境，因为有时应用程序执行长事务，可能这种情况下，会被连接池误回收，该种配置一般在程序测试阶段，为了定位连接泄漏的具体代码位置，被开启，生产环境中连接的关闭应该靠程序自己保证。

第二步，将数据驱动.jar 放入tomcat目录下的lib或common\lib下面
第三步，打开应用程序的 Web.xml文件，添加以下配置

<resource-ref>
<res-ref-name>jdbc/books</res-ref-name>
<res-type>javax.sql.DataSource</res-type>
<res-auth>Container</res-auth>
</resource-ref>
节点数据来源于Context.xml里面设置的数据

在java文件中先导入以下包
```
import javax.sql.DataSource;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
将原来的数据库连接操作
Class.forName("oracle.jdbc.driver.OracleDriver");
if( conn == null || conn.isClosed() )
conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:ORCL",
"system",
"accp");

换成

Context c = new InitialContext();
DataSource ds = (DataSource)c.lookup("java:comp/env/jdbc/books");
conn = ds.getConnection();
```
记得要捕获 NamingException 与 SQLException 异常

### 使用连接池的好处

数据库操作性能得到提升
通过连接池管理数据库的连接与释放、提高了系统资源的使用效率