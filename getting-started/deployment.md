# 部署

对于 uni-app 来说，部署即打包和发行。

## Web

使用下面的命令来打包：

```bash
pnpm build:h5
```

产物位于 `dist/build/h5`, 就像传统 SPA 一样部署即可。

## 小程序

以微信小程序为例，使用下面的命令来打包：

```bash
pnpm build:mp-weixin
```

产物位于 `dist/build/mp-weixin`, 使用微信开发者工具上传即可。

::: tip
如果想自动上传到微信小程序，可直接使用 [uni-mini-ci](https://www.npmjs.com/package/uni-mini-ci)，或参考 [这篇文章](https://juejin.cn/post/7272316909051346959) 自行配置。
:::

要发行其他小程序，执行 `pnpm build:mp-<platform>`打包，并使用对应开发者工具上传即可，具体可查看 `package.json` 的 `scripts` 部分。

## APP

### 离线打包

- [android](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)
- [ios](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html)

::: warning
你仍然可以使用 HBuilderX 提供的“安心”打包功能，但是由于这种方式强依赖 HBuilderX，故不做推荐。
:::

## 兼容性

默认情况下，你不需要调整兼容性相关的构建配置，这是因为较新的浏览器、手机、小程序运行环境提供了较好的兼容性支持。

但理想很丰满，现实很骨感，总有用户不想换掉自己的旧设备、旧浏览器，而你恰好又需要关怀这些用户。这时候，你就需要调整兼容性相关的构建配置了。

### VueCLI

对于部分正在使用 VueCLI 的历史项目，请参考 [文档](https://cli.vuejs.org/zh/config/#transpiledependencies) 设置 `transpileDependencies`，VueCLI 会自动增加 JavaScript 和 CSS 的支持。

### Vite

Vite 底层使用了 [esbuild](https://esbuild.github.io/)，你可以设置 `build.target` 和 `build.cssTarget` 来做兼容。

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  build: {
    // esbuild 最低支持 es6
    target: 'es6', // JavaScript 语法支持
    cssTarget: 'es6' // CSS 语法支持
  },
  plugins: [uni()]
})

```

但 esbuild 没有覆盖到所有需要兼容的情况。对于 JavaScript，esbuild 没有注入 [Polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)，这也意味着部分 JavaScript API 不可用。遗憾的是，你无法直接使用 `@vitejs/plugin-legacy` 或 `@vitejs/plugin-legacy-swc`，甚至设置 `@dcloudio/vite-plugin-uni` 中的 `viteLegacyOptions` 也 [只会在 H5 中 生效](https://github.com/dcloudio/uni-app/issues/3842)，此时只可以使用 `core-js` 来手动注入。

::: code-group

```ts [src/main.ts]
/** #ifdef MP */
// 只有构建小程序时手动注入 Polyfills
// 可以按实际情况调整
import 'core-js/actual/array/at'
// ❌ 不要像下面这样做，会占用大量小程序体积且没有必要
// import 'core-js/actual'
/** #endif */
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App).use(pinia);
  return {
    app,
  }
}
```

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { isH5 } from '@uni-helper/uni-env'
import legacy from 'vite-plugin-legacy'
// 或者使用 vite-plugin-legacy-swc
// import legacy from 'vite-plugin-legacy-swc'

export default defineConfig({
  build: {
    // 最低支持 es6
    target: 'es6', // JavaScript 语法支持
    cssTarget: 'es6' // CSS 语法支持
  },
  plugins: [
    uni(),
    // 只有构建 H5 时应用插件自动注入 Polyfills
    // 可以按实际情况调整
    isH5 ? legacy() : null
  ]
})

```

:::

::: tip
你可以使用 [core-js-compat](https://github.com/zloirock/core-js/blob/master/packages/core-js-compat/README.md) 来确定具体的 Polyfills。
:::

对于 CSS，可以使用 [PostCSS](https://postcss.org/) 和 [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)。

```bash
pnpm install postcss postcss-preset-env -D
```

::: code-group

```ts [postcss.config.ts]
import postcssPresetEnv from 'postcss-preset-env';

const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    postcssPresetEnv({
      // 自定义相应目标
      // 微信小程序 2.11.2 开始支持 Vue3，对应 chrome53 和 ios10
      browsers: ['chrome>=53', 'ios>=10']
    })
  )
}

export default {
  plugins
}
```

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import postcssConfig from './postcss.config'

export default defineConfig({
  build: {
    cssTarget: 'chrome61'
  },
  css: {
    postcss: postcssConfig
  },
  plugins: [uni()]
})

```

:::

::: warning
你可以在 [dcloudio/uni-app#3367](https://github.com/dcloudio/uni-app/issues/3367) 了解为什么要在 Vite 配置文件内设置 PostCSS。
:::

### 构建小程序

对于小程序，你可以直接设置小程序最低基础库要求，以排除部分过于老旧的设备。
