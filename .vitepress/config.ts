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
                  link: '/guide/concepts/uniapp-development',
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
