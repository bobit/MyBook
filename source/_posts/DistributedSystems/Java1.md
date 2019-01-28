---
title: Java持久层的查询方式
typora-copy-images-to: ../../gitbooks/static/images/
toc: true
mathjax: true
abbrlink: 4d0f9446
tags:
  - Java
categories:
  - DistributedSystems
date: 2019-01-13 13:40:06
---

Java持久层的三种查询方式 一、本地SQL查询 二、JPQL查询 三、Criteria API
Hibernate的三种查询方式
1.HQL (Hibernate Query Lanuage) 语句，这是类似SQL语句的一种对象化查询语句.
2.使用Criteria对象，进行按条件查询(Query by Criteria，简称QBC)和按示例查询(Query by Example 简称QBE).
3.生成原生的sql(Native SQL)语句.

## Java JPA有三种查询方式： 1）JPQL 2）Criteria API 3）SQL

下面一一详解。

### 一、本地SQL查询

SQL是标准化的查询语言，用于管理数据。下面的例子说明了怎样实现本地SQL查询：

[java] view plaincopyprint?
// 获得实体管理器
EntityManager em = …
// 建立SQL查询
String getByFirstName = "SELECT * FROM contacts c WHERE c.first_name = ?1";
// 创建查询实例
Query query = em.createNativeQuery(getByFirstName, Contact.class);
// 设置查询参数
query.setParameter(1, "John");
// 获取结果
List contacts = query.getResultList();
上面的例子告诉我们3件事： 1）用JPA建立查询，无需学习新的查询语言； 2）创建的查询没有类型安全，在使用前必须计算查询结果； 3）在运行程序前必须验证查询的拼写或语法是否有错误。

而且SQL查询会指定数据库的模式，因此除非必要，我们都应该避免使用此方式。

### 二、JPQL查询

JPQL是基于字符串的查询语言，语法类似于SQL。因此学习JPQL相当容易，只要有一定的SQL基础。看下面的代码：

[java] view plaincopyprint?
// 获得实体管理器
EntityManager em = …
// 建立JPQL查询
String getByFirstName = "SELECT c FROM Contact c WHERE c.firstName = :firstName";
// 创建查询实例
TypedQuery<Contact> query = em.createQuery(getByFirstName, Contact.class);
// 设置查询参数
query.setParameter("firstName", "John");
// 获取结果
List<Contact> contacts = query.getResultList();
上面的例子告诉我们3件事： 1）创建的查询是类型安全的，我们不必计算查询的结果； 2）JPQL查询字符串是易读、易于理解的； 3）创建的查询字符串在编译期间不会被验证。

JPQL对于静态查询是一个好办法。换句话说们，如果很多查询参数总是相同的，那么JPQL是我们的首选。但是，JPQL实现动态查询就显得很繁琐了。

### 三、Criteria API

Criteria API用于解决对接第三方ORM框架时让JPQL标准化。它用于构建查询定义对象，此对象会被翻译成可执行的SQL查询。下面的代码说明了这个问题：

[java] view plaincopyprint?
// 获得实体管理器
EntityManager em = …
// 获得Criteria建立器
CriteriaBuilder cb = em.getCriteriaBuilder();
// 建立Criteria查询
CriteriaQuery<Contact> query = cb.greateQuery(Contact.class);
// 创建查询Root
Root<Contact> root = query.from(Contact.class);
// 创建firstName的查询条件，使用静态元模型
Predicate firstNameIs = cb.equal(root.get(Contact_.firstName, "John"));
// 指定查询的where条件
query.where(firstNameIs);
// 创建查询并获取结果
TypedQuery<Contact> q = em.createQuery(query);
List<Contact> contacts = q.getResultList();
上面的例子告诉我们3件事： 1）创建的查询是类型安全的，不必计算查询的结果； 2）代码不如SQL或JPQL那么易读； 3）由于是使用Java API处理，Java编译器会确保查询的语法正确。

Criteria API对于创建动态查询是一个极好的工具。它使得创建动态查询更简便，因为我们处理的是对象，而不是处理查询的字符串。缺点在于随着查询的复杂度的增加，，查询定义对象的创建也会变得很繁琐，代码会更难读。