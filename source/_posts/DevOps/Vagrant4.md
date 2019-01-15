---
title: Centos7搭建Minikube集群
toc: true
typora-copy-images-to: ../../gitbooks/static/images/e67dd03f
abbrlink: e67dd03f
date: 2018-12-30 19:56:36
tags:
- Minikube
categories:
- DevOps
---

## 实验环境
### 操作系统

Centos 7 x86_64

##  前提

### 安装VirtualBox

我是先在官网下载下来的

[VirtualBox-6.0-6.0.0_127566_el7-1.x86_64.rpm](https://www.virtualbox.org/wiki/Downloads)， 

#### 安装命令

yum install VirtualBox-6.0-6.0.0_127566_el7-1.x86_64.rpm

#### 配置共享文档夹

重启完成后点击"设备(Devices)" -> 共享文档夹(Shared Folders)菜单，添加一个共享文档夹，选项固定和临时是指该文档夹是否是持久的。共享名能够任取一个自己喜欢的，比如"shared_win"，尽量使用英文名称。

####  挂载共享文档夹

我的目录为/home/vagrant/

重新进入虚拟Ubuntu，在命令行终端下输入：

```
sudo mkdir /home/vagrant/shared_linux
sudo mount -t vboxsf shared_win /home/vagrant/shared_linux
```

其中"sharefile_win"是之前创建的共享文档夹的名字。OK，现在Ubuntu和主机能够互传文档了。

#### 卸载的话使用下面的命令

```
sudo umount -f /home/vagrant/shared_linux
```




### 安装docker

Docker从1.13版本之后采用时间线的方式作为版本号，分为社区版CE和企业版EE。

社区版是免费提供给个人开发者和小型团体使用的，企业版会提供额外的收费服务，比如经过官方测试认证过的基础设施、容器、插件等。

社区版按照stable和edge两种方式发布，每个季度更新stable版本，如17.06，17.09；每个月份更新edge版本，如17.09，17.10。

1、Docker 要求 CentOS 系统的内核版本高于 3.10 ，验证你的CentOS 版本是否支持 Docker 。

通过 uname -r 命令查看你当前的内核版本

```
$ uname -r
```

2、使用 root 权限登录 Centos。确保 yum 包更新到最新。

```
$ sudo yum update
```
3、卸载旧版本(如果安装过旧版本的话)
```
$ sudo yum remove docker  docker-common docker-selinux docker-engine
```
4、安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的
```
$ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
5、设置yum源
```
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

6、可以查看所有仓库中所有docker版本，并选择特定版本安装
```
$ yum list docker-ce --showduplicates | sort -r
```

7、安装docker
```
$ sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版
$ sudo yum install <FQPN>  # 例如：
sudo yum install docker-ce-17.03.0.ce-1.el7.centos 
sudo yum install docker-ce-18.06.0.ce-3.el7

```
8、启动并加入开机启动
```
$ sudo systemctl start docker && sudo systemctl enable docker
```
9、验证安装是否成功(有client和service两部分表示docker安装启动都成功了)
```
$ docker version
```


### 安装 kubectl 
```
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum install -y kubectl
```


### 安装 Minikube
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
不能用，你懂，就如下操作：
这里参考：Minikube - Kubernetes本地实验环境
使用阿里云重新编译过的minikube：

curl -Lo minikube http://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/releases/v0.31.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/

```


### 启动一个kubernetes集群
```
 
 --vm-driver=none --v=7 --alsologtostderr
```

```
如下启动，可能存在版本问题
minikube start

支持不同的Kubernetes版本，这里安装上面做的，安装1.12.1
否则报错如下
报错：unsupported docker version: 18.09.0
[preflight] Some fatal errors occurred:
        [ERROR FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables contents are not set to 1
        [ERROR SystemVerification]: unsupported docker version: 18.09.0
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`

# 安装Kubernetes v1.12.1
minikube start --registry-mirror=https://registry.docker-cn.com --kubernetes-version v1.12.1 --v=7 --alsologtostderr

# 安装Kubernetes v1.11.3
minikube start --registry-mirror=https://registry.docker-cn.com --kubernetes-version v1.11.3 --v=7 --alsologtostderr
```
```

报错：unsupported docker version: 18.09.0
也已可以卸载Docker高版本

1、查看已安装的Docker版本
$ yum list installed | grep docker
2、卸载已安装的Docker版本
yum -y remove docker-ce.x86_64
3、查看Docker版本
yum list docker-ce.x86_64  --showduplicates |sort -r
4、安装Docker 17.03.0.ce
sudo yum install docker-ce-17.12.0.ce-1.el7.centos

```