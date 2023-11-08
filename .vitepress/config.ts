import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Vitesse uni-app',
  description: 'Vite & uni-app Powered Starter Template',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    [
      'meta',
      {
        name: 'twitter:title',
        content:
          'Vite & uni-app Powered Starter Template',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@uni-helper' }],
    [
      'meta',
      {
        name: 'twitter:image:src',
        content:
          'https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/uni-helper/vitesse-uni-app',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/uni-helper/vitesse-uni-app',
      },
    ],
    [
      'meta',
      {
        property: 'og:image:alt',
        content:
          'Vite & uni-app Powered Starter Template',
      },
    ],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '600' }],
    ['meta', { property: 'og:site_name', content: 'GitHub' }],
    ['meta', { property: 'og:type', content: 'object' }],
    [
      'meta',
      {
        property: 'og:title',
        content:
          'Vite & uni-app Powered Starter Template',
      },
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://github.com/uni-helper/vitesse-uni-app' },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Vite & uni-app Powered Starter Template',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.svg',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'Vitesse',
    nav: [
      { text: '快速开始', link: '/getting-started/installation', activeMatch: '/getting-started' },
      { text: '指南', link: '/guide/concepts/auto-imports', activeMatch: '/guide' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: '快速开始',
          base: '/getting-started/',
          items: [
            { text: '介绍', link: 'introduction' },
            { text: '起步', link: 'installation' },
            { text: '视图', link: 'views' },
            { text: '样式', link: 'styling' },
            { text: '数据获取', link: 'data-fetching' },
            { text: '状态管理', link: 'state-management' },
            { text: '部署', link: 'deployment' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            {
              text: '概念',
              base: '/guide/concepts/',
              items: [
                { text: '自动导入', link: 'auto-imports' },
                { text: 'uni-app 开发', link: 'uniapp-development' },
                { text: 'TypeScript', link: 'typescript' },
              ],
            },
            {
              text: '目录结构',
              base: '/guide/directory-structure/',
              items: [
                { text: '.github', link: 'github' },
                { text: '.vscode', link: 'vscode' },
                { text: 'dist', link: 'dist' },
                { text: 'node_modules', link: 'node_modules' },
                {
                  text: 'src',
                  base: '/guide/directory-structure/src/',
                  collapsed: true,
                  items: [
                    { text: 'components', link: 'components' },
                    { text: 'composables', link: 'composables' },
                    { text: 'layouts', link: 'layouts' },
                    { text: 'pages', link: 'pages' },
                    { text: 'static', link: 'static' },
                    { text: 'App.vue', link: 'app-vue' },
                    { text: 'auto-imports.d.ts', link: 'auto-imports-d-ts' },
                    { text: 'components.d.ts', link: 'components-d-ts' },
                    { text: 'env.d.ts', link: 'env-d-ts' },
                    { text: 'main.ts', link: 'main-ts' },
                    { text: 'manifest.json', link: 'manifest-json' },
                    { text: 'pages.json', link: 'pages-json' },
                    { text: 'shims.d.ts', link: 'shims-d-ts' },
                    { text: 'theme.json', link: 'theme-json' },
                    { text: 'uni-pages.d.ts', link: 'uni-pages-d-ts' },
                    { text: 'uni.scss', link: 'uni-scss' },
                  ],
                },
                { text: '.editorconfig', link: 'editorconfig' },
                { text: '.gitignore', link: 'gitignore' },
                { text: '.npmrc', link: 'npmrc' },
                { text: 'LICENSE', link: 'license' },
                { text: 'README.md', link: 'readme-md' },
                { text: 'eslint.config.js', link: 'eslint-config-js' },
                { text: 'index.html', link: 'index-html' },
                { text: 'manifest.config.ts', link: 'manifest-config-ts' },
                { text: 'package.json', link: 'package-json' },
                { text: 'pages.config.ts', link: 'pages-config-ts' },
                { text: 'pnpm-lock.yaml', link: 'pnpm-lock-yaml' },
                { text: 'renovate.json', link: 'renovate-json' },
                { text: 'tsconfig.json', link: 'tsconfig-json' },
                { text: 'uno.config.ts', link: 'uno-config-ts' },
                { text: 'vite.config.ts', link: 'vite-config-ts' },
                { text: 'volar.config.js', link: 'volar-config-js' },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uni-helper/vitesse-uni-app' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Uni-Helper',
    },

    editLink: {
      pattern: 'https://github.com/uni-helper/vitesse-uni-app-docs/edit/main/:path',
      text: '在 GitHub 上编辑本页',
    },
  },
})
