# 状态管理

得益于 Composition API ，在 Vitesse 中做状态管理很容易。

## `ref`

::: code-group

```ts [src/composables/useCount.ts]
// 全局状态
const globalCount = ref(1)
export function useCount() {
  // 本地状态
  const localCount = ref(1)
  function increment() {
    globalCount.value++
    localCount.value++
  }
  return {
    globalCount,
    localCount,
    increment
  }
}
```

```vue [src/pages/index.vue]
<script setup lang="ts">
// 自动导入
const { globalCount, localCount, increment } = useCount()
</script>

<template>
  <button @click="increment()">
    {{ globalCount }}
    {{ localCount }}
  </button>
</template>
```

:::

## `reactive`

::: code-group

```ts [src/stores/count.ts]
export const countStore = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue [src/pages/index.vue]
<template>
  <!-- 自动导入 -->
  <button @click="countStore.increment()">
    {{ countStore.count }}
  </button>
</template>
```

:::

::: tip
以上关于 `ref` 和 `reactive`的实例修改自 Vue 官方中文文档的[用响应式 API 做简单状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api) 部分。
:::

## VueUse

你也可以使用 vueUse 提供的 `createGlobalState` 进行状态管理，你还可以配合 `useStorage` 做数据持久。

:::code-group

```ts [src/composables/useAuth.ts]
export const useAuth = createGlobalState(() => {
  const token = useStorage('token', '', uniStorage)
  const isLogin = computed(() => !!token.value)
  const login = (_token: string) => {
    token.value = _token
  }
  const logout = () => {
    token.value = ''
  }
  return {
    token,
    isLogin,
    login,
    logout,
  }
})
```

```ts [src/utils/uniStorage.ts]
// storage adapter
export const uniStorage = {
  getItem(key: string) {
    return uni.getStorageSync(key) || null
  },
  setItem(key: string, value: any) {
    return uni.setStorageSync(key, value)
  },
  removeItem(key: string) {
    return uni.removeStorageSync(key)
  },
}
```

:::

## Pinia

这个官方推荐的一个状态管理库。安装它，然后阅读[文档](https://pinia.vuejs.org/zh/)。

```shell
pnpm install pinia@2.0.36
```

::: warning
你可以在 [#4350](https://github.com/dcloudio/uni-app/issues/4350) 了解为什么要固定 pinia 版本号。
:::
