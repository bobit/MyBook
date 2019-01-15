---
title: MyBatis入门
typora-copy-images-to: ../../gitbooks/static/images/
toc: true
mathjax: true
abbrlink: be1f855c
date: 2019-01-10 15:49:22
tags:
- MyBatis
categories:
- DistributedSystems
---

## 简介
MyBatis是支持普通SQL查询，存储过程和高级映射的优秀持久层框架。
MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及对结果集的检索封装。
MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录.

## 框架
与数据库进行交互，有很多种方法或者框架：由简到繁可以排列为：
### JDBC->dbutils->MyBatis->Hibernate
JDBC不用多说，最基本的Java数据库交互手段。
dbutils相对于JDBC的优势在于，它能够自动封装查询结果集，不需要操作statement或resualtset。但是，它的CRUD操作还是需要写SQL语句的。
Hibernate则完全是与对象打交道了，存一个对象的数据只需要save(object)就可以了。
Mybaits是介于dbutils与Hibernate之间的东西。Mybatis需要写SQL语句，但是不是存放在Java代码中，而是存放在xml文件中，相当于一个中间件一样，当Java代码需要与数据库进行交互，就调用这个xml中的SQL语句。另外，与xml并行的是，还可以使用注解来完成这个操作。

## 为什么需要Mybatis
既然有了Hibernate，为什么还需要Mybatis呢？
很多情况下是为了避免浪费，比如一些查询，我们可以控制在我们希望的范围内。
相比于dbutils，Mybatis的优势呢？
Mybatis虽然不像Hibernate那样是完全围绕对象的，但是Mybatis在Java代码中操作的仍然是对象，只是需要xml中的SQL与数据库交互；而dbutils的Java代码仍然需要操作SQL。

## 区别

