# TypeScript

模板全量使用 TypeScript。类型来源分两类：装好的类型包，和插件构建时生成的声明文件。

## 类型检查

出于性能考虑，开发和构建时不做类型检查。用 `vue-tsc` 单独检查：

```bash
pnpm typecheck
```

## tsconfig.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": [
      "vite/client",
      "@dcloudio/types",
      "@mini-types/alipay",
      "miniprogram-api-typings",
      "@uni-helper/uni-types",
      "@uni-helper/vite-plugin-uni-pages/client",
      "@uni-helper/vite-plugin-uni-middleware/client",
      "vitest-environment-uniapp/types"
    ],
    "sourceMap": true
  }
}
```

`types` 里每一项负责一部分类型：

| 类型包 | 提供什么 |
| --- | --- |
| `@dcloudio/types` | `uni` API、页面和应用的生命周期 |
| `@mini-types/alipay` | 支付宝小程序 API |
| `miniprogram-api-typings` | 微信小程序 API |
| `@uni-helper/uni-types` | `uni-app`、`uni-cloud`、`uni-ui` 组件的类型 |
| `@uni-helper/vite-plugin-uni-pages/client` | `definePage` 宏、`pages.json` 的字段类型 |
| `@uni-helper/vite-plugin-uni-middleware/client` | `virtual:uni-middleware` 等虚拟模块类型 |
| `vitest-environment-uniapp/types` | `program`、`Page`、`Element` |

`paths` 里的 `@/*` 指向 `src`，所以导入写成 `@/components/app-logos.vue`。

## 自动生成的声明文件

开发和构建时，插件会往 `src` 写声明文件。

### `src/uni-pages.d.ts`

由 `vite-plugin-uni-pages` 生成，给页面路径、`definePage` 和 `uni.navigateTo` 这类导航 API 提供类型。路径由 `vite.config.ts` 里的 `dts` 选项决定。

### `src/uni-layouts.d.ts`

由 `vite-plugin-uni-layouts` 生成，导出 `LayoutKey` 和 `virtual:uni-layouts` 的 `useUhUniLayoutRef` 类型。它同时登记了扫描到的布局名，`@uni-helper/uni-pages-types` 用这份登记表收窄 `definePage({ layout })` 的取值。

两个文件都可以提交进仓库，不需要手改。改布局名或加页面后，重启 dev server 或重新构建即可更新。

::: warning
`auto-imports.d.ts` 和 `components.d.ts` 已经不存在。模板不再使用 `unplugin-auto-import` 和 `vite-plugin-uni-components`，模块和组件都要显式导入。
:::

## `src/shims.d.ts`

```ts
export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}
```

这十几行把 `App` 和 `Page` 的生命周期挂到 Vue 的选项类型上，在选项式 API 里写 `this.onLoad()` 这类调用时才有提示。组合式 API 用的是 `@dcloudio/uni-app` 导出的函数，不依赖这段声明。

## `src/vue-shims.d.ts`

给 `*.vue` 文件补模块声明，让 `import Foo from './Foo.vue'` 有类型。
