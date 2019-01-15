---
title: Hibernate查询语言
typora-copy-images-to: ../../gitbooks/static/images/b5b02737
toc: true
mathjax: true
abbrlink: f240552d
tags:
  - Hibernate
categories:
  - Framework
date: 2014-01-03 15:47:58
---

## 描述
org.hibernate.TransactionException: Transaction not successfully started

若出现org.hibernate.TransactionException: Transaction not successfully started 这个异常，考虑一下你的代码中是否有hibernate 事务嵌套，如下面的形式：
Transaction tx1=session.beginTransaction()
Transaction tx2=session.beginTransaction()
tx2.commit();
tx1.commit();
若有，可能就是出错的原因

## todo
1. 使用主键id加载对象(load(),get());

2. 通过对象导航,比如通过stu.getTeam()得到team的实例;

3. 使用hql;

4. 使用qbc(query by criteria);

5. 直接使用sql语句取得记录集。

一般都使用后面三种方式.

注意
hql是面向对象的查询.语法和sql是基本一样的.不区分大小写的,但是注意的是对与对象.必须遵循对象的大小写.因为hql是对像查询..同时我们必须清楚.hql只能取得对象,而不支持uid(update,insert.delete)


## 小结

hql功能很强大,适合各种情况,但是动态条件查询构造起来很不方便.

criteria 最适合动态查询,但不太适合统计查询,qbe还不够强大.只适合简单的查询.

nativesql可以实现特定的数据库的sql.但是可移植性并不好.

针对web应用来说,大部分常规查询都是动态条件查询,所以首先criteria,并且h 3提供的detachedcriteria,可以在web层构造好detachedcriteria再进入session执行查询.但是涉及到统计查询和非常复杂的关联查询.criteria就无能为力了.这种情况下选择使用hql.最后如果涉及到使用某些数据库的特性的时候,就只有选择 nativesql了.

hql常用来进行实体检索.这个时候要注意返回的list中的元素是实体还是实体数组.如果hql进行实体属性查询,当查询两个以上的属性时,list中的元素就是属性数组了.

qbc最大的用途在与动态查询.它不会忽略配置文件中的预先抓取策略.

使用本地sql检索必须检索对象的所有属性.



## CreateCriteria和CreateQuery
操作行为和方式不同，前者更加面向对象本省，后者面向sql

## Hibernate查询语言：
 NativeSQL > HQL > EJBQL > QBC > QBE(query by Example)
1.QBC查询：
QBC查询就是通过使用Hibernate提供的Query By Criteria API来查询对象，这种API封装了SQL语句的动态拼装，对查询提供了更加面向对象的功能接口。
2.HQL查询：
HQL则是基于对象的查询语言，hibernate会结合对象的配置文件以及方言，将写的hql翻译成sql。
3.原生SQL语句查询

### Expression与Restrictions的区别

Criteria.add() 接受的参数是Criterion接口的实现，SimpleExpression、PropertyExpression、LogicalExpression等都是Criterion的实现，其实例都可以作为add的参数。
Expression是底层的，能够支持嵌套查询。

Restrictions是一个工具类，用于生成各种Criterion（包括SimpleExpression、PropertyExpression等实现）。
Restrictions是已实现的基础的查询方式，一般用这个得多。
如
criteria.add(Restrictions.eq("parentId", parentId));
可以替换为：
criteria.add(new SimpleExpression("parentId", parentId, "="));
但明显前者更好。

## 附录：

### HQL和QBC常用的查询条件比较

```
表达式含义                   HQL                   QBC
大于等于                     >=                    Expression.ge()
大于                         >                     Expression.gt()
小于等于                     <=                    Expression.le()
小于                         <                     Expression.lt()
等于                         =                     Expression.eq()            Restrictions.eq
不等于                       <>或者!=              Expression.ne()

为空                         is null               Expression.isNull()
不为空                       is notnull            Expression.isNotNull()
在指定范围内                 betweenand            Expression.between()
不在指定范围                 not betweenand        Expression.not(Expression.between())
属于某个集合                 in                    Expression.in()
不属于某个集合               notin                 Expression.not(Expression.in())
与                          and                   Expression.and()
或                          or                    Expression.or()
非                          not                   Expression.not()
模糊查询                    like                  Expression.like
```
