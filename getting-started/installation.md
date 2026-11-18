# 起步

你可以用在线编辑器快速试用，也可以用终端在本地开始。

## 在线试用

- [StackBlitz](https://stackblitz.com/github/uni-helper/vitesse-uni-app)
- [GitHub Template](https://github.com/uni-helper/vitesse-uni-app/generate)

## 本地使用

### 前置依赖

- **Node.js** — [LTS 版本](https://nodejs.org/en/about/previous-releases)，22 或更高。模板的 `.node-version` 是 26，CI 覆盖 22、24、26。
- **pnpm** — 模板用 pnpm，版本写在 `package.json` 的 `packageManager` 字段。
- **文本编辑器** — 推荐 VS Code 加 Vue 官方插件。仓库里的 `.vscode/extensions.json` 列出了推荐插件，打开项目时 VS Code 会提示安装。
- **终端** — 运行 `pnpm` 命令。Windows 建议用 Git Bash / Powershell。

推荐用 [vite-plus](https://viteplus.dev/) 一站式同时管理 Node.js 和 pnpm。

### 创建项目

::: code-group

```bash [create-uni]
pnpm create uni@latest <project-name> -t vitesse
```

```bash [degit]
pnpx degit uni-helper/vitesse-uni-app <project-name>
```

```bash [giget]
pnpx giget gh:uni-helper/vitesse-uni-app <project-name>
```

:::

在 VS Code 中打开项目：

```bash
code <project-name>
```

### 安装依赖

```bash
pnpm install
```

::: tip
模板按 pnpm 配置：`pnpm-lock.yaml` 锁版本，`pnpm-workspace.yaml` 里放 pnpm 自身的设置。换成 npm、yarn 或 bun 时要自己调整依赖和构建脚本白名单。
:::

## 开发

`dev` 启动默认平台的开发服务器，默认平台是 `h5`。

```bash
pnpm dev
```

打开终端打印的地址即可预览。

### 跨端开发

在 `dev` 后面加平台名：

```bash
pnpm dev wx          # 微信小程序
pnpm dev mp-alipay   # 支付宝小程序
pnpm dev app        # App
```

`wx` 是 `mp-weixin` 的别名，配置在 `unh.config.ts`。平台全名可以用 `pnpm exec unh platform` 查看，完整说明见[命令行与 unh](../guide/concepts/cli)。

微信小程序的产物在 `dist/dev/mp-weixin`，用微信开发者工具导入这个目录。

## 常用命令

```bash
pnpm dev             # 开发
pnpm build           # 构建默认平台
pnpm build wx        # 构建微信小程序
pnpm typecheck       # 类型检查
pnpm lint            # 代码检查
pnpm lint:fix        # 代码检查并修复
pnpm test            # 测试
pnpm about           # 打印依赖和环境信息
```

## 下一步

- [视图](./views) — 页面、组件和布局
- [命令行与 unh](../guide/concepts/cli) — 命令背后做了什么
- [目录结构](../guide/directory-structure) — 每个文件的作用
