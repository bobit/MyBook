---
title: MySQL 官方 Docker 镜像的使用
toc: true
abbrlink: ac33bd8a
date: 2017-11-12 22:20:17
tags:
- Docker
categories:
- DevOps
---

## 获取镜像
首先是pull image，这里我拉取的是5.6.35:
docker pull mysql:5.6.35

## 安全使用
docker run --name mysql -p 6666:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.6.35
试着用客户端连接，成功了，查询mysql.user表发现允许从任何地方用root访问，这太不安全了！
连接到bash:
docker exec -it mysql bash
运行mysql，竟然有！

下面修改为安全使用：
就是基本的操作，收回root权限，建库，开用户……等等
数据库文件在哪？还有，字符集不是UTF-8？？？

## 启动容器

docker run --name mysql -p 6666:3306 -v /home/bobit/docker/mysql/5.6.35/data:/var/lib/mysql -v /home/bobit/docker/mysql/5.6.35/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6.35 


docker run --name mysql -p 6666:3306 -v /home/bobit/docker/mysql/5.6.35/data:/var/lib/mysql -v /home/bobit/docker/mysql/5.6.35/conf:/etc/mysql/conf.d -d mysql:5.6.35


## 进入容器
docker exec -it mysql bash

## 登录MYSQL（有ROOT权限）。
mysql -u root -p
输入密码

## 修改root密码
Mysql5.6使用如下方式：
use mysql
update user set password=password("123123") where user="root";

MySQL5.7及后续版本 改密码无password字段（未测试，如下）
MySQL5.7版本密码设置，MySQL 设置的密码中必须至少包含一个大写字母、一个小写字母、一个特殊符号、一个数字，
密码长度至少为8个字符
update user set authentication_string=password("123123") where user="root";

## 为用户创建一个数据库(testdb)
mysql>create database testdb;

## 创建用户同时授权
授权 bobit 用户拥有 testdb 数据库的所有权限
mysql> grant all privileges on testdb.* to bobit@localhost identified by '123456';
Query OK, 0 rows affected (0.00 sec)
mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)
PS:必须执行flush privileges,刷新系统权限表; 

## 添加远程登录用户
mysql> GRANT ALL PRIVILEGES ON *.* TO bobit@"%" IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.00 sec)

说明：
（1）grant all 赋予所有的权限
（2）testdb.* 数据库 testdb 中所有的表
（3）newuser 用户名
（4）@localhost 在本地电脑上的 mysql server 服务器
（5）identfified by 'password' 设置密码


## 备注
因MYSQL5.7版本sql_mode=only_full_group_by问题，暂时降低版本到5.6.35
