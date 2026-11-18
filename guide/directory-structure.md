# 目录结构

```text
vitesse-uni-app
├── .github/
│   ├── images/
│   └── workflows/ci.yml
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── src/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── platform/
│   ├── static/
│   ├── App.vue
│   ├── main.ts
│   ├── shims.d.ts
│   ├── theme.json
│   ├── uni-pages.d.ts
│   ├── uni-layouts.d.ts
│   ├── uni.scss
│   └── vue-shims.d.ts
├── tests/
│   └── index.test.ts
├── .editorconfig
├── .gitignore
├── .node-version
├── eslint.config.js
├── index.html
├── LICENSE
├── manifest.config.ts
├── pages.config.ts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
├── unh.config.ts
├── uno.config.ts
├── vite.config.ts
└── vitest.config.ts
```

运行时还会出现 `src/pages.json`、`src/manifest.json`、`dist/` 和 `node_modules/`，见下文。

## `src` 目录

| 路径 | 作用 |
| --- | --- |
| `src/pages/` | 页面。目录下的每个 `.vue` 文件就是一个路由，页面配置写在 `definePage` 里。见[视图](../getting-started/views)。 |
| `src/layouts/` | 页面布局。`default.vue` 是默认布局，布局可以用 `defineExpose` 把方法暴露给页面。 |
| `src/components/` | 通用组件。导入后才能使用，没有自动注册。 |
| `src/composables/` | 组合式函数，例如 `use-count.ts`。按需导入。 |
| `src/middleware/` | 路由中间件。文件名按 camelCase 推导出中间件名。见[路由中间件](../guide/concepts/middleware)。 |
| `src/platform/` | 按平台分文件的代码示例。`greeting.ts` 是基础实现，`greeting.h5.ts` 等只在对应平台生效。见[按平台开发](../guide/concepts/platform)。 |
| `src/static/` | 静态资源，构建时原样拷贝到产物，引用路径写 `/static/logo.svg`。 |

`src` 根目录下的文件：

| 文件 | 作用 |
| --- | --- |
| `App.vue` | 应用入口，只能写 `<script>`，应用级生命周期用 `onLaunch` 等函数。 |
| `main.ts` | 创建 Vue 应用，注册路由中间件守卫，导入 `uno.css`。见[路由中间件](../guide/concepts/middleware)。 |
| `theme.json` | `darkmode` 主题变量，`h5` 和 `mp-weixin` 通过 `themeLocation` 指向它。`pages.json` 里的 `@bgColor` 这类值从这里取。 |
| `uni.scss` | uni-app 内置的 SCSS 变量，供三方组件和 SCSS 文件使用。 |
| `shims.d.ts` | 把 `App` / `Page` 的生命周期挂到 Vue 选项类型上。见[TypeScript](../guide/concepts/typescript)。 |
| `vue-shims.d.ts` | `*.vue` 文件的模块声明。 |
| `uni-pages.d.ts` | 由 `vite-plugin-uni-pages` 生成，页面路径和 `definePage` 的类型。 |
| `uni-layouts.d.ts` | 由 `vite-plugin-uni-layouts` 生成，布局名和 `useUhUniLayoutRef` 的类型。 |

两个 `.d.ts` 可以提交进仓库，不要手改。

## 生成的文件

| 路径 | 生成者 | 是否提交 |
| --- | --- | --- |
| `src/pages.json` | `vite-plugin-uni-pages`，由 `pages.config.ts` 和页面的 `definePage` 合并 | 不提交，已在 `.gitignore` 中 |
| `src/manifest.json` | `vite-plugin-uni-manifest`，由 `manifest.config.ts` 生成 | 不提交，已在 `.gitignore` 中 |
| `src/uni-pages.d.ts` | `vite-plugin-uni-pages` | 可以提交 |
| `src/uni-layouts.d.ts` | `vite-plugin-uni-layouts` | 可以提交 |
| `dist/` | `unh build` 的产物，按平台分目录，例如 `dist/build/h5` | 不提交 |

`pages.json` 由插件生成后仍可读：多平台配置会带上 `// #ifdef` 条件编译注释，例如微信小程序单独的导航栏颜色。

## 根目录配置

| 文件 | 作用 |
| --- | --- |
| `vite.config.ts` | 注册全部 Vite 插件，顺序有讲究，注释里写明了原因。 |
| `pages.config.ts` | `pages.json` 里与具体页面无关的部分：`globalStyle`、`tabBar`、全局 `middleware`。 |
| `manifest.config.ts` | 用 TypeScript 写 `manifest.json`，包括平台配置和 Android 权限。 |
| `uno.config.ts` | UnoCSS 预设：`presetUni()`、图标、指令转换。见[样式](../getting-started/styling)。 |
| `unh.config.ts` | `unh` 的配置：默认平台和平台别名。见[命令行与 unh](../guide/concepts/cli)。 |
| `vitest.config.ts` | 测试环境和平台配置。见[测试](../guide/concepts/testing)。 |
| `tsconfig.json` | 类型检查配置，`@/*` 指向 `src`。 |
| `eslint.config.js` | 用 `@uni-helper/eslint-config`，附带 UnoCSS 规则，并忽略两个生成的声明文件。 |
| `index.html` | H5 的 HTML 模板，包含视口处理。 |
| `pnpm-workspace.yaml` | 不是 monorepo 配置，这里只放 pnpm 自身的设置：信任依赖的白名单、允许执行构建脚本的包。 |
| `pnpm-lock.yaml` | 依赖锁定文件，不要手改。 |
| `.node-version` | Node.js 版本，当前是 26。 |
| `.editorconfig` | 缩进、换行、编码等编辑器约定。 |
| `.gitignore` | 忽略 `node_modules`、`dist`、生成的 `pages.json` 和 `manifest.json`。 |

`.vscode` 里是推荐插件、保存时用 ESLint 修复、H5 调试配置和 `uni:h5` 任务。`.github/workflows/ci.yml` 在 Node.js 22、24、26 上跑 `lint`、`typecheck`，再分别构建 H5、微信小程序和 App。
