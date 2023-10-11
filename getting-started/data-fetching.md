# 数据获取

你可以使用任何你喜欢的第三方请求库来获取数据。默认情况下，直接使用 `uni.request` 即可。

## `uni.request`

这是 uni 内置的网络请求方法，查看[文档](https://uniapp.dcloud.net.cn/api/request/request.html#)了解更多。

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

## uni-network

需要 @ModyQyW 来介绍一下~

## axios

如果你更喜欢 axios 或者为了享受其相关生态，你还可以使用由 Uni Helper 团队开发的 [axios-adapter](https://github.com/uni-helper/axios-adapter)，它是专为 uni-app 打造的 axios 适配器，支持全平台！
