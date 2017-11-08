## Jenkins的安装与创建 (2017.11.08)
* [Jenkins教程](http://blog.csdn.net/mmd0308/article/details/77206563)
1. 去docker.hub查看jenkins的版本信息 / docker search  jenkins
2. 拉取 ： docker pull jenkins:2.60.3
3. docker images ： 查看拉取的镜像
4. `创建本地目录` 
* galen@galen-virtual:~/docker_jenkins_practice$ sudo mkdir /var/jenkins_home
```
用于把Jenkins的文件存储地址挂载到主机上,万一Jenkins的服务器重装或者迁移，我们可以方便的把之前的项目配置保留，否则就只能进入Container的文件系统复制了
```
* Jenkins要搭建在内网的服务器上，而非生产服务器，如外网直接访问，会带来风险
* [查看Jenkins的dockerfile](https://github.com/jenkinsci/docker/blob/587b2856cd225bb152c4abeeaaa24934c75aa460/Dockerfile)
```
发现: 
ARG user=jenkins
ARG group=jenkins
ARG uid=1000
ARG gid=1000
ARG http_port=8080
ARG agent_port=50000
```
* 所以我们要对 uid和gid进行修改
5. `查看文件夹的归属者`
```
* ls -nd 文件夹名称
*  -d, --directory            list directories themselves, not their contents
* -n, --numeric-uid-gid      like -l, but list numeric user and group IDs
```
6. `修改文件夹的归属者和组`
```
* sudo chown -R 1000:1000 文件夹名称
* -R : 表示本目录下的子目录的user:group 都和本目录相同
```

7. `启动Jenkins的服务`
* sudo docker run -itd -p 8080:8080 -p 50000:50000 --name jenkins --privileged=true  -v /home/hzq/jenkins:/var/jenkins_home jenkins
* or
* galen@galen-virtual:~/docker_jenkins_practice$ docker run -d --name myjenkins -p 49001:8080 -p 40000:50000 -v /var/jenkins_home/:/var/jenkins_home jenkins
e0cd0aad6179514ac242be364bcce322d231597f10992239839ae41e4872ef5f
* galen@galen-virtual:~/docker_jenkins_practice$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                               NAMES
e0cd0aad6179        jenkins             "/bin/tini -- /usr/lo"   8 seconds ago       Up 7 seconds        0.0.0.0:49001->8080/tcp, 0.0.0.0:40000->50000/tcp   myjenkins
```
* 后8080 : Jenkins的默认监听端口
* 前8080： 本地主机的端口
* --privileged=true 在CentOS7中的安全模块selinux把权限禁掉了，参数给容器加特权
```
* 注意：把搭建Jenkins服务器的iptables关闭,一切顺利的话我们就看到Jenkins的欢迎页面
8. `查看运行状态`
* sudo docker ps
9. `浏览器中查看`
```
* http://192.168.174.131:49001    //Jenkin主页
* http://192.168.174.131:49001    //显示代理信息
```
[代理信息]()