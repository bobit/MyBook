---
title: Struts2入门
toc: true
typora-copy-images-to: ../../gitbooks/static/images/9f3e3245
mathjax: true
abbrlink: 9f3e3245
date: 2014-07-05 22:09:17
tags:
  - Struts2
categories:
  - Framework
---

## 介绍
## Struts2的作用   

Struts2标签库提供了主题、模板支持，极大地简化了视图页面的编写，而且，struts2的主题、模板都提供了很好的扩展性。实现了更好的代码复用。Struts2允许在页面中使用自定义组件，这完全能满足项目中页面显示复杂，多变的需求。
Struts2的标签库有一个巨大的改进之处，struts2标签库的标签不依赖于任何表现层技术，也就是说strtus2提供了大部分标签，可以在各种表现技术中使用。包括最常用的jsp页面，也可以说Velocity和FreeMarker等模板技术中的使用

## Struts2分类

（1）UI标签：（User  Interface, 用户界面）标签，主要用于生成HTML元素标签，UI标签又可分为表单标签非表单标签
（2）非UI标签，主要用于数据访问，逻辑控制等的标签。非UI标签可分为流程控制标签（包括用于实现分支、循环等流程控制的标签）和数据访问标签（主要包括用户输出ValueStack中的值，完成国际化等功能的）
（3）ajax标签

## Struts2标签使用前的准备：

（1）在要使用标签的jsp页面引入标签库：  
<%@ taglib uri="/struts-tags" prefix="s"%>
（2）在web.xml中声明要使用的标签    这样是struts2 2.3.1.2版本的引入方式
```
<filter>
	<filter-name>struts2</filter-name>
    <filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
</filter>
```

### Struts2常用配置

#### struts2更改配置文件struts.xml目录

struts2默认是读取classes目录下的配置文件，更改配置文件目录，有两个办法：

##### resources 目录下

```
<init-param>
	<param-name>config</param-name>
	<param-value>/struts2/struts.xml</param-value>
</init-param>
```

##### WEB-INF 目录下

```
<init-param>
	<param-name>config</param-name>
	<param-value>../struts2/struts.xml</param-value>
</init-param>
```

#### 加载配置文件

需要注意的是，改了路径之后，struts2不会加载默认的配置文件了，有两个办法：

##### 在web.xml中加载

```
<filter>  
<filter-name>struts2</filter-name>  
<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>  
<init-param>  
    <param-name>config</param-name>  
    <param-value>struts-default.xml,struts-plugin.xml,../struts2/struts.xml</param-value>  
</init-param>  
</filter> 
```

##### 在struts.xml中用include加载

```
<include file="struts-default.xml" />
<include file="struts-plugin.xml" />
```





## 标签的使用
### property标签
    用于输出指定的值：
```
    <s:property value="%{@cn.csdn.hr.domain.User@Name}"/><br/>
        <s:property value="@cn.csdn.hr.domain.User@Name"/><Br/><!-- 以上两种方法都可以 -->
        <s:property value="%{@cn.csdn.hr.domain.User@study()}"/>
```
    以上可以访问某一个包的类的属性的集中方式，study()是访问方法的方法，并输出。


    以下用java代码代替的，访问某一个范围内的属性
    <%
    //采用pageContext对象往page范围内存入值来 验证#attr搜索顺序是从page开始的 ，搜索的顺序为：page，reques，session，application。
set存值的时候存到的是request中，在jsp页面中访问的时候不用加任何的标识符，即可直接访问，如果不同的作用域不一样了，
pageContext.setAttribute("name", "laoowang", PageContext.PAGE_SCOPE);
%>
<s:property value="#attr.name" />


假设在action中设置了不同作用域的类
不同的作用域的标签的访问:
       
#### 获取的是requet中的对象值
第一种方式:<s:property value="#request.user1.realName"/>
第二种方式:<s:property value="#request.user1['realName']"/>
第三种方式:<s:property value="#user1.realName"/>
第四种方式:<s:property value="#user1['realName']"/>
第五种方式：${requestScope.user1.realName }  || ${requestScope.user1['realName'] }
第六种：<s:property value="#attr.user1.realName"/>
attr对象按page==>  request sessionapplictio找的
#### 获取session中的值
第一种方式:<s:property value="#session.user1.realName"/>
第二种方式:<s:property value="#session.user1['realName']"/>
第五种方式：${sessionScope.user1.realName }  || ${sessionScope.user1['realName'] }
#### 获取application中的对象的值
第一种方式:<s:property value="#application.user1.realName"/>
第二种方式:<s:property value="#application.user1['realName']"/>
第五种方式：${applicationScope.user1.realName }  || ${applicationScope.user1['realName'] }
### iterator标签
#### 第一种：list集合
```
        <!-- 设置set集合  value-->
        <!-- status 可选属性，该属性指定迭代时的IteratorStatus实例 -->
        <!-- value="#attr.list"   list存放到了request中  可以value="#request.list"
                    statu.odd返回当前被迭代元素的索引是否是奇数
                -->
    <s:set name="list" value="{'a','b','c','d'}"></s:set>
        <s:iterator var="ent" value="#request.list" status="statu">
            <s:if test="%{#statu.odd}">
                <font color="red"><s:property value="#ent" />
                </font>
            </s:if>
            <s:else>
        <s:property value="#ent" />
        </s:else>
</s:iterator>
```
#### 第二种：map集合中的使用
Map集合
<!-- map集合的特点：
语法格式：# {key:value,key1:value1,key2:value2,.....}  
以上的语法中就直接生成了一个Map类型的集合,该Map对象中的每个key-value对象之间用英文的冒号隔开，多个元素之间用逗号分隔。-->

```
<s:set var="map" value="#{'1':'laowang','2':'老王','3':'猩猩'}"></s:set>
```
遍历Map：
```
 <s:iterator value="#map">
     <s:property value="key" />:::<s:property value="value" />
     <Br />
 </s:iterator>\
```
#### 第三种：集合的变量
遍历集合
```
 <!-- 遍历出价格大于3000的 -->
 <s:iterator var="user" value="#session['users']">
     <s:if test="%{#user['price']>3000}">
         <s:property value="#user['price']"/>
     </s:if>
 </s:iterator>

<hr color="blue"/><!-- $是取出价格 大于3000的最后一个值 -->
<s:iterator var="u" value="#session.users.{$(#this['price']>3000)}">
    <s:property value="price"/>
</s:iterator>

```

注：users是User的对象，price是User中的一个属性

简述一下iterator的介绍：
iterator标签用于对集合进行迭代，这里的集合包含List、Set和数组。
```
<s:set name="list" value="{'zhangming','xiaoi','liming'}" />
<s:iterator value="#list" status="st">
    <font color=<s:if test="#st.odd">red</s:if><s:else>blue</s:else>>
    <s:property /></font><br>
</s:iterator>
```
value：可选属性，指定被迭代的集合，如果没有设置该属性，则使用ValueStack栈顶的集合。
id：可选属性，指定集合里元素的id。
status：可选属性，该属性指定迭代时的IteratorStatus实例。该实例包含如下几个方法：
    int getCount()，返回当前迭代了几个元素。
    int getIndex()，返回当前迭代元素的索引。
    boolean isEven()，返回当前被迭代元素的索引是否是偶数
    boolean isOdd()，返回当前被迭代元素的索引是否是奇数
    boolean isFirst()，返回当前被迭代元素是否是第一个元素。
    boolean isLast()，返回当前被迭代元素是否是最后一个元素。


（3）if else语句的使用
```
<s:set name="age" value="21" />
<s:if test="#age==23">
    23
</s:if>
<s:elseif test="#age==21">
    21
</s:elseif>
<s:else>
    都不等
</s:else>
```
### URL标签
```
<!-- 声明一个URL地址 -->
<s:url action="test" namespace="/tag" var="add">
    <s:param name="username">laowangang</s:param>
    <s:param name="id">12</s:param>
</s:url>
<s:a href="%{add}">测试URL</s:a>
<s:a action="test" namespace="/tag"></s:a>
    以上的两个<s:a>标签的作用是一样的。
```
### data标签
```
<%
            pageContext.setAttribute("birth",new Date(200,03,10),PageContext.REQUEST_SCOPE);
         %>
        <s:date name="#request.birth" format="yyyy年MM月dd日"/>
        <s:date name="#request.birth" nice="true"/>
    这个标签是按照format的格式去输出的。
```
### 表单

```
        <h1>from表单</h1>
        <s:form action="test" namespace="/tag">
            <s:textfield label="用户名" name="uname" tooltip="你的名字" javascriptTooltip="false"></s:textfield>
            <s:textarea  name="rmake" cols="40" rows="20" tooltipDelay="300" tooltip="hi" label="备注" javascriptTooltip="true"></s:textarea>
            <s:password label="密码" name="upass"></s:password>
            <s:file name="file" label="上传文件"></s:file>
            <s:hidden name="id" value="1"></s:hidden>
             
            <!--
            <select name="edu">
                <option value="listKey">listValue</option>
             -->
            <s:select list="#{'1':'博士','2':'硕士'}" name="edu" label="学历" listKey="key" listValue="value"></s:select>
             
            <s:select list="{'java','.net'}" value="java"></s:select><!-- value是选中的 -->
             
            <!-- 必须有name -->
            <s:checkbox label="爱好 " fieldValue="true" name="checkboxFiled1"></s:checkbox>
             
            <!-- 多个checkbox -->
            <s:checkboxlist list="{'java','css','html','struts2'}" label="喜欢的编程语言" name="box" value="{'css','struts2'}"></s:checkboxlist>


        
           <!-- map集合前要加# -->
           <s:checkboxlist list="#{1:'java',2:'css',3:'html',4:'struts2',5:'spring'}" label="喜欢的编程语言" name="boxs" value="{1,2}"></s:checkboxlist>


           
          <!-- listKey
              listValue
               
              <input type="text" name="boxs" value="listKey">显示值listValue
            -->
                    
            <!-- radio -->       
            <%
                //从服务器传过来值
                pageContext.setAttribute("sex","男",PageContext.REQUEST_SCOPE);
                pageContext.setAttribute("sex1","男",PageContext.REQUEST_SCOPE);
             %>
            <s:radio list="{'男','女'}" name="sex" value="#request.sex"></s:radio>   


            
           <s:radio list="#{1:'男',2:'女'}" name="sex1" listKey="key" listValue="value" value="#request.sex1"></s:radio>        
        
           <!-- 防止表单提交的方式 -->
           <s:token></s:token>
                            
            <s:submit value="提交"></s:submit>
        </s:form>
        
```