import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '知我 KnowMe',
  titleTemplate: ':title · 知我 KnowMe 使用文档',
  description: '知我 KnowMe · 本地优先 AI 第二大脑 · 完整使用文档',

  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://useknowme.com/assets/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:title', content: '知我 KnowMe 使用文档' }],
    ['meta', { property: 'og:description', content: '本地优先 AI 第二大脑 · 完整使用文档' }],
    ['meta', { property: 'og:image', content: 'https://useknowme.com/assets/og-image.jpg' }],
    ['meta', { property: 'og:url', content: 'https://docs.useknowme.com' }],
  ],

  themeConfig: {
    logo: 'https://useknowme.com/assets/favicon.png',
    siteTitle: '知我 KnowMe',

    nav: [
      { text: '主页', link: 'https://useknowme.com', target: '_self' },
      { text: '快速上手', link: '/start/quickstart' },
      { text: '下载', link: 'https://useknowme.com/#download', target: '_self' },
      { text: 'GitHub', link: 'https://github.com/Timeflys2018/KnowMe' },
      { text: '赞助', link: 'https://useknowme.com/sponsor', target: '_self' },
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: '欢迎与导览', link: '/' },
          { text: '快速上手', link: '/start/quickstart' },
          { text: '配置 LLM', link: '/start/llm-setup' },
        ],
      },
      {
        text: '配置',
        items: [
          { text: '配置中心', link: '/settings' },
        ],
      },
      {
        text: '核心功能',
        items: [
          { text: '编辑与导出', link: '/core/editor-export' },
          { text: '知识引擎', link: '/core/knowledge-engine' },
          { text: '知识图谱', link: '/core/graph' },
          { text: '全局时间线', link: '/core/timeline' },
        ],
      },
      {
        text: 'AI 能力',
        items: [
          { text: 'AI 协作', link: '/ai/collaboration' },
          { text: 'Chat 对话', link: '/ai/chat' },
        ],
      },
      {
        text: '集成',
        items: [
          { text: 'MCP 接入', link: '/integrate/mcp' },
          { text: 'Agent Fleet（v1.5）', link: '/integrate/agent-fleet' },
        ],
      },
      {
        text: '参考',
        items: [
          { text: '快捷键速查', link: '/reference/shortcuts' },
          { text: 'FAQ + 排错', link: '/reference/faq' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Timeflys2018/KnowMe' },
    ],

    footer: {
      message: '© 2026 知我 KnowMe',
      copyright: '<a href="https://useknowme.com">useknowme.com</a> · <a href="https://useknowme.com/legal/privacy">隐私</a> · <a href="https://useknowme.com/legal/terms">条款</a> · <a href="https://useknowme.com/legal/eula">EULA</a>',
    },

    outline: { level: [2, 3], label: '本页内容' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdatedText: '最近更新',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有匹配的结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
})
