---
title: Druid使用
typora-copy-images-to: ../../gitbooks/static/images/b4ddb2c4
toc: true
mathjax: true
abbrlink: b4ddb2c4
date: 2015-01-01 15:11:58
tags:
- Druid
categories:
- Framework
---

## 简介
### Druid是什么？
Druid首先是一个数据库连接池。Druid是目前最好的数据库连接池，在功能、性能、扩展性方面，都超过其他数据库连接池，包括DBCP、C3P0、BoneCP、Proxool、JBoss DataSource。

Druid已经在阿里巴巴部署了超过600个应用，经过一年多生产环境大规模部署的严苛考验。

同时Druid不仅仅是一个数据库连接池，它包括四个部分：
Druid是一个JDBC组件，它包括三个部分：

基于Filter－Chain 模式的插件体系。
DruidDataSource 高效可管理的数据库连接池。
SQLParser
### Druid可以做什么？
替换DBCP和C3P0。Druid提供了一个高效、功能强大、可扩展性好的数据库连接池。
可以监控数据库访问性能，Druid内置提供了一个功能强大的StatFilter插件，能够详细统计SQL的执行性能，这对于线上分析数据库访问性能有帮助。
数据库密码加密。直接把数据库密码写在配置文件中，这是不好的行为，容易导致安全问题。DruidDruiver和DruidDataSource都支持PasswordCallback。
SQL执行日志，Druid提供了不同的LogFilter，能够支持Common-Logging、Log4j和JdkLog，你可以按需要选择相应的LogFilter，监控你应用的数据库访问情况。
扩展JDBC，如果你要对JDBC层有编程的需求，可以通过Druid提供的Filter机制，很方便编写JDBC层的扩展插件。
在项目中使用Druid非常简单，只要修改下配置文件就可以了


Druid是属于阿里巴巴开源项目，负责人温少锦，人称温少，从2010入职阿里，开发了DRAGOON性能够监控系统，以及被称为最快的JSON解析引擎FASTJSON。
Druid是阿里巴巴开源平台上的一个项目，整个项目由数据库连接池、插件框架和SQL解析器组成。该项目主要是为了扩展JDBC的一些限制，可以让程序员实现一些特殊的需求，比如向密钥服务请求凭证、统计SQL信息、SQL性能收集、SQL注入检查、SQL翻译等，程序员可以通过定制来实现自己需要的功能。
### Druid是什么？有什么作用？

Druid首先是一个数据库连接池，但它不仅仅是一个数据库连接池，它还包含一个ProxyDriver，一系列内置的JDBC组件库，一个SQL Parser。
Druid的项目背景？目前的项目团队情况？开源目的？

2010年开始，我负责设计一个叫做Dragoon的监控系统，需要一些监控组件，监控应用程序的运行情况，包括Web URI、Spring、JDBC等。为了监控SQL执行情况，我做了一个Filter-Chain模式的ProxyDriver，缺省提供 StatFilter。当时我还做了一个SQL Parser。老板说，不如我们来一个更大的计划，把连接池、SQL Parser、Proxy Driver合起来做一个项目，命名为Druid，于是Druid就诞生了。

2011年2月春节期间，我完成了连接池（DruidDataSource）的第一个版本，4月开始在生产环境测试，2012年第一季度开始大规模实施。

提交过代码的开发者有5个人，主要代码是我维护，有一人专门负责内部实施。

通过开源，希望有更多使用场景，更多的反馈，更多人参与其中，共同打造最好的数据库连接池。

### Druid支持哪些数据库？

Druid支持所有JDBC兼容的数据库，包括Oracle、MySql、Derby、Postgresql、SQL Server、H2等等。

Druid针对Oracle和MySql做了特别优化，比如Oracle的PS Cache内存占用优化，MySql的ping检测优化。

### Druid是如何扩展JDBC的?

Druid在DruidDataSourc和ProxyDriver上提供了Filter-Chain模式的扩展API，类似Serlvet的Filter，配置Filter拦截JDBC的方法调用。
### 为什么说Druid是“最好的数据库连接池”?体现在哪些方面？这是如何实现的？

阿里巴巴是一个重度使用关系数据库的公司，我们在生产环境中大量的使用Druid，通过长期在极高负载的生产环境中实际使用、修改和完善，让Druid逐步发展成最好的数据库连接池。Druid在监控、可扩展性、稳定性和性能方面都有明显的优势。

首先，强大的监控特性，通过Druid提供的监控功能，可以清楚知道连接池和SQL的工作情况。

监控SQL的执行时间、ResultSet持有时间、返回行数、更新行数、错误次数、错误堆栈信息。
SQL执行的耗时区间分布。什么是耗时区间分布呢？比如说，某个SQL执行了1000次，其中0~1毫秒区间50次，1~10毫秒 800次，10~100毫秒100次，100~1000毫秒30次，1~10秒15次，10秒以上5次。通过耗时区间分布，能够非常清楚知道SQL的执行 耗时情况。
监控连接池的物理连接创建和销毁次数、逻辑连接的申请和关闭次数、非空等待次数、PSCache命中率等。

其次，方便扩展。Druid提供了Filter-Chain模式的扩展API，可以自己编写Filter拦截JDBC中的任何方法，可以在上面做任何事情，比如说性能监控、SQL审计、用户名密码加密、日志等等。

Druid内置提供了用于监控的StatFilter、日志输出的Log系列Filter、防御SQL注入攻击的WallFilter。

阿里巴巴内部实现了用于数据库密码加密的CirceFilter，以及和Web、Spring关联监控的DragoonStatFilter。


第三，Druid集合了开源和商业数据库连接池的优秀特性，并结合阿里巴巴大规模苛刻生产环境的使用经验进行优化。

ExceptionSorter。当一个连接产生不可恢复的异常时，例如Oracle error_code_28 session has been killed，必须立刻从连接池中逐出，否则会产生大量错误。目前只有Druid和JBoss DataSource实现了ExceptionSorter。
PSCache内存占用优化对于支持游标的数据库（Oracle、SQL Server、DB2等，不包括MySql），PSCache可以大幅度提升SQL执行性能。一个PreparedStatement对应服务器一个游 标，如果PreparedStatement被缓存起来重复执行，PreparedStatement没有被关闭，服务器端的游标就不会被关闭，性能提高 非常显著。在类似“SELECT * FROM T WHERE ID = ?”这样的场景，性能可能是一个数量级的提升。但在Oracle JDBC Driver中，其他的数据库连接池（DBCP、JBossDataSource）会占用内存过多，极端情况可能大于1G。Druid调用 OracleDriver提供管理PSCache内部API。
LRU是一个性能关键指标，特别Oracle，每个Connection对应数据库端的一个进程，如果数据库连接池遵从LRU，有助于 数据库服务器优化，这是重要的指标。Druid、DBCP、Proxool、JBoss是遵守LRU的。BoneCP、C3P0则不是。BoneCP在 mock环境下性能可能还好，但在真实环境中则就不好了。
### Druid的性能如何？能否给出一些测试对比数据？

性能不是Druid的设计目标，但是测试数据表明，Druid性能比DBCP、C3P0、Proxool、JBoss都好。

这里有一些测试数据：http://code.alibabatech.com/wiki/pages/viewpage.action?pageId=2916539

### 谈谈Druid的SQL解析功能？效率如何？

Druid提供了MySql、Oracle、Postgresql、SQL-92的SQL的完整支持，这是一个手写的高性能SQL Parser，支持Visitor模式，使得分析SQL的抽象语法树很方便。

简单SQL语句用时10微秒以内，复杂SQL用时30微秒。

通过Druid提供的SQL Parser可以在JDBC层拦截SQL做相应处理，比如说分库分表、审计等。Druid防御SQL注入攻击的WallFilter就是通过Druid的SQL Parser分析语义实现的。

### Druid的扩展性如何？

Druid提供Filter-Chain模式的插件框架，通过编写Filter配置到DruidDataSource中就可以拦截JDBC的各种API，从而实现扩展。Druid提供了一系列内置Filter。
### 在SQL注入防御方面，Druid的优势是什么？实现原理是什么？

Druid的优势是在JDBC最低层进行拦截做判断，不会遗漏。

Druid实现了Oracle、MySql、Postgresql、SQL-92的Parser，基于SQL语法分析实现，理解其中的SQL语义，智能、准确、误报率低。

具体细节参考这里：http://code.alibabatech.com/wiki/display/Druid/WallFilter

### 目前Druid的应用（部署）情况？

Druid是阿里巴巴监控系统Dragoon的副产品，从Dragoon监控系统的数据来看，在阿里巴巴已经部署了600多个应用。在阿里巴巴外部也有很多Druid的用户，外部用户没有正式统计数据，但经常有反馈。
我想将其中的某个模块（比如监控模块）用到其他连接池，是否可以？模块的独立性如何？

可以通过DruidDriver把内置的Filter用在其他连接池中。在2011年上半年DruidDataSource不成熟的时候，我们也是这么做的。在其他连接池中使用内置的Filter，需要修改jdbc-url，使用DruidDriver作为一个ProxyDriver。
### 我想在项目中使用，应该注意哪些事项？能否用于商业项目？

Druid是一个开源项目，基于Apache 2.0协议，你可以免费自由使用。Druid只支持JDK 6以上版本，不支持JDK 1.4和JDK 5.0。
### 配置是否复杂？能否给出一个典型的配置实例？

为了方便大家迁移，Druid的配置和DBCP是基本一致的，如果你原来是使用DBCP，迁移是十分方便的，只需要把 corg.apache.commons.dbcp.BasicDataSource修改为 om.alibaba.druid.pool.DruidDataSource就好了。

在上面的配置中，通常你需要配置url、username、password，maxActive这三项。

在DruidDataSource中，你可以不配置DriverClass，它根据url自动识别。Druid能够自动识别20多中url，常见的JDBC Driver都包括了。

### 启用Web监控统计功能需要在Web应用的web.xml中加入这个Servlet声明
web.xml 加上
```
<servlet>       
  <servlet-name>DruidStatView</servlet-name>     
  <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>  
</servlet>   
<servlet-mapping>     
   <servlet-name>DruidStatView</servlet-name>  
   <url-pattern>/druid/*</url-pattern>  
 </servlet-mapping>
```
该配置可以访问监控界面，配置好后，访问http://ip地址:端口号/项目名/druid/index.html即可监控数据库访问性能
通过 http://ip:port/druid/ 地址访问即可
访问地址：http://localhost:8080/druid/index.html

### 我目前使用其他连接池（DBCP/C3P0/Proxool等），如何迁移到Druid？

从DBCP迁移最方便，把org.apache.commons.dbcp.BasicDataSource修改为om.alibaba.druid.pool.DruidDataSource就好了。

Druid网站上提供了Druid/DBCP/C3P0/JBoss/WebLogic的参数对照表，通过这个对照表来迁移你目前的配置。

### 其他开发者如何反馈问题、提交bug？

Druid源码托管在github.com上，项目地址是https://github.com/AlibabaTech/druid。

你可以在github上提交patch和issue（包括bug和新特性）。你也可以加入我们的QQ群92748305，和开发者以及其他用户一起交流。

使用Druid的内置监控功能
1、怎么打开Druid的监控统计功能 

Druid的监控统计功能是通过filter-chain扩展实现，如果你要打开监控统计功能，配置StatFilter ，StatFilter 的别名是stat，这个别名映射配置信息保存在druid-xxx.jar!/META-INF/druid-filter.properties。 在spring中使用别名配置方式如下：

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">

... ... <property name="filters" value="stat" />

</bean>

StatFilter 可以和其他的Filter配置使用，比如：

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">

... ... <property name="filters" value="stat,log4j" />

</bean>

其他详情可以参考：https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatFilter

### 怎样使用Druid的内置监控页面

Druid内置提供了一个StatViewServlet 用于展示Druid的统计信息。 这个StatViewServlet 的用途包括：
提供监控信息展示的html页面 提供监控信息的JSON API
注意：使用StatViewServlet ，建议使用druid 0.2.6以上版本。

#### 1） 配置web.xml
StatViewServlet 是一个标准的javax.servlet.http.HttpServlet ，需要配置在你web应用中的WEB-INF/web.xml中。

<servlet>
<servlet-name>DruidStatView </servlet-name> <servlet-class>com.alibaba.druid.support.http.StatViewServlet </servlet-class>

</servlet> <servlet-mapping>

<servlet-name>DruidStatView </servlet-name> <url-pattern>/druid/*</url-pattern>

</servlet-mapping>

根据配置中的url-pattern来访问内置监控页面，如果是上面的配置，内置监控页面的首页是/druid/index.html

例如：http://110.76.43.235:9000/druid/index.html ，http://110.76.43.235:8080/mini-web/druid/index.html

#### 2） 配置allow和deny

StatViewSerlvet 展示出来的监控信息比较敏感，是系统运行的内部情况，如果你需要做访问控制，可以配置allow和deny这两个参数。比如：

<servlet>

<servlet-name>DruidStatView </servlet-name> <servlet-class>com.alibaba.druid.support.http.StatViewServlet </servlet-class>

<init-param>

<param-name>allow</param-name> <param-value>128.242.127.1/24,128.242.128.1</param-value>

</init-param> <init-param>

<param-name>deny</param-name> <param-value>128.242.127.4</param-value>

</init-param>

</servlet>

判断规则：deny优先于allow，如果在deny列表中，就算在allow列表中，也会被拒绝。如果allow没有配置或者为空，则允许所有访问 其他详情参考：https://github.com/alibaba/druid/wiki/%E9%85%8D%E7%BD%AE_StatViewServlet%E9%85%8D%E7%BD%AE

#### 3、内置监控中的Web和Spring关联监控怎么配置？

WebStatFilter 用于采集web-jdbc关联监控的数据。

1）web.xml配置 <filter>

<filter-name>DruidWebStatFilter </filter-name> <filter-class>com.alibaba.druid.support.http.WebStatFilter </filter-class> <init-param>

<param-name>exclusions</param-name> <param-value>*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>

</init-param>

</filter> <filter-mapping>

<filter-name>DruidWebStatFilter </filter-name> <url-pattern>/*</url-pattern>

</filter-mapping> 2）exlusions配置

经常需要排除一些不必要的url，比如.js,/jslib/等等。配置在init-param中。比如： <init-param>

<param-name>exclusions</param-name> <param-value>*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>

</init-param>

3）sessionStatMaxCount配置

缺省sessionStatMaxCount是1000个。你可以按需要进行配置，比如： <init-param>

<param-name>sessionStatMaxCount</param-name> <param-value>1000</param-value>

</init-param>

#### 4）sessionStatEnable配置

你可以关闭session统计功能，比如：

<init-param>

<param-name>sessionStatEnable</param-name> <param-value>false</param-value>

</init-param>

#### 5）principalSessionName配置

你可以配置principalSessionName，使得druid能够知道当前的session的用户是谁。比如：

<init-param>

<param-name>principalSessionName</param-name> <param-value>xxx.user</param-value>

</init-param> 根据需要，把其中的xxx.user修改为你user信息保存在session中的sessionName。

注意：如果你session中保存的是非string类型的对象，需要重载toString方法。

#### 6）principalCookieName

如果你的user信息保存在cookie中，你可以配置principalCookieName，使得druid知道当前的user是谁

<init-param>

<param-name>principalCookieName</param-name> <param-value>xxx.user</param-value>

</init-param> 根据需要，把其中的xxx.user修改为你user信息保存在cookie中的cookieName

#### 7）profileEnable

druid 0.2.7版本开始支持profile，配置profileEnable能够监控单个url调用的sql列表。

<init-param>

<param-name>profileEnable</param-name> <param-value>true</param-value>

</init-param>

Druid的其他相关问题可以查看：https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98

### 在javaWeb项目中配置监控
当我们在javaWEB项目中使用到druid来作为我们的连接池的时候，一定不会忘了添加监控功能。下面我们就来看一下，在一个简单的web项目中(尚未使用任何框架)我们是如果来配置我们的web.xml来完成我们的监控配置

首先是过滤器filter的配置,在web.xml中添加如下配置

<filter>
    <filter-name>DruidWebStatFilter</filter-name>
    <filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
    <init-param>
        <param-name>exclusions</param-name>
        <param-value>*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>DruidWebStatFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
过滤器中的配置，是用来定义我们的监控选项，在以上的监控配置中，我们定义了一个简单的监控，并采用了大量的默认配置，如果你想使用更丰富的监控配置，可以在druid的github wiki上获取更多的选项，地址：druid Filter 配置



选项配置结束之后，就是我们监控界面的路径配置了，servlet配置我们将在哪里打开我们的监控页面，在web.xml中添加如下代码


<servlet>
      <servlet-name>DruidStatView</servlet-name>
      <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
  </servlet>
  <servlet-mapping>
      <servlet-name>DruidStatView</servlet-name>
      <url-pattern>/druid/*</url-pattern>
  </servlet-mapping>
以上配置中，我们将我们的网页监控路径放在了，项目路径下的 druid路径中，类似于 www.myroject.com/druid.
同样的，上面的配置只是一个简单的配置，更丰富的选项，需要您移步：druid servlet 配置

至此，一个简单的web项目就配好了监控的页面，但是大多数人在开发javaWEB项目中时都避免不了使用到各种框架和其他的技术，我将在后面的博文中陆续写出相应的配置方式。


### 记录监控相关部分
1、怎么配置监控
2、注意点
3、应用场景
#### 配置监控
1.打开监控统计
核心配置是这个，一般通过ioc来配置。需要注意的参数是这个
filters : 'stat,wall'
'stat'用于统计，'wall'用于防火墙
2.展示监控统计
在web.xml里配置
	<!-- 展示Druid的统计信息,统计数据源和sql -->
	<servlet>
		<servlet-name>DruidStatView</servlet-name>
		<servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
		<init-param>		<!-- 白名单 -->
			<param-name>allow</param-name>
			<param-value>192.168.1.120/24,111.206.116.68,127.0.0.1</param-value>
		</init-param>
		<init-param>		<!-- 用户名 -->
			<param-name>loginUsername</param-name>
			<param-value>account</param-value>
		</init-param>
		<init-param>		<!-- 密码 -->
			<param-name>loginPassword</param-name>
			<param-value>tyts</param-value>
		</init-param>
	</servlet>
	<servlet-mapping>
		<servlet-name>DruidStatView</servlet-name>
		<url-pattern>/druid/*</url-pattern>
	</servlet-mapping><!-- 如果需要监控uri，设置Web关联监控配置 -->
	<filter>
		<filter-name>DruidWebStatFilter</filter-name>
		<filter-class>com.alibaba.druid.support.http.WebStatFilter</filter-class>
		<init-param>
			<param-name>exclusions</param-name>		<!-- 排除统计干扰 -->
			<param-value>*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>DruidWebStatFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>
#### 注意点 
1.访问权限（这里有两层限制）
限定指定的ip可以访问。
需要通过用户名和密码才可以进入展示页面
限定指定的ip
规则：
如果是限定指定ip，可以直接写完整的ip。例如111.206.116.68。
如果是限定指定的子网里的所有ip都可以访问，那就是ip/子网掩码数。例如 192.168.1.120/24 就相当于192.168.1.*
通过用户名和密码
看web.xml里的例子即可。功能本身就带有。
2.统计的filters
druid提供了一些内置filter实例。这里用的是stat和wall。一个是用于监控，一个是用于防火墙
如果想使用sql防火墙，必须加上wall
3.weburi-detail.html详情页里不能显示带.json后缀的uri详情，因为在druid的代码进行了处理
if (url.startsWith("/weburi-") && url.indexOf(".json") > 0) {String uri = StringUtils.subString(url, "weburi-", ".json");return returnJSONResult(RESULT_CODE_SUCCESS, getWebURIStatData(uri));}
应用场景（或者说监控页面关注的选项）
数据源
连接数设置， 事务及连接数使用情况以及使用详细情况
SQL监控
执行时间，最慢，读取行数，最大并发数，以及时间分布。不一一说明

SQL防火墙
可以看出表的使用情况

Web应用
并发，请求数，来源于哪个类型操作系统，来源于哪些浏览器
URI监控
请求次数，请求时间，最大并发，区间分布


## 附录

### 2种配置方法实例：

#### 纯Java代码创建
dataSource = new DruidDataSource();
dataSource.setDriverClassName("com.mysql.jdbc.Driver"); 
dataSource.setUsername("root"); 
dataSource.setPassword("11111111"); 
dataSource.setUrl("jdbc:mysql://127.0.0.1:3306/demo"); 
dataSource.setInitialSize(5); 
dataSource.setMinIdle(1); 
dataSource.setMaxActive(10); // 启用监控统计功能  
dataSource.setFilters("stat");// for mysql  
dataSource.setPoolPreparedStatements(false);

#### 基于Spring创建

applicationContext.xml

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
    	<!-- 基本属性 url、user、password -->
    	<property name="driverClassName" value="${jdbc.driver}" />
    	<property name="url" value="${jdbc.url}" />
    	<property name="username" value="${jdbc.username}" />
    	<property name="password" value="${jdbc.password}" />
    
    	<!-- 配置初始化大小、最小、最大 -->
    	<property name="initialSize" value="${jdbc.pool.initialSize}" />
    	<property name="minIdle" value="${jdbc.pool.minIdle}" />
    	<property name="maxActive" value="${jdbc.pool.maxActive}" />
    	<!-- 配置获取连接等待超时的时间 -->
    	<property name="maxWait" value="${jdbc.pool.maxWait}" />
    	<!-- 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒 -->
    	<property name="timeBetweenEvictionRunsMillis" value="${jdbc.pool.timeBetweenEvictionRunsMillis}" />
    	<!-- 配置一个连接在池中最小生存的时间，单位是毫秒 -->
    	<property name="minEvictableIdleTimeMillis" value="${jdbc.pool.minEvictableIdleTimeMillis}" />
    
    	<property name="validationQuery" value="${jdbc.pool.validationQuery}" />
    	<property name="testWhileIdle" value="${jdbc.pool.testWhileIdle}" />
    	<property name="testOnBorrow" value="${jdbc.pool.testOnBorrow}" />
    	<property name="testOnReturn" value="${jdbc.pool.testOnReturn}" />
    
    	<!-- 打开PSCache，并且指定每个连接上PSCache的大小 -->
    	<property name="poolPreparedStatements" value="${jdbc.pool.poolPreparedStatements}" />
    	<property name="maxPoolPreparedStatementPerConnectionSize"
    		value="${jdbc.pool.maxPoolPreparedStatementPerConnectionSize}" />
    
    	<!-- 配置监控统计拦截的filters -->
    	<property name="filters" value="stat" />
    </bean>

database.properties 

	#mysql database setting
	jdbc.type=mysql
	jdbc.driver=com.mysql.jdbc.Driver
	jdbc.url=jdbc:mysql://qdm160414203.my3w.com:3306/qdm160414203_db
	jdbc.username=qdm160414203
	jdbc.password=123111123
	
	#mssql database settings
	#jdbc.type=mssql
	#jdbc.driver=net.sourceforge.jtds.jdbc.Driver
	#jdbc.url=jdbc:jtds:sqlserver://localhost:1433/jeesite
	#jdbc.username=sa
	#jdbc.password=sa
	
	#pool settings
	jdbc.pool.initialSize=1
	jdbc.pool.minIdle=3
	jdbc.pool.maxActive=20
	
	jdbc.pool.maxWait=100
	jdbc.pool.timeBetweenEvictionRunsMillis=30000
	jdbc.pool.minEvictableIdleTimeMillis=60000
	jdbc.pool.validationQuery=select 1
	jdbc.pool.testWhileIdle=true
	jdbc.pool.testOnBorrow=false
	jdbc.pool.testOnReturn=false
	jdbc.pool.poolPreparedStatements=true
	jdbc.pool.maxPoolPreparedStatementPerConnectionSize=30
	jdbc.testSql=SELECT 'x' FROM DUAL


#### 配置属性列表
https://github.com/alibaba/druid/wiki/DruidDataSource
	配置	缺省值	说明
	name		配置这个属性的意义在于，如果存在多个数据源，监控的时候可以通过名字来区分开来。
	如果没有配置，将会生成一个名字，格式是："DataSource-" + System.identityHashCode(this)
	jdbcUrl		连接数据库的url，不同数据库不一样。例如：
	mysql : jdbc:mysql://10.20.153.104:3306/druid2 
	oracle : jdbc:oracle:thin:@10.20.149.85:1521:ocnauto
	username		连接数据库的用户名
	password		连接数据库的密码。如果你不希望密码直接写在配置文件中，可以使用ConfigFilter。详细看这里：https://github.com/alibaba/druid/wiki/%E4%BD%BF%E7%94%A8ConfigFilter
	driverClassName	根据url自动识别	这一项可配可不配，如果不配置druid会根据url自动识别dbType，然后选择相应的driverClassName
	initialSize	0	初始化时建立物理连接的个数。初始化发生在显示调用init方法，或者第一次getConnection时。连接池启动时创建的初始化连接数量（默认值为0）
	maxActive	8	最大连接池数量
	maxIdle	8	已经不再使用，配置了也没效果
	minIdle		最小连接池数量
	maxWait		获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。
	poolPreparedStatements	false	是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。
	maxOpenPreparedStatements	-1	要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100
	validationQuery		用来检测连接是否有效的sql，要求是一个查询语句。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。
	testOnBorrow	true	申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。
	testOnReturn	false	归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
	testWhileIdle	false	建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
	timeBetweenEvictionRunsMillis		有两个含义：1) Destroy线程会检测连接的间隔时间 2) testWhileIdle的判断依据，详细看testWhileIdle属性的说明
	numTestsPerEvictionRun		不再使用，一个DruidDataSource只支持一个EvictionRun
	minEvictableIdleTimeMillis		连接池中连接，在时间段内一直空闲， 被逐出连接池的时间
	connectionInitSqls		物理连接初始化的时候执行的sql
	exceptionSorter	根据dbType自动识别	当数据库抛出一些不可恢复的异常时，抛弃连接
	filters		属性类型是字符串，通过别名的方式配置扩展插件，常用的插件有：
	监控统计用的filter:stat 日志用的filter:log4j 防御sql注入的filter:wall
	proxyFilters		类型是List<com.alibaba.druid.filter.Filter>，如果同时配置了filters和proxyFilters，是组合关系，并非替换关系
	
### 参考资料：
#### 常见问题:
https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98