var path = require('path'),
	config;
//config为一个对象
config = {
	production: {
		//url mail 这些不重点，重要的是数据库(database)，特别是connect
		url: 'http://mytestblog.com',
		mail: {},
		database: {
			client: 'mysql',
			connection: {
				host: 'db',
				user: 'ghost',
				password: 'ghost',
				database: 'ghost',
				port: '3306',
				charset: 'utf8'
			},
			debug: false
		},
		paths: {
			contentPath: path.join(process.env.GHOST_CONTENT, '/')
		},
		server: {
			//ghost的服务参数  '0.0.0.0':表示监听所有的IP
			//网络中0.0.0.0的IP地址表示整个网络，即网络中的所有主机。它的作用是帮助路由器发送路由表中无法查询的包
			host: '0.0.0.0',
			port: '2368'
		}
	}
};

module.exports = config
