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




