# 部署

对于 uni-app 来说，部署即打包和发行。

## Web

使用下面的命令来打包：

```bash
pnpm build:h5
```

产物位于 `dist/build/h5`, 就像传统 SPA 一样部署即可。

## 小程序

使用下面的命令来打包：

```bash
# 微信小程序
pnpm build:mp-weixin
```

产物位于 `dist/build/mp-weixin`, 使用微信开发者工具上传即可。

::: tip
如若想自动上传到微信小程序，可查看[这里](https://juejin.cn/post/7272316909051346959)
:::

::: tip
要发行其他小程序，执行 `pnpm build:mp-<platform>`打包，并使用对应开发者工具上传即可，具体可查看 package.json 的 scripts 部分。
:::

## App

### 离线打包

<https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html>

<https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html>

### 安心打包

TODO
