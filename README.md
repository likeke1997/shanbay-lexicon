# 介绍

这是我用 Vue 编写的英语单词学习应用。因其中的单词数据爬取自扇贝网，故取名“擅背单词”以示敬意。该应用拥有背诵单词、收藏单词、检索单词、切换词书、储存进度、修改和存储用户信息等功能。需要注意的是，该应用使用 localStorage 保存背词进度和用户信息，所以进度会保存在本地而非服务器上。

技术栈：Vue + Vue-Router + Mint-UI + Python(爬虫)。

+[我是演示地址，点我。](http://likeke1997.com/productions/lexicon)

# 框架

```
Header 导航栏
Main 主页面
|-- Home 主页
  |-- Wordbook 单词书
    |-- Wordlist 单词列表  
  |-- Learn 背词
|-- Lexicon 词库
  |-- Wordbook 单词书
    |-- Wordlist 单词列表
|-- User 用户
  |-- Wordlist 单词列表
Tabbar 底部导航栏
```

# 命令

```bash
npm install # Project setup
npm run serve # Compiles and hot-reloads for development
npm run build # Compiles and minifies for production
```

注意，`build`项目前需要将`./node_modules/@vue/cli-serve/lib/options.js`中的`publicPath`从`/`修改为`./`；如再需要`serve`项目，则需要改回来。