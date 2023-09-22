# 起步

你可以直接使用在线编辑器快速试用，或者使用终端在本地开始使用。

## 在线试用

您可以使用在线编辑器在浏览器中开始试用：

- [StackBlitz](https://stackblitz.com/github/uni-helper/vitesse-uni-app)
- [GitHub Template](https://github.com/uni-helper/vitesse-uni-app/generate)

## 本地使用

### 前置依赖

- **Node.js** - v16.10.0 或者更新
- **文本编辑器** - 推荐使用 VS Code 并使用 Volar 插件
- **终端** - 为了运行 `vite` 命令

::: details 最佳实践

- **Node.js**: 总是使用偶数版本 (例如 18, 20)
- **Volar**: 推荐启用接管模式 (takeover)
:::

打开终端，然后使用以下命令：

::: code-group

```bash [npx]
npx degit uni-helper/vitesse-uni-app <project-name>
```

```bash [pnpm]
pnpx degit uni-helper/vitesse-uni-app <project-name>
```

:::

在 VS Code 中打开项目文件夹：

```bash
code <project-name>
```

安装依赖：

::: code-group

```bash [pnpm]
pnpm install
```

```bash [yarn]
npx rimraf pnpm-lock.yaml
yarn install
```

```bash [npm]
npx rimraf pnpm-lock.yaml
npm install
```

```bash [bun]
npx rimraf pnpm-lock.yaml
bun install
```

:::

## 开发

你可以使用 `dev` 命令直接启动 `h5` 模式的开发服务器

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [yarn]
yarn dev
```

```bash [npm]
npm dev
```

```bash [bun]
bun dev
```

:::

### 跨端开发

同样使用 `dev` 命令，不同的是你需要使用冒号并跟着你要开发的平台标识。

::: code-group

```bash [pnpm]
pnpm dev:<platform>
```

```bash [yarn]
yarn dev:<platform>
```

```bash [npm]
npm dev:<platform>
```

```bash [bun]
bun dev:<platform>
```

:::
