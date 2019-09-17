# vuepress-theme

> Enhanced layout and style for vuepress blog

## How to install
1. Go into `<VuePress_Project>/.vuepress` folder and
2. `git clone https://github.com/aliceblock/vuepress-theme theme`
3. Add Config as below
``` javascript
// Uncomment if you want to use

// const FB_APP_ID = <App ID from Facebook>
const SITENAME = 'VuePress Blog'
const HOSTNAME = 'https://<Your Github username>.github.com' // Or your custom hostname

module.exports = {
  title: SITENAME,
  themeConfig: {
    hostname: HOSTNAME,
    logo: '/logo.png',  // .vuepress/public/logo.png
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Menu1', link: '/link/' },
      { text: 'Menu2', link: '/about/' },
    ],
    facebook: {
      app_id: FB_APP_ID
    },
    lastUpdated: 'อัปเดตเมื่อ',
    per_page: 6   // Number of posts show in home
  },
  head: [
    // ['meta', { property: 'fb:app_id', content: FB_APP_ID }], // Uncomment if FB_APP_ID is provided
  ],
  plugins: [
    ['@vuepress/medium-zoom', {
      selector: '.medium-zoom img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }],
    // ['@vuepress/google-analytics', {
    //   'ga': 'UA-XXXXXXXXX-X'
    // }],
    ['@vuepress/last-updated', {
      transformer: (timestamp, lang) => {
        return new Date(timestamp).toLocaleString('en-US')
      }
    }],
    ['autometa', {
      site: {
        name: SITENAME,
      },
      canonical_base: HOSTNAME,
    }],
    ['sitemap', {
      hostname: HOSTNAME
    }]
  ],
  extendMarkdown: md => {
    md.use(require('markdown-it-block-image'), {
      outputContainer: false,
      containerClassName: 'image-container'
    });
  }
}
```
4. Additional `npm install @vuepress/plugin-google-analytics vuepress-plugin-sitemap`

## Plugins

The default theme has the following plugin built in:

- [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-active-header-links)
- [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-google-analytics)
- [@vuepress/plugin-search](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-search)

- [@vuepress/plugin-medium-zoom](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-medium-zoom)
- [vuepress-plugin-autometa](https://github.com/webmasterish/vuepress-plugin-autometa)
