# 样式

模板基于 `UnoCSS` 提供主要样式支持。当然，你可以使用 CSS 预处理器、组件库等。

## UnoCSS

[UnoCSS](https://unocss.dev/) 是按需使用的原子 CSS 引擎，提供了良好的样式支持。

模板内置了 [@uni-helper/unocss-preset-uni](https://github.com/uni-helper/unocss-preset-uni)，它在底层使用 [unocss-applet](https://github.com/unocss-applet/unocss-applet) 来兼容不同平台，并提供了按平台编写样式的能力。

```ts
// uno.config.ts
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
})
```

`transformerDirectives` 让 `<style>` 里可以用 `@apply` 和 `--at-apply`，模板的 `src/components/hi-counter.vue` 就是这么写按钮样式的。`transformerVariantGroup` 让 `hover:(bg-teal-600 text-white)` 这类分组写法生效。

按平台写类名时，加 `uni-<platform>:` 前缀：

```html
<!-- 只在 H5 编译时生成 mx-auto 类 -->
<view class='uni-h5:mx-auto'></view>
<!-- 只在 APP 编译时生成 mx-auto 类 -->
<view class='uni-app:mx-auto'></view>
<!-- 只在小程序编译时生成 mx-auto 类 -->
<view class='uni-mp:mx-auto'></view>
<!-- 只在微信小程序编译时生成 mx-auto 类 -->
<view class='uni-weixin:mx-auto'></view>
<!-- 只在支付宝小程序编译时生成 mx-auto 类 -->
<view class='uni-mp-alipay:mx-auto'></view>
```

平台前缀不能省。编辑器里的 UnoCSS 插件不经过 uni-app 构建，拿不到当前平台，会剥掉所有平台前缀，让补全和悬浮提示正常工作。这三种写法的取舍见[按平台开发](../guide/concepts/platform)。

## 图标

`presetIcons` 让图标变成普通 class，模板用的是 Carbon 图标集：

```html
<view class="i-carbon-campsite" />
<view class="i-carbon:logo-github" />
```

`@iconify-json/carbon` 已经装好。换图标集时装上对应的 `@iconify-json/*` 包，用法见 [Icones](https://icones.js.org/)。

## CSS 预处理器

你可以参考 [Vite 文档 CSS 预处理器](https://cn.vitejs.dev/guide/features.html#css-pre-processors)，了解相关使用方法。

## 单文件组件样式

你可以参考 [Vue 文档单文件组件 CSS 功能](https://cn.vuejs.org/api/sfc-css-features.html)，了解相关使用方法。

## 组件库

查看 [awesome-uni-app](https://github.com/uni-helper/awesome-uni-app#ui-%E7%BB%84%E4%BB%B6%E5%BA%93) 整理的组件库，选一个合适的即可。
