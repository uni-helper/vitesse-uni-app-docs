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
    [
      'meta',
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    [
      'meta',
      { name: 'twitter:site', content: '@uni-helper' },
    ],
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
    [
      'meta',
      { property: 'og:image:width', content: '1200' },
    ],
    [
      'meta',
      { property: 'og:image:height', content: '600' },
    ],
    [
      'meta',
      { property: 'og:site_name', content: 'GitHub' },
    ],
    [
      'meta',
      { property: 'og:type', content: 'object' },
    ],
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
    siteTitle: 'Vitesse Uni App',
    nav: [
      { text: '快速开始', link: '/getting-started/installation', activeMatch: '/getting-started' },
      { text: '指南', link: '/guide/', activeMatch: '/guide' },
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
            { text: '概览', link: '/guide/' },
            { text: '目录结构', link: '/guide/directory-structure' },
          ],
        },
        {
          text: '概念',
          base: '/guide/concepts/',
          items: [
            { text: '命令行与 unh', link: 'cli' },
            { text: 'uni-app 开发', link: 'uniapp-development' },
            { text: 'TypeScript', link: 'typescript' },
            { text: '路由中间件', link: 'middleware' },
            { text: '按平台开发', link: 'platform' },
            { text: '测试', link: 'testing' },
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

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
})
