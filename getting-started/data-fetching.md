# 数据获取

你可以使用你喜欢的第三方请求库来获取数据。一般情况下，直接使用 `uni-app` 内置方法即可。

## `uni-app` 内置方法

`uni-app` 提供了 [uni.request](https://uniapp.dcloud.net.cn/api/request/request.html)、[uni.uploadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)、[uni.downloadFile](https://uniapp.dcloud.net.cn/api/request/network-file.html#downloadfile)、[WebSocket](https://uniapp.dcloud.net.cn/api/request/websocket.html) 等支持。一般情况下，你可以直接使用它们。

## axios

如果你更喜欢 [axios](https://github.com/axios/axios) 及其相关生态，你可以使用 [@uni-helper/axios-adapter](https://github.com/uni-helper/axios-adapter)。它是专为 `uni-app` 打造的 `axios` 适配器，支持全平台！

```ts
import axios from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

axios.defaults.adapter = createUniAppAxiosAdapter()
const { data, isFinished } = useAxios('/user?ID=12345')
```

## @uni-helper/uni-network

[@uni-helper/uni-network](https://github.com/uni-helper/uni-network) 是一个为 `uni-app` 打造的基于 `Promise` 的 HTTP 客户端，灵感和代码绝大部分源于 `axios@0.27.2`。`@uni-helper/uni-network` 在底层做了 `uni-app` 适配，体积更小，TypeScript 类型更贴近 `uni-app`。

```ts
import { un } from '@uni-helper/uni-network'

try {
  const response = await un.get('/user?ID=12345')
  console.log(response)
}
catch (error) {
  console.error(error)
}
```
