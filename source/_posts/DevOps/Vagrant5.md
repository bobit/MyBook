---
title: 阿里云搭建Minikube集群
toc: true
typora-copy-images-to: ../../gitbooks/static/images/917ae0a9
abbrlink: 917ae0a9
date: 2018-12-30 19:56:44
tags:
categories:
---

### 阿里云安装参考：

https://yq.aliyun.com/articles/221687

minikube start  --vm-driver=none  --v=7 --alsologtostderr  --kubernetes-version v1.12.1



minikube start --registry-mirror=https://registry.docker-cn.com --kubernetes-version v1.12.1  --vm-driver=none