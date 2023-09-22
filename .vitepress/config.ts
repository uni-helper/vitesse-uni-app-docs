import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vitesse-uni-app',
  description: 'Vite & UniApp Powered Starter Template',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速开始', link: '/getting-started/installation' },
      { text: '指南', link: '/guide/' },
      { text: '演示', link: 'https://vitesse-uni-app.netlify.app/' },
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
            { text: '数据获取' },
            { text: '状态管理' },
            { text: '状态管理' },
            { text: '部署' },
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
  },
})
