# 视图

## App.vue

uni-app 的主组件，所有页面都是在 App.vue 下进行切换的，是应用入口文件。但 `App.vue` 本身不是页面，这里不能编写视图元素，也就是没有 `<template>`。

应用生命周期仅可在 `App.vue` 中监听，在页面监听无效。

::: tip 了解 uni-app 关于 `App.vue` 的更多信息
<https://uniapp.dcloud.net.cn/collocation/App.html>
:::

## Components 组件

大多数组件都是用户界面的可重用部分，如按钮和菜单。你可以在 `src/components/` 目录中创建这些组件，它们将自动注册到全局，而无需显式导入它们。

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

`src/pages/` 目录中的每个文件都代表着不同的路由。要创建新页面，只需要在这个目录里新增 `.vue` 文件即可。

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

::: tip
你可以在[这里](/guide/todo)了解有关页面的更多信息
:::

## Layotus 布局

布局可以用来创建通用界面（如页眉和页脚显示）的包装器。布局是使用 Vue 的插槽功能实现的。

`src/layouts/default.vue` 文件作为将作为默认路由。

自定义布局可以使用 SFC 的 `route` 块来设置。

:::code-group

```vue [src/layouts/default.vue]
<template>
  <div>
    <AppHeader />
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

::: tip
你可以在[这里](/guide/todo)了解有关布局的更多信息
:::
