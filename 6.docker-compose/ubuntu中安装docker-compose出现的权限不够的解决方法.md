## ubuntu中安装docker-compose出现的权限不够的解决方法 (2017.11.2)
* [解决方法链接](http://blog.csdn.net/kindroid/article/details/52094484)

```
根据github.com/docker/compose/releases中安装compose的说明，在ubuntu上执行以下安装命令：
 curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
命令执行返回的结果是：-bash: /usr/local/bin/docker-compose: Permission denied，这说明是执行上述命令的权限不够，然后使用sudo重新执行：
sudo  curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
但是命令执行的结果仍然是Permission denied。从网上查找资料，有人也遇到过该问题，经验是切换到超级用户下执行安装命令。
首先执行sudo -i，提示输入用户密码，输入密码后进入超级用户（root）模式，重新执行上述命令，一切正常
```