---
title: MQ学习-ActiveMQ、RabbitMQ、ZeroMQ、Kafka、Redis 对比
toc: true
typora-copy-images-to: ../../gitbooks/static/images/
mathjax: true
abbrlink: 1e8ed1d1
tags:
  - MQ
  - ActiveMQ
categories:
  - DistributedSystems
date: 2016-11-16 11:38:35
---



## 通用性

消息队列在大型电子商务类网站，如京东、淘宝、去哪儿等网站有这深入的应用，队列的主要作用是消除高并发访问高峰，加快网站的响应速度。在不使用消息队列的情况下，用户的请求数据直接写入数据库，在高并发的情况下，会对数据库造成巨大的压力，同时也使得系统响应延迟加剧。在使用队列后，用户的请求发给队列后立即返回（当然不能直接给用户提示订单提交成功，例如京东上提示：您“您提交了订单，请等待系统确认”），再由消息队列的消费者进程从消息队列中获取数据，异步写入数据库。由于消息队列的服务处理速度远快于数据库，因此用户的响应延迟可得到有效改善。 

## 综合对比

ActiveMQ: 历史悠久的开源项目，已经在很多产品中得到应用，实现了JMS1.1规范，可以和spring-jms轻松融合，实现了多种协议，不够轻巧（源代码比RocketMQ多），支持持久化到数据库，对队列数较多的情况支持不好。
RabbitMq：
它比kafka成熟，支持AMQP事务处理，在可靠性上，RabbitMq超过kafka，在性能方面超过ActiveMQ。
Kafka：
Kafka设计的初衷就是处理日志的，不支持AMQP事务处理，可以看做是一个日志系统，针对性很强，所以它并没有具备一个成熟MQ应该具备的特性

Kafka的性能（吞吐量、tps）比RabbitMq要强，如果用来做大数据量的快速处理是比RabbitMq有优势的。

## 参考

https://blog.csdn.net/vtopqx/article/details/76382934

https://blog.csdn.net/yunfeng482/article/details/72856762

https://www.cnblogs.com/valor-xh/p/6348009.html?utm_source=itdadao&utm_medium=referral