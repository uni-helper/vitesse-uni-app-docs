# 数据获取

你可以使用任何你喜欢的第三方请求库来获取数据。默认情况下，直接使用 `uni.request` 即可。

## `uni.request`

这是 uni 内置的网络请求方法。

```ts
uni.request({
  url: 'https://www.example.com/request',
  data: {
    text: 'uni.request'
  },
  header: {
    'custom-header': 'hello' // 自定义请求头信息
  },
  success: (res) => {
    console.log(res.data)
  }
})
```


::: tip
你可以在[这里](https://uniapp.dcloud.net.cn/api/request/request.html#)阅读文档。
:::

## uni-network

这是一个为 `uni-app` 打造的 [基于 Promise](https://javascript.info/promise-basics) 的 HTTP 客户端，灵感和代码绝大部分源于 `axios@0.27.2`。

```ts
import un from '@uni-helper/uni-network'

try {
  const response = await un.get('/user?ID=12345')
  console.log(response)
}
catch (error) {
  console.error(error)
}
```

::: tip
你可以在[这里](https://github.com/uni-helper/uni-network)阅读文档。
:::

## axios

如果你更喜欢 axios 或者为了享受其相关生态，你还可以使用由 Uni Helper 团队开发的 [axios-adapter](https://github.com/uni-helper/axios-adapter)，它是专为 uni-app 打造的 axios 适配器，支持全平台！

```ts
import axios from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

axios.defaults.adapter = createUniAppAxiosAdapter()
const { data, isFinished } = useAxios('/user?ID=12345')
```

::: tip
你可以阅读 [axios 的文档](https://axios-http.com/docs/intro) 和 [axios-adapter 的文档](https://github.com/uni-helper/axios-adapter)了解更多信息。
:::
