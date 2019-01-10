---
title: Netty入门
tags:
  - Netty
categories:
  - 分布式
  - Netty
toc: true
abbrlink: 21d654b6
date: 2017-12-13 22:29:17
typora-copy-images-to: ../../gitbooks/static/images/21d654b6
---
## 简介

Netty 是一个异步和事件驱动的网络框架，用以快速开发高性能、高可靠性的网络服务器和客户端程序。也就是说，Netty 是一个基于 NIO 的客户、服务器端编程框架，使用 Netty 可以确保你快速和简单地开发出一个网络应用，例如实现了某种协议的客户，服务端应用。Netty 相当简化和流线化了网络应用的编程开发过程，例如，TCP 和 UDP 的 socket 服务开发。

## 特性

（摘自《Netty in Action》）

1）设计
统一的API，适用于不同的协议（阻塞和非阻塞）
基于灵活、可扩展的事件驱动模型
高度可定制的线程模型
可靠的无连接数据Socket支持（UDP）
2）性能
更好的吞吐量，低延迟
更省资源
尽量减少不必要的内存拷贝
3）安全
完整的SSL/TLS和STARTTLS的支持
能在Applet与Android的限制环境运行良好
4）健壮性
不再因过快、过慢或超负载连接导致OutOfMemoryError
不再有在高速网络环境下NIO读写频率不一致的问题
5）易用
完善的JavaDoc，用户指南和样例
简洁简单
仅信赖于JDK1.5

## 应用

Netty是一个高性能 事件驱动的异步的非堵塞的IO(NIO)框架，用于建立TCP等底层的连接，基于Netty可以建立高性能的Http服务器。支持HTTP、 WebSocket 、Protobuf、 Binary TCP 和UDP，Netty已经被很多高性能项目作为其Socket底层基础，其竞争对手是：Apache MINA和 Grizzly。

### 互联网行业
随着网站规模的不断扩大，系统并发访问量也越来越高，传统基于 Tomcat 等 Web 容器的垂直架构已经无法满足需求，需要拆分应用进行服务化，以提高开发和维护效率。从组网情况看，垂直的架构拆分之后，系统采用分布式部署，各个节点之间需要远程服务调用，高性能的 RPC 框架必不可少，Netty 作为异步高性能的通信框架，往往作为基础通信组件被这些 RPC 框架使用。

典型的应用有：
- 阿里分布式服务框架 Dubbo 的 RPC 框架使用 Dubbo 协议进行节点间通信，Dubbo 协议默认使用 Netty 作为基础通信组件，用于实现各进程节点之间的内部通信。其中，服务提供者和服务消费者之间，服务提供者、服务消费者和性能统计节点之间使用 Netty 进行异步/同步通信。
- 除了 Dubbo 之外，淘宝的消息中间件 RocketMQ 的消息生产者和消息消费者之间，也采用 Netty 进行高性能、异步通信。
- 除了阿里系和淘宝系之外，很多其它的大型互联网公司或者电商内部也已经大量使用 Netty 构建高性能、分布式的网络服务器。

### 游戏行业
无论是手游服务端、还是大型的网络游戏，Java 语言得到了越来越广泛的应用。Netty 作为高性能的基础通信组件，它本身提供了 TCP/UDP 和 HTTP 协议栈，非常方便定制和开发私有协议栈。账号登陆服务器、地图服务器之间可以方便的通过 Netty 进行高性能的通信。

### 大数据领域
经典的 Hadoop 的高性能通信和序列化组件 Avro 的 RPC 框架，默认采用 Netty 进行跨节点通信，它的 Netty Service 基于 Netty 框架二次封装实现。
大数据计算往往采用多个计算节点和一个/N个汇总节点进行分布式部署，各节点之间存在海量的数据交换。由于 Netty 的综合性能是目前各个成熟 NIO 框架中最高的，因此，往往会被选中用作大数据各节点间的通信。

### 企业软件
企业和 IT 集成需要 ESB，Netty 对多协议支持、私有协议定制的简洁性和高性能是 ESB RPC 框架的首选通信组件。事实上，很多企业总线厂商会选择 Netty 作为基础通信组件，用于企业的 IT 集成。

### 通信行业
Netty 的异步高性能、高可靠性和高成熟度的优点，使它在通信行业得到了大量的应用。

## 核心组件

- Channel
- ChannelFuture
- EventLoop
- ChannelHandler
- ChannelPipeline

#### Channel

Channel 是 Netty 网络操作抽象类，它除了包括基本的 I/O 操作，如 bind、connect、read、write 之外，还包括了 Netty 框架相关的一些功能，如获取该 Channe l的 EventLoop。

在传统的网络编程中，作为核心类的 Socket ，它对程序员来说并不是那么友好，直接使用其成本还是稍微高了点。而Netty 的 Channel 则提供的一系列的 API ，它大大降低了直接与 Socket 进行操作的复杂性。而相对于原生 NIO 的 Channel，Netty 的 Channel 具有如下优势（摘自《Netty权威指南（第二版）》）：

- 在 Channel 接口层，采用 Facade 模式进行统一封装，将网络 I/O 操作、网络 I/O 相关联的其他操作封装起来，统一对外提供。
- Channel 接口的定义尽量大而全，为 SocketChannel 和 ServerSocketChannel 提供统一的视图，由不同子类实现不同的功能，公共功能在抽象父类中实现，最大程度地实现功能和接口的重用。
- 具体实现采用聚合而非包含的方式，将相关的功能类聚合在 Channel 中，有 Channel 统一负责和调度，功能实现更加灵活。

#### EventLoop
Netty 基于事件驱动模型，使用不同的事件来通知我们状态的改变或者操作状态的改变。它定义了在整个连接的生命周期里当有事件发生的时候处理的核心抽象。

Channel 为Netty 网络操作抽象类，EventLoop 主要是为Channel 处理 I/O 操作，两者配合参与 I/O 操作。

下图是Channel、EventLoop、Thread、EventLoopGroup之间的关系（摘自《Netty In Action》）：

![img](../../../gitbooks/static/images/21d654b6/616953-20170509162546738-1955835364.png)

- 一个 EventLoopGroup 包含一个或多个 EventLoop。
- 一个 EventLoop 在它的生命周期内只能与一个Thread绑定。
- 所有有 EnventLoop 处理的 I/O 事件都将在它专有的 Thread 上被处理。
- 一个 Channel 在它的生命周期内只能注册与一个 EventLoop。
- 一个 EventLoop 可被分配至一个或多个 Channel 。

当一个连接到达时，Netty 就会注册一个 Channel，然后从 EventLoopGroup 中分配一个 EventLoop 绑定到这个Channel上，在该Channel的整个生命周期中都是有这个绑定的 EventLoop 来服务的。

#### ChannelFuture

Netty 为异步非阻塞，即所有的 I/O 操作都为异步的，因此，我们不能立刻得知消息是否已经被处理了。Netty 提供了 ChannelFuture 接口，通过该接口的 addListener() 方法注册一个 ChannelFutureListener，当操作执行成功或者失败时，监听就会自动触发返回结果。

#### ChannelHandler

ChannelHandler 为 Netty 中最核心的组件，它充当了所有处理入站和出站数据的应用程序逻辑的容器。ChannelHandler 主要用来处理各种事件，这里的事件很广泛，比如可以是连接、数据接收、异常、数据转换等。

ChannelHandler 有两个核心子类 ChannelInboundHandler 和 ChannelOutboundHandler，其中 ChannelInboundHandler 用于接收、处理入站数据和事件，而 ChannelOutboundHandler 则相反。

#### ChannelPipeline

ChannelPipeline 为 ChannelHandler 链提供了一个容器并定义了用于沿着链传播入站和出站事件流的 API。一个数据或者事件可能会被多个 Handler 处理，在这个过程中，数据或者事件经流 ChannelPipeline，由 ChannelHandler 处理。在这个处理过程中，一个 ChannelHandler 接收数据后处理完成后交给下一个 ChannelHandler，或者什么都不做直接交给下一个 ChannelHandler。


当一个数据流进入 ChannlePipeline 时，它会从 ChannelPipeline 头部开始传给第一个 ChannelInboundHandler ，当第一个处理完后再传给下一个，一直传递到管道的尾部。与之相对应的是，当数据被写出时，它会从管道的尾部开始，先经过管道尾部的 “最后” 一个ChannelOutboundHandler，当它处理完成后会传递给前一个 ChannelOutboundHandler 。

当 ChannelHandler 被添加到 ChannelPipeline 时，它将会被分配一个 ChannelHandlerContext，它代表了 ChannelHandler 和 ChannelPipeline 之间的绑定。其中 ChannelHandler 添加到 ChannelPipeline 过程如下： 
1. 一个 ChannelInitializer 的实现被注册到了 ServerBootStrap中 
2. 当 ChannelInitializer.initChannel() 方法被调用时，ChannelInitializer 将在 ChannelPipeline 中安装一组自定义的 ChannelHandler 
3. ChannelInitializer 将它自己从 ChannelPipeline 中移除 

 

 