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

这是一个为 `uni-app` 打造的 [基于 Promise](https://javascript.info/promise-basics) 的 HTTP 客户端，灵感和代码绝大部分源于 `axios@0.27.2`。查看[文档](https://github.com/uni-helper/uni-network)了解更多。

```ts
import un from '@uni-helper/uni-network';

// 发起一个 GET 请求特定 ID 的用户数据
un.get('/user?ID=12345')
  .then((response) => {
    // 处理响应
    console.log('response', response);
  })
  .catch((error) => {
    // 处理错误
    console.log('error', error);
  })
  .finally(() => {
    // 总是会执行
  });

// 上述请求和以下等同
un.get('/user', {
  params: {
    ID: 12345,
  },
})
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error);
  })
  .finally(() => {
    // 总是会执行
  });

// 支持 async/await
async function getUser() {
  try {
    const response = await un.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// 发起一个 POST 请求
un.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone',
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(() => {});
```

## axios

如果你更喜欢 axios 或者为了享受其相关生态，你还可以使用由 Uni Helper 团队开发的 [axios-adapter](https://github.com/uni-helper/axios-adapter)，它是专为 uni-app 打造的 axios 适配器，支持全平台！
