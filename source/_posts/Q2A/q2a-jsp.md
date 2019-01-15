---
title: Jsp 相关问题
typora-copy-images-to: ../../gitbooks/static/images/758b8848
abbrlink: 758b8848
tags:
  - jsp
categories:
  - Q2A
date: 2013-11-03 22:18:17
---

### 访问WEB-INF目录中的JSP文件

WEB-INF目录是不对外开放的，外部没办法直接访问到。所有只能通过映射来访问，比如映射为一个action或者servlet通过服务器端跳转来访问到具体的页面。这样可以限制访问，提高安全性。

方法1
本来WEB-INF中的jsp就是无法通过地址栏访问的.如果说你要访问这个文件夹中的jsp文件需要在项目的web.xml文件中去配置servlet格式差不多的配置就ok了。如下:

```
<servlet>
<servlet-name>runtain</servlet-name>
<jsp-file>/WEB-INF/INF.jsp</jsp-file>
</servlet>
<servlet-mapping>
<servlet-name>runtain</servlet-name>
<url-pattern>/XXX</url-pattern>
```

访问地址:http://localhost:8080/runtain/xxx
就可以看见内容了!

方法2
<jsp:forward page ="/WEB-INF/jsp/test/test.jsp" />

方法3
request.getRequestDispatcher("/WEB-INF/a.jsp").forward(request,response);

怎么样让servlet访问web-inf下的网页或jsp文件呢.
因为web-inf下,应用服务器把它指为禁访目录,即直接在浏览器里是不能访问到的.
因些,可以让servlet进行访问,如web-inf下有a.jsp则可以用request.getRequestDispatcher("/WEB-INF/a.jsp").forward(request,response);进行派遣访问.但如果web-inf下有a.htm,则用request.getRequestDispatcher("/WEB-INF/a.htm").forward(request,response);就不能访问.

一开始想不通,觉得怪.后来想想,jsp其实也是servlet,会自动编译的,于是work目录下会有/web-inf/a$jsp.class类型,于是有头绪了,让应用服务器能够编译.htm,如a$htm.class.抱有这个想法,开始动手

在tomcat下的conf/web,找到jsp的访问方式,

```
<servlet-mapping>
    <servlet-name>jsp</servlet-name>
    <url-pattern>*.jsp</url-pattern>
</servlet-mapping>
```

于是在下面添加

```
<servlet-mapping>
    <servlet-name>jsp</servlet-name>
    <url-pattern>*.htm</url-pattern>
</servlet-mapping>
<servlet-mapping>
    <servlet-name>jsp</servlet-name>
    <url-pattern>*.html</url-pattern>
</servlet-mapping>
```

结果:一切OK,访问a.htm,和a.html在work/web-inf/下者有a$htm.class,a$html.class生成