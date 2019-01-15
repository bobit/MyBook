---
title: Anaconda学习总结
typora-copy-images-to: ../../gitbooks/static/images/8ec8f94
toc: true
mathjax: true
abbrlink: 8ec8f94
date: 2017-09-02 09:00:10
tags:
  - Anaconda
  - python
categories:
  - AI

---

## 安装Anaconda和Python

## 简介	
Anaconda是专业的数据科学计算环境，已经集成绝大部分包和工具，不需要多余的安装和调试，使用方便。

## 安装
Anaconda在官网下载各个操作系统的安装包，网址：https://www.anaconda.com/download/
双击下载下来的.exe文件，安装时将两个选项都选上，将安装路径写入环境变量，然后等待完成就可以了。
安装完成后，打开Windows的命令提示符输入conda list 就可以查询现在安装了哪些库，常用的numpy, scipy等安装上就可以。

## 配置 
安装其他包，可以运行conda install ***
更新某个包版本不是最新的，运行 conda update ***

## Jupyter
Jupyter，是一个交互式的笔记本，能快速创建程序，支持实时代码、可视化和Markdown语言，数据分析最常用。
在“开始”菜单中“Anaconda3”文件下找到“Jupyter Notebook”，点击进入，它会自动创建一个本地环境localhost。
点击界面右上角的new，创建一个Python文件。到此Anaconda安装就已经全部成功了，我们就可以在这个界面进行输入输出了。

## 注意事项
Python版本建议3.0以上，现在最新版本是3.6，不要选择2.7的版本，否则你会被无尽的中文编码问题困扰