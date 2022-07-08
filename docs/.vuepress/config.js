module.exports = {
    title: '前端知识体系',
    description: 'JavaScript、浏览器、网络协议、面试题等基本知识点',
    base:'/knowledgeNotes/',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    ga: '',
    evergreen: true,
    themeConfig: {
        sidebarDepth: 2,
        sidebar: [
            {
                title: 'JavaScript',
                collapsable: true,
                children: [
                    '/javaScript/1.varType',
                    '/javaScript/2.prototype',
                    '/javaScript/3.scopes',
                    '/javaScript/4.this',
                    '/javaScript/5.code',
                    '/javaScript/6.nativeCode',
                ],
            },
            {
              title: '网络协议',
              collapsable: true,
              children: [
                  '/net/1.网络基础',
                  '/net/2.http',
                  '/net/3.https',
              ],
              sidebarDepth: 2,
            },
            {
              title: '设计模式',
              collapsable: true,
              children: [
                '/designMode/1.单例模式',
                '/designMode/2.策略模式',
                '/designMode/3.代理模式',
                '/designMode/4.迭代器模式',
                '/designMode/5.发布-订阅模式',
                '/designMode/6.命令模式',
                '/designMode/7.组合模式',
              ],
            },
            {
              title: '数据结构与算法',
              collapsable: true,
              children: [
                '/suanFa/1.栈'
              ],
            },
            {
                title: '浏览器',
                collapsable: true,
                children: [
                    '/browser/storage',
                    '/browser/netWork',
                    '/browser/parse',
                    '/browser/render',
                    '/browser/backflow',
                ],
                sidebarDepth: 2,
            },
            {
              title: 'Node',
              collapsable: true,
              children: [
              ],
            },
            {
              title: '框架与库',
              collapsable: true,
              children: [
                  '/TypeScript/advanced-types',
              ],
            },
            {
              title: '前端工程化',
              collapsable: true,
              children: [

              ],
            },
            {
              title: '性能优化',
              collapsable: true,
              children: [

              ],
            },
            {
              title: '前端安全',
              collapsable: true,
              children: [

              ],
            },
            {
                title: '面试题',
                collapsable: true,
                children: [
                    '/mianshi/1.js',
                    '/mianshi/2.es6',
                    '/mianshi/3.编码题',
                    '/mianshi/4.html、css',
                    '/mianshi/5.网络协议',
                    '/mianshi/6.浏览器',
                    '/mianshi/7.框架',
                    '/mianshi/9.性能优化',
                    '/mianshi/10.前端安全',
                    '/mianshi/12.前端工程',
                ],
            },
        ]
    },

}
