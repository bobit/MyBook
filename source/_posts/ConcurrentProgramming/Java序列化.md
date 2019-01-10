---
title: Java序列化
tags:
  - 克隆
  - 序列化
  - Serializable
categories: 
- 并发编程
toc: true
mathjax: true
abbrlink: 9cd1a944
date: 2013-11-13 22:25:17
---

## 概念

序列化（串行化）（Serilization）：把对象转换为字节序列的过程称为对象的序列化。 
反序列化（并行化）（Deserialization）：把字节序列恢复为对象的过程称为对象的反序列化。 

## 对象的序列化主要有两种用途

1）把对象的字节序列持久化到数据库、文件系统。
2）在网络上传送对象的字节序列。 

## 白话

序列化就是把存在于内存的对象数据转化成可以保存成硬盘文件的形式去存储，也就是把内存中对象数据变成硬盘文件；反序列化就是把序列化后的硬盘文件加载到内存,重新变成对象数据。

## 实现 

在java中要想使一个java对象可以实现序列化与反序列化,必须让该类实现java.io.Serializable接口
java.io.Serializable接口定义如下:
```
publicinterface Serializable {

}123
```
从上述定义中可以看到该接口中未定义任何方法,主要实现如下；
b) 序列化主要依赖java.io.ObjectOutputStream类,该类对java.io.FileOutputStream进一步做了封装,这里主要使用ObjectOutputStream类的writeObject()方法实现序列化功能
c) 反序列化主要依赖java.io.ObjectInputStream类,该类对java.io.InputStream进一步做了封装,这里主要使用ObjectInputStream类的readObject()方法实现序列化功能

- 最基本的序列化：实现java.io.Serializable接口，通过文件流的方式将对象持久化到磁盘。
- 最基本的反序列化：读取之前序列化之后的文件，恢复成对象

## 序列化框架

Java原生序列化、XML、JSON、Hessian、protobuf、Avro、Kryo、msgpack、Thrift等

## DEMO



