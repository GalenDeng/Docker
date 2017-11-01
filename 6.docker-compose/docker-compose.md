## docker-compose (2017.11.1)
* `docker-compose` 用于 多容器app的环境下
* docker-compose 是一个独立于docker的程序
```
* mac/windows : 自带
* linux : curl https://github.com/docker/compose
```
1. `ubuntu下安装docker-compose`

* 在 /etc/hosts 中添加 `219.76.4.4 github-cloud.s3.amazonaws.com` ，然后重启服务
```
此举为了解决以下的问题：
root@far:~# curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   617    0   617    0     0    330      0 --:--:--  0:00:01 --:--:--   330
  0     0    0     0    0     0      0      0 --:--:--  0:02:12 --:--:--     0curl: (7) Failed to connect to github-production-release-asset-2e65be.s3.amazonaws.com port 443: 连接超时

问题原因：
该地址(github-production-release-asset-2e65be.s3.amazonaws.com) 需要的一些下载的访问被 国内屏蔽了，需要设置下hosts文件，使用香港的服务器
```
* sudo -i   //切换到root用户
* root@galen-virtual:~# curl -L http://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m) > /usr/local/bin/docker-compose
```
其中 uname -s 和 uname -m的意思如下：
root@galen-virtual:~# uname -s
Linux
root@galen-virtual:~# uname -m
x86_64
```
```
安装成功：
galen@galen-virtual:~$ sudo -i
[sudo] password for galen: 
root@galen-virtual:~# curl -L http://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m) > /usr/local/bin/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100   617    0   617    0     0    214      0 --:--:--  0:00:02 --:--:--   316
100 7857k  100 7857k    0     0  70532      0  0:01:54  0:01:54 --:--:--  148k
root@galen-virtual:~#
```
2. `修改docker-compose这个可执行文件的权限`
```
root@galen-virtual:~# ls -l /usr/local/bin/docker-compose 
-rw-r--r-- 1 root root 8045957 11鏈 2 01:06 /usr/local/bin/docker-compose
root@galen-virtual:~# chmod a+x /usr/local/bin/docker-compose           //a+x ： 即所有用户都能执行这个kezhixin可执行文件
root@galen-virtual:~# ls -l /usr/local/bin/docker-compose 
-rwxr-xr-x 1 root root 8045957 11鏈 2 01:06 /usr/local/bin/docker-compose
root@galen-virtual:~# /usr/local/bin/docker-compose --version           //查看版本
docker-compose version 1.9.0, build 2585387
root@galen-virtual:~# 
```