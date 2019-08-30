## 简介

采用Hexo框架，使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，生成静态网页，给自己的学习和生活做个记录。



## 配置

### 更换主题

hexo自己默认的主题landscape，个人推荐主题yilia
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

修改配置文件
修改Blog/_config.yml文件：
theme: yilia    //默认为landscape

### 部署到github

部署之前先修改Blog/_config.yml文件。

deploy:
​    type: git
​    repository: https://github.com/bobit/bobit.github.io  //bobit替换为你自己的用户名
​    branch: master

然后使用以下命令进行部署。

```
hexo clean
hexo generate 或者 hexo g
hexo deploy
```

备注：如果执行上述命令报错，你可以试试下面这个命令再试。
$ npm install hexo-deployer-git --save

## 运行

本地启动 $ hexo server 或者hexo s
本地启动服务，在浏览器中输入http://localhost:4000/查看生成的页面效果。
恭喜你，到此你成功了！

## 自动化部署

travis-ci生成静态文件，并将public目录下的文件全部 push 到所指定仓库的 master 分支。

[https://docs.travis-ci.com/](https://docs.travis-ci.com/)



## 参考

[https://hexo.io/zh-cn/docs/](https://hexo.io/zh-cn/docs/)