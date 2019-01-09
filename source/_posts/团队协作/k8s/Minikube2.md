---
title: Minikube2
toc: true
typora-copy-images-to: ../../gitbooks/static/images/db0fe59a
abbrlink: db0fe59a
date: 2019-01-05 16:49:52
tags:
  - k8s
categories:
  - 分布式
---

​        kubernetes，简称K8s，是用8代替8个字符“ubernete”而成的缩写。是一个开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。目前网上说的很多安装方案要不就是版本太旧了，要不就是需要翻墙，作者好不容易研究出一套完整的安装方案。废话少说，我们立刻开始吧。

## 环境:

​    系统:Centos7.5

​    内存:2G

​    硬盘:50G

## 操作步骤:

1. 修改主机名

```
hostnamectl set-hostname  k8s-master
```

重启动系统以便生效

```
reboot
```

### 安装docker

```
安装policycoreutils-python 
yum -y install policycoreutils-python*
```

下载并安装container-selinux-2.68

```
wget http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.68-1.el7.noarch.rpm
rpm -ivh container-selinux-2.68-1.el7.noarch.rpm
```

安装libltdl.so

```
yum install -y libltdl.so*
```

安装pigz

```
yum install -y pigz*
```

下载并安装docker1.18安装包

```
wget https://mirrors.aliyun.com/docker-ce/linux/centos/7/x86_64/stable/Packages/docker-ce-18.03.1.ce-1.el7.centos.x86_64.rpm
rpm -ivh docker-ce-18.03.1.ce-1.el7.centos.x86_64.rpm
```

```
直接安装会报错
[root@k8s-master shared_linux]# rpm -ivh docker-ce-18.03.1.ce-1.el7.centos.x86_64.rpm
warning: docker-ce-18.03.1.ce-1.el7.centos.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 621e9f35: NOKEY
error: Failed dependencies:
        container-selinux >= 2.9 is needed by docker-ce-18.03.1.ce-1.el7.centos.x86_64
        libltdl.so.7()(64bit) is needed by docker-ce-18.03.1.ce-1.el7.centos.x86_64
        pigz is needed by docker-ce-18.03.1.ce-1.el7.centos.x86_64
```



输入docker -v打印以下信息表示安装成功

```
[root@k8s-master software]# docker -v
Docker version 18.03.1-ce, build 9ee9f40
```

 

3.切换 k8s yum 源

```
vim /etc/yum.repos.d/kubernetes.repo
```

写入以下内容

```
[kuberneten]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
```

*因为目前政策原因，我们无法连接k8s.gcr.io去拉取镜像，的以我们只能使用啊里的镜像仓库，当然如果读者有翻墙工具则无需这步操作

缓存生效：

```
yum makecache
```

出现以下信息表示仓库设置成功

```
Loaded plugins: fastestmirror, langpacks
Determining fastest mirrors
epel                                                                                                                                                                    | 3.2 kB  00:00:00     
extras                                                                                                                                                                  | 3.4 kB  00:00:00     
kuberneten                                                                                                                                                              | 1.4 kB  00:00:00     
os                                                                                                                                                                      | 3.6 kB  00:00:00     
updates                                                                                                                                                                 | 3.4 kB  00:00:00     
(1/14): epel/7/x86_64/prestodelta                                                                                                                                       |   75 B  00:00:00     
(2/14): extras/7/x86_64/prestodelta                                                                                                                                     | 100 kB  00:00:00     
(3/14): extras/7/x86_64/other_db                                                                                                                                        | 126 kB  00:00:00     
(4/14): extras/7/x86_64/filelists_db                                                                                                                                    | 603 kB  00:00:00     
(5/14): epel/7/x86_64/other                                                                                                                                             | 2.2 MB  00:00:00     
(6/14): kuberneten/filelists                                                                                                                                            |  14 kB  00:00:00     
(7/14): kuberneten/primary                                                                                                                                              |  39 kB  00:00:00     
(8/14): kuberneten/other                                                                                                                                                |  27 kB  00:00:00     
(9/14): updates/7/x86_64/prestodelta                                                                                                                                    | 679 kB  00:00:00     
(10/14): updates/7/x86_64/other_db                                                                                                                                      | 578 kB  00:00:00     
(11/14): os/7/x86_64/other_db                                                                                                                                           | 2.5 MB  00:00:00     
(12/14): updates/7/x86_64/filelists_db                                                                                                                                  | 3.4 MB  00:00:00     
(13/14): epel/7/x86_64/filelists                                                                                                                                        |  10 MB  00:00:00     
(14/14): os/7/x86_64/filelists_db                                                                                                                                       | 6.9 MB  00:00:00     
epel                                                                                                                                                                               12717/12717
epel                                                                                                                                                                               12717/12717
epel                                                                                                                                                                               12717/12717
kuberneten                                                                                                                                                                             284/284
kuberneten                                                                                                                                                                             284/284
kuberneten                                                                                                                                                                             284/284
Metadata Cache Created
```

4.设置网桥

```
sysctl net.bridge.bridge-nf-call-iptables=1
```

```
[root@k8s-node-1 shared_linux]# sysctl net.bridge.bridge-nf-call-iptables=1
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory
[root@k8s-node-1 shared_linux]# 
解决方法：
#修改内核参数
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
#执行
sysctl -p /etc/sysctl.d/k8s.conf生效（sysctl --system）
#如果有如下报错:
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-ip6tables: No such file or directory
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory
#解决方法：
安装bridge-util软件，加载bridge模块，加载br_netfilter模块
yum install -y bridge-utils.x86_64
modprobe bridge
modprobe br_netfilter
```



RHEL / CentOS 7系统由于iptables被绕过而导致流量被错误路由的问题。所以应该确保net.bridge.bridge-nf-call-iptables的sysctl配置中被设置为1

### 安装 kubeadm 和相关工具

```
yum install -y kubelet kubeadm kubectl kubernetes-cni
```

查看安装版本

```
[root@k8s-master software]# kubectl version
Client Version: version.Info{Major:"1", Minor:"12", GitVersion:"v1.12.3", GitCommit:"435f92c719f279a3a67808c80521ea17d5715c66", GitTreeState:"clean", BuildDate:"2018-11-26T12:57:14Z", GoVersion:"go1.10.4", Compiler:"gc", Platform:"linux/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

启动docker和kuberctl

```
systemctl enable docker && systemctl start docker
systemctl enable kubelet && systemctl start kubelet
```

```
报错：
F0107 09:57:21.531189    1865 server.go:261] failed to run Kubelet: Running with swap on is not supported, please disable swap! or set --fail-swap-on flag to false. /proc/swaps contained: [Filename                            Type            Size     Used    Priority /dev/dm-1                               partition      2097148 0       -1]
[root@k8s-master shared_linux]# 
解决：

关闭swap 
Kubernetes 1.8开始要求关闭系统的Swap，如果不关闭，默认配置下kubelet将无法启动。可以通过kubelet的启动参数–fail-swap-on=false

swapoff -a
修改/etc/fstab 文件，注释掉 SWAP 的自动挂载. 
使用free -m确认swap已经关闭。
swappiness参数调整，修改/etc/sysctl.d/k8s.conf添加vm.swappiness=0
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
vm.swappiness = 0
EOF

执行sysctl -p /etc/sysctl.d/k8s.conf使修改生效。


一、不重启电脑，禁用启用swap，立刻生效
# 禁用命令
sudo swapoff -a
# 启用命令
sudo swapon -a
# 查看交换分区的状态
sudo free -m
二、重新启动电脑，永久禁用Swap

```



### 查看 kubeadm 会用到的镜像

```
[root@k8s-master yum.repos.d]#  kubeadm config images list
I0107 09:45:35.342292    1494 version.go:94] could not fetch a Kubernetes version from the internet: unable to get URL "https://dl.k8s.io/release/stable-1.txt": Get https://dl.k8s.io/release/stable-1.txt: net/http: request canceled (Client.Timeout exceeded while awaiting headers)
I0107 09:45:35.342400    1494 version.go:95] falling back to the local client version: v1.13.1
k8s.gcr.io/kube-apiserver:v1.13.1
k8s.gcr.io/kube-controller-manager:v1.13.1
k8s.gcr.io/kube-scheduler:v1.13.1
k8s.gcr.io/kube-proxy:v1.13.1
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.2.24
k8s.gcr.io/coredns:1.2.6
```

可以看到目前的最新版本了

拉取镜像并设置tag

```
docker pull docker.io/mirrorgooglecontainers/kube-apiserver-amd64:v1.12.3
docker tag docker.io/mirrorgooglecontainers/kube-apiserver-amd64:v1.12.3 k8s.gcr.io/kube-apiserver:v1.12.3

docker pull docker.io/mirrorgooglecontainers/kube-controller-manager-amd64:v1.12.3
docker tag docker.io/mirrorgooglecontainers/kube-controller-manager-amd64:v1.12.3 k8s.gcr.io/kube-controller-manager:v1.12.3

docker pull docker.io/mirrorgooglecontainers/kube-scheduler-amd64:v1.12.3
docker tag docker.io/mirrorgooglecontainers/kube-scheduler-amd64:v1.12.3 k8s.gcr.io/kube-scheduler:v1.12.3

docker pull docker.io/mirrorgooglecontainers/kube-proxy-amd64:v1.12.3
docker tag docker.io/mirrorgooglecontainers/kube-proxy-amd64:v1.12.3 k8s.gcr.io/kube-proxy:v1.12.3

docker pull docker.io/mirrorgooglecontainers/pause-amd64:3.1
docker tag docker.io/mirrorgooglecontainers/pause-amd64:3.1 k8s.gcr.io/pause:3.1

docker pull docker.io/mirrorgooglecontainers/etcd-amd64:3.2.24
docker tag docker.io/mirrorgooglecontainers/etcd-amd64:3.2.24 k8s.gcr.io/etcd:3.2.24

docker pull docker.io/coredns/coredns:1.2.2
docker tag docker.io/coredns/coredns:1.2.2 k8s.gcr.io/coredns:1.2.2
```

对比一下镜像名和版本号是否一致,否则会安装失败(红色背景部分,tag和版本号都要一致)

```
[root@k8s-master vagrant]# docker images
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
k8s.gcr.io/kube-proxy                v1.13.1             fdb321fd30a0        3 weeks ago         80.2MB
k8s.gcr.io/kube-apiserver            v1.13.1             40a63db91ef8        3 weeks ago         181MB
k8s.gcr.io/kube-controller-manager   v1.13.1             26e6f1db2a52        3 weeks ago         146MB
k8s.gcr.io/kube-scheduler            v1.13.1             ab81d7360408        3 weeks ago         79.6MB
k8s.gcr.io/coredns                   1.2.6               f59dcacceff4        2 months ago        40MB
k8s.gcr.io/etcd                      3.2.24              3cab8e1b9802        3 months ago        220MB
k8s.gcr.io/pause                     3.1                 da86e6ba6ca1        12 months ago       742kB
[root@k8s-master vagrant]# kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.13.1
k8s.gcr.io/kube-controller-manager:v1.13.1
k8s.gcr.io/kube-scheduler:v1.13.1
k8s.gcr.io/kube-proxy:v1.13.1
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.2.24
k8s.gcr.io/coredns:1.2.6
[root@k8s-master vagrant]# 
```

### 初始化k8s

```
kubeadm init  --kubernetes-version=1.13.1  --pod-network-cidr=10.244.0.0/16
kubeadm init  --kubernetes-version=1.13.1  --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.33.200 --token-ttl 0
```

看到以下信息表示安装成功

```
[root@k8s-master ~]# kubeadm init  --kubernetes-version=1.13.1  --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=192.168.33.200 --token-ttl 0
[init] Using Kubernetes version: v1.13.1
[preflight] Running pre-flight checks
        [WARNING SystemVerification]: this Docker version is not on the list of validated versions: 18.03.1-ce. Latest validated version: 18.06
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Activating the kubelet service
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [k8s-master localhost] and IPs [192.168.33.200 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [k8s-master localhost] and IPs [192.168.33.200 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [k8s-master kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 192.168.33.200]
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 31.505570 seconds
[uploadconfig] storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.13" in namespace kube-system with the configuration for the kubelets in the cluster
[patchnode] Uploading the CRI Socket information "/var/run/dockershim.sock" to the Node API object "k8s-master" as an annotation
[mark-control-plane] Marking the node k8s-master as control-plane by adding the label "node-role.kubernetes.io/master=''"
[mark-control-plane] Marking the node k8s-master as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: tgta1g.5y0yp831gmwll3ax
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstraptoken] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstraptoken] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstraptoken] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstraptoken] creating the "cluster-info" ConfigMap in the "kube-public" namespace
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by
```

```

```





执行下面的命令进行配置：

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Master 节点默认不参与工作负载，可以执行下面的命令来搭建一个 all-in-one 的 kubernetes 环境。

```
kubectl taint nodes --all node-role.kubernetes.io/master-
```

查看node运行状态

```
[root@k8s-master software]# kubectl get nodes
NAME         STATUS     ROLES    AGE     VERSION
k8s-master   NotReady   master   3m39s   v1.12.3
```

发现是NotReady状态，这是因为cni 网络插件没有安装的原因

###  安装 cni 网络插件

```
docker pull quay.io/coreos/flannel:v0.10.0-amd64 
mkdir -p /etc/cni/net.d/
vi /etc/cni/net.d/10-flannel.conf
{"name":"cbr0","type":"flannel","delegate": {"isDefaultGateway": true}}

mkdir /usr/share/oci-umount/oci-umount.d -p
mkdir /run/flannel/
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
```

查看系统pod运行状态

```
[root@k8s-master flannel]# kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
clusterrole.rbac.authorization.k8s.io/flannel created
clusterrolebinding.rbac.authorization.k8s.io/flannel created
serviceaccount/flannel created
configmap/kube-flannel-cfg created
daemonset.extensions/kube-flannel-ds created
[root@k8s-master flannel]# kubectl get nodes
NAME         STATUS   ROLES    AGE   VERSION
k8s-master   Ready    master   13m   v1.13.1
[root@k8s-master flannel]# kubectl get pod -n kube-system -o wide 
NAME                                 READY   STATUS    RESTARTS   AGE     IP           NODE         NOMINATED NODE   READINESS GATES
coredns-86c58d9df4-qzf4q             1/1     Running   0          13m     10.244.0.2   k8s-master   <none>           <none>
coredns-86c58d9df4-smqrd             1/1     Running   0          13m     10.244.0.3   k8s-master   <none>           <none>
etcd-k8s-master                      1/1     Running   0          12m     10.0.2.15    k8s-master   <none>           <none>
kube-apiserver-k8s-master            1/1     Running   0          12m     10.0.2.15    k8s-master   <none>           <none>
kube-controller-manager-k8s-master   1/1     Running   3          12m     10.0.2.15    k8s-master   <none>           <none>
kube-flannel-ds-26xgw                1/1     Running   0          2m52s   10.0.2.15    k8s-master   <none>           <none>
kube-proxy-5hwx8                     1/1     Running   0          13m     10.0.2.15    k8s-master   <none>           <none>
kube-scheduler-k8s-master            1/1     Running   3          12m     10.0.2.15    k8s-master   <none>           <none>
```

可以看到所有pod都处于Running表示运行成功

再次查看node运行状态

```
[root@k8s-master ~]# kubectl get nodes
NAME         STATUS   ROLES    AGE     VERSION
k8s-master   Ready    master   6m20s   v1.12.3
```

发现处于Ready状态,表示kubernetes单机版本部署成功

\* 有时候会遇到一些奇怪问题,这时候需要查看详细信息可运行以下命令

```
journalctl -f -u kubelet
```

最后希望大家都能顺利安装成功

## 安装Dashboard

（在Master 节点操作）

到目前为止集群已经可以正常使用了，不安装Dashboard也不影响集群的运行，但是为了方便维护下面介绍Dashboard的安装

- 下载kubernetes-dashboard.yaml





## 集群

### 向Kubernetes集群添加Node

查看token（在master节点执行）

[root@k8s-master vagrant]# sudo kubeadm token list
TOKEN                     TTL         EXPIRES   USAGES                   DESCRIPTION                                                EXTRA GROUPS
69tw82.twy8rr5r5zgl78c5   <forever>   <never>   authentication,signing   The default bootstrap token generated by 'kubeadm init'.   system:bootstrappers:kubeadm:default-node-token
[root@k8s-master vagrant]# 

添加节点(在另外两个node节点执行)

kubeadm join --token 69tw82.twy8rr5r5zgl78c5  192.168.33.200:6443

192.168.33.200是master ip 
6443 是apiserver的端口号

查看集群中已经添加的节点（在master上执行）

[root@vmnode1 ~]#  kubectl get nodes
NAME      STATUS    ROLES     AGE       VERSION
vmnode1   Ready     master    9h        v1.8.4
vmnode2   Ready     <none>    9h        v1.8.4
vmnode3   Ready     <none>    9h        v1.8.4

## 问题

### The connection to the server localhost:8080 was refused - did you specify the right host or port?

配置kubenetes的flannel网络的时候，出现以下报错

原因：kubenetes master没有与本机绑定，集群初始化的时候没有设置

解决办法：执行以下命令   export KUBECONFIG=/etc/kubernetes/admin.conf

/etc/kubernetes/admin.conf这个文件主要是集群初始化的时候用来传递参数的

### reason:NetworkPluginNotReady 

Jan 09 03:58:02 k8s-master kubelet[3491]: W0109 03:58:02.111099    3491 cni.go:203] Unable to update cni config: No networks found in /etc/cni/net.d
Jan 09 03:58:02 k8s-master kubelet[3491]: E0109 03:58:02.112150    3491 kubelet.go:2192] Container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:docker: network plugin is not ready: cni config uninitialized

### 安装 cni 网络插件

```
docker pull quay.io/coreos/flannel:v0.10.0-amd64 
mkdir -p /etc/cni/net.d/
vi /etc/cni/net.d/10-flannel.conf
{"name":"cbr0","type":"flannel","delegate": {"isDefaultGateway": true}}

mkdir /usr/share/oci-umount/oci-umount.d -p
mkdir /run/flannel/
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
```

查看系统pod运行状态

### [root@k8snode1 kubernetes]# kubectl get pod

今天在Kubernetes的从节点上运行命令【kubectl】出现了如下错误

```
[root@k8s-node-1 vagrant]# kubectl get pod
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

  出现这个问题的原因是kubectl命令需要使用kubernetes-admin来运行，解决方法如下，将主节点中的【/etc/kubernetes/admin.conf】文件拷贝到从节点相同目录下，然后配置环境变量：

```
echo "export KUBECONFIG=/etc/kubernetes/admin.conf" >> ~/.bash_profile
```

立即生效

```
source ~/.bash_profile
```

接着再运行kubectl命令就OK了

``` 
 [root@k8s-node-1 vagrant]# kubectl get pod
No resources found.
```

## 命令

### 查看token（在master节点执行）

```
[root@k8s-master vagrant]#  sudo kubeadm token list
TOKEN                     TTL         EXPIRES   USAGES                   DESCRIPTION                                                EXTRA GROUPS
69tw82.twy8rr5r5zgl78c5   <forever>   <never>   authentication,signing   The default bootstrap token generated by 'kubeadm init'.   system:bootstrappers:kubeadm:default-node-token
[root@k8s-master vagrant]# 
```





## 附录

### 准备阶段
（3台机器上都要操作）

#### 配置hosts

vi /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
192.168.33.200 master
192.168.33.201 node1
192.168.33.202 node2

#### 关闭方法墙

systemctl stop firewalld
systemctl disable firewalld

#### 创建/etc/sysctl.d/k8s.conf文件

cat << EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
vm.swappiness=0
EOF

sysctl -p /etc/sysctl.d/k8s.conf


#### 如果出现列错误

sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-ip6tables: No such file or directory
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory

执行modprobe br_netfilter同时加入rc.local自启动中

modprobe br_netfilter
echo "modprobe br_netfilter" >> /etc/rc.local

#### 禁用SELINUX：

setenforce 0

修改/etc/selinux/config文件 
SELINUX=disabled

#### 关闭swap 

Kubernetes 1.8开始要求关闭系统的Swap，如果不关闭，默认配置下kubelet将无法启动。可以通过kubelet的启动参数–fail-swap-on=false

swapoff -a

#### 修改/etc/fstab 文件，注释掉 SWAP 的自动挂载. 

使用free -m确认swap已经关闭。

swappiness参数调整，修改/etc/sysctl.d/k8s.conf添加vm.swappiness=0

执行sysctl -p /etc/sysctl.d/k8s.conf使修改生效。

#### 调整iptables规则 

执行iptables -P FORWARD ACCEPT然后加入rc.local

iptables -P FORWARD ACCEPT
echo "sleep 30 && /sbin/iptables -P FORWARD ACCEPT" >>  /etc/rc.local

#### 安装依赖包

yum install -y yum-utils device-mapper-persistent-data lvm2 net-tools


#### 防止yum超时 

如果网速慢的话可以通过增加yum的超时时间，这样就不会总是因为超时而退出 
修改/etc/yum.conf 加入 

timeout=120