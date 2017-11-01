## registry介绍 --- 镜像仓库 (2017.11.31)
* 术语 ： daemon : 守护程序
* docker search whalesay : 搜索镜像
* docker pull whalesay   : 拉取镜像
* docker push myname/whalesay : 推送到仓库

1. `国内的一些仓库`
```
* daocloud
* 时速云
* aliyun
* docker.hub (使用最多---但国内使用不够快)
```
2. `docker search whalesay` : `在docker.hub在查找whalesay镜像`
```
galen@galen-virtual:~$ docker search whalesay
NAME                            DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
docker/whalesay                 An image for use in the Docker demo tutorial    619                                     
mendlik/docker-whalesay         Docker whalesay image from training materi...   6                                       [OK]
sabs1117/whalesay               Whalesay with fortune phrases.                  1                                       
nikovirtala/whalesay            Tiny Go web service to print Moby Dock ASC...   1                                       [OK]
milanfort/whalesay              Modified docker/whalesay image that output...   1                                       
swinton/whalesay                whalesay, innit                                 1                                       
ojenge/whalesay                 from docker/whalesay                            1                                       
caibar/whalesay                 Builds automatizados.                           1                                       [OK]
jracionero/docker-whalesay      My smarter docker whalesay                      0                                       
claytonrogers/docker-whalesay   Whalesay automated build                        0                                       [OK]
forsingh/whalesay               whalesay                                        0                                       [OK]
firecyberice/whalesay           Docker **Cloud** automated build for **amd...   0                                       
puneethp/whalesay               Docker-Whalesay                                 0                                       
dhalljohnston/whalesay          whalesay                                        0                                       
asakilan/pg-whalesay            My whalesay                                     0                                       
whalebrew/whalesay                                                              0                                       
jetolabs/whalesay               whalesay with fortune cookie messages           0                                       
blaines/whalesay                                                                0                                       
tiagoferreira/whalesay          Whalesay image                                  0                                       
phyominhtun/whalesay            My whalesay image!                              0                                       
laveshin/whalesay               whalesay image                                  0                                       
liuzhishan/docker-whalesay      docker-whalesay                                 0                                       
ksvel/whalesay-demo             whalesay demo                                   0                                       
hongxi/whalesay-fortunes        Demo, the whalesay-fortunes                     0                                       
xiyan130227/docker-whalesay     My smarter docker whalesay.                     0                                       
galen@galen-virtual:~$ 
```
```
* 通过观察STARS 的数目来选择最优的镜像
```
3. `docker pull docker/whalesay` : `拉取该镜像出来`
4. `docker images` 查看是否存在 docker/whalesay该镜像
```

TAG ： 标签,表示版本信息
```
5. `运行镜像`
```
* docker run docker/whalesay cowsay docker很好玩
```
➜  ~ docker run docker/whalesay cowsay Docker很好玩
 _________________ 
< Docker很好玩 >
 ----------------- 
    \
     \
      \     
                    ##        .            
              ## ## ##       ==            
           ## ## ## ##      ===            
       /""""""""""""""""___/ ===        
  ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   
       \______ o          __/            
        \    \        __/             
          \____\______/   
➜  ~ 
```
* 其中cowsay为命令
```
6. `产生新的用户名(新的镜像)`
```
docker tag docker/whalesay  xibeifeng/whalesay  //通过tag标签产生新的用户名 xibeifeng/whalesay 来替代 docker/whalesay
```
7. `查看是否存在新的镜像`
```
➜  ~ docker tag docker/whalesay  xibeifeng/whalesay
➜  ~ docker images 
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
nginx-fun            latest              1063fd523ac3        2 weeks ago         108.3 MB
ubuntu               latest              747cb2d60bbe        3 weeks ago         122 MB
nginx                latest              1e5ab59102ce        3 weeks ago         108.3 MB
xibeifeng/whalesay   latest              6b362a9f73eb        2 years ago         247 MB
docker/whalesay      latest              6b362a9f73eb        2 years ago         247 MB
➜  ~ 
```
8. `共享镜像到docker.hub`
```
docker push xibeifeng/whalesay    //默认tag为lastest
```
* 若出现以下现象，表示还没登录
```
  ~ docker push xibeifeng/whalesay
The push refers to a repository [docker.io/xibeifeng/whalesay]
5f70bf18a086: Preparing 
d061ee1340ec: Preparing 
d511ed9e12e1: Preparing 
091abc5148e4: Preparing 
b26122d57afa: Preparing 
37ee47034d9b: Waiting 
528c8710fd95: Waiting 
1154ba695078: Waiting 
unauthorized: authentication required
```
* `登录`
```
docker login
```


