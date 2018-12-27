---
title: Java日志框架总结
tags:
  - Java
categories: 
- 并发编程
toc: true
abbrlink: 18c040aa
date: 2017-11-13 22:26:17
---

作为一名Java程序员，我们开发了很多Java应用程序，包括桌面应用、WEB应用以及移动应用。然而日志系统是一个成熟Java应用所必不可少的，在开发和调试阶段，日志可以帮助我们更好更快地定位bug；在运行维护阶段，日志系统又可以帮我们记录大部分的异常信息，从而帮助我们更好的完善系统。本文要来分享一些Java程序员最常用的Java日志框架组件。
1、Log4j – 最受欢迎的Java日志组件

Log4j是一款基于Java的开源日志组件，Log4j功能非常强大，我们可以将日志信息输出到控制台、文件、用户界面，也可以输出到操作系统的事件记录器和一些系统常驻进程。更值得一提的是，Log4j可以允许你非常便捷地自定义日志格式和日志等级，可以帮助开发人员全方位地掌控日志信息。

官方网站：http://logging.apache.org/log4j/2.x/ 

2、SLF4J – 基于API的Java日志框架

SLF4J提供了一个简单统一的日志记录接口，开发者在配置和部署时只需要实现这个接口即可实现日志功能。 Logging API实现既可以选择直接实现SLF4J接的loging APIs如： NLOG4J、SimpleLogger。也可以通过SLF4J提供的API实现来开发相应的适配器如Log4jLoggerAdapter、JDK14LoggerAdapter。

官方网站：http://www.slf4j.org/
3、Commons Logging

Commons Logging的实现不依赖于具体的日志实现工具，仅仅提供一些日志操作的抽象接口，它对其他的日志工具做了封装，比如Log4J, Avalon LogKit, 和JDK 1.4等。
4、gclogviewer – Java日志查看工具

gclogviewer是一个支持jdk 6的gc log可视化工具，和gcviewer相比，gclogviewer支持根据gc log生成GC的趋势图，也支持生成调优建议所需的数据趋势图。

官方网站：http://code.google.com/p/gclogviewer/
5、Flume – Apache日志服务器

之前介绍的都是一些日志记录工具，Flume则是一个日志分析系统，Flume是分布式的，它有一个非常灵活的架构，用来收集、聚合以及移动大量日志数据，并且提供可靠、容错的系统架构。

官方网站：http://flume.apache.org/
6、zLogFabric – 日志存储系统

zLogFabric 是一个集成的跨平台日志解决方案，通过消息系统收集各个应用的日志信息存储到一个集中式的系统中。模块化的设计使得服务器可对日志进行存储、转发、警报以及生成日志统计信息。

zLogFabric 可收集来自文件、syslog、log4j、log4net 以及 Windows 事件的数据。

官方网站：http://www.zlogfabric.com/
7、logstash – Java日志管理工具

logstash是一款功能非常强大的日志管理工具，利用logstash，你可以对日志进行传输、处理、管理和检索，并且提供Web接口以便开发者统计和查询日志信息。

官方网站：http://www.logstash.net/


官方网站：http://commons.apache.org/proper/commons-logging/
8、Darks Logs

Darks Logs和log4j类似，也适用于Java、Android等项目，但是Darks Logs使用更加简单，而且对Android端做了非常大的改善。Darks Logs对Sqlite的日志保存增加了Appender。其旨在解决Android日志无法灵活控制日志等级、格式、保存或显示目标等常用操作等的问题。