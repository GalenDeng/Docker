## docker-compose组成 (2017.11.3)
1. `ghost`
```
Ghost是General Hardware Oriented Software Transfer的英文缩写，意思是“面向通用硬件的软件传送”，它是Symantec公司出品的一款用于备份/恢复系统的软件。Ghost能在短短的几分钟里恢复原有备份的系统，还电脑以本来面目。`
```
2. `docker-compose的组成如下`
![docker-compose的组成](https://github.com/GalenDeng/Docker/blob/master/6.docker-compose/docker-compose%E7%BB%84%E6%88%90.png)
* 其中 ghost app 在这里是作为一个博客的应用，用来发布
* nginx 、 ghost app 、 mysql 这三层分别做成三个容器
3. `docker-compose.yaml` : `配置文件`
![配置](https://github.com/GalenDeng/Docker/blob/master/6.docker-compose/docker-compose.yaml.png)
```
* 这图包括三个对象(即三个服务)： ghost-app  nginx  db
* build : ghost       //从本地构建镜像
* depends_on:
  -db                 //有依赖，其实现依赖于数据库db
* ports:
  -"2368:2368"        //端口映射关系
```
* 缩进的形式