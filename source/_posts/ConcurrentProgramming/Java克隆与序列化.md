---
title: Java克隆与序列化
toc: true
typora-copy-images-to: ../../gitbooks/static/images/
mathjax: true
abbrlink: 8fc1e45b
date: 2018-11-13 22:22:17
tags:
  - 克隆
  - 序列化
categories:
  - ConcurrentProgramming
---

最近不止一次遇见深浅克隆（深复制，浅复制）的问题，除了印象中有个clone方法外一脸懵逼！！！
克隆（复制）在Java中是一种常见的操作，目的是快速获取一个对象副本。克隆分为深克隆和浅克隆。

## 概念

⑴浅复制（浅克隆）
被复制对象的所有变量都含有与原来的对象相同的值，而所有的对其他对象的引用仍然指向原来的对象。换言之，浅复制仅仅复制所考虑的对象，而不复制它所引用的对象。

⑵深复制（深克隆）
被复制对象的所有变量都含有与原来的对象相同的值，除去那些引用其他对象的变量。那些引用其他对象的变量将指向被复制过的新对象，而不再是原有的那些被引用的对象。换言之，深复制把要复制的对象所引用的对象都复制了一遍。

总之深浅克隆都会在堆中新分配一块区域，区别在于对象属性引用的对象是否需要进行克隆（递归性的）。

## Java的clone()方法

⑴clone方法将对象复制了一份并返回给调用者。一般而言，clone（）方法满足：
①对任何的对象x，都有x.clone() !=x//克隆对象与原对象不是同一个对象
②对任何的对象x，都有x.clone().getClass()= =x.getClass()//克隆对象与原对象的类型一样
③如果对象x的equals()方法定义恰当，那么x.clone().equals(x)应该成立。

⑵Java中对象的克隆
①为了获取对象的一份拷贝，我们可以利用Object类的clone()方法。 
②在派生类中覆盖基类的clone()方法，并声明为public。 
③在派生类的clone()方法中，调用super.clone()。 
④在派生类中实现Cloneable接口。

## 深克隆与序列化

1.对于深克隆而言，如果类有很多引用类型的域，那么重写clone()方法依次复制各个域也很麻烦。如果引用类型的域也是由引用类型组成的，则应该考虑使用序列化的方式实现深克隆。

2.序列化可以将任意对象写入流中，根据流的类型不同，可以将对象写入到文件中，也可以将对象写入到字节数组中。克隆对象时一般不需要先进行保存，因此将使用字节数组。在写入完成后，再将其读出就可以实现克隆了。使用序列化可以不用考虑引用类型的域，编写clone()方法相对简单，但要求引用类型也实现Serializable接口。

## 使用序列化实现克隆的注意事项

(1)对于任何一个序列化的对象，都要求其实现Serializable接口
(2)如果该类的域中有引用类型，则要求该引用类型也实现Serializable接口，依此类推。
(3)序列化方式实现克隆会比直接克隆各个引用类型域慢

## 选择适当的克隆方式

如果类的各个域是基本类型或不可变类型，则可以使用浅克隆，否则使用深克隆。如果类的域比较复杂，可以使用序列化的方式实现，否则应该使用复制域的方式实现深克隆。  

## DEMO



## 参考

[Java对象的序列化与反序列化](http://mp.weixin.qq.com/s?__biz=MzI3NzE0NjcwMg==&mid=2650120836&idx=1&sn=c83a980c0871faf607ae613092c69760&chksm=f36bbfa5c41c36b317c103f27b9d99c26aecba52e4bf614bd73dcadc1e4bc5ab8f99fb082eba&scene=21#wechat_redirect)
[深入分析Java的序列化与反序列化](http://mp.weixin.qq.com/s?__biz=MzI3NzE0NjcwMg==&mid=2650120882&idx=1&sn=8e355b5ee3cce0a2d0108edbdf88e606&chksm=f36bbf93c41c3685340d4f658dddec6bcbd5903b5d92875bb06d51a0dfc49ee7326417a0edff&scene=21#wechat_redirect)
[单例与序列化的那些事儿](http://mp.weixin.qq.com/s?__biz=MzI3NzE0NjcwMg==&mid=2650120643&idx=1&sn=72ffc1018f5fe4451f885be56e972b30&chksm=f36bbce2c41c35f4d18a841b6fcc5688e7ab3d520be46bc72825b16c0d507a31e48f77dcf0fa&scene=21#wechat_redirect)
[为什么阿里巴巴要求程序员谨慎修改serialVersionUID 字段的值](https://mp.weixin.qq.com/s/5xcDDtsVYdgzUebF3_Mg4g)