# 视图

## App.vue

`App.vue` 是 uni-app 应用主组件和入口文件，所有页面都是在 `App.vue` 下进行切换的。

`App.vue` 本身不是页面，这里不能编写视图元素，也就是不能使用 `<template>`。

[应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle) 只能在 `App.vue` 中监听，在页面监听无效。

::: tip 了解 `uni-app` 关于 `App.vue` 的更多信息

<https://uniapp.dcloud.net.cn/collocation/App.html>

:::

## Components 组件

大多数组件都是用户界面的可重用部分，如按钮和菜单。

得益于 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components)，组件将自动注册到全局，你不需要显式导入它们。只需要在 `src/components` 目录下创建组件，然后直接使用即可。

:::code-group

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitess-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/components/AppAlert.vue]
<template>
  <span>
    <slot />
  </span>
</template>
```

:::

## Pages 页面

通过组合使用组件，我们可以得到展示给用户的页面。

得益于 [@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages)，约定式路由（文件路由）的实现轻而易举。`src/pages` 目录下的每个文件都代表着一个路由。要创建新页面，只需要在这个目录里新增 `.vue` 文件。

:::code-group

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitess-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/pages/about.vue]
<template>
  <section>
    <p>通过 `/pages/about` 来访问这个页面</p>
  </section>
</template>
```

:::

## Layouts 布局

布局可以用来创建通用界面（如页眉和页脚显示）的包装器，不同的页面可能需要不同的布局。布局是使用 `Vue` 的插槽功能实现的。

得益于 [@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts)，你可以轻松地切换不同的布局。

`src/layouts/default.vue` 文件将作为默认布局。

:::code-group

```vue [src/layouts/default.vue]
<template>
  <div>
    <AppHeader />
    <!-- src/pages/index.vue 和 src/pages/about.vue 内容展示 -->
    <slot />
    <AppFooter />
  </div>
</template>
```

```vue [src/pages/index.vue]
<template>
  <div>
    <h1>欢迎使用 vitess-uni-app </h1>
    <AppAlert>
      这个组件会自动导入
    </AppAlert>
  </div>
</template>
```

```vue [src/pages/about.vue]
<template>
  <section>
    <p>通过 `/pages/about` 来访问这个页面</p>
  </section>
</template>
```

:::

在页面文件内设置 `route` 代码块可以指定自定义布局。

```vue [src/pages/index.vue]
<route lang="json">
{
  "layout": "custom"
}
</route>
```
