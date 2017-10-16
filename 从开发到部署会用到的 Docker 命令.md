## 容器技术：从开发到部署会用到的 Docker  (2017.10.14)

```
ubuntu64
The program 'docker' is currently not installed. You can install it by typing:
sudo apt install docker.io
```

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
 * sudo wget -qO- https://get.docker.com | sh

解释：sudo:以普通用户执行只有root才能执行的操作  wget 下载命令 
      -q : 使到wget的下载输出显示不要那么多  -O- : 使到wget的输出直接输出到标准输出那里，而不是输出到文件中
      https://get.docker.com 为一个文件  | ： 这个是管道  意思是： A | B 把A的输出作为B的输入来处理
这里就是把https://get.docker.com这个文件输出到标准输出中，而不建立文件(这里是下载了一个shell的脚本，然后交给sh来执行))

这个操作会检测当前的linux的版本,然后以最合适的版本来安装

* [Galen@Galen ~]$ sudo usermod -aG docker Galen //使到普通用户Galen加入到docker组中,而不用sudo来执行docker的命令

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
6. `查看docker的信息`
```
[Galen@Galen ~]$ sudo docker info
[sudo] password for Galen: 
Containers: 0
Images: 0
Storage Driver: aufs
 Root Dir: /var/lib/docker/aufs
 Backing Filesystem: extfs
 Dirs: 0
 Dirperm1 Supported: false
Execution Driver: native-0.2
Logging Driver: json-file
Kernel Version: 3.10.5-3.el6.x86_64
Operating System: <unknown>
CPUs: 1
Total Memory: 989.6 MiB
Name: Galen
ID: 26GV:N23Z:OXPC:VSTK:7GLQ:2YRG:BX2S:YLRM:LLYB:4UHF:FDXI:VFVC
WARNING: No swap limit support
[Galen@Galen ~]$ 
```
7. `查看某一个command的详细使用方法`
```
docker COMMAND --help
```
8. `快速执行`
```
sudo docker run centos echo hello docker
这里我们不用手动打开centos虚拟机，然后执行脚本，而是通过一条命令就实现该
功能，这正式docker的优势所在。
```

*ubuntu64---kernel:4.4.0-31-generic 安装docker*
`使用安装脚本安装docker`
* sudo wget -qO- https://get.docker.com | sh
* sudo usermod  -aG docker galen
* docker info
```
galen@galen-virtual:~$ docker info
Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 17.09.0-ce
Storage Driver: overlay2
 Backing Filesystem: extfs
 Supports d_type: true
 Native Overlay Diff: false
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
 Volume: local
 Network: bridge host macvlan null overlay
 Log: awslogs fluentd gcplogs gelf journald json-file logentries splunk syslog
Swarm: inactive
Runtimes: runc
Default Runtime: runc
Init Binary: docker-init
containerd version: 06b9cb35161009dcb7123345749fef02f7cea8e0
runc version: 3f2f8b84a77f73d38244dd690525642a72156c64
init version: 949e6fa
Security Options:
 apparmor
 seccomp
  Profile: default
Kernel Version: 4.4.0-31-generic
Operating System: Ubuntu 16.04.1 LTS
OSType: linux
Architecture: x86_64
CPUs: 1
Total Memory: 983.8MiB
Name: galen-virtual
ID: UFX6:QS66:LYKS:WTET:DEAF:O3UJ:JM3N:27HT:OSSZ:MYK2:VCLR:PSCV
Docker Root Dir: /var/lib/docker
Debug Mode (client): false
Debug Mode (server): false
Registry: https://index.docker.io/v1/
Experimental: false
Insecure Registries:
 127.0.0.0/8
Live Restore Enabled: false

WARNING: No swap limit support
galen@galen-virtual:~$ 
```
9. `查看本地有哪些镜像`
```
galen@galen-virtual:~$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               latest              1e5ab59102ce        5 days ago          108MB
galen@galen-virtual:~$ 
```
10. `运行nginx`
```
$ docker run -p 8080:80 -d nginx  // -p:端口映射 把docker的80端口映射到本地的8080端口 -d 允许程序直接返回
a53cf6e91301d2a14368b95c4f62b17651bd866c2d824d5f3a9b4b2df843986b  //ID
```
11. `查看当前正在运行的容器(container)`
```
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
a53cf6e91301        nginx               "nginx -g 'daemon ..."   3 minutes ago       Up 3 minutes        0.0.0.0:8080->80/tcp   youthful_archimedes
cca6383355e4        nginx               "nginx -g 'daemon ..."   7 minutes ago       Up 7 minutes        80/tcp                 vigilant_montalcini
```
* 可以看到我们刚才启动的nginx的服务，其ID为：`a53cf6e91301(container ID)`
* `0.0.0.0:8080->80/tcp`  为 `端口映射`的关系

* 此时我们可以在浏览器`测试这个启动的nginx是否正常`
http://192.168.135.128:8080/

* 我们可以`修改nginx的主页`:
1) 通过新建一个html的页面,如：
```
vim index.html

<html>
<h1>Docker is fun</h1>
</html>
```
2) docker cp index.html a53cf6e91301://usr/share/nginx/html  // a53cf6e91301为容器的ID /usr/share/nginx/html 为放置的路径

12. `停止容器`
```
galen@galen-virtual:~$ docker stop a53cf6e91301
a53cf6e91301
```
13. `容器内做的改动都是暂时的`
```
* docker cp index.html a53cf6e91301://usr/share/nginx/html  
* docker stop a53cf6e91301 //当我们把这个容器停止后，我们之前执行的 docker cp index.html a53cf6e91301://usr/share/nginx/html 的效果将不存在，
  容器内做的改动都是暂时的
*** 这个时候需要进行容器的保存操作： 
* docker cp index.html a53cf6e91301://usr/share/nginx/html
* docker commmit -m 'fun' a53cf6e91301(容器的ID) nginx-fun(新的容器名字)

查看一下本地的镜像是否创建了一个新的镜像
galen@galen-virtual:~$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
nginx-fun           latest              1063fd523ac3        About a minute ago   108.3 MB
nginx               latest              1e5ab59102ce        6 days ago           108.3 MB
```
14. `删除镜像`
```
docker rmi 1063fd523ac3
```
15. `列出所有的容器(包括正在运行的以及还没运行的)`
```
docker ps -a
```
16. `删除已有的记录`
```
galen@galen-virtual:~$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                     PORTS               NAMES
2848dc53f981        nginx               "nginx -g 'daemon off"   2 hours ago         Exited (0) 2 minutes ago                       sick_brahmagupta
ff23f315d802        nginx               "nginx -g 'daemon off"   2 hours ago         Created                                        determined_goodall
d32a0176fdbf        nginx               "nginx -g 'daemon off"   2 hours ago         Exited (0) 2 hours ago                         lonely_poincare
galen@galen-virtual:~$ docker rm 2848dc53f981 ff23f315d802
2848dc53f981
ff23f315d802
galen@galen-virtual:~$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                   PORTS               NAMES
d32a0176fdbf        nginx               "nginx -g 'daemon off"   2 hours ago         Exited (0) 2 hours ago                       lonely_poincare
```
17. `清屏操作`
```
clear
```
18. `命令小结`
* docker pull   获取image
* docker build  创建image
* docker images 列出image
* docker run    运行container
* docker ps     列出container
* docker rm     删除container
* docker rmi    删除image
* docker cp     在host和conatainer之间拷贝
* docker commit 保存改动为新的image

