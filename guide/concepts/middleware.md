# 路由中间件

[`@uni-helper/vite-plugin-uni-middleware`](https://github.com/uni-helper/vite-plugin-uni-middleware) 在跳转发生前执行中间件。可以挂在所有页面，也可以只挂在某一页，用来做登录校验、权限判断和埋点。

## 写一个中间件

中间件放在 `src/middleware`，用 `defineMiddleware` 拿到类型提示。

```ts
// src/middleware/track.ts
import { defineMiddleware } from '@uni-helper/vite-plugin-uni-middleware/runtime'

export default defineMiddleware((to) => {
  console.log('即将进入', to.route)
})
```

`to` 和 `from` 描述页面地址，不是页面实例：

| 字段 | 内容 |
| --- | --- |
| `route` | 页面路径，不带前导斜杠，如 `pages/index` |
| `url` | 完整地址，带前导斜杠和查询串，如 `/pages/hi?name=uni` |

## 挂中间件

全局中间件写在 `pages.config.ts`，每个页面都会执行：

```ts
// pages.config.ts
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  middleware: ['track'],
})
```

页面级中间件写在页面的 `definePage` 里：

```vue
<!-- src/pages/hi.vue -->
<script setup lang="ts">
definePage({
  middleware: ['hiGuard'],
})
</script>
```

执行顺序是全局在前、页面在后。遇到第一个不放行的结果就停下，后面的中间件不再执行。

## 注册守卫

中间件表由插件在构建时生成，从虚拟模块 `virtual:uni-middleware` 导入，在 `main.ts` 里交给 `createNavigationGuardPlugin`：

```ts
// src/main.ts
import { createNavigationGuardPlugin } from '@uni-helper/vite-plugin-uni-middleware/runtime'
import { middlewares } from 'virtual:uni-middleware'
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createNavigationGuardPlugin(middlewares))
  return { app }
}
```

中间件表必须由调用方传进来。让运行时自己导入虚拟模块会和中间件文件形成循环依赖，小程序构建会报 `Circular chunk`。

## 中间件名

中间件名不是简单去掉扩展名，而是按文件路径推导出的 camelCase 名字。

| 文件 | 中间件名 |
| --- | --- |
| `auth.ts` | `auth` |
| `hi-guard.ts` | `hiGuard` |
| `vip/index.ts` | `vip` |
| `user/profile.ts` | `userProfile` |

写错名字时构建失败，终端会列出已扫描到的名字。

## 返回值

| 返回值 | 行为 |
| --- | --- |
| `undefined` / `true` | 放行 |
| `false` | 取消本次跳转；页面已显示时回退一页 |
| `string` | 当作地址，用 `uni.redirectTo` 跳过去 |
| `{ url, method?, options? }` | 指定跳转方式，`method` 默认 `redirectTo` |

中间件可以返回 Promise，守卫会等它结束再决定：

```ts
export default defineMiddleware(async (to) => {
  if (!(await checkToken())) {
    return { url: '/pages/login', method: 'reLaunch' }
  }
})
```

中间件抛出的异常会打印到控制台，然后继续执行下一个，不会把用户卡在页面上。

## 两条执行路径

守卫有两个入口，覆盖 uni-app 里所有进入页面的方式。

1. `uni.navigateTo`、`uni.redirectTo`、`uni.reLaunch`、`uni.switchTab` 调用时先执行中间件。被拦下的跳转不会发生，页面不会渲染。
2. 页面 `onShow` 兜底。点击 TabBar、小程序冷启动、H5 直接改地址栏这三类入口不经过上面的 API，页面显示后再执行一次中间件，需要改道时再跳走。

兜底这条路上页面已经渲染出来，会看到一次短暂的闪现。要求完全不闪现时，把受保护页面放在普通页面里，不要放进 TabBar。两条路径不会重复执行同一组中间件。

## 模板里的例子

- `src/middleware/track.ts` 是全局中间件，把最近访问的路径写进 `visitedRoute`，`src/pages/hi.vue` 把它显示出来。
- `src/middleware/hi-guard.ts` 是页面级中间件，只在 `pages/hi` 上生效，检查地址里有没有 `name` 参数。

## 限制

- 守卫跑在客户端，只能管界面。接口权限仍然要在服务端校验。
- 被拦下的导航不会触发 `success` 和 `fail` 回调，这是 uni-app 拦截器本身的行为。
- 插件作者只在 H5 和小程序上验证过，App 平台未验证。

完整说明见[插件文档](https://github.com/uni-helper/vite-plugin-uni-middleware)。
