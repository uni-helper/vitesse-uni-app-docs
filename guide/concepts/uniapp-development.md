# uni-app 开发

本模板的核心是 uni-app 和 Vue。得益于 Uni Helper 在其基础上构建的开源生态，我们为其添加了基于文件的路由、布局系统、路由中间件和平台分流。

::: warning
如果你是 uni-app 新手，建议先在 [uniapp.dcloud.net.cn](https://uniapp.dcloud.net.cn/tutorial/) 上读文档并看示例。
:::

## 模板补充了什么

| 能力 | 来自 | 说明 |
| --- | --- | --- |
| 命令行 | `@uni-helper/unh` | 先预生成页面配置，再调用 `uni`，见[命令行与 unh](./cli) |
| 基于文件的路由 | `vite-plugin-uni-pages` | `src/pages` 下的文件即路由，见[视图](../../getting-started/views) |
| 布局 | `vite-plugin-uni-layouts` | 页面套 `src/layouts` 里的布局 |
| 路由中间件 | `vite-plugin-uni-middleware` | 跳转前执行，见[路由中间件](./middleware) |
| 平台分流 | `vite-plugin-uni-platform` 等 | 按文件名、属性修饰符或样式前缀区分平台，见[按平台开发](./platform) |
| 原子化 CSS | `unocss` + `@uni-helper/unocss-preset-uni` | 见[样式](../../getting-started/styling) |

这些能力都在 `vite.config.ts` 里注册，去掉对应插件即可退回原生 uni-app 的用法。

## 页面生命周期

组合式 API 从 `@dcloudio/uni-app` 导入：

```ts
import { onLoad, onReady, onShow } from '@dcloudio/uni-app'

onLoad((query) => {
  console.log('页面参数', query)
})

onShow(() => {
  console.log('页面显示')
})
```

应用级的生命周期写在 `src/App.vue`，例如 `onLaunch`。`App.vue` 不是页面，不要写 `<template>`。

## 条件编译

uni-app 用注释做条件编译：

```ts
// #ifdef MP-WEIXIN
console.log('只有微信小程序会执行')
// #endif
```

按平台拆文件时，优先用[平台文件](./platform)或平台修饰符，条件编译留给少量语句。两套写法混在一处会让代码难以阅读。

## 不用 HBuilderX

模板用 VS Code 和命令行开发，`pnpm dev` 直接起 Vite 开发服务器。HBuilderX 只在需要它的场景下使用，例如 App 的云打包。
