---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vitesse"
  text: "由 Vite & uni-app 驱动的跨端快速启动模板"
  tagline: "背靠 Uni Helper 团队，告别 HBuilderX，拥抱现代前端开发"
  image:
    src: /logo.svg
    alt: Uni Helper
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started/installation
    - theme: alt
      text: 查看演示
      link: https://vitesse-uni-app.netlify.app/

features:
  - title: 就是快
    details: Vite 驱动，pnpm 管理依赖，全程 ESM
    icon: ⚡️
    link: "https://vite.dev"
    linkText: "查看 Vite"
  - title: 基于文件的路由
    details: 无需维护 pages.json，页面配置写在 definePage 里
    icon: 🗂
    link: "https://github.com/uni-helper/vite-plugin-uni-pages"
    linkText: "查看 uni-pages 插件"
  - title: 布局系统
    details: 类 Nuxt 的布局，页面用 definePage 切换
    icon: 📑
    link: "https://github.com/uni-helper/vite-plugin-uni-layouts"
    linkText: "查看 uni-layouts 插件"
  - title: 路由中间件
    details: 跳转前做登录校验、权限判断和埋点
    icon: 🛡
    link: "https://github.com/uni-helper/vite-plugin-uni-middleware"
    linkText: "查看 uni-middleware 插件"
  - title: 按平台开发
    details: 平台文件、属性修饰符、样式前缀三种分流方式
    icon: 🧩
    link: "https://github.com/uni-helper/vite-plugin-uni-platform"
    linkText: "查看 uni-platform 插件"
  - title: 原子化 CSS
    details: UnoCSS 加 uni-app 平台变体，按需生成
    icon: 🎨
    link: "https://github.com/uni-helper/unocss-preset-uni"
    linkText: "查看 unocss-preset-uni"
  - title: 100000+ 图标
    details: 各种图标集按需使用
    icon: 😃
    link: "https://icones.js.org/"
    linkText: "查看 Icones"
  - title: 类型安全
    details: TypeScript 加 uni-app 组件类型，vue-tsc 检查
    icon: 🦾
    link: "https://github.com/uni-helper/uni-typed"
    linkText: "查看 uni-types"
  - title: 代码质量与测试
    details: ESLint 规则适配 uni-app，Vitest 跑小程序自动化测试
    icon: ✅
    link: "https://github.com/uni-helper/eslint-config"
    linkText: "查看 @uni-helper/eslint-config"
---
