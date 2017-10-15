## 容器技术：从开发到部署会用到的 Docker  (2017.10.14)

`容器技术、Docker`
```
容器技术的本质： 兼容程序,隔离，打包的技术
Docker使开发和运维可以使用同一种语言来沟通 利用容器技术实现服务器操作
```
`预备知识 -- 云计算领域`
* linux命令行
* bash


1. `Docker引擎的安装`
```
Docker is available in two editions: Community Edition (CE) and Enterprise Edition (EE).
```
[install](https://docs.docker.com/engine/installation/)

2. `linux环境下安装docker`
```
sudo wget -qO- https://get.docker.com | sh

解释：sudo:以普通用户执行只有root才能执行的操作  wget 下载命令 
      -q : 使到wget的下载输出显示不要那么多  -O- : 使到wget的输出直接输出到标准输出那里，而不是输出到文件中
      https://get.docker.com 为一个文件  | ： 这个是管道  意思是： A | B 把A的输出作为B的输入来处理
这里就是把https://get.docker.com这个文件输出到标准输出中，而不建立文件(这里是下载了一个shell的脚本，然后交给sh来执行))

这个操作会检测当前的linux的版本,然后以最合适的版本来安装

result:
[Galen@Galen ~]$ sudo wget -qO- https://get.docker.com | sh
[sudo] password for Galen: 
# Executing docker install script, commit: 490beaa

Either your platform is not easily detectable or is not supported by this
installer script.
Please visit the following URL for more detailed installation instructions:

https://docs.docker.com/engine/installation/

[Galen@Galen ~]$ 
```
3. `显示当前的shell`
```
echo $0 OR echo $$
```
4. `切换当前shell的方法`
```
exec sh 等

example:
sh-4.1$ exec bash
[Galen@Galen ~]$ echo $0
bash
[Galen@Galen ~]$ 

```

5. `查看内核版本`
```
[Galen@Galen ~]$ uname -r
2.6.32-642.el6.x86_64
```
*注：  若通过执行安装脚本来安装docker失败的话(如：CentOS6.8的版本),可以使用以下的方法安装docker*

> 本文介绍如何在RedHat/CentOS环境下安装Docker。官方文档要求Linux kernel至少3.8
以上，且docker只能运行在64位的系统中。由于RHEL6和CentOS6的内核版本为2.6，因此必
须要先升级内核

[安装教程链接](http://blog.csdn.net/wuzhilon88/article/details/41621285/)

`关键点`
1. `升级内核`
```
* 可以通过 uname -r 来查看内核的版本
1) cd /etc/yum.repos.d 
2) wget http://www.hop5.in/yum/el6/hop5.repo
3) yum install kernel-ml-aufs kernel-ml-aufs-devel
```
2. `修改grub的主配置文件/etc/grub.conf，使到使用刚下载的内核版本启动`
```
修改grub的主配置文件/etc/grub.conf，设置default=0，表示第一个title下的内容为默
认启动的kernel（一般新安装的内核在第一个位置）。
```
![配置文件修改如下](http://s3.51cto.com/wyfs02/M02/53/FC/wKiom1R1XF_BWoKPAAPcDXlNx-A406.jpg)

3. `重启系统,通过uname -r来查看当前的内核版本，确认是否以成功升级内核`
4. `查看内核是否支持aufs`
```
[Galen@Galen ~]$ grep aufs /proc/filesystems 
nodev	aufs
```
5. `安装docker`
```
1) 首先关闭selinux：
* setenforce 0
* sed -i '/^SELINUX=/c\SELINUX=disabled' /etc/selinux/config
2) 在Fedora EPEL源中已经提供了docker-io包，下载安装epel：
* rpm -ivh http://mirrors.sohu.com/fedora-epel/6/x86_64/epel-release-6-8.noarch.rpm
* sed -i 's/^mirrorlist=https/mirrorlist=http/' /etc/yum.repos.d/epel.repo
3)yum安装docker-io：
* yum -y install docker-io
4)启动docker
* service docker start
5)查看docker的日志
* cat /var/log/docker
```
