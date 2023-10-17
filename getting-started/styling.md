# 样式

我们使用 unocss 来作为 css 框架，当然，你可以使用任何 css 预处理器就像在 Vite 项目中一样。

## UnoCSS

默认情况下，我们使用了由 uni-helper 核心成员创建的 [`unocss-uni`](https://github.com/uni-helper/unocss-uni)。它在底层使用 [`unocss-applet`](https://github.com/unocss-applet/unocss-applet) 来获得兼容性，并提供了按平台编写样式的能力。

```html
<view class='uni-h5:mx-auto'></view>
<view class='uni-app:mx-auto'></view>
<view class='uni-mp:mx-auto'></view>
<view class='uni-weixin:mx-auto'></view>
<view class='uni-mp-alipay:mx-auto'></view>
```

::: tip
你可以参考 UnoCSS [文档](https://unocss.dev/)，了解更多有关 UnoCSS 的使用方法。
:::

## 预处理器

:::code-group

```bash [Sass & Scss]
pnpm install sass
```

```bash [Less]
pnpm install less
```

```bash [Stylus]
pnpm install stylus
```

:::

## SFC 样式

你可以参考 Vue [文档](https://vuejs.org/api/sfc-css-features.html)，了解有关 SFC 样式的使用方法。

## 第三方 UI 库

查看 Awesome Uni-App 整理的 [UI 组件库](https://github.com/uni-helper/awesome-uni-app?tab=readme-ov-file#ui-%E7%BB%84%E4%BB%B6%E5%BA%93)，选一个你心动的即可~
