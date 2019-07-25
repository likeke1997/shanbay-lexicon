# 介绍

见[我的博客](http://www.likeke1997.com)。

# 说明

```
$ npm install # 安装项目所依赖的包
$ npm run serve # 调试项目
$ npm run build # 构建项目
```

注意，构建项目前，需要对`.\node_modules\@vue\cli-service\lib\options.js`进行更改：
```js
// 将
publicPath: '/',
// 修改为
publicPath: './',
```