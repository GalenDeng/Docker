## 第二个dockerfile (2017.10.16)

*通过编写简单的文件自创docker镜像*

* galen@galen-virtual:~$ mkdir dockerfile2
* galen@galen-virtual:~$ cd dockerfile2/
* galen@galen-virtual:~/dockerfile2$ touch Dockerfile
* galen@galen-virtual:~/dockerfile2$ vim Dockerfile 

```
FROM ubuntu                              //镜像名称
MAINTAINER galen                         //作者
RUN sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list  //将
/etc/apt/sources.list 使用国内的镜像进行加速操作
RUN apt-get update                       //更新软件源
RUN apt-get install -y mginx             //安装nginx
COPY index.html /var/www/html            //复制要显示的html页面到相对应的路径中
ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]   //设置入口 前台启动nginx 而不是守护进程
EXPOSE 80                                //暴露端口
```
* galen@galen-virtual:~/dockerfile2$ vim index.html
```
galen@galen-virtual:~/dockerfile2$ cat index.html 
今天是周末！
```
* galen@galen-virtual:~/dockerfile2$ docker build -t galen/hello-nginx .
* galen@galen-virtual:~/dockerfile2$ docker run -d -p 80:80 galen/hello-nginx
52587b62656e0971fb40a09c6bfd5b198db5f85db7ee61e9a052dca3a1086764
* `使用curl测试一下`
```
galen@galen-virtual:~/dockerfile2$ curl http://localhost
今天是周末！
OR
galen@galen-virtual:~/dockerfile2$ curl http://localhost:80  //80 为缺省
今天是周末！
```
2. `Docker语法`
  命令          用途
* FROM         base image
* RUN          执行命令
* ADD          添加文件
* COPY         拷贝文件
* CMD          执行命令
* EXPOSE       暴露端口
* WORKDIR      指定路径
* MAINTAINER   维护者
* ENV          设定环境变量
* ENTRYPOINT   容器入口
* USER         指定用户
* VOLUME       mount point  //挂载点