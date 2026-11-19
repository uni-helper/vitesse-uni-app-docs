# 自动导入

模板默认要手写 `import`：组件从 `src/components` 导入，组合式函数从 `src/composables` 导入。想省掉这一步，装下面两个插件。两者互不依赖，可以只装一个。

::: tip
模板本身没有启用这两个插件，装完要自己改 `vite.config.ts`。
:::

## 组件自动导入

`@uni-helper/vite-plugin-uni-components` 扫描 `src/components`，模板里直接写组件名就能用。它不依赖 uni-app 自带的 `easycom`，不受 `components/组件名/组件名.vue` 这条目录规则限制。

### 安装

```bash
pnpm i -D @uni-helper/vite-plugin-uni-components
```

### 配置

插件必须排在 `Uni()` 前面。

```ts
// vite.config.ts
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
  ],
})
```

- `dts` — 组件类型声明的位置，默认写根目录的 `components.d.ts`。
- `directoryAsNamespace` — 把子目录名加进组件名，见下面的命名规则。

### 使用

`src/components/hi-counter.vue` 不用导入，模板里直接写标签：

```vue
<!-- src/pages/hi.vue -->
<script setup lang="ts">
import { useQuery } from '@uni-helper/uni-use'

const { value: name } = useQuery('name')
</script>

<template>
  <HiCounter />
  <view>{{ name }}</view>
</template>
```

组件名由文件路径推出：

| 文件 | 组件名 |
| --- | --- |
| `src/components/hi-counter.vue` | `<HiCounter />` |
| `src/components/app-logos.vue` | `<AppLogos />` |
| `src/components/form/field.vue` | `<FormField />` |
| `src/components/uni-button/index.vue` | `<UniButton />` |

`form/field.vue` 那一行要求 `directoryAsNamespace: true`，关掉时只取文件名，注册成 `Field`。

生成的 `src/components.d.ts` 保存这些组件的类型，编辑器提示和 `pnpm typecheck` 靠它。

### 引入 UI 库

装好 UI 库后加 resolver，组件名按库的规则解析：

```ts
// vite.config.ts
import Uni from '@uni-helper/plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniHelperComponents({
      resolvers: [
        UniUIResolver(),
      ],
    }),
    Uni(),
  ],
})
```

`@uni-helper/vite-plugin-uni-components/resolvers` 还导出其他库的 resolver：`AnoResolver`、`TDesignUniappResolver`、`UvResolver`、`uViewProResolver`、`WotResolver`、`WotV2Resolver`、`ZPagingResolver`、`HyAppResolver`。

## API 自动导入

`unplugin-auto-import` 把 Vue、VueUse、uni-app 的 API 和指定目录的导出注册成全局名字，`<script setup>` 里直接调用。

### 安装

```bash
pnpm i -D unplugin-auto-import
```

### 配置

```ts
// vite.config.ts
import Uni from '@uni-helper/plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Uni(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables'],
      vueTemplate: true,
    }),
  ],
})
```

- `imports` — 预设列表。`uni-app` 提供 `@dcloudio/uni-app` 的生命周期函数，例如 `onLoad`、`onShow`、`onLaunch`。
- `dirs` — 扫描目录的导出。`src/composables/use-count.ts` 导出的 `useCount` 可以直接用。新建目录后要补进这个数组。
- `vueTemplate` — 模板表达式里也能用自动导入的名字。
- `dts` — 类型声明的位置，默认是 `auto-imports.d.ts`。

### 使用

`src/composables` 和 `vue` 预设里的名字都不用导入：

```vue
<!-- src/components/hi-counter.vue -->
<script setup lang="ts">
const { count, inc } = useCount()
const doubled = computed(() => count.value * 2)
</script>

<template>
  <view @click="inc()">
    {{ count }} / {{ doubled }}
  </view>
</template>
```

`useCount` 来自 `src/composables`，`computed` 来自 `vue` 预设。

### 类型和检查

`dts` 生成的声明文件让编辑器提示和 `pnpm typecheck` 认识这些名字。`tsconfig.json` 不用改，只要不把声明文件排除在外。

用 `@uni-helper/eslint-config` 时 ESLint 配置不用动。换成会检查未定义变量的 ESLint 配置时，这些名字会报 `no-undef`，插件提供 `eslintrc` 选项生成全局变量表。

::: tip
`src/components.d.ts` 和 `src/auto-imports.d.ts` 都是生成的声明文件，可以提交进仓库，不要手改。入库规则见[目录结构](../directory-structure)。
:::
