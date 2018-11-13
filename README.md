# 使用jsonserver+axios模拟数据
## 安装(前提是安装有node环境)
  npm install --save json-server
## 提供json数据文件
  在项目根目录下，新建一个 JSON 文件db.json
## 配置json-server
  在build\webpack.dev.conf.js下配置，如果是用旧版本的手脚架工具初始化的项目，是在build/dev-server.js下配置。
  /*----------------jsonServer---------*/
  /*引入json-server*/
  const jsonServer = require('json-server')
  /*搭建一个server*/
  const apiServer = jsonServer.create()
  /*将db.json关联到server*/
  const apiRouter = jsonServer.router('db.json')
  const middlewares = jsonServer.defaults()
  apiServer.use(middlewares)
  apiServer.use(apiRouter)
  /*监听端口*/
  apiServer.listen(3000, () => {
    console.log('JSON Server is running')
  })
  /*----------------jsonServer---------*/
## 访问数据(修改配置文件一定要重新启动项目)
  配置完成后，要npm dev run 重启项目，然后再地址栏输入http://localhost:3000 就可以访问到数据
## 设置代理
  浏览器代理设置，在 config/index.js中
  /*代理配置表，在这里可以配置特定的请求代理到对应的API接口*/
  /* 下面的例子将代理请求 /api/getNewsList  到 http://localhost:3000/getNewsList*/
  proxyTable: {
    '/api': {
      changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
      target: 'http://localhost:3000',// 接口的域名
      pathRewrite: {
        '^/api': ''//后面可以使重写的新路径，一般不做更改
      }
    }
  }

## 数据操作(见js/index.js的请求拦截器配置)
当你发送POST，PUT，PATCH 或者 DELETE请求时，变化会自动安全的保存到你的db.json文件中
你的请求体body应该是封闭对象。比如{"name": "Foobar"}
id不是必须的，在PUT或者PATCH方法中，任何的id值将会被忽略
在POST请求中，id是可以被添加的，如果该值没有没占用，会使用该值，否则自动生成
POST，PUT或者PATCH请求应该包含一个Content-Type:application/json的header，来确保在请求body中使用json

特别注意一定要删除数据的put请求，不配置的话请求失败
//添加请求时拦截器
Axios.interceptors.request.use(function(config){
  if(config.method=="post"||config.method=="put"){
    config.data=qs.stringify(config.data);
    config.headers = Object.assign({}, config.headers, {'Content-Type': "application/json"});
    config.transformRequest = [function (data) {
      data = JSON.stringify(config.params)
      return data;
    }]
  }
  return config;
},function(error){
  return error.Promise.reject(error);
});


# git代码提交
  git init
  git add .
  git commit -m'first commit'
  git remote add origin https://github.com/woochon/jsonserver.git
  git push -u origin master
