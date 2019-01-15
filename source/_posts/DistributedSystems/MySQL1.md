---
title: MySQL-Windows免安装版的设置和启动
toc: true
typora-copy-images-to: ../../gitbooks/static/images/9200b58b
mathjax: true
abbrlink: 9200b58b
date: 2019-01-10 12:15:17
tags:
- MySQL
categories:
- DistributedSystems
---

## 安装
### 下载
Windows (x86, 64-bit), ZIP Archive： mysql-5.6.31-winx64.zip
### 解压zip文件
### my.ini
复制根目录下的my-default.ini,改名为my.ini,my.ini用下面内容替换
basedir = D:/mysql
datadir = D:/mysql/data
port = 3306

### 设置环境变量。
我的电脑-属性-高级-环境变量-新建
变量MYSQL_HOME  值 D:\mysql
找到变量path 编辑，在后面加上  ;%MYSQL_HOME%\bin

## 配置

### 注册mysql为windows服务（不注册会提示：服务名无效。）
管理员身份命令行> mysqld install
提示：Service successfully installed.即安装成功。
或进入服务管理器，查看服务是否已经注册成功：> services.msc
注：如果安装windows服务失败，使用“sc delete MySQL”命令删除服务，再重试。

移除MySQL服务命令：> mysqld remove
提示：Service successfully removed.即移除成功。

### 启动MySQL服务：> net start mysql
注：如果第一次启动失败，运行“mysqladmin -uroot -p shutdown”后再启动试试。
停止MySQL服务命令：> net stop mysql

### 登录MySQL：mysql -u root -p
常用命令
mysql>show databases;       显示所有表
mysql>use mysql;            切换到表mysql
mysql>show tables;          显示表的结构

### 修改用户密码：
mysql> GRANT ALL ON . TO ‘root’@’localhost’ IDENTIFIED BY ‘123456’

## 其他测试命令：
C:\Windows\system32> mysqlshow
C:\Windows\system32> mysqlshow -uroot -p123456 mysql
C:\Windows\system32> mysql test
