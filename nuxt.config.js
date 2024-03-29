require('dotenv').config();
module.exports = {
  mode: "universal",
  srcDir: "./client/",
  serverMiddleware: ["@@/api/"],
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%sコンピュータ技術研究会 CTRL",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "コンピュータ技術研究会のホームページです。"
      },
      { hid: "twitter:card",
        name: "twitter:card",
        content: "summary"
      },
      { hid: "twitter:site",
        name: "twitter:site",
        content: "@tcuctrl"
      },
      { hid: "twitter:title",
        name: "twitter:title",
        content: "東京都市大学 コンピュータ技術研究会"
      },
      { hid: "twitter:image",
        name: "twitter:image",
        content: process.env.WHOIS_IMG
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/35__.png"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
    //フッターアニメーション制御
    afterEnter(el) {
      console.log("entered");
      this.$store.commit("doFooter");
    },
    beforeLeave(el) {
      console.log("before Leave");
      this.$store.commit("doFooter");
    },
    enterCancelled(el) {
      console.log("cancel");
      this.$store.commit("doFooter");
    }
  },
  /*
   ** Global CSS
   */
  css: [
    {
      src: "~/assets/scss/main.scss",
      lang: "scss"
    },
    "element-ui/lib/theme-chalk/index.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~plugins/element-ui",
    "~/plugins/axios",
    "~plugins/sanitize-html",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: "http://localhost:3000"
  },
  styleResources: {
    scss: ["~assets/scss/variable.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    // vendor: ['element-ui'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
