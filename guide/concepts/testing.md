# 测试

模板带 Vitest 和 [vitest-environment-uniapp](https://github.com/uni-helper/vitest-environment-uniapp)，测试跑在小程序运行时里，通过 [uni-app 自动化测试](https://uniapp.dcloud.net.cn/worktile/auto/quick-start.html) 的 `program` 对象操作页面。

## 命令

```bash
pnpm test        # vitest，watch 模式
pnpm test --run  # 跑一次就退出
```

## 前提

测试依赖微信开发者工具。运行前必须：

1. 安装微信开发者工具。
2. 在开发者工具的设置里打开服务端口，自动化的 HTTP 端口要能连上。

端口没开时，Vitest 在初始化环境阶段就失败：

```text
测试环境初始化失败 Error: Failed to launch Wechat web devTools , please make sure http port is open
```

这条命令和构建、类型检查是两回事：CI 目前只跑 `lint`、`typecheck` 和三个平台的 `build`，不跑测试。

## 配置

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'uniapp',
    environmentOptions: {
      uniapp: {
        platform: 'mp-weixin',
        projectPath: './src',
        port: 5121,
      },
    },
  },
})
```

- `environment: 'uniapp'` 指向 `vitest-environment-uniapp` 提供的测试环境。
- `platform` 是测试的平台，模板里是微信小程序。
- `projectPath` 是小程序项目目录，`port` 是自动化和开发者工具通信的端口。

::: tip
`program`、`Page`、`Element` 的类型来自 `vitest-environment-uniapp/types`，模板已经写进 `tsconfig.json` 的 `types` 数组，所以测试文件里不用额外声明。
:::

## 写测试

```ts
// tests/index.test.ts
import { beforeAll, describe, expect, it } from 'vitest'

describe('test title', () => {
  let page: Page
  beforeAll(async () => {
    page = await program.currentPage()
    await page.waitFor(3000)
  })

  it('check uni-helper logo label', async () => {
    const el = await page.$('.uni-helper-logo__label')
    const text = await el.text()
    expect(text).toEqual('uni-helper')
  })
})
```

`program` 是小程序端的控制对象，负责跳转、取页面；`page` 是当前页面，负责查元素。常用的几个方法：

| 方法 | 作用 |
| --- | --- |
| `program.currentPage()` | 取当前页面 |
| `program.navigateTo(url)` | 跳页并返回新页面 |
| `program.callUniMethod(name, ...args)` | 调用 `uni` 上的方法 |
| `program.mockUniMethod(name, result)` | 替换 `uni` 方法的返回结果 |
| `page.waitFor(ms \| selector)` | 等时间或等元素出现 |
| `page.$(selector)` / `page.$$(selector)` | 取一个或多个元素 |
| `el.text()` / `el.property(name)` / `el.tap()` | 读文本、读属性、点击元素 |

这份列表是 uni-app 自动化测试接口的一部分，完整列表见 [uni-app 文档](https://uniapp.dcloud.net.cn/worktile/auto/api.html)。
