## dockerfile (2017.10.16)

*通过编写简单的文件自创docker镜像*

```
* mkdir d1
* cd d1/
* vim Dockerfile
FROM alpine:latest
MAINTAINER xbf
CMD echo 'hello docker'
:wq!

* /d1$ docker build -t hell_docker . 
 // -t : 给其一个标签,标签就是 hello_docker  . : 表示一个路径名 把该路径的所有东西送给docker,来产生
   docker image

result:

galen@galen-virtual:~/d1$ docker build -t hell_docker .
Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM alpine:latest
latest: Pulling from library/alpine
88286f41530e: Pull complete 
Digest: sha256:f006ecbb824d87947d0b51ab8488634bf69fe4094959d935c0c103f4820a417d
Status: Downloaded newer image for alpine:latest
 ---> 76da55c8019d
Step 2/3 : MAINTAINER galen
 ---> Running in 6d798a7bc95f
 ---> 3f2472b2ed90
Removing intermediate container 6d798a7bc95f
Step 3/3 : CMD echo "hello docker!"
 ---> Running in 884ebb44d67d
 ---> 4e5120aec0c4
Removing intermediate container 884ebb44d67d
Successfully built 4e5120aec0c4
Successfully tagged hell_docker:latest

* 运行该容器
galen@galen-virtual:~/d1$ docker run hell_docker
hello docker!

```
