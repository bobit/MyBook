---
title: Vagrant创建多个虚拟机 multi-machine
tags: Vagrant
categories:
  - Vagrant
toc: true
typora-copy-images-to: ../../gitbooks/static/images/
abbrlink: 2433969f
date: 2018-10-13 22:13:17
---



## 常用命令

```
$ vagrant init      # 初始化
$ vagrant up        # 启动虚拟机
$ vagrant halt      # 关闭虚拟机
$ vagrant reload    # 重启虚拟机
$ vagrant ssh       # SSH 至虚拟机
$ vagrant suspend   # 挂起虚拟机
$ vagrant resume    # 唤醒虚拟机
$ vagrant status    # 查看虚拟机运行状态
$ vagrant destroy   # 销毁当前虚拟机


#box管理命令
$ vagrant box list    # 查看本地box列表
$ vagrant box add     # 添加box到列表
$ vagrant box remove  # 从box列表移除 
```


## vagrant box保存路径修改
add box的时候默认保存在C盘用户文件夹 C:\Users\xxx.vagrant.d，通过设置VAGRANT_HOME环境变量改变默认位置

1、将.vagrant.d文件夹剪切到别的盘，比如d:/software/vagrant/.vagrant.d，重命名为home

2、设置环境变量VAGRANT_HOME为d:/vagrant/home

3、在path环境变量下添加%VAGRANT_HOME%

这样，我们以后vagrant up的时候，box文件就生成在D盘了。

```
WIN
setx VAGRANT_HOME "F:/Vagrant/home"
setx VAGRANT_HOME "F:/Vagrant/home" /M （系统变量）
Linux
export VAGRANT_HOME=’/path/to/vagrant_home’
```

Vagrant 可以通过一个 Vagrantfile 定义并控制多个客户机。这就是所谓的“multi-machine”多虚拟机环境。

这些机器通常可以协同工作，或者互相关联。下面是几个常见用例：

- 准确建模多服务器生产拓扑环境，例如分离 Web 和数据库服务器。
- 建模分布式系统，以及它们如何相互交互。
- 测试一个接口，比如一个 API 到一个服务组件。
- 灾难情况测试：机器宕机，网络分区，网络缓慢，环境不一致（inconsistent world views）等。

以前，通常是在一台机器上来模拟运行这样的复杂环境。不准确。

使用 Vagrant 的多客户机功能，可以在单个 Vagrant 环境中对这些环境进行建模，而不会失去 Vagrant 的任何好处。



