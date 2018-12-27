---
title: MongoDB 学习总结
tags:
  - MongoDB
  - Robo 3T
categories: 
- 分布式
toc: true
abbrlink: '33388948'
date: 2017-11-13 12:19:17
---

MongoDB GUI（ Robo 3T） Shell使用及操作

## Robo 3T 下载及使用

之前叫 Robomongo，后面被收购了，改名 Robo 3T 。
下载链接：https://robomongo.org/download

安装版：安装步骤省略，下一步下一步...
解压版：解压即可。
图形界面，连接默认，取个名字就行。
连接成功，可以愉快的使用了，不用总是敲命令了，简洁方便，多种显示。
软件右边可以切换显示样式。

## Robo 3T Shell 操作

1、批量插入（默认是不支批量操作，只能用for循环。）
2、$type 操作符，基于BSON类型来检索集合中匹配的数据类型，并返回结果。
先增加一些数据，然后查询出来 （同一界面，需要选中执行的一行，不然会一直执行第一个命令。）
3、Limit与Skip的用法
查询文档中两条记录
第一个 {} 放 where 条件，为空表示返回集合中所有文档。
第二个 {} 指定那些列显示和不显示 （0表示不显示 1表示显示)。
查询显示第2、3条文档数据
skip()方法默认参数为 0 。
skip 和 limit 结合就能实现分页。
排序 sort() 方法
索引 ensureIndex() 方法
多个字段索引：db.student.ensureIndex({"name":1,"hobby":-1})
聚合 aggregate()
这里只操作一种方法，分组并统计，其它的可以查看相关用法和文档。
总结：常用的一些基本用法就这些，高级用法可以慢慢再研究。

## mongodb insert()和save()的相同点和区别

### 区别

​	若新增的数据中存在主键 ，insert() 会提示错误，而save() 则更改原来的内容为新内容。
​	如：
​	已存在数据：  {_id : 1, " name " : " n1 " }，再次进行插入操作时，
​	insert({_id : 1, " name " : " n2 " })    会报主键重复的错误提示
​	save({ _id : 1, " name " : " n2 " })     会把 n1 修改为  n2  。

### 相同点：

​	若新增的数据中没有主键时，会增加一条记录。
​	已存在数据：  { _id : 1, " name " : " n1 " }，再次进行插入操作时，
​	insert({ " name " : " n2 " })    插入的数据因为没有主键，所以会增加一条数据
​	save({  " name " : " n2 " })   增加一条数据。

## 附录

​    $gt -------- greater than  >
​    $gte --------- gt equal  >=
​    $lt -------- less than  <
​    $lte --------- lt equal  <=
​    $ne ----------- not equal  !=
​    $eq  --------  equal  =