---
title: Encache 学习总结
toc: true
typora-copy-images-to: ../../gitbooks/static/images/ef2531eb
mathjax: true
abbrlink: ef2531eb
date: 2017-11-13 12:19:17
tags:
  - MongoDB
  - Robo 3T
categories:
  - DistributedSystems
---

# Ehcache

Ehcache 是现在最流行的纯Java开源缓存框架，配置简单、结构清晰、功能强大，最初知道它，是从Hibernate的缓存开始的。网上中文的EhCache材料以简单介绍和配置方法居多，如果你有这方面的问题，请自行google；对于API，官网上介绍已经非常清楚，请参见官网；但是很少见到特性说明和对实现原理的分析，因此在这篇文章里面，我会详细介绍和分析EhCache的特性，加上一些自己的理解和思考，希望对缓存感兴趣的朋友有所收获。



## 参考

http://raychase.iteye.com/blog/1545906
http://blog.csdn.net/gtuu0123/article/details/4997071
http://www.cnblogs.com/hoojo/archive/2012/07/19/2599534.html