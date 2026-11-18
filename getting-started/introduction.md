# 介绍

vitesse-uni-app 是一个基于 `Vue` 和 `uni-app` 的开源模板，用直观且可扩展的方式创建类型安全、高性能的跨端应用。克隆下来就能写 `.vue` 文件，不必从头配置。

模板灵感来自 [vitesse](https://github.com/antfu/vitesse)。

## 为什么

`uni-app` 背后的公司 DCloud 选择创建自己的生态，比如 HBuilderX、uni_modules。这部分工作对部分开发者很有价值，他们可以轻松上手并享受社区提供的一切资源。

但 `uni-app` 社区生态远不如 npm 生态繁荣，我们常常要求助 npm 生态实现需求，而 `uni-app` 的黑盒性阻碍了这一点。

vitesse-uni-app 拥抱开放生态，比如 VS Code 和 npm，希望带给你更好的体验。

## 主要依赖

vitesse-uni-app 由不同的开源包组成：

- 核心工具集：[Uni Helper](https://uni-helper.js.org/)，包括命令行、页面、布局、中间件、平台分流插件和 ESLint 配置
- 引擎：[uni-app](https://github.com/dcloudio/uni-app)
- 打包器：[Vite](https://vite.dev/)
- CSS 样式：[UnoCSS](https://unocss.dev/)
- 代码质量：[ESLint](https://github.com/uni-helper/eslint-config) 和 [TypeScript](https://www.typescriptlang.org/)

## 下一步

- [起步](./installation) — 创建项目并启动开发服务器
- [命令行与 unh](../guide/concepts/cli) — `dev`、`build` 和平台参数
- [目录结构](../guide/directory-structure) — 每个文件的作用
