<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

# iview-pc

[![vue](https://img.shields.io/badge/vue-2.5.21-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.2.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)

[在线访问](https://admin.iviewui.com/)

`注：在线版本会在开发版本新小版本发布后更新到相应版本，所以如果想体验最新版本iview-admin，请clone完整项目代码到本地运行。`

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 简介
&emsp;&emsp;iview-pc是基于Vue.js，参考iView admin抽取的一套pc管理demo。

## 功能

- 登录/登出
- 组件
    - 文件上传
    - 只针对label的筛选下拉框
- 固定功能
    - 用户管理
    - 角色管理
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 收缩侧边栏
- tag标签导航

## 文件结构
```shell
.
├── mock  模拟数据
├── plugins  webpack扩展插件
├── public  打包所需静态资源
└── src
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  通用公共组件
        ├── demo  自定义模块使用展示
        ├── error  错误页面
        ├── input  表单扩展
        ├── main  公共页面
        └── upload  文件上传
    ├── directive  自定义指令
    ├── libs  封装工具函数
        ├── rsa  加解密
        ├── axios  http封装
        ├── enums  枚举值
        ├── filters  过滤器
        ├── mixins  全局混合
        ├── service  公共api
        ├── tools  工具函数
        ├── utils  功能方法
        └── validate  验证方法
    ├── router  路由配置
    ├── store  Vuex配置
    └── view  页面文件
        ├── login  登录页面
        └── system  系统模块
```

## Links

- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

## 效果展示

- 响应式布局首页
![image](https://raw.githubusercontent.com/PawelLin/images/master/iview-pc/index.png)
