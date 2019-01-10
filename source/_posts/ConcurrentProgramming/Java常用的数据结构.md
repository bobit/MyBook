---
title: Java常用的数据结构
tags:
  - Java
categories: 
- 并发编程
toc: true
mathjax: true
abbrlink: 8d45e6b1
date: 2010-11-13 22:23:17
---



## 定义

数据元素相互之间的关系称为结构。有四类基本结构：集合、线性结构、树形结构、图状结构;

集合结构:除了同属于一种类型外，别无其它关系
线性结构:元素之间存在一对一关系常见类型有: 数组,链表,队列,栈,它们之间在操作上有所区别.例如:链表可在任意位置插入或删除元素,而队列在队尾插入元素,队头删除元素,栈只能在栈顶进行插入,删除操作.
树形结构:元素之间存在一对多关系,常见类型有:树(有许多特例:二叉树、平衡二叉树、查找树等)
图形结构:元素之间存在多对多关系,图形结构中每个结点的前驱结点数和后续结点多个数可以任意

## Java中常用的数据结构

主要分为Collection和Map两个主要接口（接口只提供方法，并不提供实现），而程序中最终使用的数据结构是继承自这些接口的数据结构类。

JAVA的容器---List,Map,Set
Collection
├List
│├LinkedList
│├ArrayList
│└Vector
│ └Stack
└Set
Map
├Hashtable
├HashMap
└WeakHashMap 

## DataStructure

### Collection



### Map





## 几个常用类的区别 

1．ArrayList: 元素单个，效率高，多用于查询 
2．Vector: 元素单个，线程安全，多用于查询 
3．LinkedList:元素单个，多用于插入和删除 
4．HashMap: 元素成对，元素可为空 
5．HashTable: 元素成对，线程安全，元素不可为空 

## Vector、ArrayList和LinkedList 

大多数情况下，从性能上来说ArrayList最好，但是当集合内的元素需要频繁插入、删除时LinkedList会有比较好的表现，但是它们三个性能都比不上数组，另外Vector是线程同步的。

所以：
如果能用数组的时候(元素类型固定，数组长度固定)，请尽量使用数组来代替List； 
如果没有频繁的删除插入操作，又不用考虑多线程问题，优先选择ArrayList； 
如果在多线程条件下使用，可以考虑Vector； 
如果需要频繁地删除插入，LinkedList就有了用武之地； 
如果你什么都不知道，用ArrayList没错。 

## Collections和Arrays 

在Java集合类框架里有两个类叫做Collections（注意，不是Collection！）和Arrays，这是JCF里面功能强大的工具，但初学者往往会忽视。按JCF文档的说法，这两个类提供了封装器实现（Wrapper Implementations）、数据结构算法和数组相关的应用。 
想必大家不会忘记“折半查找”、“排序”等经典算法吧，Collections类提供了丰富的静态方法帮助我们轻松完成这些在数据结构课上烦人的工作： 
binarySearch：折半查找。 
sort：排序，这里是一种类似于快速排序的方法，效率仍然是O(n * log n)，但却是一种稳定的排序方法。 
reverse：将线性表进行逆序操作，这个可是从前数据结构的经典考题哦！ 
rotate：以某个元素为轴心将线性表“旋转”。 
swap：交换一个线性表中两个元素的位置。 
…… 
Collections还有一个重要功能就是“封装器”（Wrapper），它提供了一些方法可以把一个集合转换成一个特殊的集合，如下： 
unmodifiableXXX：转换成只读集合，这里XXX代表六种基本集合接口：Collection、List、Map、Set、SortedMap和SortedSet。如果你对只读集合进行插入删除操作，将会抛出UnsupportedOperationException异常。 
synchronizedXXX：转换成同步集合。 
singleton：创建一个仅有一个元素的集合，这里singleton生成的是单元素Set， 
singletonList和singletonMap分别生成单元素的List和Map。 
空集：由Collections的静态属性EMPTY_SET、EMPTY_LIST和EMPTY_MAP表示。