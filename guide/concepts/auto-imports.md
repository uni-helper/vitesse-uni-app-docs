# 自动导入

得益于 vite-plugin-uni-components 和 unplugin-auto-import 使得自动导入成为现实。

::: tip
你可以随时在 `vite.config.ts` 中删除这两个模块来禁用自动导入！
:::

## 按库自动导入

默认情况下，我们自动导入了 `vue`, `@vueuse/core`, `uni-app`。

你可以使用其提供的任何 Reactivity API 和辅助函数，而无需显式导入。

```ts
const isOpen = ref(false) // 来自 vue
const [value, toggle] = useToggle() // 来自 vueuse

// 来自 uni-app
onLoad(() => {
  toggle()
  console.log(value)
})
```

## 按目录自动导入

默认情况下，以下目录的导出将被自动导入

- `components/` Vue 组件.
- `composables/` Vue 可组合函数
- `utils/` 工具或其他辅助函数
