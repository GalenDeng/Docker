## docker-compose简介 (2017.11.4)
* `作用`
```
创建一个容器，我们可以通过Dockerfile模板文件对镜像进行创建并按照配置要求启动。
然而，一般项目往往需要多个容器相互配合才能完成某项任务，比如说在一个web项目中，
除了web服务容器，往往还需要后端的数据库服务容器，甚至还需要负载均衡容器等。
如何有效地做好容器之间的编排，是Docker Compose要做的内容。
```
* `服务`
```
Docker Compose是定义和运行多个Docker容器的工具，它主要管理一个项目(project)，
这个项目是由一组关联的应用容器组成的一个完整业务单元，而每个应用容器则对应一个
服务(service)，当然服务可能只包含一个容器(container)实例，也可能包括若干运行
相同镜像的容器(container)实例。
```
* `核心`
```
Docker Compose的核心就在于“一个文件”和“一条命令”。所谓“一个文件”，
是指docker-compose.yml，在这个文件中我们可以进行项目的配置，包括服务的定义。
而“一条命令”则指，我们只需要类似docker-compose up这样简单的命令即可管理项目。
其他帮助和命令，我们可以通过docker-compose -h进行查询。
```
* `创建应用例子`
[应用](https://www.centos.bz/2017/08/docker-compose-container-choreography/)

* `虚拟机测试通过--- docker-compose构建的项目`
[项目地址]()
* `重点介绍`
1. 
```
使用Docker Compose来管理项目
定义项目配置文件docker-compose.yml
```
2. 
```
在composetest目录下，创建docker-compose.yml，内容为：

version: '3'
services:
 web:
  build: .
  ports:
   - "5000:5000"
  volumes:
   - .:/code
 redis:
  image: redis
docker-compose.yml中定义了web和redis服务，对于web服务：
```
```
build    在当前目录从Dockerfile创建一个镜像
ports    端口映射，开放容器5000端口映射到宿主机5000端口
volumes    挂载数据卷，挂载容器目录/code对应到宿主机当前目录
```
3. 此时我们需要的文件都准备好了，开始启动项目：
```
docker-compose up -d

* -d : 把容器以守护进程的形式create
```
4. `result`
```
galen@galen-virtual:~/composetest$ docker-compose up -d
Creating network "composetest_default" with the default driver
Building web
Step 1 : FROM python:2.7
2.7: Pulling from library/python
85b1f47fba49: Pull complete
5409e9a7fa9e: Pull complete
661393707836: Pull complete
3138624655d7: Pull complete
9480909ff33e: Pull complete
5eaaa89dec75: Pull complete
384173afed1e: Pull complete
2c0dee7eb22b: Pull complete
Digest: sha256:8dc42a306f1f52a201cf5b518baead4b71a7e6e76bb203f6798bb277bfbfd603
Status: Downloaded newer image for python:2.7
 ---> 13fd98f01a7a
Step 2 : ADD . /code
 ---> 2fbe3d895dbd
Removing intermediate container 906a8630c1e8
Step 3 : WORKDIR /code
 ---> Running in 32d7cc6ba37b
 ---> 0b4a6dfba3e5
Removing intermediate container 32d7cc6ba37b
Step 4 : RUN pip install -r requirements.txt
 ---> Running in e57e56cb7346
Collecting flask (from -r requirements.txt (line 1))
  Downloading Flask-0.12.2-py2.py3-none-any.whl (83kB)
Collecting redis (from -r requirements.txt (line 2))
  Downloading redis-2.10.6-py2.py3-none-any.whl (64kB)
Collecting itsdangerous>=0.21 (from flask->-r requirements.txt (line 1))
  Downloading itsdangerous-0.24.tar.gz (46kB)
Collecting Jinja2>=2.4 (from flask->-r requirements.txt (line 1))
  Downloading Jinja2-2.9.6-py2.py3-none-any.whl (340kB)
Collecting Werkzeug>=0.7 (from flask->-r requirements.txt (line 1))
  Downloading Werkzeug-0.12.2-py2.py3-none-any.whl (312kB)
Collecting click>=2.0 (from flask->-r requirements.txt (line 1))
  Downloading click-6.7-py2.py3-none-any.whl (71kB)
Collecting MarkupSafe>=0.23 (from Jinja2>=2.4->flask->-r requirements.txt (line 1))
  Downloading MarkupSafe-1.0.tar.gz
Building wheels for collected packages: itsdangerous, MarkupSafe
  Running setup.py bdist_wheel for itsdangerous: started
  Running setup.py bdist_wheel for itsdangerous: finished with status 'done'
  Stored in directory: /root/.cache/pip/wheels/fc/a8/66/24d655233c757e178d45dea2de22a04c6d92766abfb741129a
  Running setup.py bdist_wheel for MarkupSafe: started
  Running setup.py bdist_wheel for MarkupSafe: finished with status 'done'
  Stored in directory: /root/.cache/pip/wheels/88/a7/30/e39a54a87bcbe25308fa3ca64e8ddc75d9b3e5afa21ee32d57
Successfully built itsdangerous MarkupSafe
Installing collected packages: itsdangerous, MarkupSafe, Jinja2, Werkzeug, click, flask, redis
Successfully installed Jinja2-2.9.6 MarkupSafe-1.0 Werkzeug-0.12.2 click-6.7 flask-0.12.2 itsdangerous-0.24 redis-2.10.6
 ---> eaea090674a8
Removing intermediate container e57e56cb7346
Step 5 : CMD python app.py
 ---> Running in 42ffe6cc8f7e
 ---> 73dd27297d2e
Removing intermediate container 42ffe6cc8f7e
Successfully built 73dd27297d2e
WARNING: Image for service web was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Pulling redis (redis:latest)...
latest: Pulling from library/redis
d13d02fa248d: Pull complete
24013503e321: Pull complete
88348be2f617: Pull complete
5e238e0d9fc4: Pull complete
355f985a10c7: Pull complete
cfc3d4c9f8c6: Pull complete
Digest: sha256:c1a05a20c950bf95e8f178c51c9ee494ac43bc1ce9f9c83e436fd6a232dfc784
Status: Downloaded newer image for redis:latest
Creating composetest_redis_1
Creating composetest_web_1
```
5. `此时我们可以通过浏览器访问对应的 http://ip:5000 地址，如果在服务本地访问，则对应 http://localhost:5000 `
```
* 我的虚拟机访问：  浏览器上输入 http://192.168.174.130:5000/
* 也可以在虚拟机上访问该主页： 
  galen@galen-virtual:~/composetest$ curl http://localhost:5000
Hello World! I have been seen 17 times.
```
6.`可以看到每访问一次web服务地址，计数器对应加1。如果要更新应用，因为挂载了数据卷，只需修改app.py保存即可` 
```
galen@galen-virtual:~/composetest$ curl http://localhost:5000
Hello World! I have been seen 18 times.
galen@galen-virtual:~/composetest$ curl http://localhost:5000
Hello World! I have been seen 19 times.
galen@galen-virtual:~/composetest$ curl http://localhost:5000
Hello World! I have been seen 20 times.
```
7. `状态`
```
galen@galen-virtual:~/composetest$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
e1dd8421d9fe        composetest_web     "python app.py"          5 hours ago         Up 5 hours          0.0.0.0:5000->5000/tcp   composetest_web_1
edacc3fd1439        redis               "docker-entrypoint.sh"   5 hours ago         Up 5 hours          6379/tcp                 composetest_redis_1
```
```
galen@galen-virtual:~/composetest$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
composetest_web     latest              73dd27297d2e        5 hours ago         689 MB
redis               latest              73108651a776        6 hours ago         106.6 MB
python              2.7                 13fd98f01a7a        8 hours ago         681.4 MB
```

* `方法二`：`使用容器互联`
```
除了使用docker-compose来进行容器编排，如果情况不太复杂，我们也可以使用容器互联的手段实现项目需求。容器互联要求针对多个容器，分别按顺序启动并指明依赖关系，也就是利用好“–link”这个参数。
```
1. 同样，在composetest目录下，先`启动redis服务容器`：
```
docker run -d --name redis redis
```
2. `创建web服务镜像`：
```
docker build -t dockerfile_web .
通过查看镜像，可以看到生成的dockerfile_web镜像，在docker-compose.yml中定义的服务依赖的镜像也已经具备了，如composetest_web。由于dockerfile_web和composetest_web镜像都是由同一个Dockerfile模板文件生成的，本质上它们是一样的。
```
3. `启动web服务容器`，并`关联redis服务容器`：
```
docker run --name web -p 5000:5000 -v $(pwd):/code --link redis:webredis dockerfile_web
```
* 这样也能得到同样的效果，但是，对于复杂的容器编排情况，还是乖乖地使用docker-compose等利器吧。