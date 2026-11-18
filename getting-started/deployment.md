# 部署

对 uni-app 来说，部署就是打包和发行。命令都由 `unh` 提供，平台名写在命令后面。

## Web

```bash
pnpm build        # 不写平台时构建 h5
pnpm build h5
```

产物在 `dist/build/h5`，当普通 SPA 部署即可。

## 小程序

以微信小程序为例：

```bash
pnpm build wx     # 等价于 pnpm build mp-weixin
```

产物在 `dist/build/mp-weixin`，用微信开发者工具导入这个目录再上传。

其他小程序换平台名即可，例如 `pnpm build mp-alipay`、`pnpm build mp-toutiao`，平台全名用 `pnpm exec unh platform` 查看。

### 自动上传

`unh` 带 `deploy` 命令，基于 [@uni-helper/deploy](https://github.com/uni-helper/deploy) 上传体验版、生成预览二维码或打开开发者工具。

先装对应平台的官方 CI 包，例如微信小程序：

```bash
pnpm i -D miniprogram-ci
```

再在 `unh.config.ts` 里写部署配置：

```ts
export default defineConfig({
  deploy: {
    'mp-weixin': {
      appid: 'wx1234567890',
      privateKeyPath: 'key/private.appid.key',
    },
  },
})
```

然后执行：

```bash
pnpm exec unh deploy                # 上传体验版，默认动作
pnpm exec unh deploy preview wx     # 生成预览二维码
pnpm exec unh deploy open wx        # 打开开发者工具
```

`deploy` 支持 `mp-weixin`、`mp-alipay`、`mp-toutiao`、`mp-baidu`、`mp-jd`、`mp-dingtalk`。`h5`、`mp-qq`、`mp-xhs` 没有部署能力，传进去会报错。完整字段见 [unh 文档](https://uni-helper.js.org/unh/)。

::: tip
也可以用其他 CI 工具自行上传，例如 [uni-mini-ci](https://www.npmjs.com/package/uni-mini-ci)。
:::

## App

### 离线打包

- [Android](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)
- [iOS](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html)

::: warning
HBuilderX 的云打包仍然可用，但这种方式强依赖 HBuilderX，所以不做推荐。
:::

## 兼容性

默认情况下不用调整兼容性配置，较新的浏览器、手机和小程序运行环境已经提供足够的支持。

需要照顾旧设备时，可以调构建目标。

### Vite

Vite 底层用 [esbuild](https://esbuild.github.io/)，设置 `build.target` 和 `build.cssTarget` 即可：

```ts
import Uni from '@uni-helper/plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // esbuild 最低支持 es6
    target: 'es6', // JavaScript 语法
    cssTarget: 'es6', // CSS 语法
  },
  plugins: [
    Uni()
  ],
})
```

esbuild 不会注入 [Polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)，部分 JavaScript API 在旧环境下仍然缺失。`@dcloudio/vite-plugin-uni` 的 `viteLegacyOptions` 只 [在 H5 生效](https://github.com/dcloudio/uni-app/issues/3842)，小程序端只能手动注入 `core-js`：

```ts
// 不要 import 'core-js/actual'，会占用大量小程序体积且没有必要
/** #endif */
import { createSSRApp } from 'vue'
import App from './App.vue'
// src/main.ts
/** #ifdef MP */
// 只有构建小程序时手动注入，按实际情况挑选
import 'core-js/actual/array/at'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
```

::: tip
具体的 Polyfill 清单可以用 [core-js-compat](https://github.com/zloirock/core-js/blob/master/packages/core-js-compat/README.md) 生成。
:::

CSS 可以用 [PostCSS](https://postcss.org/) 和 [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)：

```bash
pnpm install postcss postcss-preset-env -D
```

```ts
// vite.config.ts
import Uni from '@uni-helper/plugin-uni'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          // 微信小程序 2.11.2 起支持 Vue3，对应 chrome53 和 ios10
          browsers: ['chrome>=53', 'ios>=10'],
        }),
      ],
    },
  },
  plugins: [
    Uni()
  ],
})
```

::: warning
PostCSS 配置要写在 Vite 配置里，不要单独写 `postcss.config`，原因见 [dcloudio/uni-app#3367](https://github.com/dcloudio/uni-app/issues/3367)。
:::

### VueUse 兼容

`vite-plugin-uni-polyfill` 已经装好，它补上 `TransitionGroup` API，避免 VueUse 在小程序端编译报错。去掉这个插件后，部分 VueUse 组合式函数会在小程序构建时失败。
