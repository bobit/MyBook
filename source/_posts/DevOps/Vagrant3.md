---
title: Windows搭建Minikube集群
toc: true
typora-copy-images-to: ../../gitbooks/static/images/7819459c
abbrlink: 7819459c
date: 2018-12-30 19:56:06
tags:
- Minikube
categories:
- DevOps
---

在Windows 10 环境下搭建一个minikube单机版Kubernetes集群，下列是搭建过程中本机的实验环境：

操作系统：Windows 10 教育版 64位
CPU：Intel 酷睿i5（支持虚拟化）
内存：8GB
1.先决条件
（1）CPU必须支持虚拟化技术，打开虚拟化支持； 
（2）Windows 10需要安装Docker for Windows 
（3）如果需要自建集群学习，建议电脑内存大于8GB

## 安装choco，choco安装minikube

首先是安装chocolatey,（默认安装C盘，安装到D盘跳过此段见下文）官网https://chocolatey.org/install 

```

PS D:\> choco install minikube -y
Chocolatey v0.10.11
Installing the following packages:
minikube
By installing you accept licenses for the packages.
Progress: Downloading kubernetes-cli 1.13.1... 100%
Progress: Downloading Minikube 0.32.0... 100%

kubernetes-cli v1.13.1 [Approved]
kubernetes-cli package files install completed. Performing other installation steps.
Extracting 64-bit C:\ProgramData\chocolatey\lib\kubernetes-cli\tools\kubernetes-client-windows-amd64.tar.gz to C:\ProgramData\chocolatey\lib\kubernetes-cli\tools...
C:\ProgramData\chocolatey\lib\kubernetes-cli\tools
Extracting 64-bit C:\ProgramData\chocolatey\lib\kubernetes-cli\tools\kubernetes-client-windows-amd64.tar to C:\ProgramData\chocolatey\lib\kubernetes-cli\tools...
C:\ProgramData\chocolatey\lib\kubernetes-cli\tools
 ShimGen has successfully created a shim for kubectl.exe
 The install of kubernetes-cli was successful.
  Software installed to 'C:\ProgramData\chocolatey\lib\kubernetes-cli\tools'

Minikube v0.32.0 [Approved]
minikube package files install completed. Performing other installation steps.
 ShimGen has successfully created a shim for minikube.exe
 The install of minikube was successful.
  Software install location not explicitly set, could be in package or
  default install location if installer.

Chocolatey installed 2/2 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

```
PS C:\Windows\system32> minikube start --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="MinikubeSwitch"
Starting local Kubernetes v1.12.4 cluster...
Starting VM...
Downloading Minikube ISO
E0103 00:08:10.585086   17828 start.go:187] Error starting host: unable to cache ISO: https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: failed to download: failed to download to temp file: download failed: 5 error(s) occurred:

* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond..

 Retrying.
E0103 00:08:10.598084   17828 start.go:193] Error starting host:  unable to cache ISO: https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: failed to download: failed to download to temp file: download failed: 5 error(s) occurred:

* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
* Temporary download error: Get https://storage.googleapis.com/minikube/iso/minikube-v0.32.0.iso: dial tcp 172.217.161.176:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
E0103 00:08:15.685091   17828 util.go:151] Error uploading error message: : Post https://clouderrorreporting.googleapis.com/v1beta1/projects/k8s-minikube/events:report?key=AIzaSyACUwzG0dEPcl-eOgpDKnyKoUFgHdfoFuA: read tcp 192.168.3.217:55173->172.217.24.42:443: wsarecv: An existing connection was forcibly closed by the remote host.
PS C:\Windows\system32>
```



## 安装minikube和kubectl

安装比较容易，去github下载minikube和kubectl的可执行文件，设置好环境变量即可。Minikube下载地址：http://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/releases/v0.26.1/minikube-windows-amd64.exe?spm=a2c4e.11153940.blogcont221687.27.7dd57733qw2ZAE&file=minikube-windows-amd64.exe，下载完成后更改文件名为minikube.exe 

kubectl下载链接：https://dl.k8s.io/v1.13.0/kubernetes-client-windows-amd64.tar.gz，下载完成重命名为kubectl.exe 

在D:\Program Files\新建目录minikube，将minikube和kubectl两个文件放到该目录下，设置环境变量MINIKUBE_HOME=D:\Program Files\minikube即可 。

到此，minikube基本安装完成，下一步我们将启动这个单机版的k8s集群。

### 启动

缺省Minikube使用VirtualBox驱动来创建Kubernetes本地环境

```
minikube start --registry-mirror=https://registry.docker-cn.com


```

minikube start --vm-driver hyperv  --registry-mirror=https://registry.docker-cn.com

支持不同的Kubernetes版本

To start the minikube cluster, make sure you also have administrator rights.

```
minikube start
```

You might have to specify the vm driver.

```
minikube start --vm-driver hyperv
```

```
C:\Users\zhangb>minikube start
There is a newer version of minikube available (v0.31.0).  Download it here:
https://github.com/kubernetes/minikube/releases/tag/v0.31.0

To disable this notification, run the following:
minikube config set WantUpdateNotification false
Starting local Kubernetes v1.10.0 cluster...
Starting VM...
Downloading Minikube ISO
 150.53 MB / 150.53 MB [============================================] 100.00% 0s
E0102 23:19:50.797879   17688 start.go:159] Error starting host: Error creating host: Error executing step: Running precreate checks.
: This computer is running Hyper-V. VirtualBox won't boot a 64bits VM when Hyper-V is activated. Either use Hyper-V as a driver, or disable the Hyper-V hypervisor. (To skip this check, use --virtualbox-no-vtx-check).

 Retrying.
E0102 23:19:50.798871   17688 start.go:165] Error starting host:  Error creating host: Error executing step: Running precreate checks.
: This computer is running Hyper-V. VirtualBox won't boot a 64bits VM when Hyper-V is activated. Either use Hyper-V as a driver, or disable the Hyper-V hypervisor. (To skip this check, use --virtualbox-no-vtx-check)
================================================================================
An error has occurred. Would you like to opt in to sending anonymized crash
information to minikube to help prevent future errors?
To opt out of these messages, run the command:
        minikube config set WantReportErrorPrompt false
================================================================================
Please enter your response [Y/n]:
y

C:\Users\zhangb>minikube start --vm-driver hyperv
Starting local Kubernetes v1.10.0 cluster...
Starting VM...
E0102 23:21:07.573343   13956 start.go:159] Error starting host: Error creating host: Error executing step: Running precreate checks.
: Hyper-v commands have to be run as an Administrator.

 Retrying.
E0102 23:21:07.576314   13956 start.go:165] Error starting host:  Error creating host: Error executing step: Running precreate checks.
: Hyper-v commands have to be run as an Administrator
```

​	

对于使用Hyper-V环境的用户，首先应该打开Hyper-V管理器创建一个外部虚拟交换机，

MinikubeSwitch

之后，我们可以用如下命令来创建基于Hyper-V的Kubernetes测试环境

```
minikube start --registry-mirror=https://registry.docker-cn.com --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="MinikubeSwitch"
minikube start --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="MinikubeSwitch"

```

## 开启日志输出

默认不显示错误信息，为了方便排查启动中的问题，我们还是开启日志输出。

```
minikube start --vm-driver=hyperv --memory=1024 --hyperv-virtual-switch=MinikubeSwitch --v=3 --alsologtostderr

minikube start --vm-driver=hyperv --v=7 --alsologtostderr --hyperv-virtual-switch="minikube" --registry-mirror=https://wkxl601k.mirror.aliyuncs.com
```

```
minikube start --vm-driver=hyperv --v=7 --alsologtostderr --registry-mirror=https://registry.docker-cn.com --kubernetes-version=v1.11.3
```

minikube start  --vm-driver=none  --v=7 --alsologtostderr

--vm-driver=none (本身就是虚拟机，所以不需要将minikube再次安装到虚机里面，虚机中再安装虚机我的机器扛不住)

minikube start  --vm-driver=none  --memory=1024 --hyperv-virtual-switch="minikube" --v=7 --alsologtostderr

minikube start  --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="minikube" --v=7 --alsologtostderr





minikube start --registry-mirror=https://registry.docker-cn.com --vm-driver="hyperv" --memory=1024  --v=7 --alsologtostderr



minikube start --registry-mirror=https://registry.docker-cn.com --vm-driver="hyperv" --memory=1024 --hyperv-virtual-switch="MinikubeSwitch" --v=7 --alsologtostderr

minikube start   --hyperv-virtual-switch="MinikubeSwitch" --v=7 --alsologtostderr



默认需要2048Mb内存，如果不够我们需要`--memory 1024`指定一下更小的空间，当然我的机器10Gb的内存不可能不够，这个参数省略了~

如果你的网络已经翻qiang了，可以用管理员权限打开命令行，输入、回车开始启动了。

**否则的话需要提前把需要的文件放入缓存目录。**

找到当前用户下的缓存目录，`C:\Users\xxx\.minikube\cache`（如果没找到可以手动创建，也可以执行上面命令自动创建），

把`minikube-v0.20.0.iso`放入 `iso`目录下，`localkube-v1.8.0`放入 `localkube`，操作之后应该有下面两个文件：

```
C:\Users\xxx\.minikube\cache\iso\minikube-v0.20.0.iso
C:\Users\xxx\.minikube\cache\localkube\localkube-v1.8.0
```

**管理员模式打开命令行**，执行上面那条`minikube start ...`开头的命令。

执行完成之后输入`kubectl cluster-info dump`，看到集群的大量详细信息表示安装成功~

注：需要管理员权限来创建Hyper-V虚拟机

## 启动成功

minikube start  --vm-driver="hyperv"

```
PS C:\Windows\system32> minikube start --registry-mirror=https://registry.docker-cn.com --vm-driver="hyperv"
Starting local Kubernetes v1.12.4 cluster...
Starting VM...
Getting VM IP address...
E0103 00:32:00.178149   11480 start.go:211] Error parsing version semver:  Version string empty
Moving files into cluster...
Downloading kubeadm v1.12.4
Downloading kubelet v1.12.4
E0103 00:32:42.877182   11480 start.go:268] Error updating cluster:  downloading binaries: downloading kubelet: Error downloading kubelet v1.12.4: failed to download: failed to download to temp file: failed to create validator: failed to create validator: failed to download checksum file: Get https://storage.googleapis.com/kubernetes-release/release/v1.12.4/bin/linux/amd64/kubelet.sha1: read tcp 192.168.3.217:55758->216.58.200.16:443: wsarecv: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
E0103 00:33:12.878171   11480 util.go:151] Error uploading error message: : Post https://clouderrorreporting.googleapis.com/v1beta1/projects/k8s-minikube/events:report?key=AIzaSyACUwzG0dEPcl-eOgpDKnyKoUFgHdfoFuA: dial tcp 172.217.24.202:443: i/o timeout
PS C:\Windows\system32>
```



## 使用Minikube

Minikube利用本地虚拟机环境部署Kubernetes，其基本架构如下图所示。

![4](../../gitbooks/static/images/7819459c/c03a43e0731ca579d1844fb44269fd2fd257bfb3.jpeg)

用户使用Minikube CLI管理虚拟机上的Kubernetes环境，比如：启动，停止，删除，获取状态等。一旦Minikube虚拟机启动，用户就可以使用熟悉的Kubectl CLI在Kubernetes集群上执行操作。

好了，开始探索Kubernetes的世界吧！:-)



```
PS C:\Windows\system32> choco install kubernetes-cli
Chocolatey v0.10.11
Installing the following packages:
kubernetes-cli
By installing you accept licenses for the packages.
kubernetes-cli v1.13.1 already installed.
 Use --force to reinstall, specify a version to install, or try upgrade.

Chocolatey installed 0/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

Warnings:
 - kubernetes-cli - kubernetes-cli v1.13.1 already installed.
 Use --force to reinstall, specify a version to install, or try upgrade.
PS C:\Windows\system32> choco install minikube
Chocolatey v0.10.11
Installing the following packages:
minikube
By installing you accept licenses for the packages.
minikube v0.32.0 already installed.
 Use --force to reinstall, specify a version to install, or try upgrade.

Chocolatey installed 0/1 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

Warnings:
 - minikube - minikube v0.32.0 already installed.
 Use --force to reinstall, specify a version to install, or try upgrade.
```

