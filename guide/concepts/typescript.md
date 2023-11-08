# TypeScript

我们通过 `@dcloudio/types` 和 `@uni-helper/uni-app-types` 提供了 fully typed

## 类型检查

默认情况下，出于性能原因，我们不在开发和构建时检查类型，但是你可以使用内置的 `vue-tsc` 进行类型检查

```bash
pnpm type-check
```

## 自动生成的类型

当你执行开发和构建命令时，我们会支持自动生成以下类型文件：

### `src/auto-imports.d.ts`

由 unplugin-auto-imports 提供，用于 uni-app、vue、vueuse 等提供类型支持

### `src/components.d.ts`

由 vite-plugin-uni-components 提供，

### `src/uni-pages.d.ts`

由 vite-plugin-uni-pages 提供，用于为 `uni` 的 navigate 相关函数提供类型支持
