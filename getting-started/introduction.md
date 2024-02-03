# 介绍

vitess-uni-app 是一个基于 `Vue` 和 `uni-app` 的开源模板，采用直观且可扩展的方式创建类型安全、高性能和生产级的跨端应用。你可以直接开始编写 `.vue` 文件，而无需从头开始配置。

vitesse-uni-app 灵感源于 [vitesse](https://github.com/antfu/vitesse)。

## 为什么

`uni-app` 背后的公司 DCloudio 选择创建自己的生态，比如 HBuilderX、uni_modules 等。这部分工作对部分开发者来说意义非凡，他们可以轻松上手并享受社区提供的一切资源。

但是，`uni-app` 社区生态远不如 npm 生态繁荣，我们常常需要求助于 npm 生态来实现部分需求，而 `uni-app` 的黑盒性阻碍了这一点。

vitesse-uni-app 充分拥抱开放生态，比如 VS Code 和 npm，希望能带给你更好的体验。

## 主要依赖

vitess-uni-app 由不同的开源包组成：

- 核心：[@uni-helper](https://uni-helper.js.org/)
- 引擎：[uni-app](https://github.com/dcloudio/uni-app)
- 打包器：[Vite](http://vite.dev/)
- CSS 样式：[UnoCSS](https://unocss.dev/)
- 代码质量：[ESLint](https://github.com/uni-helper/eslint-config) 和 [TypeScript](https://www.typescriptlang.org/)
