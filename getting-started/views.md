# 视图

## App.vue

`App.vue` 是 uni-app 的应用主组件和入口文件，所有页面都在它下面切换。

`App.vue` 本身不是页面，这里不能写视图元素，也就是不能用 `<template>`。

[应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle) 只能在 `App.vue` 里监听，在页面里监听无效。

```vue
<!-- src/App.vue -->
<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {})
</script>
```

::: tip 了解 `uni-app` 关于 `App.vue` 的更多信息

<https://uniapp.dcloud.net.cn/collocation/App.html>

:::

## 组件

组件放在 `src/components`，导入后使用。模板没有启用 `vite-plugin-uni-components`，组件不会自动注册。想省掉手写导入，见[自动导入](../guide/concepts/auto-import)。

```vue
<!-- src/pages/hi.vue -->
<script setup lang="ts">
import HiCounter from '@/components/hi-counter.vue'
</script>

<template>
  <HiCounter />
</template>
```

`@/` 指向 `src`，配置在 `tsconfig.json` 的 `paths` 里。

::: warning
这里的组件是普通 Vue 组件。`uni-app` 自带的 `easycom` 只扫描 `components/组件名/组件名.vue` 这种两级目录，`src/components/hi-counter.vue` 不符合规则，不导入就不会生效。
:::

## 页面

`src/pages` 下的每个 `.vue` 文件就是一个路由。新建页面只要在这个目录里加文件。

页面配置写在 `definePage` 里，插件扫描时读取它，编译时把这次调用从产物里删掉。

```vue
<!-- src/pages/hi.vue -->
<script setup lang="ts">
definePage({
  layout: 'home',
  middleware: ['hiGuard'],
  style: {
    navigationBarTitleText: 'Hi',
  },
})
</script>
```

`definePage` 的字段和 `pages.json` 的页面条目一致，另外支持：

| 字段 | 说明 |
| --- | --- |
| `type` | `'home'` 标记首页，`'page'` 是普通页面 |
| `layout` | 使用的布局，见下文 |
| `middleware` | 页面级中间件，见[路由中间件](../guide/concepts/middleware) |
| `tabBar` | 生成 `tabBar.list` 条目 |
| `style` | 页面样式 |

需要按平台给不同配置时，`definePage` 可以传函数，见[按平台开发](../guide/concepts/platform)。

::: warning
`vite-plugin-uni-pages` 从 0.4 起移除了 `<route>` 自定义块。写在 `<route>` 里的配置不会进 `pages.json`，必须改用 `definePage`。
:::

## 布局

布局用来包住页面，放页头、页脚和公共样式。布局是普通 Vue 组件，用插槽接收页面内容。

`src/layouts/default.vue` 是所有页面的默认布局。

```vue
<!-- src/layouts/home.vue -->
<script setup lang="ts">
function toast(message: string) {
  uni.showToast({ icon: 'none', title: message })
}

defineExpose({ toast })
</script>

<template>
  <view class="px-10 py-20 text-center">
    <slot />
    <view class="mt-5 text-sm opacity-25">
      [Home Layout]
    </view>
  </view>
</template>
```

页面在 `definePage` 里指定布局：

```vue
<script setup lang="ts">
definePage({ layout: 'home' })
</script>
```

- 写 `layout: false` 不套任何布局。
- 布局名由文件路径推导，`src/layouts/home.vue` 对应 `home`，`src/layouts/blog/posts.vue` 对应 `blogPosts`。
- 布局名写错时只有一个页面不套布局，终端会给出警告。

### 调用布局里的方法

布局用 `defineExpose` 暴露方法，页面用 `useUhUniLayoutRef` 拿到布局实例：

```vue
<!-- src/pages/hi.vue -->
<script setup lang="ts">
import { useUhUniLayoutRef } from 'virtual:uni-layouts'

const uniLayout = useUhUniLayoutRef<{ toast: (message: string) => void }>()

function handleToast() {
  uniLayout.value?.toast('Hi')
}
</script>
```

实例要等布局挂载后才有值，在 `onLoad` 里读会得到 `null`，请在 `onMounted`、`onReady` 里读，或者用 `watch`。

完整说明见[插件文档](https://github.com/uni-helper/vite-plugin-uni-layouts)。

## 静态资源

图片等静态资源放在 `src/static`，构建时原样拷贝，引用路径写绝对路径：

```vue
<image src="/static/logo.svg" />
```
