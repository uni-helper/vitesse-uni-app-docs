# 按平台开发

同一份代码要在多个平台上跑，差异只能写在少数几处。模板提供四种分流方式：按文件名拆代码、按属性拆模板、按前缀拆样式、按平台合并页面配置。

## 平台文件

[`@uni-helper/vite-plugin-uni-platform`](https://github.com/uni-helper/vite-plugin-uni-platform) 按文件名分流：带平台后缀的文件只在对应平台参与构建，导入时不写后缀。

```text
src/platform/greeting.ts           # 基础实现，其它平台都用它
src/platform/greeting.h5.ts        # 只在 H5 构建里生效
src/platform/greeting.mp-weixin.ts # 只在微信小程序构建里生效
```

```ts
import { greeting } from '@/platform/greeting'
```

| 平台 | 实际读到的文件 |
| --- | --- |
| `h5` | `greeting.h5.ts` |
| `mp-weixin` | `greeting.mp-weixin.ts` |
| `app` | `greeting.ts` |

规则：

- 平台后缀加在文件名最后一个点之前。`pages/v1.2/detail.h5.vue` 算 H5 文件，目录名里的点不算。
- 平台文件内容整个替换基础文件，两份不会合并。
- 建议至少留一份基础实现。只有平台文件、没有基础文件时，切到没有对应文件的平台构建会报错，报错信息里带「缺少基础实现」。
- 插件只替换路径，不改文件内容，所以 `.vue`、`.ts`、`.scss` 都能这样写。

页面也能分流。`src/pages/index.h5.vue` 只在 H5 构建里生效，路由仍然是 `/pages/index`：`vite-plugin-uni-pages` 按插件名认出 platform 插件，自己过滤其它平台的页面并剥掉后缀。

::: tip
磁盘上没有基础文件时，`tsc` 找不到 `@/platform/greeting`。给类型检查补一个声明即可，写法见[插件文档](https://github.com/uni-helper/vite-plugin-uni-platform#用-typescript-检查没有实体文件的导入)。
:::

## 平台修饰符

[`@uni-helper/vite-plugin-uni-platform-modifier`](https://github.com/uni-helper/vite-plugin-uni-platform-modifier) 让同一个属性按平台写多份，编译时只留当前平台那一份。

```html
<view
  class="mt-2 rounded px-2 py-1"
  class.h5="mt-2 rounded bg-blue-50 px-2 py-1"
  class.mp-weixin="mt-2 rounded bg-green-50 px-2 py-1"
/>

<button @click="handleDefaultClick" @click.h5="handleH5Click" />
<text v-text="'默认'" v-text.h5.mp-weixin="'H5 和小程序'" />
```

- 一个修饰符可以写多个平台，用点分隔，按「或」匹配。
- 命中的那份会整个替换默认值，不会和默认值合并。所以公共样式要在每份里写全，模板里 `src/pages/index.vue` 就是重复写了公共 class。
- 没有平台命中时保留默认值。
- 同一属性命中多个当前平台修饰符时，用第一个，并在构建时输出警告。
- `h5` 和 `web` 视为同一个平台，写任意一个都生效。

可用平台名来自 `@uni-helper/uni-env` 的 `builtInPlatforms`，常见值：`h5`、`web`、`app`、`app-android`、`app-ios`、`mp-weixin`、`mp-alipay`、`mp-toutiao`、`mp-baidu`、`mp-qq`、`mp-xhs`。

## 样式里的平台变体

`@uni-helper/unocss-preset-uni` 提供了平台前缀，只在对应平台产出 CSS：

```html
<view class="uni-h5:mx-auto" />
<view class="uni-app:mx-auto" />
<view class="uni-mp:mx-auto" />
<view class="uni-weixin:mx-auto" />
<view class="uni-mp-alipay:mx-auto" />
```

前缀不能省。编辑器里的 UnoCSS 插件不经过 uni-app 构建，拿不到当前平台，会剥掉所有平台前缀让补全和悬浮提示正常工作；这类类名最终是否出现在产物里，仍然由构建平台决定。详见[样式](../../getting-started/styling)。

## 页面配置按平台合并

`definePage` 支持函数写法，用 `define()` 链式合并平台配置，条件在扫描阶段就算成普通对象：

```vue
<!-- src/pages/index.vue -->
<script setup lang="ts">
definePage(({ define }) =>
  define({
    type: 'home',
    style: { navigationBarTitleText: '首页' },
  }).ifdef('mp-weixin', {
    style: { navigationBarBackgroundColor: '#07c160' },
  }),
)
</script>
```

- `.ifdef(platforms, partial)` 只在列出的平台合并配置。
- `.ifndef(platforms, partial)` 在列出的平台之外合并配置。
- 直接返回 `null` 时，这个页面不会出现在当前平台的 `pages.json` 里。

## 怎么选

| 要拆分的东西 | 用哪种写法 |
| --- | --- |
| 整个模块或整个页面的实现 | 平台文件 |
| 模板里一个属性、事件或指令 | 平台修饰符 |
| 一个 class 的样式 | UnoCSS 平台变体或平台修饰符 |
| 页面标题、导航栏颜色等页面配置 | `definePage` 的 `ifdef` / `ifndef` |
| 少量语句的执行条件 | uni-app 的 `#ifdef` 条件编译注释 |
