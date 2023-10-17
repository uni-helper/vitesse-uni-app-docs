import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitesse uni-app',
  description: 'Vite & UniApp Powered Starter Template',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'Vitesse',
    nav: [
      { text: '快速开始', link: '/getting-started/installation' },
      { text: '指南', link: '/guide/concepts/auto-imports' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: '快速开始',
          items: [
            { text: '介绍', link: '/getting-started/introduction' },
            { text: '起步', link: '/getting-started/installation' },
            { text: '视图', link: '/getting-started/views' },
            { text: '样式', link: '/getting-started/styling' },
            { text: '数据获取', link: '/getting-started/data-fetching' },
            { text: '状态管理', link: '/getting-started/state-management' },
            { text: '部署', link: '/getting-started/deployment' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            {
              text: '概念',
              items: [
                {
                  text: '自动导入',
                  link: '/guide/concepts/auto-imports',
                },
                {
                  text: 'UniApp 开发',
                },
                {
                  text: 'TypeScript',
                },
              ],
            },
            {
              text: '目录结构',
              items: [
                {
                  text: '.github',
                },
                {
                  text: '.vscode',
                },
                {
                  text: 'dist',
                },
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
