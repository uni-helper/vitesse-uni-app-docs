# 状态管理

得益于组合式方法（Composition API），管理状态非常简单。

## Pinia

[Pinia](https://pinia.vuejs.org/zh/) 是 `Vue` 官方推荐的状态管理库。

```shell
pnpm install pinia@2.0.36
```

安装后做基本设置。注意保留 `main.ts` 里注册路由中间件守卫的两行，否则中间件不会执行。

:::code-group

```ts [src/main.ts]
import { createNavigationGuardPlugin } from '@uni-helper/vite-plugin-uni-middleware/runtime'
import { createPinia } from 'pinia'
import { middlewares } from 'virtual:uni-middleware'
import { createSSRApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(createNavigationGuardPlugin(middlewares))
  return {
    app,
  }
}
```

```ts [src/stores/counter.ts]
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
})
```

```vue [src/pages/index.vue]
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
counterStore.count // 0
counterStore.increment()
counterStore.count // 1
</script>
```

:::

::: warning
你可以在 [dcloudio/uni-app#4350](https://github.com/dcloudio/uni-app/issues/4350) 了解为什么要固定 pinia 版本号。
:::

## 简单状态管理

你可以直接用 `Vue` 提供的 `ref` 或 `reactive` 做简单状态管理。

### ref

::: code-group

```ts [src/composables/use-count.ts]
import { ref } from 'vue'

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
    increment,
  }
}
```

```vue [src/pages/index.vue]
<script setup lang="ts">
import { useCount } from '@/composables/use-count'

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

### reactive

::: code-group

```ts [src/stores/count.ts]
import { reactive } from 'vue'

export const countStore = reactive({
  count: 0,
  increment() {
    this.count++
  },
})
```

```vue [src/pages/index.vue]
<script setup lang="ts">
import { countStore } from '@/stores/count'
</script>

<template>
  <button @click="countStore.increment()">
    {{ countStore.count }}
  </button>
</template>
```

:::

::: tip
以上例子修改自 Vue 文档的 [用响应式 API 做简单状态管理](https://cn.vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)。
:::

## VueUse

也可以用 VueUse 的 `createGlobalState` 管理全局状态，配合 `useStorage` 做数据持久。

`useStorage` 默认用 `localStorage`。小程序里没有这个对象，想真正持久化就要传一个基于 `uni` 存储 API 的适配器。

:::code-group

```ts [src/utils/uni-storage.ts]
export const uniStorage = {
  getItem(key: string) {
    return uni.getStorageSync(key) || null
  },
  setItem(key: string, value: unknown) {
    return uni.setStorageSync(key, value)
  },
  removeItem(key: string) {
    return uni.removeStorageSync(key)
  },
}
```

```ts [src/composables/use-auth.ts]
import { createGlobalState, useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { uniStorage } from '@/utils/uni-storage'

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

:::

::: tip
VueUse 在小程序端需要 `TransitionGroup` 的 polyfill。模板已经装了 `vite-plugin-uni-polyfill` 处理它，不要删掉。
:::
