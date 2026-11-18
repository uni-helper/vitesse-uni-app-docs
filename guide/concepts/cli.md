# 命令行与 unh

模板用 [@uni-helper/unh](https://uni-helper.js.org/unh/) 包装 `uni` 命令。`dev` 和 `build` 都先让插件把 `pages.json`、`manifest.json`、`uni-pages.d.ts` 写到磁盘，再执行 `uni`，所以冷启动时页面配置也已经存在。

## 命令

| 命令 | 实际执行 | 说明 |
| --- | --- | --- |
| `pnpm dev` | `unh dev` | 启动默认平台的开发服务器 |
| `pnpm dev <platform>` | `unh dev <platform>` | 启动指定平台 |
| `pnpm build` | `unh build` | 构建默认平台 |
| `pnpm build <platform>` | `unh build <platform>` | 构建指定平台 |
| `pnpm about` | `unh info` | 打印项目依赖与环境信息 |
| `pnpm typecheck` | `vue-tsc --noEmit` | 类型检查，见 [TypeScript](./typescript) |
| `pnpm lint` | `eslint .` | 检查代码 |
| `pnpm lint:fix` | `eslint . --fix` | 检查并自动修复 |
| `pnpm test` | `vitest` | 自动化测试，见 [测试](./testing) |

## 平台参数

不写平台时用 `unh.config.ts` 里的 `platform.default`，模板里是 `h5`。

```bash
pnpm dev              # h5
pnpm dev wx           # mp-weixin
pnpm build app        # app
pnpm build h5:ssr     # h5 的 SSR 构建
```

`unh.config.ts` 里配了两个别名：`w`、`h` 都指向 `h5`，`wx` 指向 `mp-weixin`。其余参数原样传给 `uni`，所以 `unh build mp-weixin --mode uat` 等于 `uni build -p mp-weixin --mode uat`。

平台全名可以用 `pnpm exec unh platform` 查看，常用值有 `h5`、`mp-weixin`、`mp-alipay`、`mp-toutiao`、`app`、`app-android`、`app-ios`、`app-harmony`。

## unh 做了什么

`uni` 在 Vite 配置阶段就读磁盘上的 `pages.json`。用 `vite-plugin-uni-pages` 时，冷启动那一刻磁盘上还没有这个文件，`uni` 读到的是占位内容，会关掉页面特性，产物里不带 `vue-router`，跳转在运行时报错。

`unh` 在 `dev` / `build` 之前先跑一次 Vite 的 `resolveConfig`，只触发插件初始化，让插件把真实配置写到磁盘，然后再执行 `uni` 命令。预生成只在项目里装了 `@uni-helper/vite-plugin-uni-pages` 或 `@uni-helper/vite-plugin-uni-manifest` 时执行，失败只打印警告，不阻断命令。

## 配置文件

```ts
// unh.config.ts
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  platform: {
    // 不指定平台时用它
    default: 'h5',
    // 平台别名
    alias: {
      'h5': ['w', 'h'],
      'mp-weixin': 'wx',
    },
  },
})
```

其余配置项：

- `hooks` — 在 `prepare`、`dev`、`build` 前后执行自定义逻辑。
- `env` — 按平台和模式加载环境变量，并生成类型声明。
- `devtools` — 自动打开小程序开发者工具，只支持 `mp-*` 平台，目前能自动打开的只有微信开发者工具。
- `deploy` — 小程序部署配置，字段与 [@uni-helper/deploy](https://github.com/uni-helper/deploy) 一致，见[部署](../../getting-started/deployment)。

完整说明见 [unh 文档](https://uni-helper.js.org/unh/)。

## 其它命令

```bash
pnpm exec unh prepare      # 只跑 hooks.prepare
pnpm exec unh deploy wx    # 上传微信小程序体验版
pnpm exec unh platform     # 列出内置平台
pnpm exec unh --version
```

::: warning
`unh` 只支持 ESM 项目。它启动时会检查最近一层 `package.json` 的 `type`，不是 `module` 就直接退出。模板已经设好，把项目改成 CommonJS 会让 `dev` 和 `build` 全部失败。
:::
