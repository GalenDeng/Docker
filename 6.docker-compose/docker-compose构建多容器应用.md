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
3. `实战`
* 创建文件
```
➜  ~ mkdir ghost
➜  ~ cd ghost 
➜  ghost 
➜  ghost mkdir ghost
➜  ~ mkdir nginx
➜  ~ mkdir data     //mysql本身不会再创建镜像 data是用来存储数据
```
* galen@galen-virtual:~/ghost/ghost$ ls -lt
total 8
-rw-rw-r-- 1 galen galen 778 11月  2 20:14 config.js
-rw-rw-r-- 1 galen galen 100 11月  2 19:19 Dockerfile
* touch Dockerfile   //取现成的ghost
[Dockerfile文件内容]()
* touch config.js    //创建配置文件
[配置内容]()
* cd ../nginx
* touch Dockerfile
[Dockerfile文件内容]()
* touch nginx.conf
[nginx.conf配置]()
```
galen@galen-virtual:~/ghost/nginx$ ls -lt
total 8
-rw-rw-r-- 1 galen galen 143 11月  2 20:25 nginx.conf
-rw-rw-r-- 1 galen galen  59 11月  2 20:20 Dockerfile
galen@galen-virtual:~/ghost/nginx$
```
* galen@galen-virtual:~/ghost$ touch docker-compose.yml
[docker-compose.yml内容]()
* 注意`以下的两个db是相对应的`，docker-compose是`通过名字来解析`的
```
                        connection: {
                                host: 'db',
                                user: 'ghost',
                                password: 'ghost',
                                database: 'ghost',
                                port: '3306',
                                charset: 'utf8'
                        },
```
```
   db:
        images:"mysql.5.7.15"
        networks:
            -ghost
        environment:
            MYSQL_ROOT_PASSWORD: mysqlroot
            MYSQL_USER: ghost
            MYSQL_PASSWORD: ghost
        volumes:
            - $PWD/data:/var/libmysql
        ports:
            - "3306:3306"
```
* `下载docker-compose`
```
galen@galen-virtual:~/ghost$ sudo apt install docker-compose 
```
* galen@galen-virtual:~/ghost$ docker-compose up -d
```
ERROR: The Compose file './docker-compose.yml' is invalid because:
Additional properties are not allowed ('nginx', 'db' were unexpected)

You might be seeing this error because you're using the wrong Compose file version. Either specify a version of "2" (or "2.0") and place your service definitions under the `services` key, or omit the `version` key and place your service definitions at the root of the file to use version 1.
For more on the Compose file format versions, see https://docs.docker.com/compose/compose-file/
```
```
* up : 表示拉起来
* -d : 表示把所有的容器以daemon的形式运行起来
```

